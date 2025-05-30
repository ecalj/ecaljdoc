## This is an input help described in ctrl for lmf 

<!-- ```
INFO: Ubuntu 20.04.4 LTS \n \l
INFO: GNU Fortran (Ubuntu 9.4.0-1ubuntu1~20.04.1) 9.4.0
INFO: -O2 -g -fimplicit-none -finit-integer=NaN -finit-real=NaN -JOBJ.gfortran -IOBJ.gfortran
INFO: MATH: -lmkl_rt
INFO: git: commit 6993fd7f7ec072432c0aadda58f622017f0063fb
INFO:    : Date:   Thu Feb 9 19:31:40 2023 +0900
INFO:    linked at Fri Feb 10 08:16:46 JST 2023
``` -->


```
  Token           Input   cast  (size,min) --------------------------
 IO_VERBOS         opt    i4       1,  1          default= 30
    Verbosity for printout. Set from the command-line with --pr=xxx
 IO_TIM            opt    i4v      2,  1          default= 1 1
    Turns CPU timing log. Value sets tree depth.
    Optional 2nd arg prints CPU times as routines execute.
    Args may be set through command-line: --time=#1,#2
 STRUC_ALAT        reqd   r8       1,  1      Units of length (a.u.)
 STRUC_NBAS        reqd   i4       1,  1      Size of basis
 STRUC_PLAT        reqd   r8v      9,  9      Primitive lattice vectors
 STRUC_DALAT       opt    r8       1,  1          default= 0 
   added to alat after reading inputs (only affecting to SPEC_ATOM_R/A case)
 OPTIONS_HF        opt    lg       1,  1          default= F       
   T for non-self-consistent Harris
 HAM_NSPIN         opt    i4       1,  1          default= 1       
   Set to 2 for spin polarized calculations
 HAM_REL           opt    i4       1,  1          default= 1       
   relativistic switch
   0 for nonrelativistic Schrodinger equation
   1 for scalar relativistic Schrodinger equation
   2 for Dirac equation
 * To read the magnetic parameters below, HAM_NSPIN must be 2
 HAM_SO            opt    i4       1,  1          default= 0
    Spin-orbit coupling (for REL=1)
   0 : no SO coupling
   1 : Add L.S to hamiltonian
   2 : Add Lz.Sz only to hamiltonian
 HAM_SOCAXIS       opt    r8v      3,  3          default= 0 0 1
    SOC axis! 0,0,1(default) or 1,1,0 only effective for HAM_SO=1
  HAM_GMAX          reqd   r8       1,  1
    Energy cutoff for plane-wave mesh
 * If token is not parsed, attempt to read the following:
  HAM_FTMESH        reqd   i4v      3,  1
    No. divisions for plane-wave mesh along each of 3 lattice vectors.
   Supply one number for all vectors or a separate number for each vector.
 HAM_TOL           opt    r8       1,  1          default= 0.100D-05
    w.f. tolerance for FT mesh
 HAM_FRZWF         opt    lg       1,  1          default= F
    Set to freeze augmentation wave functions for all species
 HAM_FORCES        opt    i4       1,  1          default= 0
    Controls the ansatz for density shift in force calculation.
   -1 no force: no shift
    1 free-atom shift  12 screened core+nucleus
 HAM_XCFUN         opt    i4       1,  1          default= 2
    Specifies local exchange correlation functional:
   1 for Ceperly-Alder (VWN)
   2 for Barth-Hedin (ASW fit)
   103 for PBE-GGA (use xcpbe.F in ABINIT
 HAM_ScaledSigma   opt    r8       1,  1          default= 1
    =\alpha_Q for QSGW-LDA hybrid. \alpha \times (\Sigma-Vxc^LDA) is added to LDA/GGA Hamiltonian.
 HAM_EWALD         opt    lg       1,  1          default= F
    Make strux by Ewald summation
 HAM_OVEPS         opt    r8       1,  1          default= 0.100D-06
    Diagonalize hamiltonian in reduced hilbert space,
   discarding part with evals of overlap < OVEPS
 HAM_PWMODE        opt    i4       1,  1          default= 0
    Controls APW addition to LMTO basis. Use 11 usually.
   1s digit:
     LMTO basis only
     Mixed LMTO+PW
     PW basis only
   10s digit:
     PW basis G is given at q=0
     PW basis q-dependent. |q+G| cutoff
   (for jobgw=1, lmf automatically set PWMODE=11)
 ```
  <!-- HAM_PMIN          opt    r8v     10,  1
    Global minimum in fractional part of P-functions.
   Enter values for l=0..:
   0: no minimum constraint
   #: with #<1, floor of fractional P is #
   1: use free-electron value as minimum
  HAM_PMAX          opt    r8v     10,  1
    Global maximum in fractional part of P-functions.
   Enter values for l=0..:
   0: no maximum constraint
   #: with #<1, ceiling of fractional P is # -->

 <!-- HAM_PWEMIN        opt    r8       1,  1          default= 0
    Include APWs with energy E > PWEMIN (Ry) -->
```
  HAM_PWEMAX        opt    r8       1,  1          default= 0
    Include APWs with energy E < PWEMAX (Ry)
 HAM_READP         opt    lg       1,  1          default= F
    Read Pnu and PZ (b.c. of radial func) from atmpnu.*(by lmfa) when we have no rst file
 HAM_V0FIX         opt    lg       1,  1          default= F
    Fix potential of radial functions-->Fix radial func. if READP=T together
 HAM_PNUFIX        opt    lg       1,  1          default= F
    Fix b.c. of radial functions
 SYMGRP            opt    chr      1,  0
    Generators for symmetry group
 SYMGRPAF          opt    chr      1,  0
    One (or multiple) Extra Generator for adding anti ferro symmetry
```    
  <!-- --- Parameters for species data ---
  * The next four tokens apply to the automatic sphere resizer
 SPEC_SCLWSR       opt    r8       1,  1          default= 0
    Scales sphere radii, trying to reach volume = SCLWSR * cell volume
   SCLWSR=0 turns off this option.
   Add  10  to initially scale non-ES first;
    or  20  to scale ES independently.
 SPEC_OMAX1        opt    r8v      3,  1          default= 0 0 0
    Limits max sphere overlaps when adjusting MT radii
 SPEC_OMAX2        opt    r8v      3,  1          default= 0 0 0
    Sphere overlap constraints of second type
 SPEC_WSRMAX       opt    r8       1,  1          default= 0
    If WSRMAX is nonzero, no sphere radius may exceed its value -->

### SPEC_ATOM
   The following tokens are input for each species. See examples.

```
  SPEC_ATOM         reqd   chr      1,  0
    Species label
  SPEC_ATOM_Z       reqd   r8       1,  1
    Atomic number
  SPEC_ATOM_R       reqd   r8       1,  1
    Augmentation sphere radius rmax
 * If token is not parsed, attempt to read the following:
  SPEC_ATOM_R/W     reqd   r8       1,  1
    rmax relative to average WS radius
 * If token is not parsed, attempt to read the following:
  SPEC_ATOM_R/A     reqd   r8       1,  1
    rmax ratio to alat
 SPEC_ATOM_A       opt    r8       1,  1          default depends on other input
    Radial mesh point spacing parameter
 SPEC_ATOM_NR      opt    i4       1,  1          default= 51
    Number of radial mesh points
  SPEC_ATOM_RSMH    reqd   r8v     10,  1
    Smoothing radii for basis. Gives l-cut max for base
  SPEC_ATOM_EH      reqd   r8v     10,  0
    Kinetic energies for basis
  SPEC_ATOM_RSMH2   opt    r8v     10,  1
    Basis smoothing radii, second group 
  SPEC_ATOM_EH2     opt    r8v     10,  0
    Basis kinetic energies, second group
 SPEC_ATOM_LMX     opt    i4       1,  1          default= 10
    optional l-cutoff for basis
 SPEC_ATOM_LMXA    opt    i4       1,  1          default depends on other input
    l-cutoff for augmentation
 SPEC_ATOM_LMXL    opt    i4       1,  1          default depends on other input
    lmax for which to accumulate rho,V in sphere
 SPEC_ATOM_P       opt    r8v      1,  1          default= 0
    Starting log der. parameters for each l
 SPEC_ATOM_Q       opt    r8v      1,  1          default= 0
    Starting valence charges for each l channel.
   Q do not include semicore(PZ) electrons.
   Charge configuration is shown by lmfa
   WARN: This version cannot treat two valence channels
   per l (Q for a l-channl is zero if the l is with PZ).
   This causes a problem typically in Li; then we 
   can not treat both of PZ=1.9 and P=2.2 as valence.
   To avoid this, use Q=0,1 together. This trick supply an 
   electron to 2p channel; this trick works fine.
 SPEC_ATOM_MMOM    opt    r8v      1,  1          default= 0
    Starting mag. moms for each l channel.
   For a chanel with PZ, this is enforced to be zero.
   See explanation for SPEC_ATOM_Q.
 SPEC_ATOM_NMCORE  opt    i4       1,  1          default= 0
    spin-averaged core: jun2012takao
   0(default): spin-polarized core
   1         : spin-averaged core density is from spin-averaged potential
 SPEC_ATOM_PZ      opt    r8v      1,  1          default= 0
    Starting semicore log der. parameters
     Add 10 to attach Hankel tail
 SPEC_ATOM_LFOCA   opt    i4       1,  1          default depends on other input
    FOCA switch 0(within MT):=1(frozenCore). Default: 1 for z>8;0 for z<=8
 SPEC_ATOM_KMXA    opt    i4       1,  1          default= 3
    k-cutoff for projection of wave functions in sphere.
 SPEC_ATOM_RSMA    opt    r8       1,  1          default depends on other input
    Smoothing for projection of wave functions in sphere.
   input<0 => choose default * -input
 SPEC_ATOM_IDMOD   opt    i4v      1,  1          default= 0
    idmod=0 floats P to band CG, 1 freezes P, 2 freezes enu
 SPEC_ATOM_CSTRMX  opt    lg       1,  1          default= F
    Set to exclude this species when automatically resizing sphere radii (SCLWSR>0)
 SPEC_ATOM_FRZWF   opt    lg       1,  1          default= F
    Set to freeze augmentation wave functions for this species
  * ... The next three tokens are for LDA+U
 SPEC_ATOM_IDU     opt    i4v      4,  1          default= 0 0 0 0
    LDA+U mode:  0 nothing, 1 AMF, 2 FLL, 3 mixed; +10: no LDA+U if sigm.* exist
 SPEC_ATOM_UH      opt    r8v      4,  1          default= 0 0 0 0
    Hubbard U for LDA+U
 SPEC_ATOM_JH      opt    r8v      4,  1          default= 0 0 0 0
    Exchange parameter J for LDA+U
  SPEC_ATOM_C-HOLE  opt    chr      1,  0
    Channel for core hole
 SPEC_ATOM_C-HQ    opt    r8v      2,  2          default= -1 0
    Charge in core hole.  Optional 2nd entry is moment of core hole:
   Q(spin1) = full + C-HQ(1)/2 + C-HQ(2)/2
   Q(spin2) = full + C-HQ(1)/2 - C-HQ(2)/2
 SPEC_ATOM_EREF    opt    r8       1,  1          default= 0
    Reference energy subtracted from total energy
```

### SITE
 * The following tokens are input for each site. See examples.
```
  SITE_ATOM         reqd   chr      1,  0
    Species label
  SITE_ATOM_POS     reqd   r8v      3,  1
    Atom coordinates, cartesian in alat
 * If token is not parsed, attempt to read the following:
  SITE_ATOM_XPOS    reqd   r8v      3,  1
    Atom POS. fractional(POSCAR direct) coordinates
 SITE_ATOM_RELAX   opt    i4v      3,  1          default= 1 1 1
    relax site positions (lattice dynamics) or Euler angles (spin dynamics)
 SITE_ATOM_AF      opt    i4       1,  1          default= 0
    antiferro ID:=i and -i should be af-pair, we look for space-group operation with spin-flip
  STR_RMAXS         opt    r8       1,  1
    Radial cutoff for strux, in a.u.
 * If token is not parsed, attempt to read the following:
 STR_RMAX          opt    r8       1,  1          default= 0
    Radial cutoff for strux, in units of avw
```

### Parameters for Brillouin zone integration ---
```
  BZ_NKABC          reqd   i4v      3,  1
    No. qp along each of 3 lattice vectors.
   Supply one number for all vectors or a separate number for each vector.
 BZ_BZJOB          opt    i4v      3,  1          default= 0
    0 centers BZ mesh at origin, 1 centers off origin
   Supply one number for all vectors or a separate number for each vector.
 BZ_METAL          opt    i4       1,  1          default= 3
    0 insulator only; 3 for metal (2 is for maintenance)
 BZ_TETRA          opt    lg       1,  1          default= T
    Tetrahedron integration
 BZ_N              opt    i4       1,  1          default= 0
    N>0: Polynomial order for Methfessel-Paxton sampling
    N=0: Conventional Gaussian sampling
    N<0: Broadening by Fermi-Dirac distribution
    To be used in conjunction with W= ; see next
 BZ_W              opt    r8       1,  1          default= 0.500D-02
    If BZ_N>=0, Line broadening for sampling integratio
 If BZ_N<0,  Temperature for Fermi distribution (Ry)
 BZ_ZBAK           opt    r8       1,  1          default= 0
    Homogeneous background charge
 BZ_SAVDOS         opt    i4       1,  1          default= 0
    Choose 0(F) or 1(T): Write dos.tot.* file (settings are NPTS and DOS)
 BZ_NPTS           opt    i4       1,  1          default= 2001
    No. DOS points (sampling integration)
 BZ_DOSMAX         opt    r8       1,  1          default= 2.940
    Maximum energy to which DOS accumulated, relative to Efermi
 BZ_EFMAX          opt    r8       1,  1          default= 5
    Find evecs up to efmax
 BZ_NEVMX          opt    i4       1,  1          default= 0
    Find at most nevmx eigenvectors
   If NEVMX=0, program uses internal default
   If NEVMX<0, no eigenvectors are generated
 BZ_FSMOM          opt    r8       1,  1          default depends on other input
    Fixed-spin moment (fixed-spin moment method)
 BZ_FSMOMMETHOD    opt    i4       1,  1          default= 0
    Method of Fixed-spin moment 0:original 1:discrete
```

 <!-- EWALD_AS          opt    r8       1,  1          default= 2
    Ewald smoothing parameter 
 EWALD_NKDMX       opt    i4       1,  1          default= 3000
    Ewald tolerance
    -->

### Parameters for Ewald sums ---
```
 EWALD_TOL         opt    r8       1,  1          default= 0.100D-07
    Ewald tolerance
```    
### Parameters for iterations ---
```    
 ITER_NIT          opt    i4       1,  1          default= 30
    maximum number of iterations in self-consistency cycle
 ITER_NRMIX        opt    i4       1,  1          default= 80
    lmfa rseq max iter
  ITER_MIX          opt    chr      1,  0
    Mixing rules for charge mixing.  Syntax:
   A[nmix][,b=beta][,bv=betv][,n=nit][,w=w1,w2][,nam=fn][,k=nkill][;...] or
   B[nmix][,b=beta][,bv=betv][,wc=wc][,n=#][,w=w1,w2][,nam=fn][,k=nkill]
 ITER_CONV         opt    r8       1,  1          default= 0.100D-03
    Tolerance in energy change from prior iteration for self-consistency
 ITER_CONVC        opt    r8       1,  1          default= 0.100D-03
    Tolerance in output-input charge for self-consistency
 ITER_UMIX         opt    r8       1,  1          default= 0.500
    Mixing parameter for densmat in LDA+U
 ITER_TOLU         opt    r8       1,  1          default= 0
    Tolerance for densmat in LDA+U
 mmmixing parameters: A/B nmix wt: 0 -1 1.000000  1.000000 -9.000000 beta elin wc killj=  1.000000 -1.000000 0
```    
### Parameters for dynamics and statics ---
```    
 DYN_MODE          opt    i4       1,  1          default= 0
    0: no relaxation  
    4: relaxation: conjugate gradients  
    5: relaxation: Fletcher-Powell  
    6: relaxation: Broyden
 DYN_NIT           opt    i4       1,  1          default= 1
    maximum number of relaxation steps (statics) or time steps (dynamics)
 DYN_HESS          opt    lg       1,  1          default= T
    Read hessian matrix
 DYN_XTOL          opt    r8       1,  1          default= 0.100D-02
    Convergence criterion in displacements
   XTOL>0: use length; <0: use max val; =0: do not use
 DYN_GTOL          opt    r8       1,  1          default= 0
    Convergence criterion in gradients
   GTOL>0: use length;  <0: use max val;  =0: do not use
 DYN_STEP          opt    r8       1,  1          default= 0.015
    Initial (and maximum) step length
 DYN_NKILL         opt    i4       1,  1          default= 0
    Remove hessian after NKILL iter
```    

### lmf console input

usage:  lmf [--OPTION] [-var-assign] [extension] 
```
  usage:  lmfgwd [--OPTION] [-var-assign] [extension]

 --help         List categories, tokens, and data program expects, and quit
 --show         Print control file after parsing by preprocessor,
                and echo input data as read from the control file
 --pr=#1        Set the verbosity (stack) to values #1
 --time=#1[,#2] Print timing info to # levels (#1=summary; #2=on-the-fly)

 -vnam=expr     Define numerical variable "nam"; set to result of 'expr'
  --jobgw=1 or 2       lmf-MPIK works as the GW driver (previous lmfgw-MPIK)
  --quit=band, --quit=mkpot or --quit=dmat: Stop points. Surpress writing rst

  NOTE: Read rst.* prior to atm.* file (No --rs options: 2022-6-20)
  NOTE: Other command-line-options => Search "call cmdopt" in SRC/*/*.f90
```
