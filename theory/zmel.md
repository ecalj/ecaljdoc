# calculation of $Z$

## basis set 
The wave functions
$$
\ket{Ψ_{𝒌n}} = \sum_{𝑹u} α_{𝑹u}^{𝒌n} \ket{φ^𝒌_{𝑹u}} + \sum_{𝑮} β_{𝑮}^{𝒌n} \ket{P^𝒌_{𝑮}}
$$

$\ket{φ_{𝑹u}}$ : defined in side the MT. MTは重なりなし. $𝑹$が異なればoverlapはない。
$\ket{P^𝒌_{𝑮}}$ : non-zero in outside the MT.

## product basis
$$
\ket{M^𝒌_I}  = \{ \ket{φ^{𝒌_1*}_{𝑹u} φ^{𝒌_2}_{𝑹u'}},  \ket{P^{𝒌_1*}_{𝑮_1} P^{𝒌_2}_{𝑮_2}} \}
 \equiv \{ \ket{M^𝒌_I}_\mathrm{MT}, \ket{M^𝒌_{𝑮}}_\mathrm{I} \}
$$
,where
$𝒌 = 𝒌_2 - 𝒌_1, 𝑮 = 𝑮_2 - 𝑮_1$
また, $𝒌$ や$𝑮$ が同じになる$𝒌_1$ と$𝒌_2$のペアや$𝑮_1$と$𝑮_2$のペアは除いておき, MPBのカットオフもあり。

## product basis 2
$$
\ket{E^𝒒_μ} = \sum_{I} z^𝒒_{μI}\ket{M^𝒒_I} 
$$
$$
v(𝒒)=\sum_{μ} \ket{E^𝒒_μ}v_μ(𝒒)\bra{E^𝒒_μ}
$$
## Calculation of matrix elementns

$$
\braket{E^𝒒_μ Ψ_{𝒌n} |Ψ_{𝒒+𝒌n'}} = \sum_{I} z^{𝒒*}_{μI} \braket{M^𝒒_I Ψ_{𝒌n} |Ψ_{𝒒+𝒌n'}}
$$

基底関数は,MT とMT外完全に空間的に分離されているので, MT内(原子基底)とMT外(IPW)の寄与に分離できる。
::: info
$\ket{E^𝒒_μ}$ については, $\ket{M^𝒒_I}$
の線形結合なので, ある$μ$でMT内かMT外かのように分離されていない。?
:::


MPBがMT内の関数の場合は
$$
\braket{M^𝒒_I Ψ_{𝒌n} |Ψ_{𝒒+𝒌n'}} = 
\sum_{𝑹uu'} α_{𝑹u}^{𝒌n*} α_{𝑹u'}^{𝒒+𝒌n'} \braket{M^𝒒_I φ^{𝒌}_{𝑹u}| φ^{𝒒+𝒌}_{𝑹u'}}
$$

$
\braket{M^𝒒_I φ^{𝒌}_{𝑹u}| φ^{𝒒+𝒌}_{𝑹u'}}
$ : 変数名PPB

IPWの場合は
$$
\braket{M^𝒒_𝑮  Ψ_{𝒌n} |Ψ_{𝒒+𝒌n'}} = 
\sum_{𝑮_1 𝑮_2} β_{𝑮_1}^{𝒌n*} β_{𝑮_2}^{𝒒+𝒌n'} \braket{M^𝒒_𝑮 P^{𝒌}_{𝑮_1}| P^{𝒒+𝒌}_{𝑮_2}}_\mathrm{I}
$$

MT外の領域の計算は, MT部分を計算して引いて求めるので,
$$
\begin{align}
\braket{M^𝒒_𝑮 P^{𝒌}_{𝑮_1}| P^{𝒒+𝒌}_{𝑮_2}}_\mathrm{I} &= \int_{\mathrm I} d𝒓 e^{i(-𝑮-𝑮_1+𝑮_2)𝒓 } \\
&= \delta_{-𝑮-𝑮_1+𝑮_2} - \sum_{𝑹} \int_\mathrm{MT} d𝒓_I e^{i(-𝑮-𝑮_1+𝑮_2)(𝒓_I-𝑹) } \\
&≡ 𝒪_{𝑮-𝑮_1,𝑮_2}
\end{align}
$$
とするはず(フーリエ変換の因子があるかもしれない)。最後の項の積分は, 平面波を球ベッセル関数で展開して計算する?

$$
\begin{align}
\braket{E^𝒒_μ Ψ_{𝒌n} |Ψ_{𝒒+𝒌n'}} &= \sum_{I \in \mathrm{MT}} z^{𝒒*}_{μI} \sum_{𝑹uu'} α_{𝑹u}^{𝒌n*} α_{𝑹u'}^{𝒒+𝒌n'} \braket{M^𝒒_I φ^{𝒌}_{𝑹u}| φ^{𝒒+𝒌}_{𝑹u'}} \\
 &+ \sum_{𝑮} z^{𝒒*}_{μ𝑮} \sum_{𝑮_1 𝑮_2}𝒪_{𝑮-𝑮_1,𝑮_2} β_{𝑮_1}^{𝒌n*} β_{𝑮_2}^{𝒒+𝒌n'} 
\end{align}
$$














