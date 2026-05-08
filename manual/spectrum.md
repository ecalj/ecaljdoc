This document is out of date. Need fixing

# Spectrum function of G.

> ⚠️ **TOML migration (2026-05)** — Binaries read `ctrlG.<sname>.toml` + `PB.toml` only. Use `Legacy2toml.py <sname>` to convert legacy `ctrl.<sname>` / `GWinput`. See [TOML migration](./toml_migration).
How to calculate $\langle {\bf q} n|\Sigma(\omega)|{\bf q} n\rangle$

We have an example at {\tt ecalj/MATERIALS/SiSigma/}, where
you can just type {\tt job}. It calls a shell script {\tt gwsigma}, which is
just a modification of {\tt gwsc} for spectrum function plotting.
If you have {\tt sigm.*}, it will automatically read it as in the case
of {\tt gwsc}.

By the script {\tt gwsigma}, we calculate the diagonal elements
$\langle \psi({\bf q},n)|\sigma_{\rm c}(\omega) |\psi({\bf q},n)\rangle$.
Thus we need to set $\bf q$ and band index $n$ for which we calcualte.
In addition, we need to set resolution of $\omega$.

 ~~Set `<QPNT>` section~~(-->probably QforGW instead). This section is to set the q point, and band index
 for which we calculate the self energy. In addition, energy mesh for plotting is set.

(A) ~~Set q point set~~ --> We now use QforGW probably
(--- following is not correct. ---)
   If you set 
```
  *** all q -->1, otherwise 0;  up only -->1, otherwise 0
           1           0
  ----------
  You will have self-energy for all irreducible k points. This may be needed for A(omega).
  or 
  You have to set all q points as
  ----------
  *** q-points, which shoud be in qbz.,See KPNTin1BZ.
           3            <--- number of readin q point 
  1     0.0000000000000000     0.0000000000000000     0.0000000000000000 <--1st number is irrelevant
  2    -0.5000000000000000     0.5000000000000000     0.5000000000000000
  3     0.0000000000000000     0.0000000000000000     1.0000000000000000
```

   To know allowed q points on regular mesh point, run `mkGWIN_lmf2`, then
   supply n1,n2,n3. The generated `GWinput.tmp` contains all possible q points;
   `Legacy2toml.py <sname>` then folds them into `[blocks].QPNT` of `ctrlG.<sname>.toml`.
  
~~NOTE:Anyq option can allow you to specify any q points by shifted mesh technique.
   (if necessary, but only for some special purpose).~~

(B) 
~~Band index set~~ --> instead, We now use EMAXforGW probably 
  It is specified by the section
  ```
  *** no. states and band index for calculation.
  2
  4  5
  ----------
  means the self-energy for band index 4 and 5. Just two bands.
  If you like to plot self energy from 1 through 8, use
  *** no. states and band index for calculation.
  8
  1 2 3 4 5 6 7 8
  ```
  If you need 17 bands for example, it should be 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17
  in addition to 17 (number of bands at the first line).   


(C) ~~energy mesh set ~~ We now use Histbin
```
  At the bottom of <QPNT> section, we have
  ----------------
  *****
   0.01 2.0
  ----------------
   Two real number should be supplied.
   These are dwplot and omegamaxin, read in hsfp0.m.F by a line 
     read (ifqpnt,*,err=2038,end=2038) dwplot,omegamaxin
   dwplot (=0.01 Ry) is mesh for self energy.
   omegamaxin=(2.0 Ry) means the range "-2 Ry to 2 Ry" for self-energy plot.

   Note that imaginary part of Sigma is given as the comvolution of ImW(omega) and the pole of Green's function
   (`[gw].esmr` gives energy smearing of the pole; legacy: `esmr` in `GWinput`). Resolution for Im W (near omega=0) is set by `[gw].HistBin_dw` (legacy: `dw` in `GWinput`).
   I think that the reolution of self-energy is ~ 0.05 eV in the default setting.
   This is because {\tt dw} \sim {\tt esmr} \sim 0.05 eV. 


  Run gwsigma. This will run 
    echo 4| mpirun -np 24 hsfp0,
  after dielectric funcition is calculated.
  Then we have SEComg.UP (DN) files, Look for file handle, ifoutsec,
  for the file in fpgw/main/hsfp0.m.F to see format for the file. 
  (not hsfp0.sc.m.F but hsfp0.m.F). Search a line
       open(ifoutsec,file='SEComg'//sss) (around hsfp0.m.F L1052)
   You can find that we use folloing lines to plot SEComg.*.
    ----------------                    
           write(ifoutsec,"(4i5,3f10.6,3x,f10.6,2x,f16.8,x,3f16.8)")
     &          iw,itq(i),ip,is, q(1:3,ip),  eqx(i,ip,is),
     &          (omega(i,iw)-ef)*rydberg(),  hartree*zsec(iw,i,ip) !,sumimg                                                   ----------------                    
     This means we use energy in eV. 
     iw:      omega index
     itq(iq): band index specified by <QPNT>
     ip:      k point index specified by <QPNT>
     is:      spin index
     q:       q vector (cartesian in 2pi/alat)
     eqx:     eigenvalue in eV. (I think relative to the Fermi energy)
     (omega(i,iw)-ef)*rydberg():  omega relative to the Fermi energy
     hartree*zsec(iw,i,ip):       Self energy. real and imaginary part.(complex, two values)

   You can only repeat echo 4| mpirun -np 24 hsfp0 
   when you change setting in <QPNT> section.

* Example.  There is an example MATERIALS/SiSigma/
  plot 'SEComg.UP' u ($9):($10) w l,'' u ($9):($11) w l
  can give a plot for Re (Sigma_c(omega)) and Im(Sigma_c).

  9th:  energy in eV   (omega(i,iw)-ef)*rydberg()
  10th: real part      Re hartree*zsec(iw,i,ip) 
  11th: imag part      Im hartree*zsec(iw,i,ip) 

## 4
 To get integrated spectrum function (DOS), we need to superpose all the spectrum function
 (All q points and all band index). Be careful about the degeneracy (multiplicity) for each q points.
  You have to build it from SEComg file.
  To know the multiplicity, search following lines ofkeyword {\tt Multiplicity} in the console output of qg4gw (lqg4gw).

  Anyway, consider about ``is it worth to do?''
  To confirm your result, use sum rule (sum of spectrum weight). And pay attention to the relation
  between real and imag parts (Hilbert transformation).
```
