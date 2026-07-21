# Plugin Development Guide

## Purpose

Teach code plugin authors how to extend Afterlife safely.

## Lifecycle

Register definitions/strategies/UI extenders in `Register`; start match logic in `Start`; clean up in `Stop`.

## Permissions

Request least privilege. `net.custom_rpc` and `io.local_files` are restricted.

## Testing

Unit-test pure logic; PIE test with dedicated server flow.

## Related Documents

- [Plugin System](../../01-Engine/core/plugin-system.md)
- [RFC Process](../../RFC/process.md)
