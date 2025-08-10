# gwsc: a script to run QSGW calculation

gwscがQSGW計算実行スクリプトである。
QSGW計算は，複数のfortran実行ファイルを呼び出して実行される．
ファイル[GWinput](./gwinput.md)が読み込まれる。

## Usage
**Usage**: ` gwsc -np NP [-np2 NP2] [--phispinsym] [--gpu] [--mp] nloop extension [Options]`

### `-np NP`
MPI並列数を指定する。

### `-np2 NP2`
GPU版を使用する場合のみ指定する。GPUで実行される計算のMPI並列数を指定する。
通常は使用できるGPU数を指定する。

### `--gpu`
GPU版を使用する場合のみ指定する。

### `--mp`
GPU-MP版(混合精度)を使用する場合のみ指定する。計算精度に注意すること。


### `nloop`
QSGWのイテレーション数を指定する。

### `extension`
ctrl ファイルの拡張子を指定する。

### `Options`
追加のオプションを指定する。
追加オプションは, 全ての実行ファイルの実行時引数となる。以下追加のオプションのリスト。
またlmfへのオプション-vsoc=1などもここに書く。

------
#### `--keepwv`
`--gpu` を指定した場合に自動で付け加わる．
自己エネルギー(相関部分)を計算する際に, 遮蔽クーロン相互作用の行列要素をメモリ上に保持する．
GPU計算ではファイルIO, データ転送が特に律速になるが, それを回避するため．ただし十分なGPUおよびCPUメモリが必要となる．

#### `--nb=X`
* Xは整数 `--nb=4`のように指定する。
遮蔽クーロン相互作用(W)計算`hrcxq` or `hrcxq_gpu` で使用される。分極関数のMPB基底並列数を指定する。
GPU計算において`hrcxq(_gpu)`計算でメモリ不足になる場合に使用する。`--np2` で指定した並列数を割り切れる値を入れる必要がある。

#### `--nwpara=X`
* Xは整数 `--nwpara=2`のように指定する。
相関部分の自己エネルギー計算`hsfp0_sc --job=2` or `hsfp0_sc_gpu --job=2` で使用される。$ω'$積分の並列数を指定する。
`--keepwv` 使用時(GPU版ではデフォルトで使用される) __WVR.X (X=1,...)ファイルがメモリに乗らりきらずメモリ不足になる場合に使用する。
`--np2` で指定した並列数を割り切れる値を入れる必要がある。

#### `--tetwtk`
指定すると, 分極関数を計算する際に, 結合状態間の四面体重みをメモリ上に保持しない。$k$点が多い計算でメモリ不足になる場合に使用する。

#### `--skipGS`
`lmf --jobgw=1` で使用される。
GW計算ではDFT計算(`lmf`)で得られた波動関数を`lmf`とは異なる基底関数で展開しなおす。再展開後の波動関数についてGram-Schmidt正規直行化をしている。その規格直交化をスキップする場合に指定する。

通常は指定する必要はないが、`lmf --jobgw=1`計算が遅い場合には指定することによって計算の高速化が期待される。
* ecaljでは有限のqで誘電関数が計算できるーこのとき分母分子のキャンセレーションが起こるため、波動関数の直行性が正確である必要があり、そのときには--skipGSを使うべきでない。

#### `--normcheck`
`lmf --jobgw=1` で使用される。 GW計算で使用される波動関数の規格直交性を確認したいときに使用する。
normchk.fobar は
```
> head -20 normchk.si
#       IPW         IPW(diag)   Onsite(tot)   Onsite(phi)      Total
      0.436015      0.805123      0.563972      0.562573      0.999988
      0.339134      0.620353      0.660515      0.656881      0.999649
      0.339133      0.620353      0.660516      0.656882      0.999649
      0.339133      0.620353      0.660516      0.656882      0.999649
      0.507738      0.648515      0.492040      0.487673      0.999778
...
```
などとなる。右端の値が、1になっているべきであるが、展開し直しているため従来では高いエネルギー(下の方。ここでは見えてない）でかなり小さくなっていた(0.8などのおおきさ)。最近デフォルトでは、Gram-Schmidt正規直行化をかけているので、正規直行化は8桁程度以上は保たれている。

The first line (corresponding to 1st band of 1st q point) means that total normalization almost unity = 0.999988 = 0.436015 + 0.563972. 

### `--ntqxx`
This fix the number of bands to calculate self energy at the first iteration for each $\bf q$ point in the IBZ.
In principle, the number is determined by

## Cautions
* QPU.[number]runをチェックして、number回のQSGWイテレーションが終了している、と認識する。
(初期状態から実行したいときはすべての`*run*`ディレクトリ、ファイルを消すこと）。

* QSGW.[number]runディレクトリには、QSGWのnumber回目の結果rst,sigm(加えてatmpnu,ctrl,GWinput)が格納されており、これを用いてバンドプロットなどができる。



---

# Other scripts 

`cleargw`: clean up temporary files

`gw_lmfh`: The one-shot \GW calculation. Lifetime(impact ionization rate) of QPs.

`epsPP0`: dielectric function. No local field corrections
 
(`eps_lmfh` : Dielectric function with local-field corrections. computationally expensive. Need some modifications. Old versions)


<!-- \item
{\bf epsPP\_lmfh\_chipm} : non-interacting spin susceptibility. 
One-degree of freedom like Rigid moment approx.
After it ends, you need to do \verb#calj_nlfc_metal# and/or \verb#calj_summary_mat#
to get the full spin susceptibility. -->

`genMLWF` : Wannier function and its matrix elements of the Screened Coulomb interaction.


# Files used in gwsc
Temporary files are with `__*`. Thus we can delete __* (or use `cleargw`) after you finish `gwsc/epsPP0` and so on.

To repeat a small test for gwsc
```
./testecalj.py si_gwsc
```
at ~/ecalj/SRC/TestInstall. This is what contained in InstallTest. Test is runnning at work/si_gwsc/.
After copy things from si_gwsc to work/si_gwsc. You can run followings one by one if you like.
Or `ls -rlt` roughly show which generates which files.

```
===== Ititial band structure ====== 
--> No sigm. LDA caculation for eigenfunctions 
0:00:00.990833   mpirun --bind-to core --map-by core -np 1 /home/takao/ecalj/SRC/TestInstall/bin/lmfa si     >llmfa
0:00:03.067381   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/lmf  si     >llmf_lda
===== QSGW iteration start iter 1 ===
0:00:06.584919   mpirun --bind-to core --map-by core -np 1 /home/takao/ecalj/SRC/TestInstall/bin/lmf si     --jobgw=0 >llmfgw00
0:00:08.953914   mpirun --bind-to core --map-by core -np 1 /home/takao/ecalj/SRC/TestInstall/bin/qg4gw    --job=1 > lqg4gw
0:00:11.026268   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/lmf si     --jobgw=1 >llmfgw01
0:00:14.276866   mpirun --bind-to core --map-by core -np 1 /home/takao/ecalj/SRC/TestInstall/bin/heftet --job=1    > leftet
0:00:16.342115   mpirun --bind-to core --map-by core -np 1 /home/takao/ecalj/SRC/TestInstall/bin/hbasfp0 --job=3    >lbasC
0:00:18.457527   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hvccfp0 --job=3    > lvccC
0:00:20.400344   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hsfp0_sc --job=3    >lsxC
0:00:22.459518   mpirun --bind-to core --map-by core -np 1 /home/takao/ecalj/SRC/TestInstall/bin/hbasfp0 --job=0    > lbas
0:00:24.614140   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hvccfp0 --job=0    > lvcc
0:00:26.884440   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hsfp0_sc --job=1    >lsx
0:00:28.964117   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hrcxq   > lrcxq
0:00:31.358625   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hsfp0_sc --job=2    > lsc
0:00:33.682640   mpirun --bind-to core --map-by core -np 1 /home/takao/ecalj/SRC/TestInstall/bin/hqpe_sc    > lqpe
0:00:35.517672   mpirun --bind-to core --map-by core -np 4 /home/takao/ecalj/SRC/TestInstall/bin/lmf si     >llmf
===== QSGW iteration end   iter 1 ===
```

## `lmfa`
### atmpnu* 
Logalithmic derivative at MT boundaries generated by lmfa. This is used by lmf when READP=T. 

### __atm.foobar
This contains electron densities of spherical atoms.

## `lmf`
### rst.foobar
This contains self-consistent electron density revised by each iteration of lmf

### QPLIST*.chk
QPLIST.jobgw1.chk (jobgw1 means --jobgw=1 for lmf) is for human, containing q for irr=1. 
QPLIST.lmf.chk  (no jobgw option) is for human. Irreducible q points for lmf self-consistent calculations.

### __HAMindex
q points table and so on for generating Hamiltonian

### __mix.foobar
mixing file for lda

## `lmf --jobgw=0`
###  NLAindx.chk
This is for human. It shows index to expand eigenfunctions in MTs.

### __HAMindex0
Generated at L96:main_lmf.f90 L96: call m_hamindex0_init()
Index of MTOs, space-group symmetries and so on.

### QBZ.chk
q points mesh. Just for human reading.

## `qg4gw`

### __QGpsi, __QGcou
q+G of the interstitial plane wave (IPW). Type lqg4gw, which shows
```
--- Max number of G for psi, G for Cou= 116 36
 iq=       1 q=  0.000000  0.000000  0.000000 ngp ngc=    111    29 irr.= 1 <--R
 iq=       2 q= -0.250000 -0.250000  0.750000 ngp ngc=    106    34 irr.= 1 <--R
 iq=       3 q= -0.250000  0.750000 -0.250000 ngp ngc=    106    34 irr.= 0 <--R
 iq=       4 q= -0.500000  0.500000  0.500000 ngp ngc=    116    36 irr.= 1 <--R
 iq=       5 q=  0.750000 -0.250000 -0.250000 ngp ngc=    106    34 irr.= 0 <--R
 iq=       6 q=  0.500000 -0.500000  0.500000 ngp ngc=    116    36 irr.= 0 <--R
 iq=       7 q=  0.500000  0.500000 -0.500000 ngp ngc=    116    36 irr.= 0 <--R
 iq=       8 q=  0.250000  0.250000  0.250000 ngp ngc=    116    36 irr.= 1 <--R
 iq=       9 q= -0.012500 -0.012500  0.037500 ngp ngc=    111    29 irr.= 1 <--Q0P
 iq=      10 q= -0.262500 -0.262500  0.787500 ngp ngc=    106    34 irr.= 1 <--Q0P+R
 iq=      11 q= -0.262500  0.737500 -0.212500 ngp ngc=    106    34 irr.= 1 <--Q0P+R
 iq=      12 q= -0.512500  0.487500  0.537500 ngp ngc=    116    36 irr.= 1 <--Q0P+R
 iq=      13 q=  0.737500 -0.262500 -0.212500 ngp ngc=    106    34 irr.= 0 <--Q0P+R
 iq=      14 q=  0.487500 -0.512500  0.537500 ngp ngc=    116    36 irr.= 0 <--Q0P+R
 iq=      15 q=  0.487500  0.487500 -0.462500 ngp ngc=    116    36 irr.= 1 <--Q0P+R
 iq=      16 q=  0.237500  0.237500  0.287500 ngp ngc=    116    36 irr.= 1 <--Q0P+R
 iq=      17 q= -0.012500  0.012500  0.012500 ngp ngc=    111    29 irr.= 1 <--Q0P
 iq=      18 q= -0.262500 -0.237500  0.762500 ngp ngc=    106    34 irr.= 1 <--Q0P+R
 iq=      19 q= -0.262500  0.762500 -0.237500 ngp ngc=    106    34 irr.= 0 <--Q0P+R
 iq=      20 q= -0.512500  0.512500  0.512500 ngp ngc=    116    36 irr.= 1 <--Q0P+R
 iq=      21 q=  0.737500 -0.237500 -0.237500 ngp ngc=    106    34 irr.= 1 <--Q0P+R
 iq=      22 q=  0.487500 -0.487500  0.512500 ngp ngc=    116    36 irr.= 1 <--Q0P+R
 iq=      23 q=  0.487500  0.512500 -0.487500 ngp ngc=    116    36 irr.= 0 <--Q0P+R
 iq=      24 q=  0.237500  0.262500  0.262500 ngp ngc=    116    36 irr.= 1 <--Q0P+R
  OK! End of qg4gw 
```
Here, we have regular mesh points specified by `<--R`. Q0P is the offset Gamma points shown in Q0P. 
irr=1 shows the irreducible q points at which we have to generate eigenfunctions.
ngp is the number of IPW for the expansion of eigenfunctions (controlled by QpGcut_phi). 
ngc is for IPW for the MPB (controlled by QpGcut_cou).

### __BZDATA 
__BZDATA contains info on regular mesh points, and offset Gamma (Q0P). Data for tetrahedron division. 

## `lmf --jobgw=1`
Generate all the following data to perform GW.
See at subroutines/sugw.f90.

### @MNLA_core.chk 
human readable: core index

### @MNLA_CPHI 
human readable (but program use this):
Eigenfunctions expanded within MT

### hbe.d.chk 
human readable: size file for check

###  __PHIVC
radial functions.

### __MTOindex
MTO index

### __vxcevec*
 Coefficients of eigenfunctions and  eigenvalues for $\langle F_i|H^0|\psi F_j$ in the basis of PMT$\{F_i\}$.

### GEIG,__CPHI,__EValue
GEIG: Coefficients of eigenfunctions. IPW part
CPHI: Coefficients of eigenfunctions. MT  part
EValue: eigenvalue

### PPOVLGG, PPOVLI, PPOVLG, PPOVL0
overlap matrix of IPW.

### __VXCFP
XC term in LDA (only diagonal part). A part of vxcevec
Used at hsfp0 but not essential (only for convenience of presentantion).

## `heftet --job=1`

### EFERMI
The Fermi energy in the tetrahedron method


## hbasfp0 (we have --job=3 for core and --job=0 for valence)
### __BASFP* 
 Product basis functions
### __PPBRD*
 Radial integrals on each MT, symbolically written as  $\int \phi(r) \phi(r) B(r) dr$

## `hvccfp0` 
We call two times one for core, and the other for valence.

### __Vcoud* , __WV.d
the Coulomb matrix (eigenvalues and eigenfunctions of the Coulomb matrix in the expansion of MPB)

## `hx0fp0`
Note that we use a technique to define $W-v$ at ${\bf q}=0$ as an average of the Gamma cell.

### __WV.d
Size of the dielectric function

### __WVR
W-v in the expansion of mixed product basis along the real axis.

### __WVI
W-v in the expansion of mixed product basis along the imag axis.

### freq_r
human readable: energy mesh to accumrate imaginary parts of W-v.


## `hsfp0_sc` (Core exhcange --job=3, valence exchange --job=1, and valence correlation --job=2)
These are moved to SEBK at the end of gwsc iteration cycle.

### SEXcoreU,SEXcore2U :  
core exchange --job=3 . SEXcoreU is diagonal part for human check but not used so much. 
We have *D for down spin (isp=2)as well.
### SEU,SEX2U 
valence exchange --job=1 .       SECU is diagonal part for human check but not used so much. 
### SECU,SEC2U:  
valence correlation --job=2 .     SECU is diagonal part for human check but not used so much. 
### XCU
LDA exchange correlation
## `lqpe`

### QPU, QPD
human readable format. 
decomposion of self-energy for diagonal elements.QPD is for isp=2.

An example of one-shot GW by `gw_lmfh si` (small size calculation in TestInstall) is:
```
...
           q               state  SEx   SExcore SEc    vxc    dSE  dSEnoZ  eLDA    eQP  eQPnoZ   eHF  Z    FWHM=2Z*Simg  ReS(elda)
  0.00000  0.00000  0.00000  1  -16.91  -1.85   6.62 -12.47   0.22   0.33 -12.24 -12.03 -11.92 -18.54 0.66   1.25708    -12.14031
  0.00000  0.00000  0.00000  2  -13.87  -1.96   2.81 -13.61   0.47   0.59  -0.31   0.16   0.28  -2.53 0.80   0.00000    -13.02308
  0.00000  0.00000  0.00000  3  -13.87  -1.96   2.81 -13.61   0.47   0.59  -0.31   0.16   0.28  -2.53 0.80   0.00000    -13.02308
  0.00000  0.00000  0.00000  4  -13.87  -1.96   2.81 -13.61   0.47   0.59  -0.31   0.16   0.28  -2.53 0.80   0.00000    -13.02308
  0.00000  0.00000  0.00000  5   -4.60  -1.41  -4.27 -11.81   1.19   1.52   2.23   3.42   3.75   8.03 0.78  -0.02515    -10.28546
  0.00000  0.00000  0.00000  6   -4.60  -1.41  -4.27 -11.81   1.19   1.52   2.23   3.42   3.75   8.03 0.78  -0.02515    -10.28546
  0.00000  0.00000  0.00000  7   -4.60  -1.41  -4.27 -11.81   1.19   1.52   2.23   3.42   3.75   8.03 0.78  -0.02515    -10.28546
  0.00000  0.00000  0.00000  8   -5.11  -3.79  -5.14 -15.23   0.91   1.20   2.95   3.86   4.14   9.28 0.76  -0.07397    -14.03341

  0.50000  0.00000  0.00000  1  -16.80  -1.91   5.97 -12.64  -0.06  -0.10 -11.18 -11.24 -11.27 -17.25 0.67   0.84187    -12.73584
  0.50000  0.00000  0.00000  2  -13.77  -2.37   2.91 -13.84   0.47   0.60  -3.84  -3.37  -3.24  -6.14 0.78   0.04107    -13.24015
  0.50000  0.00000  0.00000  3  -13.57  -1.74   3.01 -12.76   0.37   0.47  -2.20  -1.84  -1.74  -4.75 0.78   0.00000    -12.29249
  0.50000  0.00000  0.00000  4  -13.57  -1.74   3.01 -12.76   0.37   0.47  -2.20  -1.84  -1.74  -4.75 0.78   0.00000    -12.29249
  0.50000  0.00000  0.00000  5   -4.27  -1.19  -4.08 -10.97   1.17   1.43   0.76   1.92   2.19   6.27 0.81  -0.00000     -9.53378
  0.50000  0.00000  0.00000  6   -3.83  -1.10  -4.38 -10.98   1.33   1.68   2.98   4.31   4.65   9.03 0.79  -0.01203     -9.30307
  0.50000  0.00000  0.00000  7   -4.73  -1.66  -4.56 -12.65   1.34   1.70   5.45   6.79   7.14  11.70 0.79  -0.08743    -10.95431
  0.50000  0.00000  0.00000  8   -4.73  -1.66  -4.56 -12.65   1.34   1.70   5.45   6.79   7.14  11.70 0.79  -0.08743    -10.95431

  1.00000  0.00000  0.00000  1  -15.60  -2.13   4.43 -13.20  -0.08  -0.11  -8.13  -8.21  -8.24 -12.67 0.78   0.61936    -13.30329
  1.00000  0.00000  0.00000  2  -15.60  -2.13   4.43 -13.20  -0.08  -0.11  -8.13  -8.21  -8.24 -12.67 0.78   0.61936    -13.30329
  1.00000  0.00000  0.00000  3  -13.66  -1.70   3.17 -12.58   0.30   0.39  -3.16  -2.86  -2.77  -5.94 0.77   0.07961    -12.19216
  1.00000  0.00000  0.00000  4  -13.66  -1.70   3.17 -12.58   0.30   0.39  -3.16  -2.86  -2.77  -5.94 0.77   0.07961    -12.19216
  1.00000  0.00000  0.00000  5   -3.97  -0.91  -3.95 -10.33   1.22   1.50   0.31   1.53   1.81   5.76 0.81  -0.00000     -8.82976
  1.00000  0.00000  0.00000  6   -3.97  -0.91  -3.95 -10.33   1.22   1.50   0.31   1.53   1.81   5.76 0.81  -0.00000     -8.82976
  1.00000  0.00000  0.00000  7   -3.59  -2.37  -5.91 -13.53   1.20   1.66   9.81  11.01  11.47  17.37 0.72  -0.40499    -11.86796
  1.00000  0.00000  0.00000  8   -3.59  -2.37  -5.91 -13.53   1.20   1.66   9.81  11.01  11.47  17.37 0.72  -0.40499    -11.86796
```
All of the unit of energy is in eV. Detailed value of  eLDA} is in {TOTE.UP}.
For insulators, the Fermi energy is at the middle of band. For metals, one shot GW can be problematic
if we consider the self-consistency of the Fermi energy.

q  : q vector

state:  Band index n for valence.

SEx: $= \langle\Psi_{{\bf k}n}|\Sigma_{\rm x}^{\rm valence}({\bf r},{\bf r}^{\prime})|\Psi_{{\bf k}n}\rangle$

SExcore: $= \langle\Psi_{{\bf k}n}|\Sigma_{\rm x}^{\rm core}({\bf r},{\bf r}^{\prime})|\Psi_{{\bf k}n}\rangle$

SEc: $= \langle\Psi_{{\bf k}n}|\Sigma_{\rm c}^{\rm valence}({\bf r},{\bf r}^{\prime}, \epsilon_n({\bf k})|\Psi_{{\bf k}n}\rangle$

vxc: LDA exchange correlation energy.$\langle \Psi_{{\bf k}n}|V_{\rm xc}^{\rm LDA}([n_{\rm total}],{\bf r})|\Psi_{{\bf k}n}\rangle$

dSE: $=Z_{n{\bf k}}\times$ dSEnoZ

dSEnoZ: $=\langle\Psi_{{\bf k}n}|\Sigma_{\rm x}^{\rm core}({\bf r},{\bf r}^{\prime})+\Sigma_{\rm xc}^{\rm valence}({\bf r},{\bf r}^{\prime},\epsilon_n({\bf k}))|\Psi_{{\bf k}n}\rangle - \langle\Psi_{{\bf k}n}|V_{\rm xc}^{\rm LDA}([n_{\rm total}],{\bf r})|\Psi_{{\bf k}n}\rangle$= SEx + SExcore + SEc - vxc

eLDA: LDA eigenvalues. $\epsilon_n({\bf k})$

eQP: QP energy.  $\epsilon_n({\bf k})$+dSE

eQPnoZ: QP energy without $Z$. $\epsilon_n({\bf k})$+dSEnoZ

eHF: HF energy of 1st iteration. $\epsilon_n({\bf k})$+SEx + SExcore -vxc
Z: Z factor. $Z_{n{\bf k}}$

FWHM=2Z*S_{img}: Quasi-particle life time. $2 Z_{n{\bf k}} \times {\rm Im}\langle\Psi_{{\bf k}n}|\Sigma_{\rm c}^{\rm valence}({\bf r},{\bf r}^{\prime},\epsilon_n({\bf k}))|\Psi_{{\bf k}n}\rangle$  

ReS(elda):${\rm Re} \langle\Psi_{{\bf k}n}|\Sigma_{\rm x}^{\rm core}({\bf r},{\bf r}^{\prime})+\Sigma_{\rm xc}^{\rm valence}({\bf r},{\bf r}^{\prime},\epsilon_n({\bf k}))|\Psi_{{\bf k}n}\rangle$ 

* NOTE: QPU for `gwsc` is a little different. No Z and no life time shown.
  Shown eQP is just the eigenvalues of starting point of lmf. 

### TOTE.UP
numerical detailed values of QPU. TOTE.DN for QPD

In one-shot GW `gw_lmfh`, TOTE.UP contains LDA and QP energies. 
It contains two kind of QP energies {\tt QP QPnoZ}.

### __mixsig
mixing file for sigm.foobar

### sigm
self-energy file in the expansion of eigenfunctions of $H^0$.


# Product basis
The product basis section in GWinput is given as follows. Recall that the product basis is made of the product basis within MT and the interstitial plane waves (IPWs).
From the `<PRODUCT_BASIS>` table, we generate possible product basis of atomic functions within MTs.

Product basis is originally given by F.Aryasetiawan and O.Gunnarsson at
https://journals.aps.org/prb/abstract/10.1103/PhysRevB.49.16214
The mixed product basis https://doi.org/10.1016/S0038-1098(02)00028-5 is the successor of original.
```
<PRODUCT_BASIS> 
  tolerance to remove products due to poor linear-independency
   1d-3 ! =tolopt; larger gives smaller num. of product basis. See lbas and lbasC, which are output of hbasfp0.
  lcutmx(atom) = maximum l-cutoff for the product basis.  =4 is required for atoms with valence d, like Ni Ga
   4  4
  atom   l  nnvv  nnc ! Do not touch. nnvv: num. of radial functions (valence) on the augmentation-waves.  nnc: num. for core.
    1    0    2    3
    1    1    2    2
    1    2    3    0
    1    3    2    0
    1    4    2    0
    2    0    2    3
    2    1    2    2
    2    2    2    1
    2    3    2    0
    2    4    2    0
  atom   l    n  occ unocc  ! Valence(1=yes,0=no) ! You can set 0 or 1 to give the groups 'occ' and 'unocc'
    1    0    1    1    1   ! 4s_phi    -----
    1    0    2    0    0   ! 4s_phidot
    1    1    1    1    1   ! 4p_phi   
    1    1    2    0    0   ! 4p_phidot
    1    2    1    0    1   ! 4d_phi   
    1    2    2    0    0   ! 4d_phidot
    1    2    3    1    0   ! 3d_phiz  
    1    3    1    0    1   ! 4f_phi   
    1    3    2    0    0   ! 4f_phidot
    1    4    1    0    0   ! 5g_phi   
    1    4    2    0    0   ! 5g_phidot
    2    0    1    1    1   ! 4s_phi    -----
    2    0    2    0    0   ! 4s_phidot
    2    1    1    1    1   ! 4p_phi   
    2    1    2    0    0   ! 4p_phidot
    2    2    1    0    1   ! 4d_phi   
    2    2    2    0    0   ! 4d_phidot
    2    3    1    0    1   ! 4f_phi   
    2    3    2    0    0   ! 4f_phidot
    2    4    1    0    0   ! 5g_phi   
    2    4    2    0    0   ! 5g_phidot
  atom   l    n  occ unocc  ForX0 ForSxc ! Core (1=yes, 0=no) <-- Obsolate from here on. But do not change.
    1    0    1    0    0      0    0    ! 1S -----
    1    0    2    0    0      0    0    ! 2S
    1    0    3    0    0      0    0    ! 3S
    1    1    1    0    0      0    0    ! 2P
    1    1    2    0    0      0    0    ! 3P
    2    0    1    0    0      0    0    ! 1S -----
    2    0    2    0    0      0    0    ! 2S
    2    0    3    0    0      0    0    ! 3S
    2    1    1    0    0      0    0    ! 2P
    2    1    2    0    0      0    0    ! 3P
    2    2    1    0    0      0    0    ! 3D
</PRODUCT_BASIS>
```
* `tolerance:` cut off of linear-dependency of product basis. If we like to reduce computational size 1d-2 is a possiblity.`

* `lcutmx`: The integers next to `lcutmx(atom)...`. This is $l$ cutoff for product basis for each atomic sites. The integers give the maximum angular momentum $l$ for the product basis for atomic sites.
In our experience, lcutmx=4 is required when the valence $3d$ electrons exist.
For oxygen 2 is fine. For 4f/5f atoms we need 6. SiteInfo.lmchk shows atom order (SITE order in ctrl file).

* Keep a blocks as it is. 
"  atom   l  nnvv  nnc ..."  shows how many radial functions for cores and valence electrons for each atom and l.
nnvv=2 in the case of $\phi$ and $\dot{\phi}$; nnvv=3 in the case to add the local orbital in addition.

* There are two blocks after the line
`   atom   l    n  occ  unocc  :Valence(1=yes, 0=no)`
and after
`   atom   l    n  occ unocc  ForX0 ForSxc ! Core (1=yes, 0=no)`
These are used to choose atomic functions to construct the product basis.
The product basis are generated from the products of two atomic basis.

* n=1 with the comment `4p_phi` indicates $\phi_{4p}$ (n=1), n=2 with `4p_phidot` for $\dot{\phi}_{4p}$, and n=3 for `3d_phiz` 
with the local orbital $\phi^{\rm local}_{3d}$ (n=3). 

* The switches for columns `occ` and `unocc` can take 0 (not included) or 1 (included). With the switch, we can construct two groups of orbitals, `occ` and `unocc`. With the switches, we see the group `occ`=$\{ \phi_{4s},\phi_{4p},\phi^{\rm local}_{3d} \}$ for atom 1. The group `uocc`=$\{ \phi_{4s},\phi_{4p},\phi_{4d},\phi_{4f} \}$. `occ` and `unocc` roughly corresponds to occupied and unoccupied orbitals. Usually we don't include $\dot{\phi}$ for calcultions to have smaller numner of product basis. But it should be better to be included.
Then any product of combinations `occ` $\times$ `unocc` = $\{ \phi_{4s},\phi_{4p},\phi^{\rm local}_{3d} \} \times \{ \phi_{4s},\phi_{4p},\phi_{4d},\phi_{4f} \}$ are included as for the basis of the product basis. But we reduce the number of products with the linear dependency. We have to consider not only the product of radial parts, but also synthesis of $Y_{lm} \times Y_{l'm'}$.

* Last section is obsolate. Each line of the last section are
    ```
      atom   l    n  occ unocc   ForX0 ForSxc :CoreState(1=yes, 0=no)
        1    2    1    A    x      B    C
    ```
    We generally set A=B=C=0.
    This setting was for the concept of CORE1 and CORE2 in EQ.35 in 2007 paper.
    In our recent calculations, we do not use CORE2.Thus these lines are osbolate (keep them as they are).

# Maximally localized Wannier with effective interaction in CRPA.
We can generate Wannier functions in the manner of Wannier90 by the script `genMLWF`. 
It automatically performs cRPA calculation (formulation given by Juelich group) successively.
`genMLWF` is the script to generate the Wanneir functions.
In addition, it gives effective interaction $\langle ij|W|kl \rangle$ in CRPA.

Required setting is written in the GWinput.
We have examples in `ecalj/Samples/MLWF_samples` which contains `CuMLWFs, Cu, Fe, NiOMLWF, SrVO3` but some may be missing.

## Run a sample at Samples/MLWF_samples/CuMLWFs
See ./job file. Run this or run one by one as follows.
At firts, run self-consistent calculation as
```
lmfa cu
mpirun -np 8 lmf cu
job_band cu -np 8
```
(it is possible to start from QSGW results).
Then we run main script of maxloc wannier with effective interaction W as
```
genMLWF -np 8 cu
```

* The setting needed for the Wannir is 1. Orbital setting and window settings. These are
    ```
    <Worb> Site
    1 Cu 5 6 7 8 9
    </Worb>
    wan_out_emin -10  !eV relative to Efermi
    wan_out_emax -1   !eV relative to Efermi
    ```
    for Cu 3d. For the sample of NiO, we set 
    ```
    <Worb> Site
    1 Niup   5 6 7 8 9
    2 Nidn   5 6 7 8 9
    !  3 O   1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
    !  4 O   1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
    </Worb>
    wan_out_emin -4    !eV relative to Efermi
    wan_out_emax  2    !eV relative to Efermi
    ```
    Here we specify seed funcitons for which we have Wannier functions. This specify we tread $3d$ bands for Ni.
    We can set inner window as well if we set
    ```
    wan_in_ewin on
    wan_in_emin  -4  !eV relative to Efermi
    wan_in_emax   0  !eV relative to Efermi
    ```

   * Wannier is generated at echo 2|hmaxloc >lmaxloc2 (look into genMLWF).
   At this point, you can make band plot to check whether your setting for
   Wannier work well or not; the model-Hilbert space by band plot.
   (we need syml.* file and run job_band to get original energy bands)
   Then plot wannier band on top of it. See Samples/MLWF_samples/CuMLWFs/bandplot.MLWF.isp1.glt as an example.
   If the plot is strange, you need to choose outer and inner windows for Wannier.                                                           
   (Repeat echo 2| hmaxloc >lmaxloc2 until you have satisfactry fitting with changing the setting wannier part in GWinput ).

## output    
* Look into CuMLWFs/bandplot.MLWF.cu.glt
    This is for interpolated band.
    A line "bnds.maxloc.up" u ($5):($6+de) lt 3 w l ti "Wannier" is added to usual output of
    bandplot.cu.isp* given by job_band.

>xxx(2) Plot psi.xsf file. xxx 
xxx Not working xxx I currently surpress wanplot, which plots MaxLoc Wannier functions in real space
xxx So vis_* options for plot in GWinput is not working. 

* We get three files (see genMLWF) containing v and W-v information.
        ```
        grep "Wannier" lwmatK1 > Coulomb_v
        grep "Wannier" lwmatK2 > Screening_W-v
        grep "Wannier" lwmatK3 > Screening_W-v_crpa
        ```
    These are text files <ab|W|cd> element. a,b,c,d are index of Wannier functions (ask us if necessary).
    Then we have Static_W.dat (RPA) and Static_U.dat (cRPA). These contains static U, U', J, and J' (\omega = 0). 
    For example, 
    ```
    grep '    1    1    1    1    1'             Coulmb_v
    grep '    1    1    1    1    1    0.000000' Screening_W-v.UP
    grep '    1    1    1    1    1    0.000000' Screening_W-v.crpa
    ```
    shows
    ```
    Coulomb_v.UP:          Wannier ...  23.499183   -0.000000
    Screening_W-v.UP:      Wannier ... -20.317956   -0.000000
    Screening_W-v_crpa.UP: Wannier ... -20.188076   -0.000000
    ```
    This means
    ```
    <11|W|11>     =23.499183-20.317956
    <11|U_CRPA|11>=23.499183-20.188076
    ```
    Note that this is by the test example CuMLWFs, not so reliable numerically.

* With the command `grep Wan lwmatK*`, we can see (This case : Cu cases). Then compare these with Result.grepWanlwmatK
   These are onsite effective interactions (diagonal part only shown).
    ```
    lwmatK1:  Wannier    1    1   24.644475    0.000000 eV
    lwmatK1:  Wannier    1    2   24.644576    0.000000 eV
    lwmatK1:  Wannier    1    3   25.471361    0.000000 eV
    lwmatK1:  Wannier    1    4   24.644575    0.000000 eV
    lwmatK1:  Wannier    1    5   25.470946    0.000000 eV
    lwmatK2:  Wannier    1    1    0.000000 eV   -21.263759   -0.000000 eV
    lwmatK2:  Wannier    1    2    0.000000 eV   -21.263839    0.000000 eV
    lwmatK2:  Wannier    1    3    0.000000 eV   -21.931033   -0.000000 eV
    lwmatK2:  Wannier    1    4    0.000000 eV   -21.263839   -0.000000 eV
    lwmatK2:  Wannier    1    5    0.000000 eV   -21.930702   -0.000000 eV
    ```
    These are the diagonal elements $\langle ii|v,W-v|ii \rangle$, where $i=1,..5$ corresponding to the $3d$ orbitals (real harmonics).

Some additional info in README_wannier.md
Time consuming part (and also the advantage) is for effective interaction in RPA.
Look into the shell script genMLWF; you can skip last part if you don't need the effective interaction.

<!-- In addition, we have some settings (energy windows and so on).
This is the example of the initial conditions for Cu case. 
5 is the number of Wannier function. The most left one means $\phi$ index and the right one of it is $\dot\phi$ index. They are written in the {\bf @MNLA\_CPHI} file.

Then we can run \exe{genMLWF}. 
After it finished, we can analyze it results.
(if you don't need Wannier funciton plot, 
You can skip a line of wanplot in genMLWF. Then we  don't need to set
\verb+vis_wan_*+ options.) -->


# MEMO
These documents should 
* [ecaljnote](./ecaljnote.pdf) contains old memo. This should be revised. MaxLocWannier, local orbital, dielectric functions.
* [ecaljdetails](../ecaljdetails/ecaljdetails.pdf) Details of ecalj algorithm. This should be revised.
* We need to explain how to set Gamma-cell averaged $\tilde{W}({\bf q}=0,\omega)$.
