# GitHub Projects Board

Live board: **https://github.com/users/escaleirex/projects/2**

Use **GitHub Projects** (not a giant TODO markdown file) as the engineering board.

## Recommended columns (Status)

```
Backlog → RFC Writing → Ready → In Progress → Review → Testing → Done
```

If the board still shows default Todo / In Progress / Done, rename/add Status options in the Project UI to match the pipeline above.

## Rules

1. Every major gameplay/engine feature starts as a **GitHub Issue**.
2. Issues that need design move to **RFC Writing** and link `rfcs/XXXX-*.md`.
3. Implementation only after RFC **Accepted** (when RFC-required).
4. Issues link related docs under `docs/`.
5. PRs reference issues (`Closes #N`) and RFCs.

## Seed issues (created)

| # | Title | Phase |
|---|-------|-------|
| [#1](https://github.com/escaleirex/Afterlife-Framework/issues/1) | Event Bus | 1 |
| [#2](https://github.com/escaleirex/Afterlife-Framework/issues/2) | Registries | 1 |
| [#3](https://github.com/escaleirex/Afterlife-Framework/issues/3) | Round Director | 2 |
| [#4](https://github.com/escaleirex/Afterlife-Framework/issues/4) | Spawn Director | 2 |
| [#5](https://github.com/escaleirex/Afterlife-Framework/issues/5) | AI Director / Enemy AI | 2 |
| [#6](https://github.com/escaleirex/Afterlife-Framework/issues/6) | Weapon Registry & Pipeline | 2 |
| [#7](https://github.com/escaleirex/Afterlife-Framework/issues/7) | Perk System | 2 |
| [#8](https://github.com/escaleirex/Afterlife-Framework/issues/8) | Consumables Framework | 2 |
| [#9](https://github.com/escaleirex/Afterlife-Framework/issues/9) | Upgrade Station | 2 |
| [#10](https://github.com/escaleirex/Afterlife-Framework/issues/10) | Random Weapon Crate | 2 |
| [#11](https://github.com/escaleirex/Afterlife-Framework/issues/11) | Afterlife Hub | 4 |
| [#12](https://github.com/escaleirex/Afterlife-Framework/issues/12) | Package Formats | 3 |

Phase 1 issues (#1–#2) should move toward **Ready** first. Everything else stays in **Backlog** / **RFC Writing** until Phase gates allow.
