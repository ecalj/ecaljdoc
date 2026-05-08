# TOML migration (2026-05)

As of **May 2026**, the Fortran binaries (`lmf`, `lmfa`, `lmchk`, `gwsc`,
`hsfp0`, `eps_lmfh`, `epsPP_lmfh`, `epsPP0`, `mlo`, ...) read **structured
TOML only**. Legacy `ctrl.<sname>` and `GWinput` text files are no longer
parsed by Fortran — they are kept around as developer references but
must be converted before any binary is invoked.

## The two TOML files

| file | role | scope |
|---|---|---|
| `ctrlG.<sname>.toml` | merged ctrl + GW driver sections + product-basis cut-offs | sname-specific |
| `PB.toml` | per-atom product-basis tables (`nlx`, `valence`, `core`) | sname-free, shared per spec |

`<sname>` is the user-defined material extension (e.g. `si`, `cu`, `gaas`,
`fe`, ...). One working directory normally has exactly one
`ctrlG.<sname>.toml`; `lmf` auto-detects it without a positional argument
when run inside the directory.

## Migration of an existing legacy directory

```bash
# inside an old directory containing ctrl.<sname> [+ GWinput]
Legacy2toml.py <sname>
# produces ctrlG.<sname>.toml + PB.toml
# resume normal workflow (lmf, gwsc, eps_lmfh, ...) unchanged
```

`Legacy2toml.py` lives at `ecalj/SRC/exec/Legacy2toml.py` (installed in
`~/bin/` along with the binaries by `InstallAll.py`). It is idempotent
and prints `[INFO] / [WARN] / [ERROR]` diagnostics for any
command-line `-v` overrides that would not survive the conversion.

## Run-time `-v` overrides

`%const` constants embedded in the legacy `ctrl.<sname>` are baked into
`ctrlG.<sname>.toml` at conversion time. Run-time overrides have moved
from `-v<NAME>=<VAL>` to bracketed TOML-path syntax processed in-memory
by `m_toml_override.f90` (no on-disk rewrite):

```bash
# OLD (still works only for legacy ctrl, not for ctrlG.toml)
lmf si -vnk=8 -vmetal=3

# NEW
lmf si -v[bz.nkabc]=[8,8,8] -v[bz.metal]=3
```

The bracketed key is the dotted TOML path (`[section.key]`); the value
parses as TOML too (`[8,8,8]` for an integer vector).

## Migrated samples (use these as templates)

The following directories under `ecalj/Samples/` are fully TOML-migrated
and pass `testecalj`:

| dir | role |
|---|---|
| [Samples/MLOsamples/](https://github.com/ecalj/ecalj/tree/master/Samples/MLOsamples) | MuffinTin Localized Orbitals (Wannier replacement). 17 samples — see [MLOsamples/README.md](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README.md) |
| [Samples/TestInstall/](https://github.com/ecalj/ecalj/tree/master/Samples/TestInstall) | install validation suite. 23 samples driven by `testecalj --all` |
| [Samples/EPS/](https://github.com/ecalj/ecalj/tree/master/Samples/EPS) | dielectric function ε(q,ω) — `EPS_Cu`, `EPS_GaAs`, `EPS_Ag` (epsPP0) |
| [Samples/PROCAR/](https://github.com/ecalj/ecalj/tree/master/Samples/PROCAR) | fat-band weight — `MgO_PROCAR`, `Ni2MnGa_L21_PROCAR` |

The catch-all index for the sample tree is
[Samples/README.md](https://github.com/ecalj/ecalj/blob/master/Samples/README.md).

## Legacy (awaiting migration)

Everything else lives under [`Samples/Legacy/`](https://github.com/ecalj/ecalj/tree/master/Samples/Legacy)
and still uses `ctrl.<sname>` + `GWinput`. To run any of those, first
`Legacy2toml.py <sname>` inside a working copy of the directory, then
proceed as usual. The Legacy/ subgroups include `Magnon/`,
`AFsymmetry/` (with `test.py`) plus 24 example/educational directories.

## Result summaries (worked-out reference values)

- [MLOsamples/README.md § Reference value: bcc Fe Fe-3d on-site W](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README.md#reference-value-bcc-fe-fe-3d-on-site-w-with---mlo_feb4) — bcc Fe Fe-3d on-site screened W ~1.5 eV (job_mloW reproduction, 2×2×2 vs 4×4×4 BZ)
- [MLOsamples/README.md § Regression test (testecalj Fe)](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README.md#regression-test-testecalj-fe) — automated diagonal V/W-V check against inline reference values
- [MLOsamples/README_SOC.md](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README_SOC.md) — SOC-as-perturbation variant (`job_mlo_soc`)

## Auto-job runner (`ecalj_auto`)

For batch QSGW / GW jobs across many materials, see
[ecalj_auto/README.md](https://github.com/ecalj/ecalj/blob/master/ecalj_auto/README.md)
and [ecalj_auto/README_slot_scheduler.md](https://github.com/ecalj/ecalj/blob/master/ecalj_auto/README_slot_scheduler.md).
The `auto/` driver consumes `ctrlG.<sname>.toml` directly (no legacy
fallback) and dispatches to `jobtemplate.{kugui,ohtaka,ucgw,...}` for
SLURM/PBS clusters.

## Common gotchas

- **`-v` form mismatch** — `lmf` will silently ignore `-vnspin=2 -vso=0`
  under TOML mode; use `-v[ham.nspin]=2 -v[ham.so]=0`.
- **Stale `Worb` blocks** — `gwinput2toml.py` (the GWinput leg of
  `Legacy2toml.py`) used to last-write-wins on duplicate `<Worb>` blocks;
  now keeps the first.
- **`mlo_emax = 0` literal** — TOML reader now honours an explicit `0`;
  the historical "0 means default" sentinel was retired.
- **gfortran 13.3 / 14.2 codegen** — a documented codegen bug was
  worked around in `m_HamPMT.f90` (one-line bait
  `aaa = trim(aaa) // ' '`); see commits `35ee9f225` and `f693848ce`
  on master.

For nvfortran 26.1 specifically: `findloc` runtime crashes on logical
arrays were fixed by adding `use m_nvfortran, only: findloc` to the
seven affected source files (commit `f693848ce`).
