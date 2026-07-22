---
name: create-proposals
description: 'Reads project artifacts and iteratively executes openspec-propose for every story in epics.md.'
---

# OpenSpec Propose All

## Goal
Automate the specification proposal process by iterating through all stories defined in `epics.md` and invoking `openspec-propose` for each one, using the full context of the project.

## On Activation

### Step 1: Load Context
Read the following core artifacts to establish full project context:
- `{project-root}/_bmad-output/planning-artifacts/epics.md`
- `{project-root}/_bmad-output/planning-artifacts/briefs/*/brief.md`
- `{project-root}/_bmad-output/brainstorming/*/brainstorm-*.md`
- `{project-root}/_bmad-output/planning-artifacts/architecture/*/ARCHITECTURE-SPINE.md`
- `{project-root}/_bmad-output/planning-artifacts/architecture/*/.memlog.md`
- `{project-root}/_bmad-output/planning-artifacts/briefs/*/.memlog.md`
- `{project-root}/_bmad-output/brainstorming/*/.memlog.md`

### Step 2: Extract Stories
Analyze `epics.md` and extract the complete list of all defined stories. Note their Epic number, Story number, and Story title.

### Step 3: Execution Loop
For each extracted story, in order:
1. Announce the story currently being processed.
2. Extract the specific requirements, acceptance criteria, and architectural constraints relevant to this story from the loaded context.
3. Invoke the `openspec-propose` skill for the story, passing the story's details and the extracted context as the driving input. **IMPORTANT:** Ensure the generated OpenSpec change name is prefixed with `story-` and the story number (e.g., `story-1-1-backend-foundation-auth` for Story 1.1).
4. Wait for the `openspec-propose` workflow to complete its artifact generation before advancing to the next story.

### Step 4: On Complete
Once all stories have been processed, output a final summary confirming that all OpenSpec proposals have been generated.
