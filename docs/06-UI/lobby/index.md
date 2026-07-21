# Lobby

## Purpose

After map selection, players enter a Lobby to configure the session before match start. The Lobby **dynamically adapts** to what the map supports via capabilities.

## Panels

| Panel | Shown when capability |
|-------|------------------------|
| Game Mode | always (filtered by map allowlist) |
| Difficulty | `difficulty` |
| Consumables | `consumables` |
| Loadouts | `loadouts` |
| Mods | always (enabled set + required locked) |
| Mutators | `mutators` |
| Map Settings | `map_settings` |
| Character Selection | `character_select` |
| Players / Ready | always |
| Start | host/server only |

## Ready / Start Rules

- All human players Ready (mode configurable)
- Dependency lockfile identical
- Host presses Start → Loading → Match

## Data Flow

```
MapSelected → Resolve deps → Enter Lobby → Configure → Ready → StartMatch
```

## Networking

Lobby state replicates on a LobbyState object. Server validates illegal combinations (banned mutator + mode).

## Events

`Lobby.Entered`, `Lobby.SettingChanged`, `Lobby.ReadyChanged`, `Lobby.StartAccepted`, `Lobby.StartRejected`

## Extension Points

Maps/mods register custom lobby panels with `ui.extend_lobby`.

## Edge Cases

- Player joins mid-lobby → receive full state
- Required mod disabled → cannot ready
- Host migration not required on dedicated

## Implementation Specification

### LobbyState (Replicated)

| Field | Notes |
|-------|-------|
| `MapId` | |
| `ModeId` | |
| `DifficultyId` | optional |
| `MutatorIds` | ordered |
| `EnabledModIds` | required locked |
| `MapSettings` | key/value validated |
| `Players[]` | character, ready, consumables loadout |
| `LockfileHash` | |

### Start Rejection Reasons

- Not all ready
- Lockfile mismatch
- Invalid mutator combo
- Missing required mod
- Mode not allowed by map
- Server package verify fail

### UI Adaptation Algorithm

```
for panel in allPanels:
  if panel.capability not in map.capabilities: hide
  else show and bind allowed options
```

Server still validates.

## Related Documents

- [Map Selection](../../06-UI/ui/map-selection.md)
- [Game Modes](../../02-Gameplay/game-modes/index.md)
- [Composition Model](../../01-Engine/architecture/composition-model.md)
