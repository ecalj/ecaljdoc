# ecalj Install

 小谷先生のQiitaでの解説(https://qiita.com/takaokotani/items/9bdf5f1551000771dc48)
## Dependencies

* git (to download the ecalj)
* fortran compiler
* math library
* MPI library
* cmake
* make
```
 sudo apt-get update
 sudo apt-get install git gfortran
 sudo apt-get -y install intel-mkl
```

* python3 (>3.XX)

## Install
```
FC=ifort ./Installall [Options]

```
Options:
* `-np`
* `--clean`
* `--gpu`

## Uninstalling
