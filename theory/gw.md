# GW approaximation

The GW approximation is a method used in many-body perturbation theory to describe the electronic structure of systems. It improves upon the standard Density Functional Theory (DFT) by including the effects of electron-electron interactions more accurately.

In the GW approximation, the self-energy $\varSigma$ is expressed as:
$$
\varSigma(\mathbf{r}, \mathbf{r}'; \omega) = \frac{i}{2\pi} \int d\omega' G(\mathbf{r}, \mathbf{r}'; \omega + \omega') W(\mathbf{r}, \mathbf{r}'; \omega')
$$

Here, $G$ is the Green's function, which describes the propagation of an electron in the system, and $W$ is the screened Coulomb interaction. The Green's function $G$ is given by:
$$
G(\mathbf{r}, \mathbf{r}'; \omega) = \sum_n \frac{\psi_n(\mathbf{r}) \psi_n^*(\mathbf{r}')}{\omega - \epsilon_n + i\eta \text{sgn}(\epsilon_n - \mu)}
$$

The polarization $P$ is defined as:
$$
P(\mathbf{r}, \mathbf{r}'; \omega) = -i \int \frac{d\omega'}{2\pi} G(\mathbf{r}, \mathbf{r}'; \omega + \omega') G(\mathbf{r}', \mathbf{r}; \omega')
$$

The screened Coulomb interaction $W$ is related to the bare Coulomb interaction $v$ and the dielectric function $\epsilon$ by:
$$
W = \epsilon^{-1}v
$$

The GW approximation provides a more accurate description of quasiparticle energies, which are essential for understanding the electronic properties of materials.

## GW Renormalization Factor

The renormalization factor $Z_n$ in the GW approximation is given by:

$$
Z_n = \left( 1 - \left. \frac{\partial \varSigma(\omega)}{\partial \omega} \right|_{\omega = \epsilon_n} \right)^{-1}
$$

Here, $\varSigma(\omega)$ is the self-energy, and $\epsilon_n$ is the quasiparticle energy.
## Problems with the GW Approximation

While the GW approximation provides a more accurate description of quasiparticle energies compared to standard Density Functional Theory (DFT), it has several limitations and challenges:

1. **Computational Cost**: The GW approximation is computationally expensive due to the need to calculate the Green's function $G$ and the screened Coulomb interaction $W$. This makes it challenging to apply to large systems or complex materials.

2. **Self-Consistency**: Achieving self-consistency in the GW calculations can be difficult. In practice, many calculations use a non-self-consistent approach (G$_0$W$_0$), where $G$ and $W$ are calculated using the DFT orbitals and eigenvalues. This can lead to inaccuracies in the results.

3. **Starting Point Dependence**: The results of GW calculations can be sensitive to the choice of the starting point, i.e., the initial DFT functional used to generate the orbitals and eigenvalues. Different starting points can lead to different quasiparticle energies.

4. **Vertex Corrections**: The GW approximation neglects vertex corrections, which can be important for accurately describing electron-electron interactions. Including these corrections can improve the accuracy but also increases the computational complexity.

5. **Limited Accuracy for Strongly Correlated Systems**: The GW approximation may not be accurate for systems with strong electron correlation effects, such as transition metal oxides or heavy fermion systems. In such cases, more advanced methods like Dynamical Mean Field Theory (DMFT) or GW+DMFT may be required.

Despite these challenges, the GW approximation remains a valuable tool for studying the electronic properties of materials, particularly for systems where electron-electron interactions play a significant role.


## Self-energy

$$
G(x_1, x_2) = G_0(x_1, x_2) + \int dx_3 dx_4  G_0(x_1, x_3) \varSigma(x_3, x_4) G(x_4, x_2)
$$

### Hedin's Equation
$$
\begin{aligned}
P(x_1, x_2) &= -i \int dx_3 dx_4  G(x_4, x_2) G(x_2, x_3) \Gamma(x_3, x_4, x_1) \\
W(x_1, x_2) &= v(x_1, x_2) + \int dx_3 dx_4  v(x_1, x_3) P(x_3, x_4) W(x_4, x_2) \\
\varSigma(x_1, x_2) &= \frac{i}{\hbar} \int dx_3 dx_4 \, G(x_1, x_4) \Gamma(x_4, x_2, x_3) W(x_1^+, x_3) \\
\Gamma(x_1, x_2, x_3) &= \delta(x_1, x_2) \delta(x_1, x_3) + \int dx_4 dx_5 dx_6 dx_7 
\frac{\delta \varSigma(x_1, x_2)}{\delta G(x_4, x_5)} G(x_4, x_6) G(x_7, x_5) \Gamma(x_6, x_7, x_3)
\end{aligned}
$$

## Refs
