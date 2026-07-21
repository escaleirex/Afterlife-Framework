# Character Systems

## Purpose

Support selectable characters with VO sets, presentation, and optional passive modifiers—without mandatory class roles.

## Responsibilities

- Character registry
- Lobby selection
- Bind VO/dialogue personas
- Optional passive modifiers (mode-approved)
- Cosmetics separation from gameplay

## Architecture

`CharacterDefinition` references mesh, anim, VO board, optional modifier set. Default modes keep modifiers cosmetic-neutral unless enabled.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Lobby select → replicate character id → spawn presentation · dialogue system uses persona.

## Networking

Character id on PlayerState.

## Events

`Character.Selected`, `Character.Changed`

## Extension Points

Map-forced character sets · unlock rules via progression · co-op unique lines.

## Examples

Four personas with unique quips on Power.Activated.

## Edge Cases

Missing character pack · duplicate unique characters if mode requires uniqueness.

## Future Considerations

Creator-uploaded characters via Hub with permission scopes.

## Implementation Specification

Character id on PlayerState selects mesh/VO board. Passive modes SHOULD keep passives cosmetic-neutral. Unique character constraints are mode flags enforced in Lobby.

## Related Documents

- [Dialogue](../dialogue/index.md)
- [Lobby](../../lobby/index.md)
- [Progression](../progression/index.md)
