# ecalj tutorial 

Here are minimum GetStated to obtain QSGW band plot.

[Qiita Japanese](https://qiita.com/takaokotani/items/9bdf5f1551000771dc48)

[Qiita English](https://qiita.com/takaokotani/items/4cd5e13f2e2c4b534b3f)


<!-- 
## 基礎知識check 
* LDA計算の流れ
* MT division of space
* 基底関数 MTOとAPW　（AugmentationとMT内の原子的な波動関数). 3つの成分をもつ。envelope + true - counter
* バンド計算法PMT=LMTO+LAPW法. ３つの成分で電荷も表現する。MTOの張る空間の不満足な部分を3Ry以下程度のAPWでサポートする。
* 独立粒子近似とは
* Hartree-Fock(HF)近似で水素Hがきちんと解ける。一様ガスではフェルミ面で状態密度がゼロになる。
* LDAでは一様ガスがきちんと解けるがHのバンドギャップはかなり小さい。
* LDAとHFは両極にある。HFではSiのバンドギャップは10eV以上（なぜか？）　ハイブリッド法HSE。自己相互作用。
* 交換項の重要性。H2のbonging-antibondingを区別するには、占有状態へのプロジェクタの役割をするFock項が重要
* GW近似. Fock項にくわえて相関項。分極媒質中を走る荷電粒子の感じる時間依存ポテンシャル。スクリーンHF+クーロンホール
　バンドギャップ、dバンドの位置、Uの効果
* QSGW法。GW近似における自己エネルギーからいくらか強引に時間依存性をとりのぞいて特殊な交換相関項をつくる。
* （できたら線形応答理論の基礎、ステップ関数のフーリエ変換、古典的な減衰振動系でのグリーン関数（線形応答関数）。）

## ecalj 何ができるか？

* LDA計算 
VWN,PBE-GGA,LDA+Uがえらべる。
構造緩和（格子変化は手動）、Colinear,  SOC(軸を選べる）, AFの対称性を入れることができる。
ESM法でのスラブ計算. 最適化しきれてないので現状では構造緩和などでは優位性がない。

* QSGW計算：
self-consistent GW法。特殊な交換相関項を作る計算であるといえる。
自己エネルギースペクトルプロット。
インパクトイオン化率（オージェによる寿命）。
GPU化、自動化セッテイング。
GW法でのバンドプロットが直接に可能。
QSGWでは現状全エネルギー計算ができない。バンド構造（固有値、波動関数）のみ。
* 線形応答などの計算。
RPAでの誘電率計算、スピンゆらぎ計算 （改良の余地。金属でもできる。ドルーデウエイト(q→0）
MaxlocWannier(内蔵している）、MLO（新しいモデル化法：まだ余地あり）。 自動化がすこしできてないところがある。
その他の物理量についても応用できるはず。
* かなりの部分で自動計算が可能。QSGW法ではMaterial Projectから1500個程度の構造ファイルを持ってきて自動化でQSGW計算しているが
ほぼ問題なく可能。個別にセッティングを手動でいじらなくても良い（4f,5fについては自動化がまだ設定できてないが基本的に可能）
バンドプロットも対称ラインも含め自動化してある。データはgnuplotなどでプロットするので読みやすい。結晶構造についてはPOSCARとの相互コンバータあり。
複数のPOSCARを一括計算するecalj_autoも梱包してある（整備中）。 -->


## Minimum flowchart to perform QSGW in ecalj.

### 1. Get ctrls from POSCAR
ctrls.foobar is the structure file in ecalj.
We obtain ctrls from POSCAR by a converter.

We already have POSCAR in ecalj/ecalj_auto/INPUT/testSGA/POSCARALL as
```bash
cd ecalj
mkdir TEST
cd TEST
mkdir test1
mkdir test2
cat ecalj_auto/INPUT/testSGA/joblist.bk
cp ../ecalj_auto/INPUT/testSGA/POSCARALL/POSCAR.mp-2534 test1
cp ../ecalj_auto/INPUT/testSGA/POSCARALL/POSCAR.mp-8062 test2
```
Then we convert POSCAR  by vasp2ctrl. If you have cif, you need to convert the cif to POSCAR at firlst.
```
vasp2ctrl POSCAR.mp-2534 
mv ctrls.POSCAR.mp-2534.vasp2ctrl ctrls.POSCAR.mp-2534
cat ctrls.mp-2534
```
ctrls.mp-2534 contains crystal structure equivalent to POSCAR:
```
cat ctrls.mp-2534 
STRUC
     ALAT=1.8897268777743552
     PLAT=       3.52125300000       0.00000000000       2.03299700000  
                 1.17375100000       3.31986900000       2.03299700000 
                 0.00000000000       0.00000000000       4.06599300000 
  NBAS=2
SITE
     ATOM=Ga POS=     0.00000000000       0.00000000000       0.00000000000 
     ATOM=As POS=     1.17375100000       0.82996725000       2.03299675000 
```
- MEMO: 
    - ctrl2vasp ctrl.mp-2534 can convert back to VASP file. Check this by VESTA. We can use viewvesta (convert and invoke VESTA).
    - many unused files are generated (forget them).

### 2. Get ctrl from ctrls
ctrl is a basis input file for ecalj. We generate template of ctrl  by ctrlgenM1.py.
Minimum explanations are embedded in the generated ctrl file.
Number of k points (nk1 nk2 nk3), APW cutoff (pwemax), nspin, so(spin orbit switch) are only what we need to tweak usually.

When we run lmf, we can add command line option such as -vnspin=2. Then const foobar=1 defined in the ctrl file is overridden (referred with {foobar}). save.* file show which -vfoobar you used.

It is possible to enforce symmetry, antiferro symmetry.
<!-- ctrlgenM1.pyの内部ではlmfa,lmchk(原子球サイズ決定）などを呼んでいる。
これ以後の計算にはctrl.foobarのみ残しておけば良い（ムダファイルが大量にできているのは消して良い）.  -->
We only need ctrl file in the following calculations (while some tmp* kinds of files are generated).

```bash
ctrlgenM1.py mp-2534
cp ctrlgenM1.ctrl.mp-2534 ctrl.mp-2534
```
- importand settings in ctrl
  * nk1,nk2,nk3 
  * xcfun
  * ssig 
  * pwemax
  * gmax
  * so
  * socaxis

[Here is a list of ctrl file](./lmf_input.md).

### 3. LDA計算
Run lmfa at first. It is for spherical atomic electron density. It ends instantaneously.
If you run `lmfa foobar|grep conf`, we can see electronic configulation. No side effects if you repeat lmfa. 

```bash
lmfa ctrl.mp-2534
```
gives spherical atom calculation for initialization. No side effects to repeat.

>lmfa ctrl.mp-2534 |grep conf
show atomic configuration (not necessary).

Files:
>save.*  : computational history. DFT total energy is shown at each iteration (See lmf next).
atmpnu* : ratial derivative file. Used at lmf
atm.*   : atom potential    Used at lmf (only init)
ves* : obsolate
log* : just for debug log

Main part calculation:
```bash
mpirun -np 8 lmf mp-2534 |tee llmf 
```
* mp-2534 gives 5.75 \AA for GaAs, while the experimental value is 5.65\AA
* llmf contains iteration log. band eigenvalue, and so on. Check band gap.
* rst.mp-2534 is generated. Self-consistent charge included.
* You can change lattice constant as ALAT=1.8897268777743552*5.65/5.75 in ctrl file. simple math can be possible in ctrl 
* Note: ctrlp is intermediate file generated by python from ctrl. Fortran calls a python code internally.
* check save.mp-2534. Show history of lmfa and lmf. one line per iteration. Show your console options. c,x,i,h 
LDA energy shown two values need to be the same (but slight difference).
Repeat lmf stops with two iteration.

 - SiteInfo.lmchk : Site infor
 - PlatQlat.chk : Lattice info
 - estaticpot.dat : electrostatic potential of smooth part.

### 4. job_pdos,job_tdos, job_fermisurface,job_band 
For band plot, we use job_band. Before this, we need to generate symmetry lines writtenin [syml.foobar](syml.md)。This can be generated  by getsyml foobar.

```
getsyml mp-2534
```
This generates syml.mp-2534.
[BZ.html](https://ecalj.sakura.ne.jp/BZgetsyml/) contains BZ and symmetry lines.
For bandplot,
```
job_band mp-2534 -np 8 [options]
```
At the end of job_band, you can add options for lmf as -vso=1 -vnspin=2.
(these are for SOC as perturbation)
We use gnuplot for band plot bandplot.isp1.glt.

In the similar manner, we can run job_pdos, job_tdos, job_fermisurface.

### 5. QSGW calcualtion

We need one additional input file GWinput, whose template can be ganerated by
mkGWinputで[GWinput](./gwinput.md) as
```
mkGWinput ctrl.mp-2534
```
The edit GWimput.tmp to GWinput.
n1n2n3 should be something smaller thatn nk1 nk2 nk3 in ctrl file.
If 6x6x6 for Si, it is reasobale. Except k points, not need to modify so much
(ask us).

#### QSGW計算の流れ
We can run QSGW calculation with gwsc. For semiconductors, several iterations are fine.QPU file contains diagonal components of GW calculations.
Note that our Mixed Produce basis is a key technology for the GW calculation.
```
gwsc -np NP [--phispinsym] [--gpu] [--mp] nloop extension
```
(--phispinsym is for magnetic materials to keep the same basis for up and down)


Then console outputs of gwsc is somthing like
```
### START gwsc: ITERADD= 1, MPI size=  4, 4 TARGET= si
===== Ititial band structure ====== 
---> No sigm. LDA caculation for eigenfunctions 
0:00:00.226245   mpirun -np 1 /home/takao/ecalj/SRC/TestInstall/bin/lmfa si     >llmfa
0:00:00.807062   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/lmf  si     >llmf_lda
===== QSGW iteration start iter 1 ===
0:00:03.071054   mpirun -np 1 /home/takao/ecalj/SRC/TestInstall/bin/lmf si     --jobgw=0 >llmfgw00
0:00:03.904403   mpirun -np 1 /home/takao/ecalj/SRC/TestInstall/bin/qg4gw    --job=1 > lqg4gw
0:00:04.431022   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/lmf si     --jobgw=1 >llmfgw01
0:00:05.918216   mpirun -np 1 /home/takao/ecalj/SRC/TestInstall/bin/heftet --job=1    > leftet
0:00:06.444439   mpirun -np 1 /home/takao/ecalj/SRC/TestInstall/bin/hbasfp0 --job=3    >lbasC
0:00:07.064558   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hvccfp0 --job=3    > lvccC
0:00:07.812283   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hsfp0_sc --job=3    >lsxC
0:00:08.545956   mpirun -np 1 /home/takao/ecalj/SRC/TestInstall/bin/hbasfp0 --job=0    > lbas
0:00:09.156775   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hvccfp0 --job=0    > lvcc
0:00:09.884064   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hsfp0_sc --job=1    >lsx
0:00:10.644292   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hrcxq   > lrcxq
0:00:11.482931   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/hsfp0_sc --job=2    > lsc
0:00:12.460776   mpirun -np 1 /home/takao/ecalj/SRC/TestInstall/bin/hqpe_sc    > lqpe
0:00:13.019735   mpirun -np 4 /home/takao/ecalj/SRC/TestInstall/bin/lmf si     >llmf
===== QSGW iteration end   iter 1 ===
OK! ==== All calclation finished for  gwsc ====
 Comparison OK! max(abs(QPU-QPU))= 0.005000000000002558  <etol= 0.011 for QPU
 Comparison OK!  MaxDiff= 0.00019999999999997797 < tol= 0.003  for  log.si
=== EndOf si_gwsc  at  /home/takao/ecalj/SRC/TestInstall/work/si_gwsc
```
... 

The log files of console outputs are staring from l. C at the ends means Core-releated parts. lsxC is the exchange self-energy due to cores.
lsx is for exchange. lsc is correlation. lvcc is for Coulomb matrix。
In this calculation we run `gwsc -np 8 1 si`, where 1 is the number of QSGW iteration.

If you repeat gwsc, you can add  additional QSGW iterations added to your previous calculations.

#### How to start over calcualtions
Remove mix* rst* (mix* is mixing files)
If MT changes, start over from lmfa (remove atm* files)

- As long as converged, no problem. 
- If you have 3d spagetti bands at Ef, need caution.

### 6. Dielectric function, ESM, spin fluctuation, life time of QP, Wannier method,...
Ask us.


### 7.lmchk 
lmchk mp-2534
is to check the crystal symmetry. In addition determine MT radius. and Check the ovarlap of MTs. Defaults setting is with -3% overlap.(no overlap).

  - symmetry 
  - MT overlap
If you have less symmetry rather than than the symmetry of lattice for magnetic systems,
you have to set crystal symmetry by hand.
This can be done by adding space group symmetry generator to SYMGRP (instead of find).
We need to pay attention for this point in the case of SOC.

## memo
### band plot with spin orbit coupling.
method 1: only band plot
```bash
job_band mp-2534 -np 8 -vso=1 -vnspin=2: band plot only
```
Caution: when you set nspin=2, rst is twiced. No way to move it back to rst for nspin=1.

method 2. single iteration and SO=1
```bash
mpirun -np 8 lmf -vso=1 -vnspin=2 -vnit=1
```
job_band mp-2534 -np 8 : band plot only

method 3. full iteration SO=1
```bash
mpirun -np 8 lmf -vso=1 -vnspin=2 -vnit=1
```
job_band mp-2534 -np 8 : band plot only

Caution: when you set nspin=2, rst is twiced. No way to move it back to rst for nspin=1.


### ecalj/Samples/MgO_PROCAR
This is a sample of fat band. Run job_procarを実行する。You will have eps file.
