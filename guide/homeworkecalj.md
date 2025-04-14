<!-- 
Content-Type: text/markdown; charset=UTF-8
-->
# ISSP での宿題計算

## kuguiでの宿題
#### １．kuguiにログイン。
#### ２．miseを用いてpythonとツールをインストール
https://github.com/tkotani/ecalj/blob/ISSPkugui/README_ISSP.md
を見てください。小幡くんがセットアップしてくれたのでコピーして
貼り付けていけばできます。
#### 3.ecaljのインストールとテスト
```
git clone -b ISSPkugui https://github.com/tkotani/ecalj.git

```
このコマンドでecaljのISSPkuguiにカスタマイズしたバージョンが取れます。
```
cd ecalj
```
そのあとインストール＋テストのコマンドを打ちます。コンソールで
```
FC=nvfortran ./InstallAll --gpu
```
です。これを実行すると、コンパイルのあとテスト計算が進んでいく。--gpuが必要。
あるいはjobinstall_kugui.shをqsubしてください(こちらがいいのかもしれない)。
InstallAllは$HOME/binを作りそこへecaljのバイナリやスクリプトのコピーを行います。
困る場合は現在のコピーのバックアップをとったうえでecaljに上書きさせる、
というのでもいいかもしれないです。あるいはInstallAllの中でbinを検索し書き直してください。
そしてそこにパスを通しておく必要があります。
テストはOKを出しながら進んでいきます
[エラーっぽいメッセージをだすのですが気にしないでいいです.](https://github.com/tkotani/ecalj/blob/ISSPkugui/README_ISSP.md#about-warning-output)
最後は
```text
PASSED! ni_crpa/Screening_W-v_crpa.h
PASSED! srvo3_crpa/Screening_W-v.h
PASSED! srvo3_crpa/Screening_W-v_crpa.h
OK! ALL PASSED ===
   See work/summary.txt
Elapsed time for make        : 51 seconds
Elapsed time for testecalj.py: 409 seconds
```
という感じで終了します。これでインストールとテスト完了です。合計１０分ぐらいです。
これができたら次に進んでください。

#### 4.GPU計算テスト
ecalj/Samples_ISSP/inas2gasb2
に移動して、
```
qsub job_kugui.sh
```
を実行。cat lgwscしてみて
```
===== QSGW iteration end   iter 2 ===
OK! ==== All calclation finished for  gwsc ====
```
で終了していればOKです。

## ohtakaでの宿題
ほぼ同様です。ただし
３のecaljのインストールとテストにおいてはISSPohtakaブランチを
```
git clone -b ISSPohtaka https://github.com/tkotani/ecalj.git
```
で取得してください。またインストールは
jobinstall_ohtaka.shを `sbatch` してください。
コンソールでのFC=ifort ./InstallAllはシステム的に動かないようです。
でおこなってください。３．の段階でその最後がOK! ALL PASSED！が見れないならインストールできてないです。

それを確認後、計算テストは
ecalj/Samples_ISSP/inas2gasb2
にて
```
sbatch job_ohtaka.sh
```
を行ってください。

## ISSPシステムでのカスタマイズについて
インストールに問題がないようにカスタマイズブランチを小幡くんが用意してくれたの簡単になっています。
その変更点は
https://ecalj.github.io/ecaljdoc/guide/server_config
に書いてくれています。
たとえばぼくのubuntuなら
`FC=gfortran ./InstallAll`, 他の一般的なシステムなら`FC=ifort ./InstallAll`
でインストールできる、ということにはしています。
いずれはもうちょっと統一的なブランチにします。

