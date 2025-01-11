# ecalj: 補足情報

## ISSP System C: Kugui での実行について
 - GPUの使用を前提
 - moduleの設定
nvfortran + OpenMPI
```bash
module purge
module load nvhpc-nompi/24.7 openmpi_nvhpc compiler-rt tbb mkl
```
[!Tip] 数学ライブラリはIntelのMKLも使用する(CPU計算のため)．NVIDIAやGNU fortran からも利用できる．

- MPS(複数MPIプロセスが1つのGPUを共有できる)の利用のために `~/.bashrc` に以下を記載
```bash ~/.bashrc
if which nvidia-cuda-mps-control > /dev/null 2>&1 ; then
  export CUDA_MPS_PIPE_DIRECTORY=$(pwd)/nvidia-mps-$(hostname)
  export CUDA_MPS_LOG_DIRECTORY=$(pwd)/nvidia-log-$(hostname)
  echo "start nvidia-cuda-mps-control at" $(hostname)
  nvidia-cuda-mps-control -d
fi
```

 - スクリプトの変換:Optional
CPUでの計算でOpenMP 並列を使用する場合は, `mpirun -np` を `mpiexec --bind-to none -np` に変更する．
 `ecalj`ディレクトリのPATHは各自のものに読み変えて下さい．
```
~/ecalj/SRC/exec/gwutil.py
```
```python gwutil.py l.24あたり
def run_program(commandline, ncore=0,x0=0):
    import subprocess,datetime
    xdate=datetime.datetime.now() #today().isoformat()
    mpirun='mpiexec --bind-to none -np %d '%ncore if ncore!=0 else ''
```
それ以外にも, `mpirun` が使用されているスクリプトで必要に応じて変更．

- Install
```bash
FC=nvfortran ./InstallAll --gpu --clean
```
* Test計算はCPUで実行される．


- ジョブスクリプト
```bash job.sh
#!/bin/sh
#PBS -q F1accs
#PBS -l select=1:ncpus=64:mpiprocs=64:ompthreads=1
#
ulimit -s unlimited
id=inas6gasb6
gwsc -np 64 -np2 4 --gpu 5 $id > lgwsc
```
* `-np` でCPUで実行される計算の並列数を指定．
* `-np2` でGPUで実行される計算の並列数を指定．通常は使用できるGPU数とする.
* `--gpu`  GPU版の実行ファイルが利用される．

[!Tip] GPU版は系が小さいと高速化は期待できないが, 大規模系なら4GPUで40原子程度までは計算可能(計算条件による)．
