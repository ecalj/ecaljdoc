---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ecaljdoc"
  tagline: This is document for ecalj, the first-principles electronic-structure package in QSGW.<BR> xxxxx still under construction xxxxx
  actions:
    - theme: alt
      text: Tutorial
      link: /manual/README_tutorial
    - theme: alt
      text: Theory
      link: /theory/gw
    - theme: alt
      text: QSGW database (under construction)
      link: https://github.com/tkotani/DOSnpSupplement/blob/main/bandpng.md#band-structure--total-dos
    - theme: brand
      text: Download ecalj package
      link: https://github.com/tkotani/ecalj
    - theme: brand
      text: Download ecaljdoc (this docucment)
      link: https://github.com/msobt/ecaljdoc

features:
  - title: Quasiparticle self-consistent 𝘎𝘞 methods (QSGW)
    details: In addition to usual LDA/GGA and LDA+U, we can perform QSGW in order to describe electronic excitations.<BR>  1. The spin-orbit coupling can be included for given direction of spins (currently not non-colinear). <BR> 2. We can apply antiferro ordering. Thus computationally efficient and stable.<BR>3. We can apply QSGW even to magnetic metallic systems.<BR>4. With GPU, we can handle supercells containing 40 atoms, such as GaSb/InAs superlattice.<BR>5.Main part of codes is written in module-style coding in fortran90. <BR> (Total energy in QSGW is not yet implemented. Atomic positions can not be relaxed in QSGW.)<BR>---<BR>
  - title: Material properties on top of QSGW/LDA. 
    details: Until now, we published <BR> 1. Dielectric functions (even the intra band contribution at finite q for metallic systems)<BR>2. Spin fluctuations<BR>3. Impact inonization rate. <BR>4. Specttum functions of the Green's function<BR>---<BR>In addition, we are developing modeling 'MLO', which makes things easier. Other linear responses such as AHC is under construction.
  - title: Easy to use 
    details: ecalj is based on the th PMT method (= LMTO+LAPW), where we use only ~ 3Ry cutoff for APWs.   Such APWs dissolve the problems of using only MTOs.<BR>---<BR>1. We do not set parameters by hands. Thus we can generate database of QSGW.<BR>  2.We can read POSCAR in the VASP format. <BR>3. Automatic band path with BZ included (using seekpath and spglib). Plot GW band structures without the Wannier interpolations.

