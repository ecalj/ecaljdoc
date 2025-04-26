# Implementation of $W$ with RPA response function

## MPI

## $𝛱(ω)$の平滑化

$\Im 𝛱(ω)$ を計算した後に, 平滑化を行い、その後クラマースクロニッヒ変換により実部を得る。
平滑化にはガウシアンフィルターを使用する．
$$
\begin{align}
\Im \overline{𝛱}(ω_i) &= \sum_j G(𝜔_i, 𝜔_j){\Im 𝛱}(ω_j) \\
G(𝜔_i, 𝜔_j) &= \frac{e^{-\frac{(𝜔_i - 𝜔_j)^2}{2𝜎^2}}}{\sum_{k} e^{-\frac{(𝜔_i - 𝜔_k)^2}{2𝜎^2}}}
\end{align}
$$

<!-- \frac{\displaystyle\int_{-\infty}^\infty d𝜔 𝛱(ω)e^{-\frac{(𝜔 - 𝜔_j)^2}{2𝜎^2}}}{\displaystyle\int_{-\infty}^\infty d𝜔 e^{-\frac{(𝜔 - 𝜔_j)^2}{2𝜎^2}}} -->
