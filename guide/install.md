# ecalj Install

 小谷先生のQiitaでの解説(https://qiita.com/takaokotani/items/9bdf5f1551000771dc48)

## Dependencies
### requirement
* git (to download the ecalj)
* fortran compiler
* math library (blas, lapack, fft)
* MPI library
* cmake
* make
* python3 

## Install in the server
```bash
FC=ifort ./Installall [Options]
```

Following options are valid
Options:
* `-np` <value>:
   default: 8
   specify the number of MPI parallelization in test calculation
* `--clean`
   default: none
   delete the cache files before compiling  
* `--gpu`
   default: none
   compile the GPU and GPU-MP version


## Install into the local machine
```bash
 sudo apt-get update
 sudo apt-get install git gfortran
 sudo apt-get -y install intel-mkl
```

* python3 (>3.XX)
