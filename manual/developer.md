# For developer

> ⚠️ **TOML migration (2026-05)** — Test directories now ship `ctrlg.<sname>.toml` + `PB.<sname>.toml` as the canonical inputs (see migrated [Samples/EPS/](https://github.com/tkotani/ecalj/tree/main/Samples/EPS), [Samples/PROCAR/](https://github.com/tkotani/ecalj/tree/main/Samples/PROCAR), [Samples/MLOsamples/](https://github.com/tkotani/ecalj/tree/main/Samples/MLOsamples), [Samples/TestInstall/](https://github.com/tkotani/ecalj/tree/main/Samples/TestInstall)). Legacy `ctrl,GWinput`-only directories live under [Samples/Legacy/](https://github.com/tkotani/ecalj/tree/main/Samples/Legacy) until converted with `Legacy2toml.py <sname>`. See [TOML migration](./toml_migration).

## Test system `testecalj` (2025-10-8).

Our new test system is made from two files 
```
SRC/exec
├── comp.py    utitities (functions to show difference of files) called from testecalj
└── testecalj   main program for test
```

* Install test described in InstallAll.py is performed at `ecalj/Samples/TestInstall`.
* We can run testecalj as `>testecalj foobar`, where `foobar/` is the name of a test directory.
`testecalj` creates `foobar_work/` directory and do test in it. 
* `foobar/` should contain initial settings (`ctrlg.<sname>.toml` + `PB.<sname>.toml`; legacy `ctrl,GWinput` for un-migrated dirs) and files to be compared. In addition, we have to write `test.py` which describe schedules to run programs and to compare files. `ecalj/Samples/TestInstall/foobar` contains samples of test directories.
* For any test directory `foobar`, we can perform the test by `testecalj foobar`. For example, `Fe_magnon` lives at `ecalj/Samples/Legacy/Magnon/Fe_magnon` (since the Magnon tree is awaiting TOML migration); a `test.py` exists in each Magnon sub-directory.
* We can write your own `test.py` easily. 

* `testecalj` use binaries such as `lmfa,lmf,qg4gw...` in the directory containing the `testecalj`. 

* We can do only numerical comparison of files by
```
from comp import test2_check
testdir= "/home/takao/ecalj/Samples/Legacy/Magnon/Ni_magnon/"
workdir= "/home/takao/ecalj/Samples/Legacy/Magnon/Ni_magnon_work/"
dat='wan_ChiPMz.mat.syml1'
tall=test2_check(testdir+'/'+dat, workdir+'/'+dat,tol=0.01)
```
where, we need to import `ecalj/SRC/exec/comp.py`.

---

* Samples/TestInstallにテストを移した。InstallAll.pyを実行するとテストではそこへ飛びます。個別実行もSamples/TestInstallで行います。どんなところにあるfoobar/に対してもその横にfoobar_work/をつくってそこでテストするようにしました。foobar/にはtest.pyをいれること
* testecaljというコマンドを作った。51行の短いプログラム。これはバイナリのあるディレクトリBINDIRに入ります。使うバイナリはその同じディレクトリにあるものです。
たとえば Samples/Legacy/AHC/xxx にでも test.py を置けばテストできるはず (AHC は現状 Legacy 配下)。
 
