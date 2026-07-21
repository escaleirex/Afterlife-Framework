# Dedicated Servers

## Purpose

Define how dedicated servers are built, configured, and operated.

## Responsibilities

- Headless server target
- Config via command line + config files
- Map rotation / workshop-less package prep
- Health/logging metrics

## Architecture

### Launch (conceptual)

```
AfterlifeServer.exe 
  -map=/Game/Maps/Example 
  -packagesLock=lock.json
  -port=7777
  -maxplayers=4
```

### Responsibilities

Server loads packages, validates lockfile, runs GameMode, simulates AI, never renders (shipping).

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Ops starts process → clients connect with matching framework+lockfile → match → logs/metrics → teardown.

## Networking

Authoritative simulation tick rate configurable; document defaults and max players assumptions.

## Events

`Server.Ready`, `Server.PlayerConnected`, `Server.PlayerDisconnected`, `Server.OOMWarning`

## Extension Points

Server admin plugins with restricted permissions.

## Examples

Community host pins map collection lockfile and runs headless on VPS.

## Edge Cases

Missing GPU on server OK; missing CPU budget → degrade AI counts via director settings if mode allows.

## Future Considerations

Container images; orchestration samples.

## Related Documents

- [Session Lifecycle](../core/session-lifecycle.md)
- [Performance](../performance/index.md)
