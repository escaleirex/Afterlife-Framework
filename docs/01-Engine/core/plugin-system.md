# Plugin System

## Purpose

Load code and content plugins with version gates, permissions, and deterministic order for maps and mods.

## Responsibilities

- Discover plugins from package layouts
- Enforce frameworkRange
- Apply permission scopes
- Call lifecycle hooks: Construct → Register → Start → Stop → Unload
- Isolate failures where possible

## Architecture

### Plugin Kinds

| Kind | Code? | Content? |
|------|-------|----------|
| Content-only | No | Yes |
| Managed plugin (C#) | Yes | Optional |
| Embedded map plugin | Optional | Yes |

### Lifecycle

```
Resolve → Load assembly/assets → Register (registries, strategies, UI extenders)
→ Start (session) → Stop → Unload
```

### Permissions (examples)

- `gameplay.register_definitions`
- `gameplay.register_strategy`
- `ui.extend_hud`
- `ui.extend_lobby`
- `net.custom_rpc` (restricted)
- `io.local_files` (restricted)

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Dependency Loader provides ordered plugin list → Plugin System loads → Registries fill → strategies replace defaults → match starts.

## Networking

Server and clients load the same plugins. Custom RPCs require registration and bandwidth review. Unauthorized net messages dropped.

## Events

| Event | Meaning |
|-------|---------|
| `Plugin.Loaded` | Success |
| `Plugin.Failed` | Error |
| `Plugin.PermissionDenied` | Scope block |

## Extension Points

- New permission scopes via RFC
- Editor-only plugins
- Hot reload in editor (not shipping)

## Examples

A perk pack plugin registers 8 `PerkDefinition`s and a HUD icon provider. A map embedded plugin registers a unique crate weight strategy only while that map runs.

## Edge Cases

- Plugin throws in Register: package failed; match start aborted if required
- Version mismatch: refuse load
- Two strategies claim same slot: conflict per manifest rules

## Future Considerations

- Sandboxing research
- Signed plugins with trust tiers in Hub

## Implementation Specification

### Hook Interface

```csharp
public interface IAfterlifePlugin
{
    PluginManifest Manifest { get; }
    void Register(IPluginRegister context);
    void Start(IPluginRuntime runtime);
    void Stop();
}
```

Failures in `Register` for required plugins abort session start.

## Related Documents

- [Dependency Loader](dependency-loader.md)
- [Modding](../../05-Modding/modding/index.md)
- [RFC Process](../../RFC/process.md)
