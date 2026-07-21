# Afterlife Framework

**An open-source Unreal Engine 5 framework for round-based survival experiences.**

Afterlife Framework is not a game. It is a professional gameplay engine built with **C# (UnrealSharp)** that lets developers and mappers create multiplayer-first, discovery-driven survival maps—without hardcoding Call of Duty, without shipping objectives the engine forces on players, and without assuming singleplayer.

Maps provide content. The framework provides gameplay.

---

## What This Is

Afterlife Framework gives creators reusable, data-driven systems for:

- Round-based survival loops
- Enemy AI and spawn direction
- Point economies and map progression
- Weapons, wall buys, mystery boxes, and upgrade stations
- Perks, power-ups, consumables, and buildables
- Characters, dialogue, cutscenes, and music
- Modular game modes and mutators
- A full frontend (menus, lobby, HUD)
- **Afterlife Hub** — an in-game content platform (not Steam Workshop)
- Global mods, content packs, and map-required plugins

Everything communicates through an **Event Bus**.  
Everything is designed for **dedicated servers**.  
Everything is built for **years of backwards compatibility**.

---

## Design Pillars

| Pillar | Meaning |
|--------|---------|
| **Engine, not game** | No hardcoded IP, no forced quests, no map-owned gameplay logic |
| **Discovery, not objectives** | No built-in Main Quest / Side Quest / Mission concepts |
| **Multiplayer first** | Server authority; clients never own gameplay state |
| **Data-driven** | Registries, assets, and plugins—not magic strings in C++ |
| **Composition over inheritance** | Systems compose; maps wire content |
| **Modding first** | Maps can require and recommend mods; Hub resolves dependencies |
| **Compatibility forever** | Never intentionally break published maps |
| **Documentation over assumptions** | This repository is the single source of truth |

**Constitution (foundational law):** [`docs/00-Vision/Afterlife-Framework-Constitution.md`](docs/00-Vision/Afterlife-Framework-Constitution.md)

Full philosophy expansions: [`docs/00-Vision/philosophy/`](docs/00-Vision/philosophy/)

---

## Documentation

**Start here:** [`docs/00-Vision/Afterlife-Framework-Constitution.md`](docs/00-Vision/Afterlife-Framework-Constitution.md) → [`docs/index.md`](docs/index.md)

| Area | Path |
|------|------|
| Constitution | [`docs/00-Vision/`](docs/00-Vision/) |
| Getting Started | [`docs/00-Vision/getting-started/`](docs/00-Vision/getting-started/) |
| Architecture | [`docs/01-Engine/architecture/`](docs/01-Engine/architecture/) |
| Core Systems | [`docs/01-Engine/core/`](docs/01-Engine/core/) |
| Networking | [`docs/04-Multiplayer/`](docs/04-Multiplayer/) |
| Gameplay Systems | [`docs/02-Gameplay/`](docs/02-Gameplay/) |
| UI / Frontend | [`docs/06-UI/ui/`](docs/06-UI/ui/) |
| Lobby | [`docs/06-UI/lobby/`](docs/06-UI/lobby/) |
| Afterlife Hub | [`docs/05-Modding/hub/`](docs/05-Modding/hub/) |
| Mapping Guide | [`docs/03-Maps/`](docs/03-Maps/) |
| Modding Guide | [`docs/05-Modding/modding/`](docs/05-Modding/modding/) |
| RFC Process | [`docs/RFC/`](docs/RFC/) |
| Roadmap | [`ROADMAP.md`](ROADMAP.md) |
| Contributing | [`CONTRIBUTING.md`](CONTRIBUTING.md) |
| Changelog | [`CHANGELOG.md`](CHANGELOG.md) |

---

## Technology Stack

| Layer | Choice |
|-------|--------|
| Engine | Unreal Engine 5 |
| Gameplay language | C# via [UnrealSharp](https://github.com/UnrealSharp/UnrealSharp) |
| Networking | UE5 replication + dedicated server authority |
| Content delivery | Afterlife Hub (first-party) |
| License | GNU GPL v3 (see [`LICENSE`](LICENSE)) |

---

## Repository Layout

```
Afterlife-Framework/
├── .github/               # Issues, PR template, workflows, Projects notes
├── .cursor/rules/         # constitution, architecture, coding, …
├── docs/
│   ├── 00-Vision/         # Constitution + philosophy
│   ├── 01-Engine/
│   ├── 02-Gameplay/
│   ├── 03-Maps/
│   ├── 04-Multiplayer/
│   ├── 05-Modding/
│   ├── 06-UI/
│   ├── 07-Coding/
│   └── RFC/
├── rfcs/
├── Engine/                # Framework runtime (Phase 1+)
├── Game/                  # Thin host project
├── Plugins/
├── Samples/
├── Templates/
├── Tests/
├── Tools/
├── ROADMAP.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── README.md
```

Folder structure specification: [`docs/01-Engine/architecture/folder-structure.md`](docs/01-Engine/architecture/folder-structure.md)

**Project management:** use GitHub Projects — see [`.github/PROJECTS.md`](.github/PROJECTS.md). Do not track engine work in a giant TODO markdown file.

---

## Status

This repository currently ships **documentation as the product foundation**.

Do **not** write gameplay classes until the foundation checklist is complete (it is): Constitution · Roadmap · Architecture · Gameplay Philosophy · Cursor Rules · RFC · CONTRIBUTING · Folder Structure · Coding Standards.

Implementation follows [`ROADMAP.md`](ROADMAP.md). No gameplay feature without an accepted RFC when required (see [`docs/RFC/`](docs/RFC/)).

---

## Quick Links for Contributors

1. Read the [Constitution](docs/00-Vision/Afterlife-Framework-Constitution.md)
2. Read [`docs/00-Vision/philosophy/design-philosophy.md`](docs/00-Vision/philosophy/design-philosophy.md)
3. Read [`ROADMAP.md`](ROADMAP.md) — do not skip phases
4. Read [`CONTRIBUTING.md`](CONTRIBUTING.md)
5. Open an RFC if proposing a new gameplay system: [`docs/RFC/process.md`](docs/RFC/process.md)
6. Follow code style: [`docs/07-Coding/standards/code-style.md`](docs/07-Coding/standards/code-style.md)

---

## Community Principles

- **Open-source forever**
- **Community first**
- **Readable code over clever code**
- **Maps should contain almost no gameplay code**
- **Players should never manually install dependencies**

---

## License

Afterlife Framework is licensed under the **GNU General Public License v3.0**.  
See [`LICENSE`](LICENSE) and [`docs/07-Coding/reference/license-notes.md`](docs/07-Coding/reference/license-notes.md).

---

## Inspiration Disclaimer

Afterlife Framework is **inspired by** the design language of classic round-based survival modes (World at War through Black Ops III era). It is **not** a clone, not affiliated with Activision, Treyarch, or Call of Duty, and must never hardcode proprietary names, assets, or IP into the framework core.

Generic names only. Extensible systems only.
