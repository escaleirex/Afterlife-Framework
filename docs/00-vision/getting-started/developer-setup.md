# Developer Setup

## Purpose

Provide a reproducible environment for contributing to Afterlife Framework.

## Prerequisites

| Tool | Notes |
|------|-------|
| Unreal Engine 5.x | Version pinned in project `README` / CI matrix when runtime exists |
| Visual Studio / Rider | C# + C++ tooling as required by UnrealSharp |
| Git | Long paths enabled on Windows recommended |
| .NET SDK | Version required by UnrealSharp pin |
| Python optional | Tooling scripts may use Node instead |

Exact engine/UnrealSharp versions are declared in `DocsVersionMatrix` (see [CI/CD](../devops/ci-cd.md)) once runtime lands.

## Repository Bootstrap (Documentation Era)

Until Phase 1 runtime exists:

```bash
git clone <repo-url> Afterlife-Framework
cd Afterlife-Framework
# edit docs; open PRs; draft RFCs under rfcs/
```

## Repository Bootstrap (Runtime Era)

```bash
git clone <repo-url> Afterlife-Framework
# Install UE5 version from version matrix
# Generate project files
# Build AfterlifeEditor
# Enable UnrealSharp plugin per UnrealSharp docs
# Build C# gameplay modules
```

## Recommended IDE Settings

- EditorConfig enforced
- Format on save for C#
- Spell check for markdown
- Cursor rules loaded from `.cursor/rules/`

## Running Tests

See [Testing](../testing/index.md). Minimum local loop:

```bash
# unit
dotnet test Tests/Afterlife.Unit

# networked smoke (runtime era)
# Afterlife.Server.exe -map=/Game/Dev/Smoke -dedicated
```

## Common Setup Failures

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| C# types missing in UE | UnrealSharp not built | Rebuild plugin + generate |
| Replication not firing | Running as client-only PIE without server | Use dedicated or listen with 2+ processes |
| Docs links broken | Moved file without updates | Run markdown link check |

## Related Documents

- [UnrealSharp Conventions](../architecture/unrealsharp-conventions.md)
- [Folder Structure](../architecture/folder-structure.md)
- [CI/CD](../devops/ci-cd.md)
