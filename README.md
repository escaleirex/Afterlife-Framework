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

**Constitution (foundational law):** [`docs/00-vision/Afterlife-Framework-Constitution.md`](docs/00-vision/Afterlife-Framework-Constitution.md)

Full philosophy expansions: [`docs/philosophy/`](docs/philosophy/)

---

## Documentation

**Start here:** [`docs/00-vision/Afterlife-Framework-Constitution.md`](docs/00-vision/Afterlife-Framework-Constitution.md) → [`docs/index.md`](docs/index.md)

| Area | Path |
|------|------|
| Constitution | [`docs/00-vision/`](docs/00-vision/) |
| Getting Started | [`docs/getting-started/`](docs/getting-started/) |
| Architecture | [`docs/architecture/`](docs/architecture/) |
| Core Systems | [`docs/core/`](docs/core/) |
| Networking | [`docs/networking/`](docs/networking/) |
| Gameplay Systems | [`docs/gameplay/`](docs/gameplay/) |
| UI / Frontend | [`docs/ui/`](docs/ui/) |
| Lobby | [`docs/lobby/`](docs/lobby/) |
| Afterlife Hub | [`docs/hub/`](docs/hub/) |
| Mapping Guide | [`docs/mapping/`](docs/mapping/) |
| Modding Guide | [`docs/modding/`](docs/modding/) |
| RFC Process | [`docs/rfc/`](docs/rfc/) |
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

## Repository Layout (Target)

```
Afterlife-Framework/
├── docs/                  # Official documentation (source of truth)
├── rfcs/                  # Accepted and in-progress RFCs
├── .cursor/rules/         # Cursor agent rules (must follow docs)
├── Source/                # UnrealSharp C# gameplay modules (future)
├── Content/               # Engine content packages (future)
├── Plugins/               # First-party plugins (future)
├── Tests/                 # Automated tests (future)
├── Tools/                 # Editor tools, CI helpers (future)
├── ROADMAP.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── README.md
```

Folder structure specification: [`docs/architecture/folder-structure.md`](docs/architecture/folder-structure.md)

---

## Status

This repository currently ships **documentation as the product foundation**.

Implementation follows the multi-year roadmap in [`ROADMAP.md`](ROADMAP.md). No gameplay feature may be implemented without an accepted RFC when the RFC process applies (see [`docs/rfc/`](docs/rfc/)).

---

## Quick Links for Contributors

1. Read the [Constitution](docs/00-vision/Afterlife-Framework-Constitution.md)
2. Read [`docs/philosophy/design-philosophy.md`](docs/philosophy/design-philosophy.md)
3. Read [`ROADMAP.md`](ROADMAP.md) — do not skip phases
4. Read [`CONTRIBUTING.md`](CONTRIBUTING.md)
4. Open an RFC if proposing a new gameplay system: [`docs/rfc/process.md`](docs/rfc/process.md)
5. Follow code style: [`docs/standards/code-style.md`](docs/standards/code-style.md)

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
See [`LICENSE`](LICENSE) and [`docs/reference/license-notes.md`](docs/reference/license-notes.md).

---

## Inspiration Disclaimer

Afterlife Framework is **inspired by** the design language of classic round-based survival modes (World at War through Black Ops III era). It is **not** a clone, not affiliated with Activision, Treyarch, or Call of Duty, and must never hardcode proprietary names, assets, or IP into the framework core.

Generic names only. Extensible systems only.
