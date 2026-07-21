# RFC-0001: Documentation Foundation

- **Status:** Implemented
- **Author:** Founding Architect
- **Created:** 2026-07-21
- **Roadmap Phase:** Phase 1 (docs prelude)
- **Supersedes:** none

## Summary

Establish the documentation repository, philosophy, architecture contracts, RFC process, and Cursor rules as the single source of truth before runtime implementation.

## Motivation

Without a source of truth, contributors invent incompatible architectures and skip phases.

## Discovery & Philosophy Impact

None negative; discovery philosophy codified.

## Detailed Design

Ship docs tree under `docs/`, RFCs under `rfcs/`, rules under `.cursor/rules/`.

## Compatibility Impact

N/A (docs only).

## Test Plan

Manual review; markdown link checks in CI when added.

## Documentation Plan

This RFC is the documentation plan.

## Unresolved Questions

Exact UE5/UnrealSharp version pins at Phase 1 kickoff.
