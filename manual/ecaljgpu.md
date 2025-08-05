# ecalj GPU version の使い方

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

`GWinput` の部分的な抜粋
```
!GaussianFilterX0 0.0001 !(a.u.) Gaussian smearing for the polarization function x0. 
                         ! This stabilize convergence for metallic systems
                         ! This can be a default setting in the future
KeepEigen .false.
zmel_max_size 4
MEMnmbatch 4
```

* `KeepEigen` を `.false.` に設定します。
* `zmel_max_size` を 4 に設定します。
* `MEMnmbatch` を 4 に設定します。
それぞれの意味は [GWinput](../manual/gwinput.md) を参照してください。

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
   The variables controlling the batch size are `NEMnmbatch` and `zeml_max_size`, which are specified in `GWinput`.
   For GPU calculations, set these values to around 4 (representing 4GB).
   ```text GWinput
   zmel_max_size 4
   MEMnmbatch 4
   ```
   > [!TIP]
   > If not set, the default values for CPU calculations will be used.

2. When handling large systems, add the following to `GWinput` to prevent memory exhaustion:
   ```
   keepEigen .false.
   ```

## Notes
- It is recommended to run GPU calculations on a single node.
- When using multiple nodes, ensure that MPI processes are correctly distributed across nodes.
