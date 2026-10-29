# NyssaAI Plugin Marketplace

NyssaAI plugins are created for knowledge work in the agentic era. They augment traditional probabilistic instructions with deterministic code to improve reliability and eliminate slop.

We built this suite to help us plan our days, stay on task, and accelerate the work we do. The plugins include:

## **agent-skills**

Give your agent reliable, non-destructive tools to work with files. Helps maintain organization, links, and history across both general workspaces and structured PARA vaults. Ait also has a write-like-me skill to improve your agents' writing.

- `manage-file-operations`: Move, rename, copy, import, or archive files and directories safely. It handles naming collisions, repairs relative links and parent indexes, and resumes interrupted operations without data loss.
- `para-vault`: Organize knowledge across Projects, Areas, Resources, and Archives. It orchestrates inbox filing, immutable email and calendar record ingestion, document reconciliation, navigation audits, and project archiving.
- `write-like-me`: Draft or rewrite material in your authentic writing voice, and build, calibrate, or update personal voice profiles backed by real writing samples.

## **daily-tasks**

Turn your projects into a plan for your day using an editable Markdown system you review with your agent. It keeps work visible and moving forward without asking an agent to guess your priorities or schedule your day.

- `daily-tasks`: Coordinate the complete planning lifecycle, routing between setup, capture, records, daily plans, and check-ins.
- `daily-tasks-capture`: Extract potential action items from notes or messages and present them as candidates for explicit approval before creating commitments.
- `daily-tasks-checkin`: Review daily progress, reconcile manual Markdown edits, resolve blockers, and roll open work into today's plan.
- `daily-tasks-plan`: Build and update a daily Markdown plan, carrying unfinished selections forward without forcing rigid time slots or artificial ranking.
- `daily-tasks-records`: Create and update projects, milestones, tasks, ownership, dependencies, and external blockers with an authoritative audit log.
- `daily-tasks-setup`: Configure personal identity, timezone, priority criteria, and workspace storage locations in canonical profile files.

## **plan-product**

Turn product ideas into a linked set of plain-language planning documents your team can build from. The plugin guides discussions from initial discovery through delivery roadmaps, keeping user outcomes and business capabilities cleanly separated from technical architecture and implementation details. It uses a facade orchestrator that routes requests to context-aware workflows to build a complete roadmap while conserving agent context.

- `plan-product`: Define products, domain concepts, features, actor use cases, and dependency-ordered roadmaps under Model v2:
  - Product Discovery (`/plan-product`): Define core product framing (`product.md`), capability inventory (`features.md`), and technical architecture context (`tech-stack.md`).
  - Domain Concepts (`/plan-concept`): Model core domain concepts, entities, and cross-feature macro-flows with sequential IDs (`C-nn`).
  - Feature Boundaries (`/plan-feature`): Define functional boundaries, user outcomes, and acceptance checks (`F-gg.nn`).
  - Use Cases (`/plan-use-case`): Map concrete actor workflows, entry points, and branch conditions through a feature (`UC-gg.nn.uu`).
  - Delivery Roadmap (`/plan-roadmap`): Sequence ordered delivery phases and steps (`R-pp.ss`) with explicit `- Verify:` checkpoints.
  - Maintenance & Upgrades (`/plan-maintain`): Audit documentation links, reconcile models, and migrate legacy planning documents to Model v2.

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

The tests check catalog parity, unique entries, pinned sources, and README plugin coverage. When Codex
is installed, they also verify discovery in a temporary profile and remove that profile afterward.
Set `CODEX_CLI_JS` to the installed `@openai/codex/bin/codex.js` if it is not under Windows
APPDATA. Otherwise the discovery test is skipped. CLI commands were checked with Codex 0.162.1
and Claude Code 2.1.296. These checks do not certify plugin installation or native skill workflows.

## Maintain the marketplace

1. Check upstream releases and read the plugin manifest at the selected tag. If no release exists,
   use an exact commit and its declared version.
2. Update `.claude-plugin/marketplace.json`, `.agents/plugins/marketplace.json`, and the plugin
   documentation above together. Keep names, source URLs, paths, and pins identical across catalogs.
3. Use `source: "url"` for repository-root plugins or `git-subdir` with `path` for subdirectory
   plugins. Pin release tags with `ref`, or exact commits with `sha`. Codex listing output calls
   root Git sources `git`; do not copy that discriminator into the catalog. See the
   [Codex catalog format](https://developers.openai.com/plugins/build/plugins) and
   [Claude marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference).
4. Keep descriptions and authors accurate, and disclose private repository access.
5. Run the checks above, review the diff, then merge and push the update to `main`. Users receive
   the new catalog when they refresh their marketplace.
