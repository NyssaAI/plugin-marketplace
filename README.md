# NyssaAI Plugin Marketplace

NyssaAI plugins are created for knowledge work in the agentic era. They augment traditional probabilistic instructions with deterministic code to improve reliability and eliminate slop.

We built this suite to help us plan our days, stay on task, and accelerate the work we do. The plugins include:

## **agent-skills**

Give your agent reliable ways to work with the notes, source records, and documents you already maintain. It is especially useful in a PARA workspace, where organization, history, and links need to stay intact. It can operate outside of a PARA vault as well

- `manage-file-operations`: Safely move, rename, copy, import, or archive existing content, resolve collisions, and resume interrupted operations while repairing references.
- `para-vault`: Manage a PARA vault: classify and file captures, process inboxes, reconcile and revise documents, review navigation and links, archive or reactivate projects, and ingest email/calendar records.
- `write-like-me`: Draft or rewrite material in the user's authentic writing voice, and establish, inspect, calibrate, or update writing voice profiles.

## **daily-tasks**

Turn projects, milestones, and commitments into an editable Markdown system you can review with your agent. It helps you keep work visible and moving without asking the agent to invent your priorities or schedule every minute of your day.

- `daily-tasks`: Coordinate the full workflow for projects, tasks, blockers, daily plans, and anytime check-ins.
- `daily-tasks-capture`: Turn action items from notes or messages into candidates for your approval, rather than silently creating new commitments.
- `daily-tasks-checkin`: Reconcile progress and manual edits, work through unresolved items, and open or update the plan for today.
- `daily-tasks-plan`: Create or edit a daily Markdown plan and carry unfinished selected work forward without ranking it or assigning time slots.
- `daily-tasks-records`: Create and update projects, milestones, tasks, ownership, dependencies, and blockers consistently.
- `daily-tasks-setup`: Set the identity, timezone, priorities, and storage locations the system uses for your planning workspace.

## **plan-product**

Turn a product idea into a linked set of plain-language planning documents your team can use. The plugin guides the conversation from initial discovery through the delivery roadmap, while keeping product decisions separate from implementation details. It uses a fascade-style and routes tasks to context-aware workflows that will build a complete implementation roadmap from a duscussion, while also conserving context.

- `plan-product`: Define the product, domain concepts, features, actor use cases, macro-flows, and a dependency-ordered roadmap with verification checkpoints.
  - Product Discovery & Inventory: Define the product and establish its core planning documents.
  - Concept & Macro-Flow Specification: Model domain concepts and cross-feature flows.
  - Feature Specification: Define feature boundaries and acceptance checks.
  - Use Case Specification: Map an actor's path through a feature.
  - Roadmap Sequencing: Order delivery steps, dependencies, and verification checkpoints.
  - Maintenance & Upgrade: Reconcile or upgrade existing planning documents.

## Install with Codex

```powershell
codex plugin marketplace add https://github.com/NyssaAI/plugin-marketplace.git --json
codex plugin marketplace upgrade nyssaai --json
codex plugin list --marketplace nyssaai --available --json
codex plugin add daily-tasks@nyssaai --json
```

Replace `daily-tasks` with any plugin name above. Repeating `plugin add` upgrades an installed
entry after refreshing the marketplace.

## Install with Claude Code

Run these commands inside Claude Code:

```text
/plugin marketplace add NyssaAI/plugin-marketplace
/plugin install daily-tasks@nyssaai
```

To refresh the catalog and update an installed plugin:

```text
/plugin marketplace update nyssaai
/plugin update daily-tasks@nyssaai
```

The corresponding terminal commands start with `claude plugin` instead of `/plugin`.
See the [Claude Code plugin commands](https://code.claude.com/docs/en/plugins/cli-reference).

## Validate the catalogs

With Node.js 22+:

```powershell
node --test
claude plugin validate . --strict
```

The tests check catalog parity, unique entries, pinned sources, and README versions. When Codex
is installed, they also verify discovery in a temporary profile and remove that profile afterward.
Set `CODEX_CLI_JS` to the installed `@openai/codex/bin/codex.js` if it is not under Windows
APPDATA. Otherwise the discovery test is skipped. CLI commands were checked with Codex 0.162.1
and Claude Code 2.1.296. These checks do not certify plugin installation or native skill workflows.

## Maintain the marketplace

1. Check upstream releases and read the plugin manifest at the selected tag. If no release exists,
   use an exact commit and its declared version.
2. Update `.claude-plugin/marketplace.json`, `.agents/plugins/marketplace.json`, and the plugin
   headings above together. Keep names, versions, source URLs, paths, and pins identical.
3. Use `source: "url"` for repository-root plugins or `git-subdir` with `path` for subdirectory
   plugins. Pin release tags with `ref`, or exact commits with `sha`. Codex listing output calls
   root Git sources `git`; do not copy that discriminator into the catalog. See the
   [Codex catalog format](https://developers.openai.com/plugins/build/plugins) and
   [Claude marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference).
4. Keep descriptions and authors accurate, and disclose private repository access.
5. Run the checks above, review the diff, then merge and push the update to `main`. Users receive
   the new catalog when they refresh their marketplace.
