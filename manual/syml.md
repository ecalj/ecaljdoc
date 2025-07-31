# `syml.foobar` 
Symmetry line for the band plot.
We can generate `syml.foobar` by `getsyml`. 


## Get symmetry lines for band plot and Brillouwin zone plot.
`syml.*` is generated from `ctrl.*`. `syml.*` is needed for band plot.
After generated, you can easily edit `syml.*` for `job_band`.

At ecalj/GetSyml, we have getsyml.py, which is based on the
seekpath at https://github.com/giovannipizzi/seekpath/
and spglib at https://anaconda.org/conda-forge/spglib

### Usage: 
We have softlink getsyml.py as getsyml during InstallAll.py.
Run 
```
getsyml nio
(or)
getsyml ctrls.nio
```
. This show 3D Brillouin zone together with symmetry lines for band plot.
See [BZsamples](https://ecalj.sakura.ne.jp/BZgetsyml/) here.
The symmetry lines are written into the `syml.*` file for ecalj.
The number of divisions for `syml` is give by a crude algorism, so edit it if necessary.


### Needed citations
  In addition to usual ecalj acknowledgement, following citations are required when you make a publication.

   1.Y. Hinuma, G. Pizzi, Y. Kumagai, F. Oba, I. Tanaka, 
     Band structure diagram paths based on crystallography,
     Comp. Mat. Sci. 128, 140 (2017)
     
   2.You should also cite spglib that is an essential library used in the implementation.
     https://github.com/atztogo/spglib.git

* See Lincence.txt for spglib and seekpath.

### (memo for developer)
   a.Modify lmchk to write required information to supply reasonable.
     For example, ndiv (mesh size along lines).
   b.Numerical accuracy of calculations. 
     np.set_printoptions(precision=16) is not meaningful since we read output of lmchk

