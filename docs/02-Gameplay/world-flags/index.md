# World Flags & Unlock Tokens

## Purpose

Provide generic, quest-free progress bits for maps and plugins to gate content.

## Responsibilities

- Store boolean/int flags on GameState
- Replicate changes
- Emit events for listeners (spawn groups, doors, dialogue)
- Persist only if mode explicitly requests (rare)

## Architecture

`WorldFlagId` stable strings: `power.global`, `door.courtyard`, `token.fuse_a`.

Unlock tokens can live in player inventory or shared world inventory depending on definition.

**These are not objectives.** UI must not auto-list flags as tasks.

## Ownership

Server.

## Data Flow

System sets flag → replicate → EventBus `WorldFlag.Changed` → listeners.

## Networking

Replicated map/bitset; late join receives full snapshot.

## Events

`WorldFlag.Changed`, `UnlockToken.Granted`, `UnlockToken.Consumed`

## Extension Points

Map namespaces `map.<id>.*` · mod namespaces `mod.<id>.*`

## Examples

Power activation sets `power.global`; collecting three fuses sets shared tokens toward a door prerequisite—without a quest tracker.

## Edge Cases

- Unknown flag set by typo (validator warns)
- Client attempting to set flags (reject)

## Future Considerations

Flag graph visualization for authors.

## Related Documents

- [Discovery Philosophy](../../00-Vision/philosophy/discovery-philosophy.md)
- [Doors](../doors/index.md)
- [Power](../power/index.md)
