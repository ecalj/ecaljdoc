# ISSP System B: Ohtaka での実行について

 - moduleの設定
OneAPI(Intel) + OpenMPI を推奨
```bash
module purge
module load openmpi/4.1.5-oneapi-2023.0.0-classic  
```
::: tip
 OneAPI_MPIの方が若干早いが安定性に難あり.
:::
 - スクリプトの変換
ecaljのMPI計算実行コマンドはmpirun を想定している．(スクリプト内に記載がある)
インストール前に,ISSPの仕様に合わせて以下のファイルの`mpirun -np` を `srun -n` に変更する．(`mpirun` でも動くが警告がでる場合がある)
 `ecalj`ディレクトリのPATHは各自のものに読み変えて下さい．
```
~/ecalj/SRC/exec/gwutil.py
~/ecalj/SRC/exec/run_arg.py
~/ecalj/SRC/exec/job_tdos
```
```python gwutil.py l.24あたり
def run_program(commandline, ncore=0,x0=0):
    import subprocess,datetime
    xdate=datetime.datetime.now() #today().isoformat()
    mpirun='mpirun -np %d '%ncore if ncore!=0 else ''
```
```python run_arg.py l.7あたり
def run_arg(argin, mpi_size, nfpgw, command, output, *target):
    echo_run = True  # standard
    mpi_run = f"mpirun -np {mpi_size}"  # standard
```
```python job_tdos l.9あたり
def run_arg(argin, mpi_size, nfpgw, command, output, *target):
    echo_run = ""  # standard
    serial_run = ""  # standard
    mpi_run = f"mpirun -np {mpi_size}"  # standard
```
::: tip
インストール後の `~/bin/` の中のファイルを変更でもOKだけど, 再インストールすると上書きされます．
:::

 - InstallAll について
InstallAll は コンパイルとテスト計算の実行を含んでいます．Ohtakaでは, フロントエンドでのMPIプロセスの実行は禁止されているため，テスト計算部分が実行できません．
テスト計算まで動かすには, InstallAll をjob として実行して下さい．コンパイルと合わせて5~10分程度で終了するはずです．
デフォルトでは8 coreが使用されますので, 8 core 以上を確保して下さい．
```bash job.sh
#!/bin/sh
#SBATCH -p i8cpu
#SBATCH -N 1
#SBATCH -n 8
#SBATCH --exclusive

module purge
module load openmpi/4.1.5-oneapi-2023.0.0-classic  
ulimit -s unlimited

FC=ifort ./InstallAll --clean
```

::: tip
 `InstallAll` の内部でも`mpirun`を一部使用されているのですが，経験上TestInstall は通ります(単一ノードの使用だから?)．
:::

## 並列数の補足情報

 - 並列数の指定について
OpenMP 並列は効果が薄いので，基本はMPI並列数を取ること．
ただし，メモリ不足になる場合は，コアあたりに使用するメモリを確保するために，ノードあたりのコア数を減らすこと．
```bash 例16ノード 512MPI の場合
#SBATCH -p F16cpu
#SBATCH -N 16
#SBATCH -n 512
#SBATCH -c 4
#SBATCH --ntasks-per-node=32
#SBATCH -t 24:00:00
```
::: tip
実行時にMKL(Intel Math Kernel Library)のエラーがでる場合は, `-c 1` とすること。
::: 
