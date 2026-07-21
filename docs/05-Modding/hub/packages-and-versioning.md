# Hub Packages and Versioning

## Purpose

Define package identity and version rules for Hub content.

## Identity

`id` + `version` + `frameworkRange` + content type + content hash.

## SemVer

Creators SHOULD use SemVer. Breaking content changes bump major. Framework refuses packages outside `frameworkRange`.

## Updates

Hub shows update badges. Updating a required dep of an installed map prompts compatibility check.

## Related Documents

- [Compatibility](../../00-Vision/philosophy/compatibility.md)
- [Dependency Loader](../../01-Engine/core/dependency-loader.md)
