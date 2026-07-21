# Networking Overview

## Purpose

Describe Afterlife Framework’s multiplayer-first networking model.

## Goals

- Dedicated server support for every gameplay system
- Server authority for all gameplay truth
- Predictable bandwidth usage
- Clean failure modes for version/content mismatch

## Building Blocks

| Building block | Use |
|----------------|-----|
| Replicated UObjects / properties | Persistent state (round, currency, doors) |
| RPCs | Commands and rare signals |
| Event Bus replicated facts | Cross-system notifications |
| Content signature | Package lockfile hash agreement |

## Topology

- Dedicated server (preferred)
- Listen server (supported)
- Offline/single process (same code paths; no special gameplay branch)

## Implementation Specification

### Session Content Agreement

Before `Lobby → Loading`:

1. Host/server computes lockfile from map+mods+mode
2. Lockfile hash sent to clients
3. Clients ensure packages present (Hub install if needed)
4. Clients acknowledge hash
5. Mismatch → disconnect with package diff

### RPC Naming

`Server_Request*` for intents · `Client_Notify*` for rejects/toasts · avoid ambiguous `Net_`

### Security Baseline

- Validate distances for interacts
- Rate-limit purchase RPCs
- Ignore client-supplied prices
- Clamp damage events server-side

## Related Documents

- [Authority](authority.md)
- [Replication](replication.md)
- [Dedicated Servers](dedicated-servers.md)
- [Late Join](late-join.md)
- [Bandwidth Budgets](bandwidth-budgets.md)
