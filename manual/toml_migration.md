# TOML migration (2026-05)

> 🤖 **Auto-edited by Claude (Opus 4.7) — verify before relying on details.**
> This page and the TOML-migration banners across ecaljdoc were drafted in
> a single Claude Code session (commit `86e7646` on `main`). The shape is
> right (file roles, conversion command, sample dirs, gotchas all reflect
> the actual ecalj state at master `7ee2d7c13` / `c4bf09418` plus the
> nvfortran cherry-pick `f693848ce`), but specific commit hashes, line
> counts, and English wording may need a human pass. Flag anything that
> reads off and either fix it directly or open an issue.

As of **May 2026**, the Fortran binaries (`lmf`, `lmfa`, `lmchk`, `gwsc`,
`hsfp0`, `eps_lmfh`, `epsPP_lmfh`, `epsPP0`, `mlo`, ...) read **structured
TOML only**. Legacy `ctrl.<sname>` and `GWinput` text files are no longer
parsed by Fortran — they are kept around as developer references but
must be converted before any binary is invoked.

## The two TOML files

| file | role | scope |
|---|---|---|
| `ctrlg.<sname>.toml` | merged ctrl + GW driver sections + product-basis cut-offs | sname-specific |
| `PB.<sname>.toml` | per-atom product-basis tables (`nlx`, `valence`, `core`) | sname-free, shared per spec |

> **`PB.<sname>.toml` is for the GW path only — normally no hand editing.**
> It feeds the mixed-product-basis generator (`hbasfp0` / `hvccfp0`
> etc.) used by `gwsc`, the eps tools and `mlo`'s W-side. It is
> auto-emitted by `ctrlgenToml.py` (or `Legacy2toml.py`); leave it
> as generated. All hand edits live in `ctrlg.<sname>.toml`.
>
> If you have a pure DFT / no-GW workflow (just `lmf` / `lmfa` /
> band plots) and don't want the GW sections at all, pass
> **`--skipgw`** to `ctrlgenToml.py` — that skips the
> `lmfa → lmf --jobgw=0 → gwinit` sub-step, omits
> `[gw]` / `[product_basis]` / `[blocks]` from the output, and does
> not write `PB.<sname>.toml`.
>
> **Adding GW sections later (preserving your hand-edits):** use
> `ctrlgenToml.py <sname> --addgw`. This appends `[gw]` /
> `[product_basis]` / `[blocks]` and writes `PB.<sname>.toml` **without
> regenerating the ctrl-side keys** — your edits to `[bz]`, `[ham]`,
> `[[spec]]` etc. are preserved as is. It refuses to run if `[gw]`
> is already present (to avoid silent duplication). Do **not** plain
> re-run `ctrlgenToml.py <sname>` for this purpose: the default flow
> overwrites the whole `ctrlg.<sname>.toml` from `ctrls.<sname>` (the
> previous file is moved to `ctrlg.<sname>.toml.bakup`, one-generation
> backup only).

`<sname>` is the user-defined material extension (e.g. `si`, `cu`, `gaas`,
`fe`, ...). One working directory normally has exactly one
`ctrlg.<sname>.toml`; `lmf` auto-detects it without a positional argument
when run inside the directory.

## Migration of an existing legacy directory

```bash
# inside an old directory containing ctrl.<sname> [+ GWinput]
Legacy2toml.py <sname>
# produces ctrlg.<sname>.toml + PB.<sname>.toml
# resume normal workflow (lmf, gwsc, eps_lmfh, ...) unchanged
```

`Legacy2toml.py` lives at `ecalj/SRC/exec/Legacy2toml.py` (installed in
`~/bin/` along with the binaries by `InstallAll.py`). It is idempotent
and prints `[INFO] / [WARN] / [ERROR]` diagnostics for any
command-line `-v` overrides that would not survive the conversion.

## Run-time `--ctrlg:` overrides

`%const` constants embedded in the legacy `ctrl.<sname>` are baked into
`ctrlg.<sname>.toml` at conversion time. Run-time overrides use
`--ctrlg:<dotted.path>=<value>`, processed in-memory by
`m_toml_override.f90` (no on-disk rewrite):

```bash
# OLD (no longer parsed — silently ignored or aborted)
lmf si -vnk=8 -vmetal=3
lmf si -v[bz.nkabc]=[8,8,8] -v[bz.metal]=3
lmf si --toml.bz.nkabc=[8,8,8] --toml.bz.metal=3

# NEW
lmf si --ctrlg:bz.nkabc=[8,8,8] --ctrlg:bz.metal=3
```

The text after `--ctrlg:` is the dotted TOML path (`section.key`); the
value parses as TOML (`[8,8,8]` for an integer vector, `true`/`false`
lowercase for bools, quoted strings, etc.). The override layer
auto-quotes a bare identifier value (`find` → `"find"`) so that shell
quote-stripping is forgiving.

> ⚠️ **Retired override forms (all abort with a hint).**
> Earlier iterations of the migration accepted several override
> spellings (`-v<NAME>=<VAL>`, `-v[<path>]=<VAL>`, `--[<path>]=<VAL>`,
> `--<a.b.c>=<VAL>`, `--toml.<path>=<VAL>`, `--pr=N`, `--time=N,M`,
> `--phispinsym`). They are all gone; any of them on the cmdline
> triggers a one-line abort pointing at the canonical
> `--ctrlg:<path>=<value>` form.
>
> - `--ctrlg:bz.nkabc=[8,8,8]` — directly set the value at TOML path
>   `[bz].nkabc` in `ctrlg.<sname>.toml` for this run, in memory.
>   No `%const` indirection; no on-disk rewrite. The path must match
>   a real key in the schema. Each applied override is logged on
>   rank 0 so it appears in `llmf` etc.
>
> Practical consequences:
>
> - Old habits like `-vmetal=3`, `-vnspin=2 -vso=0` abort with a
>   migration hint. Use `--ctrlg:bz.metal=3`,
>   `--ctrlg:ham.nspin=2 --ctrlg:ham.so=0`.
> - `Legacy2toml.py` prints `[INFO] / [WARN] / [ERROR]` diagnostics
>   for any `%const` overrides it encounters during conversion to
>   help spot silent breakages.

## Migrated samples (use these as templates)

The following directories under `ecalj/Samples/` are fully TOML-migrated
and pass `testecalj`:

| dir | role |
|---|---|
| [Samples/MLOsamples/](https://github.com/tkotani/ecalj/tree/main/Samples/MLOsamples) | MuffinTin Localized Orbitals (Wannier replacement). 17 samples — see [MLOsamples/README.md](https://github.com/tkotani/ecalj/blob/main/Samples/MLOsamples/README.md) |
| [Samples/TestInstall/](https://github.com/tkotani/ecalj/tree/main/Samples/TestInstall) | install validation suite. 23 samples driven by `testecalj --all` |
| [Samples/EPS/](https://github.com/tkotani/ecalj/tree/main/Samples/EPS) | dielectric function ε(q,ω) — `EPS_Cu`, `EPS_GaAs`, `EPS_Ag` (epsPP0) |
| [Samples/PROCAR/](https://github.com/tkotani/ecalj/tree/main/Samples/PROCAR) | fat-band weight — `MgO_PROCAR`, `Ni2MnGa_L21_PROCAR` |

The catch-all index for the sample tree is
[Samples/README.md](https://github.com/tkotani/ecalj/blob/main/Samples/README.md).

## Legacy (awaiting migration)

Everything else lives under [`Samples/Legacy/`](https://github.com/tkotani/ecalj/tree/main/Samples/Legacy)
and still uses `ctrl.<sname>` + `GWinput`. To run any of those, first
`Legacy2toml.py <sname>` inside a working copy of the directory, then
proceed as usual. The Legacy/ subgroups include `Magnon/`,
`AFsymmetry/` (with `test.py`) plus 24 example/educational directories.

## Result summaries (worked-out reference values)

- [MLOsamples/README.md § Reference value: bcc Fe Fe-3d on-site W](https://github.com/tkotani/ecalj/blob/main/Samples/MLOsamples/README.md#reference-value-bcc-fe-fe-3d-on-site-w-with---mlo_feb4) — bcc Fe Fe-3d on-site screened W ~1.5 eV (job_mloW reproduction, 2×2×2 vs 4×4×4 BZ)
- [MLOsamples/README.md § Regression test (testecalj Fe)](https://github.com/tkotani/ecalj/blob/main/Samples/MLOsamples/README.md#regression-test-testecalj-fe) — automated diagonal V/W-V check against inline reference values
- [MLOsamples/README_SOC.md](https://github.com/tkotani/ecalj/blob/main/Samples/MLOsamples/README_SOC.md) — SOC-as-perturbation variant (`job_mlo_soc`)

## Auto-job runner (`ecalj_auto`)

For batch QSGW / GW jobs across many materials, see
[ecalj_auto/README.md](https://github.com/tkotani/ecalj/blob/main/ecalj_auto/README.md)
and [ecalj_auto/README_slot_scheduler.md](https://github.com/tkotani/ecalj/blob/main/ecalj_auto/README_slot_scheduler.md).
The `auto/` driver consumes `ctrlg.<sname>.toml` directly (no legacy
fallback) and dispatches to `jobtemplate.{kugui,ohtaka,ucgw,...}` for
SLURM/PBS clusters.

## Common gotchas

- **Retired override forms** — `lmf` aborts on `-vnspin=2 -vso=0`,
  `-v[ham.so]=1`, `--toml.ham.so=1`, `--pr=50`, `--time=5,5`,
  `--phispinsym`. Each abort prints the canonical
  `--ctrlg:<path>=<value>` replacement.
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
