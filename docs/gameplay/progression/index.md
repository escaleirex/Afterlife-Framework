# Progression & Prestige

## Purpose

Optional meta-progression frameworks for modes that want XP/prestige—never required for core survival identity.

## Responsibilities

- XP grant rules (mode)
- Prestige reset policies
- Unlock gates for cosmetics/consumable colors
- Keep match fairness defaults

## Architecture

Progression is a mode module. Core provides persistence hooks only. Pay-to-win unlocks are forbidden in first-party defaults.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Match end → compute XP → save profile → unlock checks.

## Networking

Server computes XP; client displays.

## Events

`Progression.XPChanged`, `Progression.LevelUp`, `Progression.Prestiged`

## Extension Points

Battle-pass-like tracks as optional plugins with ethical constraints documented.

## Examples

Cosmetic camo at level 10; prestige resets level for badge.

## Edge Cases

XP in mutator spam matches · party XP share · offline cap.

## Future Considerations

Cross-mode profile unification.

## Implementation Specification

XP computed server-side at PostMatch from event aggregates. Prestige resets level fields and increments prestige badge. Forbidden: pay-to-win power in first-party defaults.

## Related Documents

- [Save System](../../core/save-system.md)
- [Consumables](../consumables/index.md)
- [Game Modes](../game-modes/index.md)
