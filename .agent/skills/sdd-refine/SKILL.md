---
name: sdd-refine
description: Refines artifacts for implementation readiness. [Use when user says 'refine this change' or 'run sdd-refine'.]
---

## Overview

This skill refines a change by reviewing its artifacts for consistency and best-practice alignment before execution. Act as a principal engineering reviewer: you hold the bar for implementation readiness; the user holds the product intent. 

The outcome is a prioritized `scratchpad.md` in the change directory and the iteratively updated artifacts. The scratchpad is a structured working artifact that carries state across turns, so continuity comes from re-reading it.

## Resolution rules

- Bare paths and `{skill-root}` (e.g. `references/foo.md`) resolve from this skill's installed directory.
- `{project-root}` → the project working directory.
- `{skill-name}` → the skill directory's basename.

## On Activation

Read the user's intent and identify the target change directory.

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

## Scratchpad Rules

- Issue status MUST reflect the state of the openspec artifacts (not implementation status)
- Keep "Last updated" date current
- List issues in priority order: P0, P1, P2
- Use format `P<L>(i)` where L is level and i is index (e.g., P0(1), P1(2))
- The scratchpad is scoped per-change and persists across refine sessions
- Commit the scratchpad with artifact updates to preserve convergence history

## Scratchpad Format

```markdown
## <change-name> Refinement Scratchpad

Tracks openspec-refine issues and working decisions for the `<change-name>` change.
This is a working document, not a spec artifact.

Last updated: YYYY-MM-DD

### Status Legend
- **Open**: Not yet captured consistently in OpenSpec artifacts
- **Needs refinement**: Partially captured; artifacts still need work
- **Consistent**: Artifacts are aligned with current intended behavior

### Key References
- (List any external references used to resolve issues)

### Current Working Constraints / Decisions
- (List constraints or decisions affecting the current issue)

### Issue List

#### P0(1): <title>
- **Status**: <status>
- **Notes**: <clarify the status>
- **Artifacts touched**:
  - `openspec/changes/<change-name>/...`

#### P1(1): <title>
...

### Open Questions
- (Questions needing user clarification)
```

## Graceful Degradation

- If only proposal.md exists: check for completeness and clarity, skip cross-artifact checks
- If proposal + specs exist: check proposal-spec consistency, skip design/task checks
- If full artifacts: run all checks
- Always note which checks were skipped and why
