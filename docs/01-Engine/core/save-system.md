# Save System

## Purpose

Persist player profiles, statistics, settings, Hub install state, and optional mode meta-progression with migrations and multiplayer-safe assumptions.

## Responsibilities

- Define versioned save schemas
- Migrate old saves forward
- Separate local settings from cloud/profile data
- Never trust client saves for match authority
- Provide export/import for backup

## Architecture

### Save Domains

| Domain | Contents | Sync |
|--------|----------|------|
| `settings` | Graphics, audio, binds | Local |
| `profile` | Identity, cosmetics unlocks (mode-defined) | Local + optional online |
| `stats` | Lifetime stats | Local + optional online |
| `hub` | Installed packages, pins, cache index | Local |
| `mode_meta` | Prestige-like data if mode enables | Local + optional online |

Match runtime state is **not** a player save (unless a mode explicitly implements reconnection snapshots—separate system).

### Schema Versioning

Each domain has `schemaVersion`. Migrations are pure functions registered in order.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Boot → load settings → load profile → Hub index → menu.  
Online login (Phase 4+) → merge policy (server wins conflicts for inventory-like data).

## Networking

Saves do not grant currency mid-match. Server may request profile cosmetics ids; still validates against owned definitions.

## Events

| Event | Meaning |
|-------|---------|
| `Save.Loaded` | Domain loaded |
| `Save.Migrated` | From→to version |
| `Save.Failed` | Corruption / IO |
| `Save.Committed` | Flush ok |

## Extension Points

- Modes register `mode_meta` schemas
- Mods add namespaced save keys under mod id
- Cloud providers plug into sync interface

## Examples

Migrating `stats` from v3→v4 renames a field and fills default for new high-round histogram buckets.

## Edge Cases

- Corrupt file: quarantine + fresh default + user prompt
- Partial write: atomic temp+replace
- Mod removed leaving orphan keys: keep orphan unless wipe policy opted

## Future Considerations

- Cross-device sync
- Theater bookmarks

## Implementation Specification

### Atomic Write

Write temp file → flush → replace. Keep `*.bak` last good. Migrations registered as `ISaveMigration.FromVersion → ToVersion`.

## Related Documents

- [Compatibility](../../00-Vision/philosophy/compatibility.md)
- [Progression](../../02-Gameplay/progression/index.md)
- [Profile UI](../../06-UI/ui/profile.md)
