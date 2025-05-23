# `gwsc`

QSGW計算実行スクリプト
QSGW計算は，複数の実行ファイルを組み合せて実行される．

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
追加オプションは, 全ての実行ファイルの実行時引数となる．

#### `--keepwv`
`--gpu` を指定した場合に自動で付け加わる．
自己エネルギー(相関部分)を計算する際に, 遮蔽クーロン相互作用の行列要素をメモリ上に保持する．
GPU計算ではファイルIO, データ転送が特に律速になるが, それを回避するため．ただし十分なGPUおよびCPUメモリが必要となる．

#### `--tetwtk`
指定すると, 分極関数を計算する際に, 結合状態間の四面体重みをメモリ上に保持しない．$k$点が多い計算でメモリ不足になる場合に使用する．
