# Player Systems

## Purpose

Define player pawn, controller, state, downed/revive loop, and interaction without turning players into class-locked roles.

## Responsibilities

- Possess pawn with movement suited to training routes
- Replicate PlayerState fields (currency, perks, inventory ids, downs)
- Handle downed / revive / bleedout policies via mode data
- Route interact intents to server systems
- Apply modifier stack from perks/consumables

## Architecture

| Type | Role |
|------|------|
| `AfterlifePlayerController` | Input, UI, RPCs |
| `AfterlifePlayerState` | Replicated persistent match state |
| `AfterlifeCharacter` | Pawn movement, camera, anim |
| `InteractComponent` | Trace/prompt |
| `DownedComponent` | Downed state machine |
| `ModifierSink` | Applies gameplay modifiers |

### Downed State Machine

```
Alive → Downed : Lethal while downs remaining
Downed → Alive : Revived
Downed → Bleedout : Timer expired
Bleedout → Eliminated : No self-revives/tokens
Eliminated → Spectate : Mode policy
```

Revive: teammate hold interact → progress server-side → restore with configurable health fraction. Consumables may self-revive.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server |
| Configuration | Mode + character defs |
| Presentation | Client |
| Extension | Perks, consumables, character passives |

## Data Flow

Input → Controller → server validate → mutate PlayerState/pawn → events → HUD.

## Networking

Movement uses Unreal character networking with server authority corrections. Inventory/currency never client-authoritative.

## Events

`Player.Downed`, `Player.Revived`, `Player.Bleedout`, `Player.Eliminated`, `Player.InteractStarted`, `Player.InteractFinished`

## Extension Points

Custom movement components · alternate revive rules · last-stand mutators.

## Examples

Classic four-player revive loop; solo mode with limited self-revive charges.

## Edge Cases

- Simultaneous revive and damage
- Revive through geo exploit (distance checks)
- Host disconnect on listen server
- Joining as spectator

## Future Considerations

Ping system; advanced accessibility aiming assists as settings—not perks.

## Related Documents

- [Economy](../economy/index.md)
- [Perks](../perks/index.md)
- [HUD](../../ui/hud.md)
- [Authority](../../networking/authority.md)
