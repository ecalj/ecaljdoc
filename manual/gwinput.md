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
