# ecalj Install

## 1. Install fortran compilars and some tools
We need following tools to generate fortran binaries. ecalj made from source codes at 
```ecalj/SRC/main/*.f90``` and ```ecalj/SRC/subroutines/*.f90```.

* git (Tto download the ecalj. It is convenient to upgrade your code)
* Fortran compiler (we can choose gfortran, ifort, or nvfortran)
* Math library (blas, lapack, fft). We can usually use intel-mkl. 
* MPI library (open mpi works for ubuntu24 )
* cmake, make, bash, gnuplot 

We can use apt to install them when ubuntu. Similar in other systems, or your system already have.

|**I use following versions for thinkpad T14: ubuntu 24.04**|
|---|
|openmpi-bin/noble,now 4.1.6-7ubuntu2 amd64| 
|openmpi-common/noble,noble,now 4.1.6-7ubuntu2 all| 
|cmake/noble,now 3.28.3-1build7 amd64|
|make/noble,now 4.3-4.1build2 amd64 |
|gfortran/noble,now 4:13.2.0-7ubuntu1 amd64|
|intel-mkl/noble,now 2020.4.304-4 amd64 |


## 2. Install `python` and required tools using `mise`
> [!TIP]
> For the case the default version of Python is outdated (python >3.9 needed). We will prepare the latest Python in your ./local.
> The mise is a package management software. We can use anaconda instead. Or you can install tools at the following step 4.

1. Add the following settings to `~/.bashrc` for the automatic installation and activation of `mise`:
```bash ~/.bashrc
export PATH="$HOME/.local/bin:$PATH"
type mise > /dev/null 2>&1 || curl https://mise.run | sh
eval "$(~/.local/bin/mise activate bash)"
```

2. Update `~/.bashrc` to install `mise`:
```bash
source ~/.bashrc
```

3. Install `python` using `mise`:
```bash
mise use python@latest -g
```

4. Install the required `python` libraries:
```bash
pip install numpy pandas seekpath spglib pymatgen mp-api scipy plotly
```

## 3. Install and InstallTest
**For ohtaka and kugui in ISSP, skip here and see [here](./installISSP.md)**

We recommend you to check ecalj/InstallAll at first. InstallAll writes files to your $HOME/bin. 
Add $HOME/bin to your path. (The install directory is ```BINDIR = os.path.join(HOME, 'bin')```.  to ```BINDIR = os.path.join(HOME, 'bin2')```, for example, to change install directory).  

Run the following command at ecalj/
```bash
FC=ifort ./InstallAll [Options]
(We can use gfortran or nvfortran instead of ifort)
```
It performs compile and link followed by the install test at ecalj/SRC/TestInstall/. (testecalj.py is the script for test)
If succeeded, we see 'OK! All PASSED!' at the end of tests.
The compile and install test may take 5~10 minutes (usually laptop is faster).

Following options are valid
Options:
* `-np` [value]:
   default: 8
   specify the number of MPI parallelization in test calculation
* `--clean`
   default: none
   delete the cache files before compiling  
* `--gpu`
   default: none
   compile the GPU and GPU-MP version


####  補足

* Qiitaでの解説(https://qiita.com/takaokotani/items/9bdf5f1551000771dc48)
