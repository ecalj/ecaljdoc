# `lmf`

## solving the Kohn-Sham equation

- **Usage**: `mpirun lmf [FLAGS] [TARGET] > llmf`

Example:
```
mpirun -np 4 lmf si > llmf
```

## Flags
### `-quit=band`
### `-tdos`

## Input 

- ctrl.`target`

[options]
- syml.`target`
    for band plot
- sigm.`target`
    a part of QSGW calculation

## Output
### rst.`target`
- restart file : 主に電荷密度が保持されている

### save.`target`
- 実行したコマンド(lmf, lmfa)および, SCFステップごとのエネルギーが記載されている．

### mix.`target`

- **Main Source** : [`SRC/main/lmf`](https://github.com/tkotani/ecalj)
