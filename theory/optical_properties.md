# Optical Properties

## written by Copilot

The optical properties of a material can be calculated using Density Functional Theory (DFT).
The key formula used in these calculations is the complex dielectric function, which is given by:
$$
\epsilon(\omega) = \epsilon_1(\omega) + i\epsilon_2(\omega) 
$$

where:
- $\epsilon(\omega)$ is the complex dielectric function,
- $\epsilon_1(\omega)$ is the real part of the dielectric function,
- $\epsilon_2(\omega)$ is the imaginary part of the dielectric function,
- $\omega$ is the frequency of the incident light.

The imaginary part $\epsilon_2(\omega)$ can be calculated using the following expression:
$$
\epsilon_2(\omega) = \frac{4\pi^2 e^2}{m^2 \omega^2} \sum_{c,v} \int_{\text{BZ}} \frac{d^3k}{(2\pi)^3} | \langle \psi_c(\mathbf{k}) | \mathbf{e} \cdot \mathbf{r} | \psi_v(\mathbf{k}) \rangle |^2 \delta(E_c(\mathbf{k}) - E_v(\mathbf{k}) - \hbar\omega)
$$

where:
- $e$ is the electron charge,
- $m$ is the electron mass,
- $\mathbf{e}$ is the polarization vector of the incident light,
- $\mathbf{r}$ is the position operator,
- $\psi_c(\mathbf{k})$ and $\psi_v(\mathbf{k})$ are the conduction and valence band wave functions, respectively,
- $E_c(\mathbf{k})$ and $E_v(\mathbf{k})$ are the energies of the conduction and valence bands, respectively,
- $\hbar$ is the reduced Planck constant,
- $\mathbf{k}$ is the wave vector,
- BZ denotes the Brillouin zone.

The real part $\epsilon_1(\omega)$ can be obtained from $\epsilon_2(\omega)$ using the Kramers-Kronig relations.

## dielectric function in microscale

$$
\begin{align}
𝛿𝜌 = 𝜒𝛿𝜙_{ext} = 𝑃𝛿𝜙 \\
𝜖𝛿𝜙 = 𝛿𝜙_\mathrm{ext} \\
𝛿𝜙 = 𝜖^{-1}𝛿𝜙_\mathrm{ext} \\
\end{align}
$$

$$
\begin{align}
𝜖 &= 1 - 𝑣𝑃  \\
𝜖^{-1} &= 1 + 𝑣 𝜒 \\
𝜒 &= 𝑃 + 𝑃 𝑣 𝜒
\end{align}
$$
where:
- $𝜖$: dielectric function
- $𝑣$: Coulomb potential
- $𝜒$: 
- $𝑃$: polarization function 

RPA Approxiamation
$$
𝑃 = 𝛱
$$
where
 - $𝛱$: Kohn-Sham density response function


## macroscale dielectric function
$$
\hat{𝒒}⋅𝜖_\mathrm{mac}(𝒒,𝜔)⋅\hat{𝒒}= 1/[𝜖^{-1}(𝒒,𝜔)]_{0,0}
$$

## without local field correction
$$
𝜖_\mathrm{mac}(𝒒,𝜔) ≃ 𝜖_{0,0}(𝒒,𝜔)
$$
in this case, the macroscoptic dielectric function is obtained by following way
$$
𝜖_{0,0}(𝒒,𝜔) = 1 - 𝑣_0(𝒒)𝑃_{0,0}(𝒒,𝜔)
$$
only, $0,0$ component of $𝑃$ is needed, being the low computational cost.

## local field correction
$$
\hat{𝒒}⋅𝜖_\mathrm{mac}(𝒒,𝜔)⋅\hat{𝒒}= 1/[𝜖^{-1}(𝒒,𝜔)]_{0,0}
$$
in this case, all matrix element of $𝜖_{μν}(𝒒,𝜔)$ is needed to calculate the inverse of matrix.
See the [Adler](https://dx.doi.org/10.1103/physrev.126.413) for the details.

## relation with optical functions
- $𝑛$: refractive index
$$
𝑛 = \sqrt{ \frac{ 𝜖_\mathrm{mac,1} + \sqrt{𝜖^2_\mathrm{mac,1} + 𝜖^2_\mathrm{mac,2}}}{2}} 
$$
- $𝜅$: extinction coeffcient
$$
𝜅 = \sqrt{ \frac{-𝜖_\mathrm{mac,1} + \sqrt{𝜖^2_\mathrm{mac,1} + 𝜖^2_\mathrm{mac,2}}}{2}} \\
$$
- $𝑅$: reflectance
$$
𝑅 = \frac{( 𝑛 - 1)^2 + 𝜅^2} {( 𝑛 + 1)^2 + 𝜅^2}
$$
