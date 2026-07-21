# Compatibility Promise

## Promise

The framework should **never intentionally break map compatibility**. Maps from years ago should keep working whenever possible. Breaks from undocumented API misuse are mapper responsibility; silent breaks of documented APIs are framework responsibility.

## Tiers

Undocumented internals (free) · Public C# APIs (SemVer) · Data schemas (additive + migrations) · Manifests (versioned) · Saves (migrations mandatory) · Net protocol (negotiate/refuse cleanly).

## Deprecation

Obsolete → docs + diagnostics → dual-path window → remove only in major with RFC + CHANGELOG.

## Related Documents

- [Save System](../core/save-system.md)
- [Roadmap](../../ROADMAP.md)
