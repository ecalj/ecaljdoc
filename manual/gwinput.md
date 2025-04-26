# `GWinput`

GWinput は GW/QSGW 計算での計算条件を記述する

## 自動生成
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

### `KeepEigen`  
波動関数をメモリに保持するかどうか。波動関数は`CPHI` および`GEIG`というファイルで出力される。それらが1MPIが使用できるメモリに対して, 同等もしくはそれ以上である場合は必ず`.false.`にする。 $k$点や軌道数が多い場合は`.false.`にする。
- **type**: boolean
- **default**: .true.

### `MEMnmbatch`
バッチサイズ:単位GB。1MPIが使用できるメモリサイズの3分の1から4分の1程度を記載すると良い。`zmel_max_size` とほぼ同様な意味をもつ。自己エネルギーの計算で使用される。大規模系では大きい方が計算は早くなるが，メモリ不足で計算が落ちる場合は小さくする。
- **type** : float
- **default** : 2.0

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
