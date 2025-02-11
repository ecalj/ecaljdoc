# Basis set in the 𝘎𝘞 calculation

## Representation of one-particle wave functions
The wave functions are expands by two types of basis set as follows:
$$
\ket{Ψ_{𝒌n}} = \sum_{𝑹u} α_{𝑹u}^{𝒌n} \ket{φ^𝒌_{𝑹u}} + \sum_{𝑮} β_{𝑮}^{𝒌n} \ket{P^𝒌_{𝑮}},
$$
where
$\ket{φ_{𝑹u}}$ is atomic LMTO basis and $\ket{P^𝒌_{𝑮}}$ is interstitial plane wave to comprised interstitial area.

### Detail of $\ket{φ^𝒌_{𝑹u}}$

The $\ket{φ^𝒌_{𝑹u}}$ is generated from bloch sum of atomic orbital $\ket{φ_{𝑹u}}$ to satisfy the bloch symmetry on basis functions, i.e.:
$$
φ^𝒌_{𝑹u}(𝒓) = \sum_{𝑻} φ_{𝑹u}(𝒓 - 𝑹 - 𝑻) \exp(i𝒌⋅𝑻)
$$
The radial part of atomic orbital are constructed from $φ_{lν}(r)$, $\dot φ_{lν}(r)$, and $φ^{z}_{l}(r)$ based on argumentation of Smooth Henkel functions.
::: warning ??
 - what is the exact formula
 - check the orthonormality
:::
The index of atom is omitted for simplify. Each $l$ has 2 or 3 reference energy of $ϵ_{lν}$.
$φ_{lν}(r)$ is the $l$ channel orbital of solution on radial Scrhödinger equation at energy $ϵ_{lν}$
,$\dot φ_{lν}(r)$ is energy derivative of $φ_{lν}(r)$, $φ^{z}_{l}(r)$ is local orbital which is the also solution on radial Scrhödinger equation but the given energy is far from $ϵ_{lν}$.
The energy of $ϵ_{lν}$ is set as the center of gravity for occupied states.
This means that this basis set is not fixed in the QSGW cycle.

::: warning ?? About radial equation??
- Is LDA used?
$$
\left[ -\frac{1}{2} \frac{d^2}{dr^2} + V_\mathrm{eff}[n(r)] - \frac{Z}{r} + \frac{l(l+1)}{2r^2}  -ϵ_{lν} \right] φ_{lν}(r) = 0
$$
 - In the $n(r)$ in radial equation obtained from self-consistent calculation?
 - What is the boundary conditions of radial equation.
 - $ϵ_{lν}$ is not the solution of radial equation, the $φ_{lν}(r)$ does not satisfy the some boundary conditions, for example $φ_{lν}(r) → 0 (r → 0)$
 - how to set the reference energy in the case of $φ^{z}_{l}(r)$?
:::

### Detail of $\ket{P^𝒌_{𝑮}}$
The interstitial plane wave is expressed as follows:
$$
\begin{align}
{P^𝒌_{𝑮}}(𝒓) = 
\begin{cases}
0    & \text{if}~ 𝒓 \in \text{any MT} \\
  \exp(i (𝒌 + 𝑮)⋅𝒓)& \text{otherwise}
\end{cases}
\end{align}
$$
Since the hollow out the MT region, these basis have overlap matrix between them, i.e.:
$$
\begin{align}
\braket{P^𝒌_{𝑮}|P^𝒌_{𝑮'}} &= \delta_{𝑮,𝑮'} - \sum_{𝑹_I} \int_{MT_I} e^{i(𝒓+𝑹_I) ⋅(𝑮'-𝑮)} d𝒓
\end{align}
$$
where,
$$
\int_{MT_I} e^{i(𝒓+𝑹_I) ⋅(𝑮'-𝑮)} d𝒓
 = \frac{4\pi e^{i𝑹_I ⋅(𝑮'-𝑮)}}{|𝑮'-𝑮|} \int_0^{R_I} dr r \sin(|𝑮'-𝑮|r)
$$

### Formula of inner product
This is for checking the orthonormality of wave function, but it is good for better understanding.
$$
\braket{Ψ_{𝒌n}|Ψ_{𝒌m}} = \sum_{𝑹uu'} α_{𝑹u}^{𝒌n*} α_{𝑹u'}^{𝒌m}\braket{φ^𝒌_{𝑹u}|φ^𝒌_{𝑹u'}} + \sum_{𝑮𝑮'} β_{𝑮}^{𝒌n*} β_{𝑮'}^{𝒌m}\braket{P^𝒌_{𝑮}|P^𝒌_{𝑮'}}
$$
The cross term are vanished.

## Product basis $M$
The basis set to represent product of one-particle wave functions.
This is the way to reduce the dimension of product.
$$
\ket{M^𝒌_I}  = \{ \ket{φ^{𝒌_1*}_{𝑹u} φ^{𝒌_2}_{𝑹u'}},  \ket{P^{𝒌_1*}_{𝑮_1} P^{𝒌_2}_{𝑮_2}} \}
 \equiv \{ \ket{M^𝒌_I}_\mathrm{MT}, \ket{M^𝒌_{𝑮}}_\mathrm{IPW} \}
$$
,where $𝒌 = 𝒌_2 - 𝒌_1, 𝑮 = 𝑮_2 - 𝑮_1$.
Some of pairs of ($𝒌_1$,$𝒌_2$) or ($𝑮_1$,$𝑮_2$) which has the same $𝒌$ or $𝑮$ are got rid of in the set of $M$.

::: warning
In this notation, $\ket{φ^{𝒌_1*}_{𝑹u} φ^{𝒌_2}_{𝑹u'}}$ DOES NOT indicate the direct product between $\ket{φ^{𝒌_1*}_{𝑹u}}$ and $\ket{φ^{𝒌_2}_{𝑹u'}}$.
$\braket{ 𝒓| φ^{𝒌_1*}_{𝑹u} φ^{𝒌_2}_{𝑹u'}} = φ^{𝒌_1*}_{𝑹u}(𝒓)φ^{𝒌_2}_{𝑹u'}(𝒓)$
:::
## Product basis $E$

The MPB $M$ introduced above does not satisfy orthogonality. Therefore, we introduce an orthogonal basis.
This basis also diagonalizes the Coulomb matrix. By doing so, the calculation of the exchange self-energy becomes easier.
In equations, new product basis $E$ is represent by the liner combination of $M$, i.e.:
$$
\ket{E^𝒒_μ} = \sum_{I} z^𝒒_{μI}\ket{M^𝒒_I}.
$$
Then, $E$ is satisfy the following releations.
$$
\braket{E^𝒒_μ|E^𝒒_ν} = δ_{μν},
v(𝒒) \ket{E^𝒒_μ} =v_μ(𝒒)\ket{E^𝒒_μ}
$$
where $v(𝒒)$ is Coulomb matrix and $v_μ(𝒒)$ is eigen value. The coefficient $z^𝒒_{μI}$ and $v_μ(𝒒)$ are obtained by soliving following generalized eigenvalue equation:
$$
\sum_J (v_{IJ}^{𝒒} - v_{\mu}(𝒒) O^{𝒒}_{IJ} ) z^{𝒒}_{\mu J} = 0,
$$
where $v_{IJ}^{𝒒}$  is Coulomb matrix represented by $M$, namely, $\braket{M^{𝒒}_{I}|v|{M^{𝒒}_J}}$. 
By using $E$, Coulomb interaction operator is represented as follows:
$$
v(𝒒)=\sum_{μ} \ket{E^𝒒_μ}v_μ(𝒒)\bra{E^𝒒_μ}.
$$

::: warning about $\braket{M^{𝒒}_{I}|v|{M^{𝒒}_J}}$
Since $v$ is a non-local function, the calculation of this matrix element includes cross terms of $M_\text{MT}$ and $M_\text{IPW}$.
:::

