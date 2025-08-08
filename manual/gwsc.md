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
GW計算ではDFT計算(`lmf`)で得られた波動関数を`lmf`とは異なる基底関数で展開しなおす。再展開後の波動関数についての規格直交化をスキップする場合に指定する。
通常は指定する必要はないが、`lmf --jobgw=1`計算が遅い場合には指定することによって計算の高速化が期待される。
* ecaljでは有限のqで誘電関数が計算できるーこのとき分母分子のキャンセレーションが起こるため、波動関数の直行性が正確である必要があり、そのときには--skipGSを使うべきでない。

#### `--normcheck`
`lmf --jobgw=1` で使用される。 GW計算で使用される波動関数の規格直交性を確認したいときに使用する。

### `--ntqxx`
This fix the number of bands to calculate self energy at the first iteration for each $\bf q$ point in the IBZ.
In principle, the number is determined by

## Cautions
* QPU.[number]runをチェックして、number回のQSGWイテレーションが終了している、と認識する。
(初期状態から実行したいときはすべての`*run*`ディレクトリ、ファイルを消すこと）。

* QSGW.[number]runディレクトリには、QSGWのnumber回目の結果rst,sigm(加えてatmpnu,ctrl,GWinput)が格納されており、これを用いてバンドプロットなどができる。


