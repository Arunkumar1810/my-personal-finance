---
name: git-commit
description: 'Single-shot git commit message generator — reads diff, learns your style, and commits. Use when the user says "commit", "commit my changes", or "git commit".'
---

# Git Commit

**Outcome:** A committed change with a message that reads like a story — clear to a human picking up the repo cold — composed from your diff and calibrated to your personal style. This runs without stopping to ask for approval.

## Pipeline

Run these three reads first, in parallel where possible, before drafting anything:

1. `git status --short` — identify staged and unstaged files.
2. `git diff --cached --stat` — read file names and line-count deltas only (not content yet).
3. `git branch --show-current` — extract any issue/ticket number (patterns: `#123`, `PROJ-456`, `issue/789`, `feat/ABC-12-description`).

**If nothing is staged and no tracked changes exist:** tell the user and stop.

**If no staged files but unstaged tracked changes exist:** ask once — stage all (`git add -u`) or stage everything (`git add -A`) or let the user stage manually. Wait for input. Then continue.

## Reading the Diff

Read `git diff --cached` for content. If any single file exceeds ~300 lines of diff, read only its stat entry — the shape is enough to describe.

**Diff noise test:** if after reading you cannot determine what problem the change solves or what capability it adds, ask *one* question: "What was the intent behind this change?" Then draft without further prompting. If the diff spans many unrelated concerns, note it in the body rather than splitting — you are drafting a message, not reorganizing the commit.

## Composing the Message

Build a message with three named slots:

- **what** — the change in one declarative sentence in imperative mood (matching the user's log style — "add", "fix", "remove", not "added", "fixed", "removed").
- **why** — the reason or context that makes the what meaningful (omit if the what is fully self-evident).
- **impact** — downstream effect or user-visible consequence (omit if minor or internal).

**Structure:**

```
<subject line>
                          ← mandatory blank line
<body: what + why + impact, paragraph or bullets, wrapped at 72 chars>
                          ← blank line before footer
<footer>
```

**Subject line rules:**
- **Aim for ≤ 50 chars; hard limit 72.** 50 keeps `git log --oneline` clean; 72 is the tooling truncation point.
- **Imperative mood** — the subject must complete: *"If applied, this commit will…"*. Not a sentence with a trailing period.
- **Conventional types are optional flavour**, never enforced. Offer one (`feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`) only when the diff maps cleanly to it. If the change is ambiguous or mixed, write a plain imperative subject. When a type is used, the scope is a noun in parentheses: `feat(auth): add login`.
- If `{breaking_change}` is detected (public API/interface removal or signature change, schema migration, config key rename), append `!` after any type and add a `BREAKING CHANGE:` footer line.

**Footer:**
- Inject any ticket/issue number extracted from the branch name: `Closes #123` or `Refs PROJ-456`.
- Add `BREAKING CHANGE: <what breaks and how to migrate>` if applicable.
- Omit footer entirely if neither applies.

## Committing

Write the message to `{project-root}/.git/COMMIT_EDITMSG_BMAD` and run:

```
git commit -F .git/COMMIT_EDITMSG_BMAD
```

Then delete the temp file.

If the commit fails: show the error and ask how to proceed — fix it or handle manually.

If the commit succeeds: show the git output (short SHA, branch, subject) and confirm `✅ Committed.`

## After Commit

Ask once:
- **Push now?** Run `git push` if yes.
- **Done** — end the session.

Show the final state: branch, SHA, subject, files committed, whether pushed.
