# calculation of $Z$

## basis set 
The wave functions
$$
\ket{Ψ_{𝒌n}} = \sum_{𝑹u} α_{𝑹u}^{𝒌n} \ket{φ^𝒌_{𝑹u}} + \sum_{𝑮} β_{𝑮}^{𝒌n} \ket{P^𝒌_{𝑮}}
$$

$
\ket{φ_{𝑹u}}
$ : defined in side the MT.
$
\ket{P^𝒌_{𝑮}}
$ : non-zero outside the MT.

## product basis
$$
\ket{M^𝒌_I}  = \{ \ket{φ^{𝒌*}_{𝑹u} φ^𝒌_{𝑹u'}},  \ket{P^{𝒌_1*}_{𝑮_1} P^{𝒌_2}_{𝑮_2}} \}
 \equiv \{ \ket{M^𝒌_I}_\mathrm{MT}, \ket{M^𝒌_{𝑮}}_\mathrm{I} \}
$$
,where
$
𝒌 = 𝒌_2 - 𝒌_1,  𝑮 = 𝑮_2  - 𝑮_1
$
また, 𝒌 と 𝑮  が同じになるペアは除いておき, MPBのカットオフもあり。

## product basis 2

$$
\ket{E^𝒒_μ} = \sum_{I} z^𝒒_{μI}\ket{M^𝒒_I} 
$$
zはエルミート?
##
$$
\braket{E^𝒒_μ Ψ_{𝒌n} |Ψ_{𝒒+𝒌n'}} = \sum_{I} z^{𝒒*}_{μI} \braket{M^𝒒_I Ψ_{𝒌n} |Ψ_{𝒒+𝒌n'}}
$$
