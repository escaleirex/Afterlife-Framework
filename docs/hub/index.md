# Afterlife Hub

## Purpose

Afterlife Hub is the **in-game content platform**. It replaces Steam Workshop for this ecosystem.

## Player Workflow

```
Main Menu → Play → Map Selection → Browse Community → Afterlife Hub
```

Installed maps automatically appear in Map Selection.

## Content Types

Maps · Mods · Weapons · Characters · Game Modes · Collections · Creators

## Features

Browse · Search · Updates · Reviews · Screenshots · Trailers · Versioning · Dependencies · One-click install

## Collections

Installing a Collection installs **every dependency automatically** via Dependency Loader + Hub downloads.

## Non-Goals

- Steam Workshop integration as the primary path
- Manual dependency hunting

## Implementation Specification

### Client Subsystems

| Subsystem | Role |
|-----------|------|
| `HubCatalogClient` | Search/details |
| `HubDownloadManager` | Resumable downloads |
| `HubLibraryIndex` | Local installed packages |
| `HubUpdateScanner` | Version compare |
| `HubAuthClient` | Optional login |

### Install Transaction

1. Build target graph
2. Snapshot disk state
3. Download to staging
4. Verify hashes
5. Atomic move into library
6. Update index
7. On failure, roll back staging

### Library Layout (Conceptual)

```
Saved/AfterlifeHub/Library/
  com.acme.maps.rail/1.4.2/...
  com.acme.perkpack/2.1.0/...
Saved/AfterlifeHub/Index.json
```

### Map Selection Integration

Map Selection reads `Index.json` and shows all map-type packages with compatible `frameworkRange`.

### Moderation Hooks

Report package → send package id/version + reason. Client does not need to ship evidence binaries by default.

## Related Documents

- [Browse & Install](browse-and-install.md)
- [Packages & Versioning](packages-and-versioning.md)
- [Creators & Reviews](creators-and-reviews.md)
- [Backend Contracts](backend-contracts.md)
- [Modding Doctrine](../philosophy/modding-doctrine.md)
