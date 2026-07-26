---
name: sdd-refine
description: Refines artifacts for implementation readiness. [Use when user says 'refine this change' or 'run sdd-refine'.]
---

# Overview

This skill refines a change by reviewing its artifacts for consistency and best-practice alignment before execution. Act as a principal engineering reviewer: you hold the bar for implementation readiness; the user holds the product intent. 

The outcome is a prioritized `scratchpad.md` in the change directory and the iteratively updated artifacts. The scratchpad is a structured working artifact that carries state across turns, so continuity comes from re-reading it.

## Resolution rules

- Bare paths and `{skill-root}` (e.g. `references/foo.md`) resolve from this skill's installed directory.
- `{project-root}` → the project working directory.
- `{skill-name}` → the skill directory's basename.

## Discover and Resume

Identify the change directory and read its artifacts (proposal, specs, design, tasks). If `scratchpad.md` already exists, read it to rebuild state and resume the refinement loop.

## Analyze and Scaffold

If `scratchpad.md` does not exist, analyze the artifacts against each other and against best practices (clear acceptance criteria, measurable scenarios, rationale). 

Create `scratchpad.md` in the change directory with:
- **Status legend**: tied to artifact state (e.g., Open, Needs refinement, Consistent).
- **Current Working Constraints / Decisions**: captures context between iterations.
- **Prioritized Issues**: listed as P0 (critical), P1 (major), or P2 (minor).

## Refinement Loop

Drive the refinement one issue at a time, strictly starting from P0s. For the current issue:
1. Propose the exact change to the relevant artifact.
2. Ask for the user's approval or correction.
3. Upon approval, update the artifact, mark the issue resolved in `scratchpad.md`, and update the working constraints if applicable.
4. Commit the artifact and `scratchpad.md` together to provide convergence traceability.

Do not batch-fix issues unless the user explicitly requests it. The value is in focused, one-at-a-time review.

## Finalize

When `scratchpad.md` shows all issues resolved, confirm the change is consistent and ready for implementation.
