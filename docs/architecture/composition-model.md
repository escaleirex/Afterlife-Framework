# Composition Model

## Purpose

Explain how modes, mutators, maps, and plugins compose at runtime.

## Composition Stack

```
Framework Defaults
  + Game Mode definition
  + Mutators (lobby ordered)
  + Global Mods
  + Map Embedded Mods
  + Map Required Mods
  + Map Overrides (data)
```

Later layers override earlier layers only through documented override channels (registry overrides, capability flags, strategy registration)—not by silent monkey-patching.

## Strategies

Systems expose strategy interfaces:

- `ISpawnDirectorStrategy`
- `IRoundScalingStrategy`
- `ICrateWeightStrategy`

Default implementations ship in framework. Maps/mods register replacements via Plugin System at load.

## Capabilities

Maps advertise capabilities consumed by Lobby UI:

```json
{
  "capabilities": [
    "consumables",
    "character_select",
    "mutators",
    "difficulty"
  ]
}
```

Unsupported panels hide rather than error.

## Related Documents

- [Game Modes](../gameplay/game-modes/index.md)
- [Lobby](../lobby/index.md)
- [Plugin System](../core/plugin-system.md)
