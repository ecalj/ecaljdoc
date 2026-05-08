# Samples — what's where in `ecalj/Samples/`

This page is a thin index over the [`ecalj/Samples/`](https://github.com/ecalj/ecalj/tree/master/Samples)
tree.  Each row points at the per-directory README that owns the
authoritative description; the role / what-to-start-with column is
meant to help you pick the right entry point without opening every
sub-tree.

## Top-level layout (since 2026-05)

```
ecalj/Samples/
├── README.md          (https://github.com/ecalj/ecalj/blob/master/Samples/README.md)
├── EPS/               TOML-migrated, testecalj-runnable
├── MLOsamples/        TOML-migrated, testecalj-runnable
├── PROCAR/            TOML-migrated, testecalj-runnable
├── TestInstall/       TOML-migrated, testecalj-runnable (install validation)
└── Legacy/            still ctrl.<sname> + GWinput — needs Legacy2toml.py
```

The four migrated directories are what `lmf` / `gwsc` / `eps_lmfh` / ...
read out-of-the-box.  `Legacy/` holds 26 directories that pre-date the
TOML migration — convert in place with `Legacy2toml.py <sname>` before
running.  See [TOML migration](./toml_migration) for the conversion
flow.

## TOML-migrated samples (testecalj-runnable)

| dir | physics / role | per-dir README | doc page |
|---|---|---|---|
| **EPS/EPS_Cu** | dielectric ε(q,ω), epsPP0, FCC metal | (this page below) | [Dielectric function § epsPP0](./optical) |
| **EPS/EPS_GaAs** | ε(q,ω), GaAs zinc-blende semiconductor | — | [./optical](./optical) |
| **EPS/EPS_Ag** | ε(q,ω), Ag (FCC, no LFC) | — | [./optical](./optical) |
| **MLOsamples/** (17 dirs) | MTO Localized Orbitals (Wannier replacement); SOC variants; on-site W via `job_mloW` | [MLOsamples/README.md](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README.md) | [README_SOC.md](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README_SOC.md) |
| **PROCAR/MgO_PROCAR** | fat-band weight; O-2p projection on MgO bands | (in test.py) | (this page below) |
| **PROCAR/Ni2MnGa_L21_PROCAR** | per-atom fat band; FM Heusler; ships converged `rst.ni2mnga` | (in test.py) | (this page below) |
| **TestInstall/** (23 dirs) | install validation: ground-state, GW (`gwsc`), eps (`eps_lmfh`, `epsPP_lmfh`), ChiPM, cRPA | (per dir; driven by `testecalj --all`) | [./gwsc](./gwsc), [./optical](./optical) |

### `Samples/MLOsamples/` quick map (17 testecalj cases)

The dedicated [MLOsamples/README.md](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README.md)
table has roles + reference data per case.  Highlights:

- `Si666gwsc`, `GaAsSoc`, `FeSoc`, `FeMgOSoc` — SOC-as-perturbation tests
- `C`, `C.sp`, `Cu`, `SrTiO3` — non-magnetic semiconductors / metals
- `Fe`, `FeCo`, `FeMgO` — magnetic metals (no SOC)
- `Al2O3_Cr`, `GdCo5`, `GdION`, `NiO666lda`, `RuO2` — LDA+U / 4f / AFM
- `Fe`'s test.py drives `job_mloW` and verifies on-site V, W−V vs
  inline reference values — see
  [MLOsamples/README.md § Regression test (testecalj Fe)](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README.md#regression-test-testecalj-fe).

### `Samples/TestInstall/` what each tests

Driven by `testecalj --all -np 8` from inside the directory.  Coverage
table (one-line role per dir):

| dir | tool exercised |
|---|---|
| `c`, `te`, `zrt`, `co`, `cr3si6`, `felz`, `gasls`, `eras`, `crn`, `cu`, `na` | LDA / lmf install validation |
| `copt` | LDA + force calculation |
| `gas_eps_lmfh`, `gas_epsPP_lmfh` | dielectric ε(q,ω) (with / without LFC) on GaAs |
| `fe_epsPP_lmfh_chipm` | spin susceptibility χ⁻⁻ on bcc Fe |
| `si_gw_lmfh`, `gas_pw_gw_lmfh`, `si_gwsc`, `gas_gwsc`, `nio_gwsc`, `fe_gwsc` | one-shot GW vs full QSGW (`gwsc`) |
| `ni_crpa`, `srvo3_crpa` | constrained RPA |

### EPS samples — what differs across the three

Detailed worked descriptions live in [./optical](./optical).  Quick
distinguishing features:

| dir | sname | binary | BZ mesh | QforEPS | what's specific |
|---|---|---|---|---|---|
| `EPS_Cu` | `cu` | `epsPP0` | 12³ (lmf) / 10³ (gw) | 3 small q (5e-4 / 1e-3 / 2e-3 a.u.) | FCC metal, has band plot scripts |
| `EPS_GaAs` | `gaas` | `epsPP0` | 4³ / 8³ | same Cu-style 3-q | zinc-blende semiconductor |
| `EPS_Ag` | `ag` | `epsPP0` | 8³ / 8³ | Cu-style | FCC metal, no LFC; reference data 2026-05-08 generated |

All three carry committed reference EPS files (`EPS000{1,2,3}.nlfc.dat.{inter,intra}bandonly`)
and the test.py compares them with skipcond on the intra-band 1/(ω+iη)
divergence.  `testecalj EPS_Cu / EPS_GaAs / EPS_Ag -np 4` each yields
6/6 PASSED.

## Legacy/ — awaiting TOML migration

[`Samples/Legacy/`](https://github.com/ecalj/ecalj/tree/master/Samples/Legacy)
holds 26 directories that still use legacy `ctrl.<sname>` + (sometimes)
`GWinput`.  They are kept because the prose / setup is still useful
as a teaching reference, but `lmf` / `gwsc` won't read them until
converted with `Legacy2toml.py <sname>`.

Two of the 26 are testecalj-runnable once migrated; the rest are
example/educational directories (no `test.py`).  See
[`Samples/README.md`](https://github.com/ecalj/ecalj/blob/master/Samples/README.md)
for the full table — this page does not duplicate it.

## Where each Samples-related description in ecaljdoc lives

To minimise duplication across pages, each topic is owned by one
page; this Samples page only points:

| topic | owner page |
|---|---|
| TOML migration / `Legacy2toml.py` workflow | [./toml_migration](./toml_migration) |
| `ctrlG.<sname>.toml` schema and the legacy ↔ TOML key map | [./lmf](./lmf) |
| `GWinput` (historical legacy text format reference) | [./gwinput](./gwinput) |
| QSGW with `gwsc` end-to-end | [./gwsc](./gwsc) |
| Dielectric ε(q,ω) (`epsPP0`, `eps_lmfh`, `epsPP_lmfh`) | [./optical](./optical) |
| MLO bands + on-site W (`job_mloW`) | [MLOsamples/README.md](https://github.com/ecalj/ecalj/blob/master/Samples/MLOsamples/README.md) |
| `ecalj_auto` batch runner | [./auto](./auto) |
| End-to-end tutorial (POSCAR → QSGW) | [./README_tutorial](./README_tutorial) |

If you want to add a new Samples directory, the conventions live in
[./developer](./developer) (`testecalj`, `comp.py`, naming).
