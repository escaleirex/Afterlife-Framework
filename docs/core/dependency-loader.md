# Dependency Loader

## Purpose

Resolve, fetch (via Hub), verify, and order-load all packages required for a map session so players never manually install dependencies.

## Responsibilities

- Read map/mod manifests
- Build dependency graph (required + recommended policies)
- Detect conflicts and cycles
- Compute load order
- Verify versions against framework range
- Integrate with Afterlife Hub install actions
- Produce actionable error reports

## Architecture

### Package Manifest (simplified)

```json
{
  "id": "com.acme.maps.rail",
  "version": "1.4.2",
  "frameworkRange": ">=0.9.0 <2.0.0",
  "requires": [
    { "id": "com.acme.perkpack", "range": "^2.1.0" }
  ],
  "recommends": [
    { "id": "com.acme.qol", "range": ">=1.0.0" }
  ],
  "conflicts": [
    { "id": "com.other.old_economy", "range": "*" }
  ],
  "embeds": ["com.acme.maps.rail.embedded_vo"]
}
```

### Resolution Algorithm

1. Seed with map + enabled global mods + lobby selections
2. Recursively add required deps
3. Optionally add recommended (policy: install-with-map vs prompt)
4. Fail on cycles / unsatisfiable ranges / conflicts
5. Produce pinned lockfile for the session
6. Ensure packages present locally; if not, Hub fetch
7. Verify signatures/hashes
8. Load plugins in order; register definitions

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Map Selection / Hub Install → Resolver → (Hub Download)* → Verify → Plugin load order → Registries populate → Session signature hash → Server + clients compare.

## Networking

All peers must share the same pinned lockfile hash before match start. Server is authoritative on the pin. Clients missing packages are sent to install flow; they do not “almost join.”

## Events

| Event | Meaning |
|-------|---------|
| `Deps.ResolveStarted` | Begin |
| `Deps.ResolveSucceeded` | Lockfile ready |
| `Deps.ResolveFailed` | Errors |
| `Deps.DownloadProgress` | Hub fetch |
| `Deps.LoadOrderReady` | Plugins may start |

## Extension Points

- Custom repositories (self-hosted Hub mirrors)
- Studio policies for recommended deps
- Conflict mediators for known pairs

## Examples

Installing a Collection expands to many maps/mods; resolver installs the union of dependencies once, then validates each map on play.

## Edge Cases

- Two mods need different major versions of the same dep: fail with explanation
- Embedded mod collides with global mod id: fail
- Offline mode with missing deps: fail offline-safe message
- Yanked Hub package: fail with replacement suggestion if provided

## Future Considerations

- Binary lockfile format
- Peer-to-peer LAN share for packages in trusted lobbies (optional)

## Implementation Specification

### Solver

Use semver range intersection. Prefer highest version within range that satisfies all dependents. Emit lockfile:

```json
{
  "framework": "1.2.0",
  "packages": [{"id": "com.acme.perkpack", "version": "2.1.3", "hash": "..."}]
}
```

Hash algorithm: SHA-256 of package payload.

## Related Documents

- [Plugin System](plugin-system.md)
- [Modding Guide](../modding/index.md)
- [Afterlife Hub](../hub/index.md)
