import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname,'..');

test('Codex discovers every advertised marketplace entry', async t => {
  const catalog = JSON.parse(await readFile(path.join(root,'.agents/plugins/marketplace.json'),'utf8'));
  const cli = process.env.CODEX_CLI_JS ?? (process.platform === 'win32' && process.env.APPDATA
    ? path.join(process.env.APPDATA,'npm/node_modules/@openai/codex/bin/codex.js') : null);
  if (!cli) return t.skip('Set CODEX_CLI_JS to the installed @openai/codex/bin/codex.js');
  try { await access(cli); } catch { return t.skip('Codex CLI is not installed; set CODEX_CLI_JS'); }
  await mkdir(path.join(root,'.temp'),{recursive:true});
  const home = await mkdtemp(path.join(root,'.temp/catalog-test-'));
  const run = args => {
    const result = spawnSync(process.execPath,[cli,...args],{cwd:root,env:{...process.env,CODEX_HOME:home},encoding:'utf8',timeout:30000});
    assert.equal(result.status,0,result.stderr);
    return JSON.parse(result.stdout);
  };
  run(['plugin','marketplace','add',root,'--json']);
  const listed = run(['plugin','list','--marketplace',catalog.name,'--available','--json']);
  assert.deepEqual([...listed.installed,...listed.available].map(plugin => plugin.name).sort(),catalog.plugins.map(plugin => plugin.name).sort());
});
