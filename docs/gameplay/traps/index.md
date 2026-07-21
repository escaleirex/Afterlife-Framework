# Traps

## Purpose

Provide activatable damage/control devices gated by power and currency or triggers.

## Responsibilities

- Activate/deactivate with costs and cooldowns
- Apply damage volumes / status effects
- Respect friendly fire policies
- Integrate with AI avoidance optional flags

## Architecture

Trap actors + definitions. Activation may be purchase, trigger plate, or automated.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Activate → debit if needed → enable volume → damage ticks → cooldown.

## Networking

Server authority on activation and damage.

## Events

`Trap.Activated`, `Trap.Deactivated`, `Trap.CooldownReady`

## Extension Points

Player-built traps · escalating trap tiers · environmental hazards as traps.

## Examples

Electric floor for 1000 lasting 10s; fan trap on trigger.

## Edge Cases

Activate with enemies inside · power loss mid-trap · stacking traps.

## Future Considerations

Trap telemetry for balancing tools.

## Implementation Specification

### Activation

Purchase or trigger → server enables damage volume for duration → cooldown. Friendly fire policy from mode. Power loss disables active traps optionally via domain listeners.

## Related Documents

- [Power](../power/index.md)
- [AI](../ai/index.md)
- [Economy](../economy/index.md)
