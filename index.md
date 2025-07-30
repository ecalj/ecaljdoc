---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ecaljdoc"
  text: 
  tagline: "ecalj package at github/tkotani/ecalj for first-principles electronic-structure  calculations"
  actions:
    - theme: brand
      text: Install
      link: /install/install
    - theme: alt
      text: Get started
      link: /manual/README_tutorial
    - theme: alt
      text: Theory
      link: /theory/gw
    - theme: alt
      text: Manual
      link: /manual/lmf
    - theme: alt
      text: QSGW database (under construction)
      link: https://github.com/tkotani/DOSnpSupplement/blob/main/bandpng.md#band-structure--total-dos


features:
  - title: Quasi-particle self-consistent 𝘎𝘞 methods (QSGW)
    details: First-principles electronic structure calculations to determine the independent-particle picture for describing electronic excitations
  - title: Material properties on top of QSGW 
    details: Linear responses. Maxloc Wannier modeling. In addition, new modeling MLO is going to be implemented. Spectrum functions, life time due to e-e scattering.
  - title: Easy to use 
    details: ecalj is based on the th PMT method, which is an all-electron method with LMTO+LAPW, where we use only ~ 3Ry cutoff for APWs, which are very effective to complement the problem of MTO. This basis allows us to apply our method to wide range of materials. POSCAR in the VASP format can be readable. Automatic band path. Plot GW band structures without the Wannier interpolations.
