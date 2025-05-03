# 基本2
- 時間秩序, 先進, 遅延の関係について
- ヒルベルト変換/クラマース・クロニッヒ関係について

## ヒルベルトの公式

$$
\lim_{𝜂 → 0 }\int_{-∞}^{∞} \frac{𝜒(ω')}{ω' - ω ± i 𝜂} dω' = 𝒫 \int_{-∞}^{∞} \frac{𝜒(ω')}{ω' - ω } dω' ∓ iπ𝜒(ω)
$$

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
    \sum_{n}^{\mathrm{occ}} \frac{𝜙_{n}(𝒓_1)𝜙^*_{n}(𝒓_2)}{𝜔 - 𝜀_{n}/\hbar -i𝛿} = G_{\mathrm{ele}} + G_{\mathrm{hole}} \\
G^\mathrm{R}(𝒓_1, 𝒓_2;𝜔)  &=  \sum_{n'}^{\mathrm{unocc}} \frac{𝜙_{n'}(𝒓_1)𝜙^*_{n'}(𝒓_2)}{𝜔-𝜀_{n'}/\hbar + i𝛿} +
    \sum_{n}^{\mathrm{occ}} \frac{𝜙_{n}(𝒓_1)𝜙^*_{n}(𝒓_2)}{𝜔 - 𝜀_{n}/\hbar +i𝛿} = G_{\mathrm{ele}} + G^†_{\mathrm{hole}} \\
G^\mathrm{A}(𝒓_1, 𝒓_2;𝜔)  &=  \sum_{n'}^{\mathrm{unocc}} \frac{𝜙_{n'}(𝒓_1)𝜙^*_{n'}(𝒓_2)}{𝜔-𝜀_{n'}/\hbar - i𝛿} +
    \sum_{n}^{\mathrm{occ}} \frac{𝜙_{n}(𝒓_1)𝜙^*_{n}(𝒓_2)}{𝜔 - 𝜀_{n}/\hbar -i𝛿} = G^†_{\mathrm{ele}} + G_{\mathrm{hole}}
\end{align}
$$
となる。$†$ は複素共役をとって$𝒓_1, 𝒓_2$をいれかえるという意味。KK関係は$G^\mathrm{R}$, $G^\mathrm{A}$で成立しており
$$
\Re G^\mathrm{R,A} (𝒓_1, 𝒓_2;𝜔) = ∓ 𝒫 \int_{-∞}^{∞} \frac{dω'}{π} \frac{ \Im G^{\mathrm{R,A}}(𝒓_1, 𝒓_2;𝜔) }{ω - ω'}
$$
である。
### 密度応答関数の場合


## ヒルベルト変換

### 数値計算
