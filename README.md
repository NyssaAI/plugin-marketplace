# NyssaAI — Plugin Marketplace

Curated marketplace for NyssaAI agent plugins and skills, plus select high-impact third-party plugins.

Third-party entries are sourced from upstream repositories and are not vendored.

---

## Installation

### 1. Register the Marketplace

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
/plugin install skills@nyssaai

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

| Plugin | Namespace / Install | Source | Description |
| :--- | :--- | :--- | :--- |
| **skills** | `skills@nyssaai` | [NyssaAI/skills](https://github.com/NyssaAI/skills) | Official agent skills catalog for NyssaAI workflows, guidelines, and tools. |
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
