# kBT — 有限温度の自己エネルギー計算 (`tetrakbt` / `t_sigmakbt`)

ecalj branch `t_sigmakbt` / 2026-06

金属の QSGW が反復ごとに振動して収束しないことがある。原因は Fermi 面の
鋭い応答で、**電子温度を入れて Fermi 面を物理的に広げる**のがここで述べる方法である。

$W$ 側($\chi_0$)と $\Sigma$ 側($G$)にそれぞれ別のキーがあり、
**両方を同じ温度にして使う**のが本来の形である。

| キー | どこに効くか | 実装 |
|---|---|---|
| `tetrakbt` + `t_tetrakbt` | $\chi_0$ の占有数(→ $W$) | `main` |
| `t_sigmakbt` | $\Sigma_x=Gv$、$\Sigma_c=G(W-v)$ の占有数 | branch `t_sigmakbt` |

---

## 1. なぜ要るか

金属の QSGW は、k メッシュが Fermi 面の鋭い応答(ネスティング)を解像すると
反復ごとに振動しうる。テトラヘドロン法は Fermi 面を「厳密に」標本化するので
$W$ に鋭い小 $q$ 構造が立ち、$\Sigma$ が毎反復の Fermi 面のずれに強く反応する。

**電子温度で Fermi 面を広げるのが根本的な正則化**である。
$\mathrm{Im}\,\chi_0$ を $\omega$ 方向に平滑化する `SmearX0` は症状だけを扱う
対症療法で、こちらとは別物である。

実測では LiTi₂O₄(金属スピネル)で、**$6^3$ と $9^3$ のメッシュ依存が消え**、
QSGW が安定した。

---

## 2. $\chi_0$ 側 — `tetrakbt`

`ctrlg.<sname>.toml` の `[gw]`:

```toml
[gw]
tetrakbt   = true     # chi0 を有限温度テトラヘドロンで (method B')
t_tetrakbt = 2000.0   # 電子温度 (K)。kBT[eV] ~ T/11604
```

何が起きるか:

- $\chi_0$ の占有因子が温度 $T$ の Fermi 分布になる
  (`tetwt5` / `lindtet6_kbt`、エネルギー畳み込みの method B'。$T\to0$ で厳密に元へ戻る)
- `heftet`(GW フローの `imode=1`)が**有限温度の Fermi 準位を二分法で解き
  `EFERMI_kbt` に書く**。$\chi_0$ のテトラヘドロンがそれを読むので、
  占有数と $E_F$ が同じ温度を指す

出力での確認:

```
tetrakbt_init: T[K], kbt[Ry], kbt[eV]  2000  0.12667E-01 0.17234E+00
```

---

## 3. $\Sigma$ 側 — `t_sigmakbt`

`tetrakbt` だけでは **$\Sigma$ は $T=0$ のまま**である($G$ の極は Gaussian の
`esmr` で平滑化され、Fermi 準位も $T=0$ のもの)。`t_sigmakbt` はそこを揃える。

```toml
[gw]
tetrakbt   = true
t_tetrakbt = 2000.0
t_sigmakbt = 2000.0   # Sigma 側の電子温度 (K)。0 (既定) で従来どおり
```

**`t_sigmakbt == t_tetrakbt` にすること。** そうして初めて $\chi_0$($W$)と
$\Sigma$($G$)が一つの物理的な温度を共有する。

### 何が変わるか

`t_sigmakbt > 0` のとき、`sigmakbt_setup` が 2 つのことをする:

1. **自己エネルギーの Fermi 準位を `EFERMI_kbt` に切り替える**
   ($T=0$ の `EFERMI` ではなく、`tetrakbt` と同じ $\mu$)
2. **占有数の核を Gaussian から Fermi–Dirac に替える**
   — $\Sigma_x = Gv$ と $\Sigma_c = G(W-v)$ の両方

Gaussian 平滑化(幅 `esmr`)

$$
w(e_l,e_h;\varepsilon_k)=\int_{e_l}^{e_h}\frac{1}{\sqrt2\,\sigma}
\exp\Bigl[-\Bigl(\frac{x-\varepsilon_k}{\sigma}\Bigr)^2\Bigr]dx
\tag{1}
$$

が、Fermi–Dirac の累積分布

$$
\Phi(x)=\frac{1}{1+e^{-x/k_BT}},
\qquad
w(e_l,e_h;\varepsilon_k)=\Phi(e_h-\varepsilon_k)-\Phi(e_l-\varepsilon_k)
\tag{2}
$$

に置き換わる。$k_BT\to0$ で鋭い階段関数に戻り、既定(`t_sigmakbt = 0`)では
式 (1) の従来の挙動をそのまま再現する。

### 出力での確認

```
sigmakbt_setup: t_sigmakbt[K]=  2000.0 kbt[Ry]=  0.12667E-01 ef<-EFERMI_kbt=   0.123456
```

### `EFERMI_kbt` が無いとき

`t_sigmakbt > 0` でも `EFERMI_kbt` が無ければ、**警告を一行出して
$\Sigma$ 側の有限温度は適用されない**(従来どおり動く):

```
sigmakbt_setup: WARNING t_sigmakbt>0 but EFERMI_kbt missing (need tetrakbt/heftet).
                Sigma-side finite-T NOT applied.
```

`EFERMI_kbt` を書くのは `tetrakbt` を有効にした `heftet` なので、
**`t_sigmakbt` は単独では使えない。** 必ず `tetrakbt = true` と併せて設定すること。

---

## 4. 温度の選び方

$k_BT$ を、**k メッシュが Fermi 面領域で持つエネルギー間隔と同程度以上**に取る:

$$
k_BT \gtrsim \frac{v_F \cdot (\text{BZ の大きさ})}{N}
\tag{3}
$$

LiTi₂O₄ の $6^3$ / $9^3$ では $T = 1000$–$3000$ K($k_BT = 0.086$–$0.26$ eV)が
使える範囲だった。**求めたい量が $T$ について収束していること**、できれば
**同じ $T$ で 2 つの k メッシュが一致すること**を確認すること。

### 温度を上げると何が直るか

LiTi₂O₄ の QSGW 第 1 反復を $T$ だけ変えて重ねたもの
(いずれも $6^3$、`deltaq_scale = 0.3`。共通の静電ゼロで揃え、$T=0$ の
$E_F$ を原点に取った)。

![T 依存](kBT/T_dependence.png)

*図をクリックすると拡大する。*

---

$T=0$($T=0$ テトラヘドロン `lindtet6`、黒)では Ti-3d $t_{2g}$ 帯が
Γ–L 上で **−3.9 eV まで落ち込む**。これは分散ではなく $q\to0$ head の破綻で、
温度を上げると単調に消える:

| $T$ | Γ–L 上 ($x\approx2.7$) の $t_{2g}$ 帯の底 |
|---|---|
| 0 (`lindtet6`) | −3.91 eV |
| 1000 K | −1.31 eV |
| 2000 K | −0.66 eV |
| 3000 K | −0.50 eV |

**これが有限温度を入れる理由である。** ただし $T\to0$ で method B′ が
`lindtet6` に厳密に戻ること自体は変わらない($T=0$ が壊れているのは
テトラヘドロン法ではなく、その上での金属の $q\to0$ の扱いのほうである)。

### 高温では `deltaq_scale` を小さく取ること

上の図の 3000 K(赤)は Γ–L では収まっているのに、**K–Γ の中央に
別のスパイクが残る**。これは `deltaq_scale`(offset-Gamma の $q_0$ head の
シフト量)が大きすぎるためで、**温度の問題ではない**。同じ 3000 K で
`deltaq_scale` を 0.3 から 0.1 に下げると消える:

![deltaq artifact](kBT/deltaq_artifact_3000K.png)

赤 = `deltaq_scale = 0.3`(K–Γ 中央に −1.24 eV のスパイク)、
青 = `deltaq_scale = 0.1`(消える)。$6^3$、$T$ = 3000 K、QSGW 第 1 反復。

---

つまり **`tetrakbt` / method B′ 本体の問題ではなく、offset-Gamma の
$q\to0$ head が高温 × 大きい `deltaq` で破綻する**。
高い $T$ を使うときは `deltaq_scale` も併せて小さくすること。

---

## 5. サンプル — `Samples/kBT/`

`ecalj/Samples/kBT/` に LiTi₂O₄ の**収束した計算一式**(入力と結果)がある。
GW を 11 反復するので計算が重く、`testecalj` のターゲットにはしていない。
**手法が何を変えるかを、収束した結果そのもので見るためのもの。**

設定は $6^3$、`deltaq_scale = 0.1`、`tetrakbt = t_sigmakbt = 2000` K。

![QSGW 反復](kBT/band_iterations.png)

QSGW 反復 1(紫)から 11(黄)まで。反復 3–4 以降は $E_F$ 近傍でも線が重なり、
金属にもかかわらず振動せずに収束している。

---

置いてあるもの:

| | |
|---|---|
| `input/` | `ctrlg` / `PB` / `syml` と LDA 収束済みの `rst` |
| `results/sigm.liti2o4` | 11 反復後の収束した自己エネルギー。これを使えば GW をやり直さずバンドが描ける |
| `results/QPU.1run` … `.11run` | 各反復の QP エネルギー |
| `results/band_iter/`, `results/bnd_iterations.tar.gz` | 反復ごとのバンド(図と、展開すれば数値も) |
| `results/EFERMI`, `EFERMI_kbt` | $T=0$ と有限温度の Fermi 準位 |
| `results/finiteT_evidence.txt` | 実行ログからの抜粋(下記) |
| `plots/` | 上の $T$ 依存図と `deltaq` 比較図 |

両側が実際に有効になっていることは、この 3 行で確認できる:

```
 tetrakbt_init: T[K], kbt[Ry], kbt[eV] 2000  0.12667E-01  0.17234E+00
 sigmakbt_setup: t_sigmakbt[K]= 2000.0 kbt[Ry]= 0.12667E-01 ef<-EFERMI_kbt= 0.267452
  0.277063046836211D+00 ... ! efermi           (T=0)
  0.267452126929387D+00 ... ! efermi_kbt       (有限温度)
```

2 行目の `ef<-EFERMI_kbt` が、$\Sigma$ 側が $T=0$ の `EFERMI`(0.2771 Ry)ではなく
**有限温度の `EFERMI_kbt`(0.2675 Ry)を使っている**ことを示す。
ここが食い違ったままだと $\chi_0$ と $\Sigma$ が別の Fermi 準位を見ることになる。

---

## 6. 実装の場所

| ファイル | 役割 |
|---|---|
| `SRC/subroutines/wfacx.f90` | `m_wfac` の Fermi–Dirac 核(`fd_cdf` / `fd_iav`)と `sig_fd` ゲート |
| `SRC/subroutines/genallcf_mod.f90` | `sigmakbt_setup`(`EFERMI_kbt` の読み込みと FD の有効化) |
| `SRC/subroutines/m_GWinput.f90` | `t_sigmakbt` の読み取り |
| `SRC/subroutines/main_hsfp0.sc.f90` | `hs_ef` の一点で有効化(両バイナリ) |

`set_sigma_fd(.true., kbt)` は `sxcf` のループに入る前に一度だけ呼ばれ、
以後 `wfacx` / `wfacx2` / `weavx2` が FD 核を使う。

---

## 7. ブランチの状況

| ブランチ | 状態 |
|---|---|
| `main` | `tetrakbt`($\chi_0$ 側)まで。検証済み |
| **`t_sigmakbt`** | **`t_sigmakbt`($\Sigma$ 側)を追加。Fe 金属で検証、LiTi₂O₄ の QSGW を安定化し $6^3$/$9^3$ のメッシュ依存を除去。既定 0 なので従来の挙動は不変** |
| `gwkbt-dev` | 別系統の有限温度 $\Sigma$(gwkbt Stage A/B)。**production 非対応。** Stage B の entry2 静的ビン登録が死んでいた件はブランチ上で修正済みだが、設計レビューと `gwkbt_test_plasmonpole.py` での再検証が要る |

---

## 関連

- [QSGW の計算 (gwsc)](./gwsc)
- サンプル `ecalj/Samples/kBT/`(上記 §5)
- [`ctrlg.<sname>.toml` の `[gw]` セクション](./lmf#file-structure-sections)
- 一発 GW の QP エネルギー、任意 k 線上の評価、$W$ と実軸積分の診断は
  `ecalj/FiniteT_and_QPE_HOWTO.md` を見よ(本頁はその §1 を発展させたもの)
