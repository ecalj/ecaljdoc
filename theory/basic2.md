# 基本2
- 時間秩序, 先進, 遅延の関係について
- ヒルベルト変換/クラマース・クロニッヒ関係について

## クラマース・クロニッヒ関係


$$
\lim_{𝛿 → 0} \frac{1}{𝜋}\oint \frac{𝜒(𝜔')}{𝜔'-𝜔 ± i𝛿} d𝜔'
$$

### $𝜒(𝜔)$が$𝜔$の上半面で解析的である場合。
$$
\begin{align}
\Re 𝜒(𝜔) = \frac{1}{𝜋} 𝒫 \int_{-\infty}^{\infty} \frac{\Im 𝜒(𝜔')}{𝜔'-𝜔} d𝜔' \\
\Im 𝜒(𝜔) = -\frac{1}{𝜋} 𝒫 \int_{-\infty}^{\infty} \frac{\Re 𝜒(𝜔')}{𝜔'-𝜔} d𝜔'
\end{align}
$$

### $𝜒(𝜔)$が$𝜔$の下半面で解析的である場合。
$$
\begin{align}
\Re 𝜒(𝜔) = -\frac{1}{𝜋} 𝒫 \int_{-\infty}^{\infty} \frac{\Im 𝜒(𝜔)}{𝜔'-𝜔} d𝜔' \\
\Im 𝜒(𝜔) =  \frac{1}{𝜋} 𝒫 \int_{-\infty}^{\infty} \frac{\Re 𝜒(𝜔)}{𝜔'-𝜔} d𝜔'
\end{align}
$$

---
極の位置によって, KK関係が異なる。極が$𝜔$面の両方にある時間秩序化された関数よりも、片面のみにある関数の方が解析性はよい。
ので、時間秩序化された関数と、極が片面にある遅延・先進関数の関係を調べる。

## 先進, 遅延, 時間秩序の関係
$\mathrm{R}$は遅延, $\mathrm{A}$は先進を示す。
### グリーン関数の場合
遅延は, $t_2(t_1)$に電子(正孔)が生成され$t_1(t_2)$で消滅するプロセスの期待値。$t_1 > t_2$ であり, 電子は時間の正方向、正孔は負方向に進んでいると思うと
$$
\begin{align}
iG(𝒓_1t_1, 𝒓_2t_2) &= \braket{\Psi_0|T[\hat 𝜓_\mathrm{H}(𝒓_1,t_1)\hat 𝜓^†_\mathrm{H}(𝒓_2,t_2)]|\Psi_0}  \\
iG^\mathrm{R}(𝒓_1t_1, 𝒓_2t_2) &=  \braket{\Psi_0|\{\hat 𝜓_\mathrm{H}(𝒓_1,t_1),\hat 𝜓^†_\mathrm{H}(𝒓_2,t_2)\}|\Psi_0} 𝜃(t_1-t_2) \\
iG^\mathrm{A}(𝒓_1t_1, 𝒓_2t_2) &= -\braket{\Psi_0|\{\hat 𝜓_\mathrm{H}(𝒓_1,t_1),\hat 𝜓^†_\mathrm{H}(𝒓_2,t_2)\}|\Psi_0} 𝜃(t_2-t_1) \\
\end{align}
$$
フーリエ表示は、
$$
\begin{align}
G(𝒓_1, 𝒓_2;𝜔)  &=  \sum_{n'}^{\mathrm{unocc}} \frac{𝜙_{n'}(𝒓_1)𝜙^*_{n'}(𝒓_2)}{𝜔-𝜀_{n'}/\hbar + i𝛿} +
    \sum_{n}^{\mathrm{occ}} \frac{𝜙_{n}(𝒓_1)𝜙^*_{n}(𝒓_2)}{𝜔 - 𝜀_{n}/\hbar -i𝛿} \\
G^\mathrm{R}(𝒓_1, 𝒓_2;𝜔)  &=  \sum_{n'}^{\mathrm{unocc}} \frac{𝜙_{n'}(𝒓_1)𝜙^*_{n'}(𝒓_2)}{𝜔-𝜀_{n'}/\hbar + i𝛿} +
    \sum_{n}^{\mathrm{occ}} \frac{𝜙_{n}(𝒓_1)𝜙^*_{n}(𝒓_2)}{𝜔 - 𝜀_{n}/\hbar +i𝛿} \\
G^\mathrm{A}(𝒓_1, 𝒓_2;𝜔)  &=  \sum_{n'}^{\mathrm{unocc}} \frac{𝜙_{n'}(𝒓_1)𝜙^*_{n'}(𝒓_2)}{𝜔-𝜀_{n'}/\hbar - i𝛿} +
    \sum_{n}^{\mathrm{occ}} \frac{𝜙_{n}(𝒓_1)𝜙^*_{n}(𝒓_2)}{𝜔 - 𝜀_{n}/\hbar -i𝛿}
\end{align}
$$
となる。$G, G^\mathrm{R}, G^\mathrm{A}$は

### 密度応答関数の場合


## ヒルベルト変換

### 数値計算
