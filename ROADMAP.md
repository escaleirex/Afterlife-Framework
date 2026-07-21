# Roadmap

Afterlife Framework ships in deliberate phases. **Do not skip phases.**  
Tools must not precede a stable engine core. Hub must not precede gameplay. Public release must not precede online ecosystem readiness.

This roadmap is the sequencing contract for contributors, Cursor agents, and maintainers.

Related: [Design Philosophy](docs/philosophy/design-philosophy.md) · [RFC Process](docs/rfc/process.md) · [Compatibility](docs/philosophy/compatibility.md)

---

## Guiding Constraints

1. **Documentation before code** for each subsystem
2. **RFC before gameplay feature implementation**
3. **Multiplayer-first** from Phase 1 networking onward
4. **No Steam Workshop** — Afterlife Hub is the content platform
5. **No built-in quest/objective ontology** in core
6. **Never intentionally break map compatibility**
7. Prefer vertical slices that prove systems together over isolated demos that lie about readiness

---

## Phase Overview

| Phase | Name | Outcome |
|-------|------|---------|
| 1 | Engine | Bootable framework core: modules, events, registries, net authority, empty map loop |
| 2 | Gameplay | Full modular survival loop systems (generic, data-driven) |
| 3 | Tools | Mapper/modder tooling, validators, packaging |
| 4 | Online Ecosystem | Afterlife Hub, lobby polish, accounts/profiles online path |
| 5 | Public Release | 1.0 stability bar, docs complete, sample map, contributor onboarding |
| 6+ | Expansion | Advanced systems, creator economy, platform expansion |

Estimated calendar spans assume a small core team + community. Dates are targets, not promises.

---

## Phase 1 — Engine (Foundation)

**Goal:** A dedicated-server-capable UnrealSharp framework that boots, replicates empty gameplay state, and loads data through registries—without shipping “a zombies game.”

### Deliverables

- [ ] Unreal Engine 5 + UnrealSharp project skeleton matching [`docs/architecture/folder-structure.md`](docs/architecture/folder-structure.md)
- [ ] Module boundaries and ownership rules enforced
- [ ] **Event Bus** (local + replicated event contracts)
- [ ] **Registries** (weapons, entities, modes, mods — empty but complete API)
- [ ] **Asset Manager** (async load, soft refs, streaming policy)
- [ ] **Dependency Loader** (map → mods resolution stubs)
- [ ] **Plugin System** bootstrap (load order, version gates)
- [ ] **Save System** schema + migration hooks (profiles stub)
- [ ] Networking: listen + dedicated server, server authority model
- [ ] Minimal Game Mode / Game State / Player State scaffolding
- [ ] Empty round director stub that can start/stop sessions
- [ ] Headless automated smoke tests for boot + join
- [ ] Docs parity for all Phase 1 systems

### Exit Criteria

- Two clients join a dedicated server
- Server owns all gameplay state
- A data asset registers through a Registry and is queryable
- Event Bus delivers a replicated gameplay event to clients
- No hardcoded IP names in core
- CHANGELOG + docs updated

### Non-Goals (Phase 1)

- Perks, mystery box, Hub UI, polished menus
- Quest frameworks as product features
- Public Hub backend

---

## Phase 2 — Gameplay (Systems)

**Goal:** Implement the modular survival loop as replaceable systems so maps can recreate WaW→BO3 *styles* and invent new ones—without cloning IP.

### Deliverables

- [ ] Round System + intermission + scaling curves (data-driven)
- [ ] Spawn Director (windows/zones/directors as pluggable strategies)
- [ ] Enemy AI baseline (pathing, barriers, vaulting, horde pressure)
- [ ] Point Economy + reward matrix
- [ ] Doors / barriers / map unlock continuum
- [ ] Power system (global/local power domains)
- [ ] Weapons pipeline + wall buys
- [ ] Mystery Box system (generic random acquisition)
- [ ] Pack-a-Punch / upgrade station framework
- [ ] Perks framework (slots, machines, effects as modifiers)
- [ ] Power-Ups framework
- [ ] Consumables framework (Gobblegum-like, generic naming)
- [ ] Buildables framework
- [ ] Traps framework
- [ ] Wonder weapon extension points
- [ ] Boss encounter hooks (not scripted “main quest”)
- [ ] Character presentation hooks
- [ ] Dialogue / VO trigger system (event-driven)
- [ ] Music director (round/intensity stems)
- [ ] Challenge / stats hooks (non-objective)
- [ ] Game Mode + Mutator composition
- [ ] Discovery-friendly interaction layer (no forced objective UI)
- [ ] Optional map-provided hint/objective plugins (opt-in, not core ontology)
- [ ] Sample developer map proving the loop end-to-end

### Exit Criteria

- A mapper can build a full round-based map with **almost no gameplay code**
- All systems communicate via Event Bus + registries
- Dedicated server playable for 4 players
- Performance budget documented and roughly met on mid-tier hardware
- RFCs closed for each major system

### Non-Goals (Phase 2)

- Afterlife Hub storefront
- Full animation rework tooling
- Prestige backend services

---

## Phase 3 — Tools

**Goal:** Professional creator tooling so maps and mods are validated, packaged, and dependency-safe.

### Deliverables

- [ ] Map validator (missing power domains, orphan spawners, broken refs)
- [ ] Mod package tool (manifest, versioning, dependency graph)
- [ ] Content pack authoring workflow
- [ ] Registry browser / debugger
- [ ] Event Bus inspector (editor + PIE)
- [ ] Network relevancy / replication debugger helpers
- [ ] Localization pipeline stubs
- [ ] Automated packaging for Hub upload format (client-side package)
- [ ] Sample content templates (weapon, perk, mode, mutator)
- [ ] Documentation generator / doc-link CI

### Exit Criteria

- Mapper can package a map with required mods in one workflow
- Validators catch common ship-breakers before playtest
- Templates compile and register cleanly

---

## Phase 4 — Online Ecosystem

**Goal:** Ship the in-game content platform and social/session layer.

### Deliverables

- [ ] **Afterlife Hub** client: browse, search, install, update, reviews, media
- [ ] Hub backend contracts (or self-hostable reference)
- [ ] Maps / Mods / Weapons / Characters / Modes / Collections / Creators
- [ ] Automatic dependency resolution + one-click install
- [ ] Map Selection integration (installed content appears automatically)
- [ ] Lobby: mode, difficulty, consumables, loadouts, mods, mutators, characters, ready/start
- [ ] Dynamic lobby adaptation per map capabilities
- [ ] Profile / statistics online sync path
- [ ] Dedicated server browser / bring-your-own-server docs
- [ ] Moderation / reporting hooks
- [ ] Version compatibility gates between framework, map, and mods

### Exit Criteria

- Player installs a Collection; all dependencies resolve without manual steps
- Map requiring a mod refuses to start until resolved (with clear UI)
- Lobby hides unsupported options per map manifest
- No Steam Workshop dependency in the product path

---

## Phase 5 — Public Release (1.0)

**Goal:** Stability, completeness of docs, and a trustworthy first public runtime.

### Deliverables

- [ ] Semantic versioning stability promise for public APIs
- [ ] Complete documentation pass (no “TBD” in shipped systems)
- [ ] Official sample map + sample mod pack
- [ ] Contributor onboarding path (good first issues)
- [ ] Security review of Hub + save + plugin loading
- [ ] Performance certification checklist
- [ ] Cross-platform verification matrix (as targeted)
- [ ] Long-form mapping & modding tutorials
- [ ] Public 1.0 announcement materials (non-marketing-engine-core)

### Exit Criteria

- Community mappers ship maps without private forks of core
- Backwards compatibility policy published and enforced
- CI green on main; release artifacts reproducible

---

## Phase 6+ — Expansion

**Goal:** Grow the ecosystem without breaking the past.

### Candidate Tracks (each requires RFC)

- Advanced AI directors and specialty enemy frameworks
- Deeper progression / prestige (always optional per mode)
- Replay, theater, and clip hooks
- Creator analytics (opt-in)
- Console certification adaptations (if pursued)
- Official curated Collections
- Expanded language support
- Deterministic lockstep research modes (experimental)
- Editor marketplace mirroring Hub metadata locally
- Accessibility system expansion

### Permanent Rules in Expansion

- Still no forced Main Quest ontology in core
- Still no intentional map breaks
- Still Event Bus / registry / data-driven defaults
- Still Hub over third-party workshop lock-in

---

## Parallel Workstreams (Allowed Early)

These may begin earlier **only** as documentation, RFCs, or non-blocking stubs:

| Workstream | Early form allowed |
|------------|--------------------|
| Hub UX | Wireframes + docs in Phase 1–2 |
| Sample map art | Greybox only until Phase 2 systems exist |
| CI/CD | From day one |
| RFC drafting | Anytime |
| Cursor rules / docs | Anytime |

---

## Milestone Naming

```
AF-P1-Engine
AF-P2-Gameplay
AF-P3-Tools
AF-P4-Ecosystem
AF-P5-Public-1.0
AF-P6-Expansion
```

GitHub milestones and projects should mirror these IDs.

---

## Change Control

Roadmap changes that reorder phases or add Phase-gate requirements need:

1. Maintainer consensus
2. Changelog entry
3. Update to this file
4. Note in any affected RFCs

Skipping a phase for a “demo” is explicitly forbidden for merges to `main`.
