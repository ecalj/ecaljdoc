# `gwsc`

QSGW計算実行スクリプト

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
