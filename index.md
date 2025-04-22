---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ecaljdoc"
  text: 
  tagline: "This is a documents for ecalj package at github/tkotani/ecalj : xxx under construction xxx"
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

features:
  - title: Quasi-particle self-consistent 𝘎𝘞 methods
    details: First-principles electronic structure calculations to determine the best independent particle picture for describing electronic excitations
  - title: Material properties
    details: Linear responses. Wannier and MLO modelling. Spectrum functions, life time due to e-e scattering.
  - title: Easy to use 
    details: ecalj is based on the th PMT method, which is a all electron method with LMTO + LAPW, where we use only < 3Ry cutoff for APW. Automatically applicable to wide range of materials. Read in POSCAR for VASP (converter). Automatic band path. Plot GW band without the Wannier interpolation.
---
