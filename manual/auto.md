# ecalj/ecal_auto

This is for automatic calculations for many POSCAR files.
`ecalj_atuo` was used for generating [ecaljdatabase](https://github.com/tkotani/DOSnpSupplement/blob/main/bandpng.md#band-structure--total-dos)


xxxxx followings are still under construction xxxxx

## dependency
We need 
 - `>python3.9'
 - pandas
 - seekpath
 - spglib

```bash
pip install pandas seekpath spglib --user
```


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
#### `mise` を使用する場合. 
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

### qsub 関係
ジョブの投入コマンドをサーバの使用に合わせて変更する．デフォルトは`qsub` であり, 以下のスクリプトに記載されている．
~/ecalj/ecalj_auto/auto/joball.py L126

```python ~/ecalj/ecalj_auto/auto/joball.py L126
            os.system(f'qsub {jobx}')
```
#### SLURM の場合: 例 ISSP system B
はqsub をsbatchに変更する
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
