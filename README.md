# NyssaAI Plugin Marketplace

Curated plugins for Claude Code and Codex. The catalogs point to source repositories;
plugin code is not vendored here. Every entry is pinned to a release tag or commit.

## Install with Codex

```powershell
codex plugin marketplace add https://github.com/NyssaAI/plugin-marketplace.git --json
codex plugin marketplace upgrade nyssaai --json
codex plugin list --marketplace nyssaai --available --json
codex plugin add daily-tasks@nyssaai --json
```

Replace `daily-tasks` with any name in the table below. Repeating `plugin add`
upgrades an installed entry after refreshing the marketplace.

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

## Listed plugins

Source versions checked on **2026-10-13**. The three NyssaAI entries and Compound
Engineering match their latest published releases. Compound Knowledge has no tags
or GitHub releases; its version comes from the manifest at the pinned commit.

| Plugin | Install ID | Pinned source | Description |
| :--- | :--- | :--- | :--- |
| **agent-skills 0.6.4** | `agent-skills@nyssaai` | [v0.6.4](https://github.com/NyssaAI/agent-skills/releases/tag/v0.6.4) | Foundational skills and conventions, with explicit document-maturity metadata. |
| **daily-tasks 0.6.2** | `daily-tasks@nyssaai` | [v0.6.2](https://github.com/NyssaAI/daily-tasks/releases/tag/v0.6.2) | Personal tasks, milestones, delegation, daily plans and anytime check-ins. Requires Node.js 22+. Native host workflows remain unverified for this release. |
| **plugin-builder 0.1.1** | `plugin-builder@nyssaai` | [v0.1.1 (private)](https://github.com/NyssaAI/plugin-builder/releases/tag/v0.1.1) | Build, review, and evaluate agent plugins. Requires repository access. |
| **compound-engineering 3.30.5** | `compound-engineering@nyssaai` | [compound-engineering-v3.30.5](https://github.com/EveryInc/compound-engineering-plugin/releases/tag/compound-engineering-v3.30.5) | Brainstorm, plan, debug, review, and compound learnings with AI agents. |
| **compound-knowledge 1.0.0** | `compound-knowledge@nyssaai` | [766942e](https://github.com/EveryInc/compound-knowledge-plugin/tree/766942e9eaee5204adbfe180f1d0651ffecf2575/plugins/compound-knowledge) | Brainstorm, plan, review, execute, and save learnings in a Markdown vault. |

`plugin-builder` is publicly listed, but its repository is private. Installation
requires GitHub authentication with access to `NyssaAI/plugin-builder`.

The former Compound Knowledge listing advertised 1.1.0; upstream's plugin manifest
declares 1.0.0. The catalog now matches upstream and pins the existing source commit.

## Validate the catalogs

With Node.js 22+:

```powershell
node --test
claude plugin validate . --strict
```

The tests check catalog parity, unique entries, pinned sources, and README versions.
When Codex is installed, they also verify discovery in a temporary profile and remove
that profile afterward. Set `CODEX_CLI_JS` to the installed
`@openai/codex/bin/codex.js` if it is not under Windows APPDATA. Otherwise the discovery
test is skipped. CLI commands were checked with Codex 0.162.1 and Claude Code 2.1.296.
These checks do not certify plugin installation or native skill workflows.

## Maintain the marketplace

1. Check upstream releases and read the plugin manifest at the selected tag. If no
   release exists, use an exact commit and its declared version.
2. Update `.claude-plugin/marketplace.json`, `.agents/plugins/marketplace.json`, and
   the table above together. Keep names, versions, source URLs, paths, and pins identical.
3. Use `source: "url"` for repository-root plugins or `git-subdir` with `path` for
   subdirectory plugins. Pin release tags with `ref`, or exact commits with `sha`.
   Codex listing output calls root Git sources `git`; do not copy that discriminator
   into the catalog. See the [Codex catalog format](https://developers.openai.com/plugins/build/plugins)
   and [Claude marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference).
4. Keep descriptions and authors accurate, and disclose private repository access.
5. Run the checks above, review the diff, then merge and push the update to `main`.
   Users receive the new catalog when they refresh their marketplace.
