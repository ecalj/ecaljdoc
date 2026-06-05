# ecalj/ecalj_auto

This is for automatic batch calculations across many POSCAR files.
`ecalj_auto` was used for generating [ecaljdatabase](https://github.com/tkotani/DOSnpSupplement/blob/main/bandpng.md#band-structure--total-dos).

For the GW1500 production run details and slot scheduler, see:
- [ecalj_auto/README.md](https://github.com/tkotani/ecalj/blob/main/ecalj_auto/README.md) — main usage guide
- [ecalj_auto/README_slot_scheduler.md](https://github.com/tkotani/ecalj/blob/main/ecalj_auto/README_slot_scheduler.md) — TOML + hgw_combined + scheduler architecture (2026-05)

> ⚠️ **TOML migration (2026-05)** — `ecalj_auto` now ships `ctrlg.<sname>.toml` per generated job (no legacy `ctrl,GWinput` write-out). Templates: `jobtemplate{,.kugui,.ohtaka,.ucgw}` for SLURM/PBS dispatch. See [TOML migration](./toml_migration).
>
> ⚠️ **GW1500 batch: `--fp32` by default (2026-06)** — `worker.sh` /
> `run_gw1500_addrun.sh` / `run_gw1500_addrun_conv.sh` now call
> `gwscconv --gpu --mp --fp32 --conv-tol 0.1`. `--fp32` switches the GPU GEMMs
> from TF32 to true FP32 で、悪条件な誘電行列 (重元素 + 分子アニオン NO3 / N3 /
> ClO など) でも QSGW が NaN / 発散しない。詳細は
> [gwsc § `--fp32`](./gwsc#fp32-2026-06) および
> [GPU マニュアル § 混合精度](./ecaljgpu#混合精度-mp-と-fp32-2026-06)。
> 失敗事例の再現は [`Samples/mptf32problem/`](https://github.com/tkotani/ecalj/tree/main/Samples/mptf32problem)。



### python のImportError が発生する場合

python の version や環境によって以下のようなエラーがでる場合がある(ISSP python3.6で発生)
```text OUTPUT/testSGA/start@xxxxxxx/job0.out
Traceback (most recent call last):
  File "/home/k0413/k041300/ecalj/ecalj_auto/OUTPUT/testSGA/start@20250410-095838/job_mp.py", line 3, in <module>
    import pandas as pd
  File "/home/k0413/k041300/.local/lib/python3.6/site-packages/pandas/__init__.py", line 17, in <module>
    "Unable to import required dependencies:\n" + "\n".join(missing_dependencies)
ImportError: Unable to import required dependencies:
pytz: No module named 'pytz'
```
この場合pythonのversion upを試す。

#### `mise` を使用する場合.　(pyenvでも同様です)
以下を `~/.bashrc` に記載 (zsh の場合は 2行目のbash を zsh とする)
```bash
type mise > /dev/null 2>&1 || curl https://mise.run | sh
eval "$(~/.local/bin/mise activate bash)"
```
>  [!NOTE]
> mise は パッケージ管理ソフトの一種であり、詳細は [mise](https://mise.jdx.dev/) を参考にして下さい。

その後 ~/.bashrc  の再読み込みを行うと mise がインストールされ使用できるようになる。
```bash
source ~/.bashrc
```

ecalj_auto があるディレクトリで以下を実行し, python をinstall する。
```bash 
mise use python@latest
```
> [!IMPORTANT]
> ここでinstallされたpythonは, ecalj_auto があるディレクトリより下位のディレクトリでのみ有効となることに注意。

ここでinstallしたpythonが使用するlibraryを以下で導入する。
```bash
pip3 install pandas seekpath spglib --user
```

## サーバーのコマンドに合わせてスクリプトの変更

### mpirun 関係
MPI の実行コマンドをサーバの使用に合わせて変更する．デフォルトは`mpirun` であり, 以下のスクリプトに記載されている．
ecalj/ecalj_auto/auto/creplot.py
```python
    def run_lmf(self, fout,foute):
        command1 = ['mpirun', '-np', self.ncore, self.epath/'lmf', self.num] + self.option_lmf
        command2 = ['tail', '-f', f'save.{self.num}']
        run_popen(command1, command2, fout, foute, 'a')
        return check_save(f'save.{self.num}')
```
`command1 = ['mpirun', '-np', self.ncore, self.epath/'lmf', self.num] + self.option_lmf` を修正する．
#### SLURM の場合: 例 ISSP system B

On the slurm case: e.g., ISSP system B, Othtaka
```python
        command1 = ['srun', '-n', self.ncore, self.epath/'lmf', self.num] + self.option_lmf
```

#### OpenMPI の場合: 例 ISSP system C
```python
        command1 = ['mpiexec', '--bind-to none', '-np', self.ncore, self.epath/'lmf', self.num] + self.option_lmf
```

### ジョブ投入関係
ジョブ投入コマンドはサーバに合わせて変更する．現在のデフォルトは
**バックグラウンドの `bash`** で, 以下のスクリプトに記載されている．
`~/ecalj/ecalj_auto/auto/Job.py`:

```python
            os.system(f'bash {jobx} &')
```

(2025 後期に `qsub` から `bash` 起動へ migrate された。SLURM/PBS
で投入したい場合は対象行を以下に書き換える。)

#### qsub の場合 (PBS):
```python
            os.system(f'qsub {jobx}')
```

#### SLURM の場合 (例 ISSP system B):
```python
            os.system(f'sbatch {jobx}')
```

## Query

MPからのPROCARの取得方法

依存関係: 以下のpython ライブラリが必要
- pymatgen
- mp-api
インストールはpipから
```bash
pip3 install pymatgen mp-api --user
```
material project のAPI key が必要であり `ecalj_auto/config.ini` に記載する
