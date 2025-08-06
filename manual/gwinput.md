# `GWinput`

GWinput sets the computatioanl conditions for  GW/QSGW calculations.

## mkGWinputによる自動生成
- GWinput は 自動生成することができ、殆どのパラメータはデフォルト設定で使用できる。

自動生成コマンド
```bash
mkGWinput $target 
```
> [!INFO]
> mkGWinput は`python` スクリプトだが内部でecalj packageに含まれている実行ファイルを実行する。
> そのため `~/bin` ディレクトリ(ecalj package のバイナリinstall ディレクトリ)へのPATHが通っている必要がある。

これにより `GWinput.tmp` が生成される。

```bash
cp GWinput.tmp GWinput
```
とし, `GWinput` を用意する。


## Format
- !で開始する行はコメント
- keyword  value(s) の形式であり記載順序は問わないが, 同じkeywordを複数記述しないようにする

## Parameters
生成されたGWinputに, パラメータの意味は記載されていますが, 以下に重要な変数と記載がない変数について記述します。

### `n1n2n3`
$GW$自己エネルギー計算におけるk点の数。`ctrl` file に記載するk点とは異なる点を指定できる。 計算コストは, このk点数の2乗に比例することに注意。
- **type** : integer list

We set number of k points for self-energy in GWinput. These can be 1/2 or 2/3 of k points specified in ctrl, in order to reduce computational time.
The 6x6x6 k points is feasible setting for ZB structure (2 atoms per cell). That is, 6x6x6x2 =432 \sim `k points \times atom number`.
For example, when we try 8 atoms per cell, 4x4x4 or 3x3x3
is fine because 4x4x4x8 \sim 400.
For metallic systems, larger is fine, but limited by computational
time. See takao kotani's papers, for example, https://doi.org/10.1103/PhysRevB.93.075125
Good news is that we don't need to use so many k points as in ctrl.
In cases, 4x4x4 for ZB is not so bad --- roughly speaking, this is a low limit for
publication. This means 3x3x3x8 (for 8 atom case) is not so bad. (3x3x3x8 > 4x4x4x2).
See our examinations shown in  https://doi.org/10.7566/JPSJ.83.094711 and
http://doi.org/10.7567/JJAP.55.051201

### `KeepEigen`  
波動関数をメモリに保持するかどうか。波動関数は`CPHI` および`GEIG`というファイルで出力される。それらが1MPIが使用できるメモリに対して, 同等もしくはそれ以上である場合は必ず`.false.`にする。 $k$点や軌道数が多い場合は`.false.`にする。
- **type**: boolean
- **default**: .true.

### `MEMnmbatch`
バッチサイズ:単位GB。1MPIが使用できるメモリサイズの3分の1から4分の1程度を記載すると良い。`zmel_max_size` とほぼ同様な意味をもつ。自己エネルギーの計算で使用される。大規模系では大きい方が計算は早くなるが，メモリ不足で計算が落ちる場合は小さくする。
- **type** : float
- **default** : 2.0
系に対して値が小さいと"sxcf_fal2_count.sc. Too small memory for nmbatch mechanism. Enlarge GWinput MEMnmbatch" との出力が`stdout.xxxx.hsfp0_sc.mode.yyy`に出力され計算が終了する場合がある。その場合は大きくする。

### `zmel_max_size`
バッチサイズ:単位GB。1MPIが使用できるメモリサイズの3分の1から4分の1程度を記載すると良い。 `MEMnmbatch` とほぼ同様な意味をもつが, $W$の計算で使用される。大規模系では大きい方が計算は早くなるが，メモリ不足で計算が落ちる場合は小さくする。
- **type** : float
- **default** : 1.0

### `KeepPpb`
MT内の積基底とMT内波動関数基底の行列要素(`ppb`変数)をメモリに保持するかどうか。通常はデフォルト値`.true.`で良いが, 使用メモリ量を軽減させたいときに`.false.`とする。
- **type**: boolean
- **default**: .true.

### `GaussianFilterX0`
密度応答関数の計算に用いられる振動数におけるスメアリングパラメータ: 単位 a.u.$^2$ (Hartree$^2$)。QSGW計算が不安定な場合(固有値が振動するなど)の際に用いる。
- **type**: float
- **default** : 0
- **examples**: GaussianFilterX0 0.0001

### `QpGcut_psi`
波動関数の平面波基底のカットオフエネルギー: 単位 Ryd。 `lmf`計算で用いるPMT手法とは波動関数の基底関数が異なることに注意。原子間領域の波動関数は全て平面波で記述される。
- **type**: float
- **default** : 4.0

### `QpGcut_cou`
積基底の平面波部分のカットオフエネルギー: 単位 Ryd
- **type**: float
- **default** : 3.0

### `emax_sigm`
フェルミ準位から測った, 計算する準粒子状態の自己エネルギーの最大値: 単位 Ryd。QSGW計算では自己エネルギーはポテンシャル構築に使用されるため小さくするとポテンシャルの精度も下がる。
- **type**: float
- **default** : 3.0

## `High resolution energy mesh near Ef for metal` 
For metal, it may be better to set
```
HistBin_dw    1d-5 ! 1d-5 is fine mesh (good for metal?) !(a.u.) BinWidth along real axis at omega=0.
HistBin_ratio 1.03 ! 1.03 maybe safer. frhis(iw)= b*(exp(a*(iw-1))-1), where a=ratio-1.0 and dw=b*a
```

## `Smaller lcutmx to reduce computatinal time`
  To reduce the computational time, we reduce number of MPB (mixed product basis).
  One is lcutoff of Product Basis (PB) within MT. Use lcutmx=2 for oxygen or something (s,p block atoms). 
  Thus it  is like
  ```
  lcutmx(atom) = maximum l-cutoff for the product basis.  =4 is required for atoms with valence d, like N
   4 4 4 2 2 2 
```
in the section of GWinput. 
* NOTE: we know that lcutmx =6 is requied for 4f systems. 


## `Smaller IPW related part to reduce computational time`
To reduce compuational time, we may reduce MPB coming from IPS, reduce the size of IPW for psi, reduce emax_sigm and pwemax as follows.
   + QpGcut_cou is fort the Interstitial plane wave (IPW) for MPB. 
   + QpGcut_psi is for expantion of eigenfunctions.
   + emax_sigm is the upper cutoff (relative to the Fermi energy) to calculate self energy.
   + pwemax (in ctrl) is the APW basis cutoff for the eigenfunciton.

To reduce computational time, we may use
```
   QpGcut_psi 3.0
   QpGcut_cou 2.5
   emax_sigm 2.0
```
In addition, we use
```
   pwemax=2 (in ctrl file).
```
   We sometimes use this setting. It is better to check how the numerical
   results are affected. 
