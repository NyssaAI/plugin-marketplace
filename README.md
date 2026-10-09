# NyssaAI — Plugin Marketplace

Curated marketplace for NyssaAI agent plugins and skills, plus select high-impact third-party plugins.

Third-party entries are sourced from upstream repositories and are not vendored.

---

## Installation

### Codex CLI

For Codex CLI 0.160.1, use its native commands:

```powershell
codex plugin marketplace add https://github.com/NyssaAI/plugin-marketplace.git --json
codex plugin marketplace upgrade nyssaai --json
codex plugin list --marketplace nyssaai --available --json
codex plugin add daily-tasks@nyssaai --json
codex plugin add agent-skills@nyssaai --json
```

Repeating `plugin add` upgrades an installed entry. Catalogs use `source: "url"`
for repository-root Git plugins; the CLI listing serializes that source as `git`,
which is not a valid discriminator to copy back into this catalog. Subdirectory
plugins retain `git-subdir` and `path`. See the
[Codex marketplace format](https://developers.openai.com/plugins/build/plugins).

Run `node --test test/catalog.test.mjs` with Codex installed to verify all entries
are discoverable using an isolated profile. Set `CODEX_CLI_JS` to the installed
`@openai/codex/bin/codex.js` when it is not under Windows APPDATA. This test does
not install plugins or modify the user's Codex profile.

### 1. Register the Marketplace (Claude Code)

Add the NyssaAI marketplace to your agent:

```bash
/plugin marketplace add github.com/NyssaAI/plugin-marketplace
```

### 2. Install Plugins

Once added, install any listed plugin using the `@nyssaai` namespace:

```bash
/plugin install <plugin-name>@nyssaai
```

Examples:
```bash
# Install the core NyssaAI skills catalog
/plugin install agent-skills@nyssaai

# Install personal task and daily planning skills
/plugin install daily-tasks@nyssaai

# Install Plugin Builder (requires access to its private repository)
/plugin install plugin-builder@nyssaai

# Install Compound Engineering workflow tools
/plugin install compound-engineering@nyssaai

# Install Compound Knowledge vault system
/plugin install compound-knowledge@nyssaai
```

To refresh available plugins:
```bash
/plugin marketplace refresh
```

---

## Listed Plugins

`plugin-builder` is publicly listed, but its source repository remains private.
Installation requires GitHub authentication with access to `NyssaAI/plugin-builder`;
the listing does not grant repository access.

| Plugin | Namespace / Install | Source | Description |
| :--- | :--- | :--- | :--- |
| **agent-skills 0.6.0** | `agent-skills@nyssaai` | [NyssaAI/agent-skills](https://github.com/NyssaAI/agent-skills) | Foundational skills and conventions, with explicit document-maturity metadata. |
| **daily-tasks 0.3.3** | `daily-tasks@nyssaai` | [NyssaAI/daily-tasks](https://github.com/NyssaAI/daily-tasks) | Personal tasks, milestones, delegation, daily plans and anytime check-ins. Requires Node.js 22+. Release scope: Codex on Windows; other hosts unverified. |
| **plugin-builder 0.1.0** | `plugin-builder@nyssaai` | [NyssaAI/plugin-builder](https://github.com/NyssaAI/plugin-builder) (private) | Build, review, and evaluate agent plugins. Requires repository access. |
| **compound-engineering** | `compound-engineering@nyssaai` | [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) | Brainstorm, plan, debug, review, and compound learnings with AI agents. |
| **compound-knowledge** | `compound-knowledge@nyssaai` | [EveryInc/compound-knowledge-plugin](https://github.com/EveryInc/compound-knowledge-plugin) | Knowledge compounds. Brainstorm, plan, review, execute, and save learnings in a markdown vault. |

---

## Adding a Plugin to this Marketplace

### For First-Party NyssaAI Plugins
1. Create a repository under `github.com/NyssaAI/<plugin-repo>` with its own `.claude-plugin/plugin.json`.
2. Add an entry to `.claude-plugin/marketplace.json` and `.agents/plugins/marketplace.json`.
3. Commit and push to this repository.

### For Third-Party Plugins
1. Point `source.url` at the upstream repository (`url` for root-level plugins, or `git-subdir` with `path` for subdirectory plugins).
2. Record author, homepage, description, category, and license matching upstream.
3. Commit and push to this repository.
