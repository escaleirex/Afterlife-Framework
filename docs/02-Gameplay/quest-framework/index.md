# Quest Framework (Opt-In)

## Purpose

Document an **optional** plugin layer for maps that want hint/objective graphs—explicitly outside core ontology.

## Responsibilities

- Provide opt-in module not loaded by default
- Allow maps to enable via capability `optional_objectives`
- Ensure core HUD has zero dependency on it
- Prevent naming collisions with forbidden core types where possible by living in `Afterlife.Optional.Objectives` namespace

## Architecture

Optional plugin ships graph assets: nodes, hints, rewards. It subscribes to WorldFlags/events. It must never be referenced by core systems.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Map enables plugin → graph runs → UI extension shows hints → completion sets flags/rewards.

## Networking

If enabled, server runs graph authority.

## Events

Namespaced `OptionalObjectives.*` only.

## Extension Points

Custom nodes · multiplayer step sync · spoiler-safe progressive hints.

## Examples

A complex map offers an optional side path tracker for players who want it; players can disable the widget.

## Edge Cases

Plugin missing → map still playable · users who hate trackers can hide UI.

## Future Considerations

Community hint packs separate from map packages.

## Implementation Specification

Package id suggestion: `afterlife.optional.objectives`. Loaded only when map capability `optional_objectives` set AND player/host did not disable. Core assemblies must not reference its types. Graph nodes listen to WorldFlags/events and may extend HUD via permission `ui.extend_hud`.

## Related Documents

- [Discovery Philosophy](../../00-Vision/philosophy/discovery-philosophy.md)
- [HUD](../../06-UI/ui/hud.md)
- [Plugin System](../../01-Engine/core/plugin-system.md)
