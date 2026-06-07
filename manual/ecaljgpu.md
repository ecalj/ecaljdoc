# ecalj GPU version の使い方

> ⚠️ **TOML migration (2026-05)** — GPU 版 `gwsc` も `ctrlg.<sname>.toml` + `PB.<sname>.toml` を読みます。Legacy `ctrl.<sname>` / `GWinput` directory は `Legacy2toml.py <sname>` で変換してから実行してください。See [TOML migration](./toml_migration).

ecalj ではGPUによるQSGW計算が可能です。
* GPUは自己エネルギーおよび遮蔽クーロン相互作用の計算に使用されます。
* 現状では`lmf` (DFT計算) はCPUで実行されます。
> [!IMPORTANT]
> CPUで実行される部分とGPUで実行される部分で、それぞれ並列数を指定する必要があります。

* GPU の使用には NVIDIA のコンパイラでecaljのGPUバージョンをコンパイルする必要があります。
Kugui でのインストール、初期設定、GPUテスト計算は[installISSP](../install/installISSP.md) を参照してください。

## おすすめ設定 in ISSP Kugui
* ACCノード(GPU搭載ノード)を1ノード使用する。 1ノードに4GPUが搭載されています。
* CPUで実行される部分のMPI並列数(`-np` で指定)を64。
* GPUで実行される部分のMPI並列数(`-np2` で指定)をGPU数と同じ4とする。

以下qsub ファイルの例。

```bash job.sh
#!/bin/sh
#PBS -q i1accs
#PBS -l select=1:ncpus=64:mpiprocs=64:ompthreads=1

ulimit -s unlimited
gwsc -np 64 -np2 4 --gpu 2 inas2gasb2 > lgwsc
```

`i1accs` はテストキュー(最大時間30分)ですので、プロダクトランでは`F1accs`等を使用してください。

`ctrlg.<sname>.toml` の `[gw]` セクション抜粋 (legacy: 同 keys を `GWinput` に書く)
```toml
[gw]
# SmearX0      = 0.0001       # (Ha) Gaussian smear of x0 along freq; stabilises metals (was GaussianFilterX0 pre-2026-06)
# SmearX0q0    = 0.0005       # (Ha) override SmearX0 at offset-Gamma (q≈0) only; <0 = off
KeepEigen = false
zmel_max_size = 4
MEMnmbatch = 4
```

* `[gw].KeepEigen = false`
* `[gw].zmel_max_size = 4`
* `[gw].MEMnmbatch = 4`
それぞれの意味は [GWinput (legacy reference)](../manual/gwinput.md) または [lmf.md § Legacy ctrl ↔ TOML map](./lmf#legacy-ctrl-lt-sname-gt-toml-path-map) を参照してください。

### 混合精度: `--mp` と `--fp32` (2026-06)

GPU GW では GEMM の compute_type を指定して精度・速度を切替えます。

| フラグ | compute_type | 仮数精度 | 既定の用途 |
|---|---|---|---|
| `--gpu` のみ | FP64 | ~1e-16 | safest / 最遅 |
| `--gpu --mp` | TF32 (`CUBLAS_COMPUTE_32F_FAST_TF32`) | ~1e-3 (仮数10bit) | 通常の QSGW (高速、推奨) |
| `--gpu --mp --fp32` | 真の FP32 (`CUBLAS_COMPUTE_32F`) | ~1e-7 (仮数23bit) | 悪条件な誘電行列向け fallback (TF32 比 ~7% 減速) |

通常は `--gpu --mp` で十分ですが、**重元素 + 分子アニオン (NO3 / N3 / ClO / BrO /
PO4 等) で局所場が強く ε(q,ω) の条件数が大きい系**では TF32 の ~1e-3 誤差が
$(1-v\chi_0)^{-1}$ で増幅され、$W$ / $\Sigma^c$ が破壊されて QSGW が発散
(`lmf failed`) もしくは NaN (lsc / lqpe) になることがあります。
その場合は `--fp32` を追加してください — 真の FP32 で CPU / 倍精度と一致します。
ストレージは単精度のままなのでメモリ使用量は不変です。

```bash
gwsc 5 -np 64 -np2 4 --gpu --mp --fp32 inas2gasb2 > lgwsc
```

汚染源は $\chi_0$ 累積 (`zmel` 縮約) であり、逆行列パスだけを直しても解決しないと
確認済み (2026-06)。失敗パターンと再現データは
[`Samples/mptf32problem/`](https://github.com/tkotani/ecalj/tree/main/Samples/mptf32problem)
にあります (GW1500 production の 62 例)。

### MPSの設定

以下を`~/.bashrc` に記載する。
```bash ~/.bashrc
if which nvidia-cuda-mps-control > /dev/null 2>&1 ; then
  export CUDA_MPS_PIPE_DIRECTORY=$(pwd)/nvidia-mps-$(hostname)
  export CUDA_MPS_LOG_DIRECTORY=$(pwd)/nvidia-log-$(hostname)
  echo "start nvidia-cuda-mps-control at" $(hostname)
  nvidia-cuda-mps-control -d
fi
```

--------------

# Using the GPU Version

The GPU can be utilized in QSGW calculations:
- The GPU is used for the calculation of self-energy and screened Coulomb interaction.
- `lmf` is executed on the CPU.

## Requirements:
1. NVIDIA GPU
2. Compiler: NVHPC with GPU-accelerated libraries: cuBLAS, cuSolver

## Compilation
```bash
FC=nvfortran ./InstallAll --gpu
```

## Execution
- The GPU version can be used by specifying the `--gpu` option with `gwsc`.
- The number of MPI processes for the GPU code can be specified with `-np2`. This should typically match the number of GPUs available.
Example:
```
gwsc -np 64 -np2 4 --gpu 1 $id > lgwsc
```

## Tips

1. The GPU version uses fewer MPI processes compared to the CPU version, so the available memory per MPI process is larger
   This allows for larger batch sizes in the calculation, potentially improving computation speed.
   The variables controlling the batch size are `MEMnmbatch` and `zmel_max_size` in the `[gw]` section of `ctrlg.<sname>.toml` (legacy: same keys in `GWinput`).
   For GPU calculations, set these values to around 4 (representing 4GB).
   ```toml
   [gw]
   zmel_max_size = 4
   MEMnmbatch = 4
   ```
   > [!TIP]
   > If not set, the default values for CPU calculations will be used.

2. When handling large systems, add the following to `[gw]` (legacy: `GWinput`) to prevent memory exhaustion:
   ```toml
   [gw]
   KeepEigen = false
   ```

## Notes
- It is recommended to run GPU calculations on a single node.
- When using multiple nodes, ensure that MPI processes are correctly distributed across nodes.
