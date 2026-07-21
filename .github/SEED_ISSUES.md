# Seed GitHub Issues + Project Board

Requires: [GitHub CLI](https://cli.github.com/) authenticated (`gh auth login`).

## 1. Create labels

```powershell
$gh = "$env:ProgramFiles\GitHub CLI\gh.exe"
& $gh label create "type:feature" -c "1D76DB" -d "Feature / system" 2>$null
& $gh label create "type:bug" -c "D73A4A" 2>$null
& $gh label create "type:rfc" -c "5319E7" 2>$null
& $gh label create "type:docs" -c "0075CA" 2>$null
& $gh label create "phase:1-engine" -c "0E8A16" 2>$null
& $gh label create "phase:2-gameplay" -c "FBCA04" 2>$null
& $gh label create "phase:4-ecosystem" -c "BFDADC" 2>$null
& $gh label create "needs-triage" -c "EDEDED" 2>$null
```

## 2. Create seed issues

From repo root (PowerShell):

```powershell
$gh = "$env:ProgramFiles\GitHub CLI\gh.exe"
Get-ChildItem .github/seed-issues/*.md | Sort-Object Name | ForEach-Object {
  $title = (Get-Content $_.FullName -TotalCount 1) -replace '^#\s*', ''
  $body = Get-Content $_.FullName -Raw
  & $gh issue create --title $title --body $body --label "needs-triage"
}
```

## 3. Create Project board

In GitHub UI: **Projects → New project → Board**

Columns:

`Backlog` → `RFC Writing` → `Ready` → `In Progress` → `Review` → `Testing` → `Done`

Add all seed issues to **Backlog**. Move Event Bus / Registries toward **Ready** for Phase 1.

See also [PROJECTS.md](PROJECTS.md).
