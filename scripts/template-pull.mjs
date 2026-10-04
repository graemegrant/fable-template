#!/usr/bin/env node
/*
 * Pull fable-template updates into a client repo (GIT-WORKFLOW.md §4).
 *
 * Client repos are created with "Use this template", so they share no git
 * history with the template and `git merge template-upstream/main` conflicts
 * on every file. Instead this replays the template commits made since the
 * one the client is based on (`.template-base`), file by file:
 *
 *   take   — the client never changed the file since the base: it gets the
 *            template's version (or is deleted, if the template deleted it)
 *   merge  — both sides changed it: each template commit's diff for that
 *            file is applied in order with a 3-way merge; on a conflict the
 *            file is left marked and its later commits are listed for you
 *   same   — the client's file already matches the template: nothing to do
 *   review — the client deleted a file the template changed: reported only
 *
 * Template commits the client already has — fixes that were built in this
 * repo first and then ported up to the template (GIT-WORKFLOW.md §3) — go in
 * `.template-skip` (one SHA per line, `#` comments allowed) or `--skip a,b`.
 *
 *   node scripts/template-pull.mjs                       # dry run
 *   node scripts/template-pull.mjs --apply               # on a feature branch
 *   node scripts/template-pull.mjs --apply --to <sha>    # stop at a commit
 *
 * Run from the client repo root after `git fetch template-upstream`. It
 * updates `.template-base` itself; build, commit, and open a PR.
 */
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();
const ok = (...a) => {
  try {
    execFileSync('git', a, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};
const fail = (...lines) => {
  lines.forEach((l) => console.error(l));
  process.exit(1);
};

const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const APPLY = args.includes('--apply');
const TO = opt('--to') ?? 'template-upstream/main';

if (!git('remote').split('\n').includes('template-upstream')) fail('No template-upstream remote: see GIT-WORKFLOW.md §1.');
if (/fable-template(\.git)?$/.test(git('remote', 'get-url', 'origin'))) fail('This is fable-template itself, not a client repo.');
if (!fs.existsSync('.template-base'))
  fail(
    'No .template-base file. Write the template commit this repo started from (or was last',
    "pulled up to) into it, e.g. the SHA in the repo's first commit message. See GIT-WORKFLOW.md §4.",
  );

const BASE = fs.readFileSync('.template-base', 'utf8').trim();
if (!ok('cat-file', '-e', `${BASE}^{commit}`)) fail(`Base ${BASE} not found: run git fetch template-upstream`);
const target = git('rev-parse', TO);
if (APPLY && git('status', '--porcelain')) fail('Working tree not clean: commit or stash first.');

const skipList = [
  ...(fs.existsSync('.template-skip') ? fs.readFileSync('.template-skip', 'utf8').split('\n') : []),
  ...(opt('--skip')?.split(',') ?? []),
]
  .map((l) => l.replace(/#.*/, '').trim())
  .filter(Boolean)
  .map((s) => (ok('cat-file', '-e', `${s}^{commit}`) ? git('rev-parse', s) : fail(`Unknown commit in skip list: ${s}`)));

const commits = git('rev-list', '--reverse', '--first-parent', `${BASE}..${target}`).split('\n').filter(Boolean);
if (!commits.length) {
  console.log(`Up to date with ${TO} (${target.slice(0, 7)}).`);
  process.exit(0);
}
const wanted = commits.filter((c) => !skipList.includes(c));
const subject = (c) => `${c.slice(0, 7)} ${git('log', '-1', '--format=%s', c)}`;

// Files touched by the commits being pulled, and which commits touch each.
const byFile = new Map();
for (const c of wanted)
  for (const f of git('diff', '--name-only', `${c}^`, c).split('\n').filter(Boolean)) byFile.set(f, [...(byFile.get(f) ?? []), c]);

const inTree = (rev, f) => ok('cat-file', '-e', `${rev}:${f}`);
const same = (f) => (inTree(target, f) ? fs.existsSync(f) && ok('diff', '--quiet', target, '--', f) : !fs.existsSync(f));
// Root-level docs (AGENTS.md, CHANGELOG.md, SEO-PROCESS.md, checklists,
// templates) are template-owned process docs: always the template's
// version. Client-specific notes live in docs/clients/, never here.
const templateOwned = (f) => /^[^/]+\.md$/.test(f);
const plan = { take: [], merge: [], same: [], review: [] };
for (const f of byFile.keys()) {
  if (same(f)) plan.same.push(f);
  else if (templateOwned(f) || ok('diff', '--quiet', BASE, 'HEAD', '--', f)) plan.take.push(f);
  else if (!fs.existsSync(f)) plan.review.push(f);
  else plan.merge.push(f);
}

console.log(`Template ${BASE.slice(0, 7)} → ${target.slice(0, 7)}`);
for (const c of commits) console.log(`  ${skipList.includes(c) ? 'skip ' : 'pull '} ${subject(c)}`);
for (const [k, v] of Object.entries(plan)) console.log(`\n${k} (${v.length}): ${v.join(', ') || '—'}`);
if (!APPLY) {
  console.log('\nDry run. Re-run with --apply on a feature/pull-template-update branch.');
  process.exit(0);
}

for (const f of plan.take) {
  if (inTree(target, f)) git('checkout', target, '--', f);
  else if (fs.existsSync(f)) git('rm', '-q', '--', f);
}
const conflicts = [];
for (const f of plan.merge) {
  const todo = byFile.get(f);
  for (let i = 0; i < todo.length; i++) {
    const patch = git('diff', '--binary', `${todo[i]}^`, todo[i], '--', f);
    try {
      execFileSync('git', ['apply', '--3way', '--whitespace=nowarn', '-'], { input: `${patch}\n`, stdio: ['pipe', 'ignore', 'ignore'] });
    } catch {
      conflicts.push(`${f}: at ${subject(todo[i])}${todo.length > i + 1 ? `; then port by hand: ${todo.slice(i + 1).map(subject).join('; ')}` : ''}`);
      break;
    }
  }
}
fs.writeFileSync('.template-base', `${target}\n`);

console.log(`\nApplied. .template-base → ${target.slice(0, 7)}.`);
if (conflicts.length) {
  console.log(`\nResolve (${conflicts.length}):\n  ${conflicts.join('\n  ')}`);
  console.log("\nKeep the client's content and branding; take the template's mechanism. Content files (lib/data.ts,");
  console.log('messages/*.json, hotel.config.ts, lib/tokens.ts) usually keep the client side entirely.');
}
console.log('Then: npm run lint && npx tsc --noEmit && npm run build, commit, open a PR (GIT-WORKFLOW.md §4).');
