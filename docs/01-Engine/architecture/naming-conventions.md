# Naming Conventions

## Purpose

Keep identifiers predictable across C#, Blueprints, assets, Hub packages, and docs.

## General Rules

- English, PascalCase for types, camelCase for locals
- No proprietary IP names in core identifiers
- Prefer precise words: `UpgradeStation` not `PaP` in public APIs (aliases allowed in sample content)
- Stable IDs are lowercase dotted: `afterlife.weapon.starter_pistol`

## C# Types

| Kind | Pattern | Example |
|------|---------|---------|
| Subsystem | `AfterlifeXSubsystem` | `AfterlifeEventBusSubsystem` |
| Definition data | `XDefinition` | `PerkDefinition` |
| Component | `XComponent` | `PerkInventoryComponent` |
| Interface | `IAfterlifeX` | `ISpawnDirectorStrategy` |
| Event payload | `XEvent` / `XMessage` | `RoundStartedEvent` |
| Service | `XService` / `XSystem` | `DoorSystem` |

## Assets

```
DA_Perk_ExampleTank
DT_RoundHealthCurve_Default
BP_WallBuyPoint
WBP_HUD_Currency
SFX_UI_PurchaseSuccess
```

Prefixes: `DA_` data asset, `DT_` data table, `BP_` blueprint, `WBP_` widget, `SFX_`/`MUSIC_` audio.

## Hub Package IDs

```
com.<creator>.<package>
```

Example: `com.acme.maps.abandoned_rail`

## Events

`Domain.Action` style names:

```
Round.Started
Round.Ended
Economy.CurrencyChanged
Door.Opened
Power.Activated
Enemy.Killed
```

## Forbidden in Core Namespaces

`MainQuest`, `SideQuest`, `MissionSystem`, and proprietary franchise identifiers.

## Related Documents

- [Code Style](../standards/code-style.md)
- [Registries](../core/registries.md)
- [Event Bus](../core/event-bus.md)
