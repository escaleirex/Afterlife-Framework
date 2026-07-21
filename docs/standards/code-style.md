# Code Style

## Purpose

Readable, consistent C# / docs style for Afterlife Framework.

## C#

- File-scoped namespaces when applicable
- Explicit access modifiers
- `async` only with clear ownership of tasks
- No undocumented public APIs
- Prefer expressive names over abbreviations
- Comments explain why, not what

## Formatting

EditorConfig + dotnet format in CI.

## Ban List

- Hardcoded proprietary IP strings in core
- `goto`
- Swallowing exceptions empty
- Client authority “just for now” TODOs without RFC

## Related Documents

- [Naming Conventions](../architecture/naming-conventions.md)
- [Contributing](../../CONTRIBUTING.md)
