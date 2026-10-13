import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp, access, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname,'..');

test('host catalogs agree on unique, versioned, pinned plugin sources', async () => {
  const claude = JSON.parse(await readFile(path.join(root,'.claude-plugin/marketplace.json'),'utf8'));
  const codex = JSON.parse(await readFile(path.join(root,'.agents/plugins/marketplace.json'),'utf8'));
  const readme = await readFile(path.join(root,'README.md'),'utf8');
  assert.equal(claude.name, codex.name);
  for (const catalog of [claude, codex]) {
    assert.ok(catalog.plugins.length > 0);
    assert.equal(new Set(catalog.plugins.map(plugin => plugin.name)).size, catalog.plugins.length,
      'Plugin names must be unique');
    for (const plugin of catalog.plugins) {
      assert.match(plugin.version, /^\d+\.\d+\.\d+$/, plugin.name);
      assert.ok(['url', 'git-subdir'].includes(plugin.source.source), plugin.name);
      assert.ok(plugin.source.ref || plugin.source.sha, `${plugin.name} must have a source pin`);
      if (plugin.source.sha) assert.match(plugin.source.sha, /^[a-f0-9]{40}$/, plugin.name);
      if (plugin.source.ref) assert.ok(plugin.source.ref.endsWith(`v${plugin.version}`),
        `${plugin.name} release tag must match its version`);
      if (plugin.source.source === 'git-subdir') assert.ok(plugin.source.path, plugin.name);
      assert.ok(readme.includes(`**${plugin.name} ${plugin.version}**`),
        `${plugin.name} README version must match the catalogs`);
    }
  }
  const sources = catalog => catalog.plugins.map(({name, version, source}) => ({name, version, source}))
    .sort((a,b) => a.name.localeCompare(b.name));
  assert.deepEqual(sources(claude), sources(codex));
});

test('Codex discovers every advertised marketplace entry', async t => {
  const catalog = JSON.parse(await readFile(path.join(root,'.agents/plugins/marketplace.json'),'utf8'));
  const cli = process.env.CODEX_CLI_JS ?? (process.platform === 'win32' && process.env.APPDATA
    ? path.join(process.env.APPDATA,'npm/node_modules/@openai/codex/bin/codex.js') : null);
  if (!cli) return t.skip('Set CODEX_CLI_JS to the installed @openai/codex/bin/codex.js');
  try { await access(cli); } catch { return t.skip('Codex CLI is not installed; set CODEX_CLI_JS'); }
  await mkdir(path.join(root,'.temp'),{recursive:true});
  const testProfile = await mkdtemp(path.join(root,'.temp/catalog-test-'));
  t.after(async () => {
    assert.equal(path.dirname(path.resolve(testProfile)), path.join(root,'.temp'));
    await rm(testProfile,{recursive:true,force:true,maxRetries:3,retryDelay:100});
  });
  const run = args => {
    const result = spawnSync(process.execPath,[cli,...args],{cwd:root,env:{...process.env,CODEX_HOME:testProfile},encoding:'utf8',timeout:30000});
    assert.equal(result.status,0,result.stderr);
    return JSON.parse(result.stdout);
  };
  run(['plugin','marketplace','add',root,'--json']);
  const listed = run(['plugin','list','--marketplace',catalog.name,'--available','--json']);
  assert.deepEqual([...listed.installed,...listed.available].map(plugin => plugin.name).sort(),catalog.plugins.map(plugin => plugin.name).sort());
});
