# Glossary

## Purpose

Normalize vocabulary across docs, code, Hub, and community.

| Term | Meaning |
|------|---------|
| **Afterlife Framework** | The engine/framework (this project) |
| **Afterlife Hub** | In-game content platform (not Steam Workshop) |
| **Map** | Playable content package with manifest |
| **Mod** | Additive package altering or extending content/systems |
| **Content Pack** | Mod subclass focused on assets/definitions |
| **Plugin** | Code module loaded by Plugin System |
| **Embedded Mod** | Mod packaged inside a map |
| **Collection** | Hub bundle installing many packages + deps |
| **Registry** | Authoritative lookup of definitions by stable ID |
| **Event Bus** | Cross-system pub/sub with optional replication |
| **Game Mode** | Ruleset composing systems + win/fail policies |
| **Mutator** | Modular rule modifier applied in lobby |
| **Round Director** | System advancing round phases and scaling |
| **Spawn Director** | System choosing what/where/when to spawn |
| **Economy** | Currency earn/spend rules |
| **Upgrade Station** | Generic Pack-a-Punch-like upgrade service |
| **Random Weapon Crate** | Generic Mystery Box-like acquisition |
| **Consumable** | Limited-use player item (Gobblegum-like, generic) |
| **Perk Definition** | Purchasable persistent modifier while alive/down rules apply |
| **World Flag** | Generic unlock/state bit without quest semantics |
| **Discovery** | Learning through play, not objective trackers |
| **Authority** | Server-owned truth for gameplay state |
| **Manifest** | JSON/YAML metadata for maps/mods/plugins |
| **RFC** | Request for Comments design proposal |
| **Capability** | Feature flag advertised by map/mode for lobby UI |

## Naming Rule

Prefer generic engine terms in core. Sample content may use evocative names that are still original IP.
