---
name: sdd-propose
description: Propose a change for a single story by reading epics.md and schema.yaml, and then invoking the openspec-propose skill. Use when the user asks to run sdd-propose for a specific story or propose a story based on the SDD schema.
---

# sdd-propose

Generates a software design document proposal for a single user-specified story by extracting that story from `epics.md` and driving the `openspec-propose` skill using the definitions and constraints found in `schema.yaml`.

## Resolution rules

- `{project-root}` → the project working directory.

## On Activation

### Step 1: Identify Target Story
If the user did not specify which story they want to propose (e.g., "Story 1.1") in their request:
1. Read `{project-root}/_bmad-output/planning-artifacts/epics.md` to extract the full list of stories (including their numbers and titles).
2. Check the archive at `{project-root}/openspec/changes/archive/` to identify which stories have already been implemented (look for change directories prefixed with the story number, e.g., `story-1-1`).
3. Filter out any stories that are already in the archive.
4. Present the filtered list of available, unimplemented stories to the user and ask them to select which story they want to propose. Do NOT suggest stories that are already implemented.
5. Stop and wait for the user to clarify before proceeding.

### Step 2: Load Context
Once the target story is known, read the following core artifacts to establish the requirements and the structural constraints:
- `{project-root}/_bmad-output/planning-artifacts/epics.md` (if not already read)
- `{project-root}/openspec/schemas/sdd-1/schema.yaml` (or the project's active `schema.yaml`)

### Step 3: Extract the Story
Analyze `epics.md` and extract only the target story requested by the user. Note the Epic number, Story number, and Story title. Do not extract or process other stories.

### Step 4: Analyze Schema
Analyze `schema.yaml` to understand the artifact types (e.g., proposal, specs, design, tasks), their templates, and the specific generation instructions for each phase of the proposal.

### Step 5: Execution
1. Announce the story being processed.
2. Formulate a comprehensive instruction set using the specific story details from `epics.md` and the structural constraints from `schema.yaml`.
3. Invoke the `openspec-propose` skill. **IMPORTANT:** Pass the formulated instructions as the driving input. Ensure the generated OpenSpec change name is prefixed with `story-` and the story number (e.g., `story-1-1-feature-name`).
4. Wait for the `openspec-propose` workflow to complete.

### Step 6: On Complete
Output a final summary confirming that the OpenSpec proposal for the target story has been successfully generated based on the epics and schema.
