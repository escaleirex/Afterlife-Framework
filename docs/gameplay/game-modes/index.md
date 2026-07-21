# Game Modes & Mutators

## Purpose

Compose rulesets and modular mutators that remix systems without forking maps.

## Responsibilities

- Register modes
- Apply mutator stacks
- Advertise lobby capabilities
- Define fail/win policies (survival fail = game over; modes may add alternatives)
- Override strategies safely

## Architecture

Mode definition references default strategies + allowed mutators + HUD profile + late join policy. Mutators are small patches (economy rates, friendly fire, truncated perk slots).

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Lobby selects mode+mutators → session lock → systems configure → match.

## Networking

Mode/mutator ids in GameState; all peers must have packages.

## Events

`Mode.Configured`, `Mutator.Applied`, `Match.GameOver`, `Match.Victory` (only if mode defines victory—optional)

## Extension Points

Custom modes as plugins · ranked playlist definitions (Phase 4+).

## Examples

Classic Survival; Hardcore (lower health); Guns Only crate table; Friendly Fire On.

## Edge Cases

Conflicting mutators · map disallows mode · missing capability.

## Future Considerations

Mode marketplace via Hub.

## Implementation Specification

### Mode Definition Fields

Id · default strategies · allowed mutators · HUD profile · late join policy · fail condition · progression enabled · consumables enabled · max players

### Mutator Patches

Mutators are JSON/data patches applied after mode defaults and before map overrides. Conflicts fail lobby start with reason.

## Related Documents

- [Lobby](../../lobby/index.md)
- [Composition Model](../../architecture/composition-model.md)
