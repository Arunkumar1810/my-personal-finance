# Analysis Report: C:\ak\MyRepo\personal-finance\.agent\skills\sdd-refine

Generated: 2026-08-02T17:08:00+05:30 · Schema: 2

**Grade: Fair**

> Skill successfully integrates OpenSpec PR 893 instructions, but requires structural fixes to meet BMad standards.

The skill perfectly matches the OpenSpec refine-change workflow and holds all necessary instructions. However, it lacks standard BMad activation and overview sections.

| Severity | Count |
| --- | --- |
| Critical | 0 |
| High | 2 |
| Medium | 1 |
| Low | 0 |

## Themes

### 1. Missing Required BMad Sections

- Root cause: The skill was ported directly from OpenSpec which uses a different section standard than BMad. BMad requires 'On Activation' and standard headers.
- Fix: Add the 'On Activation' section and ensure standard headers are used.
- Findings:
  - `integrity-1` Missing Overview — `SKILL.md`
  - `integrity-2` Missing On Activation — `SKILL.md`

## Strengths

- Comprehensive coverage of the OpenSpec sdd-refine workflow.
- Clear graceful degradation instructions.

## Recommendations

1. Add an 'On Activation' section and fix '# Overview' to '## Overview' to meet BMad standards. (resolves: integrity-1, integrity-2)

## Experience

- Headless: No explicit headless support mentioned in instructions.

## Findings

### High (2)

#### integrity-1 — Missing Overview

- Lens: workflow-integrity
- Location: `SKILL.md`
- Evidence: Missing ## Overview section (currently uses # Overview)
- Recommendation: Change # Overview to ## Overview

#### integrity-2 — Missing On Activation

- Lens: workflow-integrity
- Location: `SKILL.md`
- Evidence: Missing ## On Activation section
- Recommendation: Add ## On Activation section

### Medium (1)

#### path-1 — Prompt file at root

- Lens: path-standards
- Location: `.memlog.md`
- Evidence: Prompt file at skill root: .memlog.md
- Recommendation: Move .memlog.md to references/.memlog.md
