#!/usr/bin/env node
/**
 * Type-checks and builds every look (AGENTS.md §3a), so a look can't
 * quietly miss a view or component the shared routes import, or break the
 * build. Locally: `npm run check:looks` (add `--no-build` for the quick
 * type check only). CI passes `--skip-default-build`, since build-check
 * already builds the look set in hotel.config.ts. Demos in demos/ are
 * checked and built too.
 *
 * The default tsconfig.json maps `@look/*` to Heritage; for each look this
 * writes a temporary tsconfig pointing `@look/*` at that look instead. Each
 * build is then checked for the look's name on <body data-look>.
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync, readdirSync, existsSync } from 'node:fs';

const looksSource = readFileSync('themes/looks.ts', 'utf8');
const looks = [...looksSource.matchAll(/'([a-z]+)'/g)].map((m) => m[1]);
const build = !process.argv.includes('--no-build');
const defaultLook = readFileSync('hotel.config.ts', 'utf8').match(/look: '([a-z]+)'/)?.[1];
const skipDefault = process.argv.includes('--skip-default-build');
const tmp = 'tsconfig.look.json';
const base = JSON.parse(readFileSync('tsconfig.json', 'utf8'));

const demos = existsSync('demos')
  ? readdirSync('demos', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
  : [];

/** Up to three tries: next/font's Google Fonts download fails now and then
 *  ("Cannot read properties of null"), and a retry clears it. */
function buildWithRetries(env) {
  for (let attempt = 1; ; attempt++) {
    try {
      execSync('npx next build', { stdio: 'inherit', env: { ...process.env, ...env } });
      return;
    } catch (err) {
      if (attempt === 3) throw err;
      console.log(`\n=== build failed, retrying (${attempt + 1} of 3)`);
    }
  }
}

try {
  for (const look of looks) {
    console.log(`\n=== ${look}: type check`);
    const config = {
      extends: './tsconfig.json',
      compilerOptions: {
        incremental: false,
        paths: { ...base.compilerOptions.paths, '@look/*': [`./themes/${look}/*`] },
      },
    };
    writeFileSync(tmp, JSON.stringify(config, null, 2));
    execSync(`npx tsc --noEmit -p ${tmp}`, { stdio: 'inherit' });
    if (build && !(skipDefault && look === defaultLook)) {
      console.log(`\n=== ${look}: build`);
      buildWithRetries({ LOOK: look, DEMO: '' });
      // Prove the build really used this look: the layout stamps the name
      // from @look/meta on <body>, so a broken @look switch shows up here.
      const home = readFileSync('.next/server/app/en.html', 'utf8');
      const built = home.match(/data-look="([a-z]+)"/)?.[1];
      if (built !== look) throw new Error(`LOOK=${look} built the "${built}" look instead.`);
      // And that its CSS carries this look's tokens (a stale build cache can
      // hand one look's Tailwind output to another).
      const hex = readFileSync(`themes/${look}/tokens.ts`, 'utf8').match(/primary: '#([0-9A-Fa-f]{6})'/)[1];
      const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ');
      if (!home.includes(`rgb(${rgb}`)) throw new Error(`LOOK=${look}: the CSS is missing its primary colour #${hex}.`);
    }
  }

  // Demos (demos/<name>/, see demos/README.md): their copy may only override
  // keys the template has, and each must build in its own look as its own
  // hotel. Their content shapes are type-checked by demos/check.ts.
  const keys = (obj, prefix = '') =>
    Object.entries(obj).flatMap(([k, v]) => (v && typeof v === 'object' ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
  const templateKeys = new Set(keys(JSON.parse(readFileSync('messages/en.json', 'utf8'))));
  for (const demo of demos) {
    const file = `demos/${demo}/messages/en.json`;
    if (existsSync(file)) {
      const unknown = keys(JSON.parse(readFileSync(file, 'utf8'))).filter((k) => !templateKeys.has(k));
      if (unknown.length) throw new Error(`${file} overrides keys the template doesn't have: ${unknown.join(', ')}`);
    }
    if (!build) continue;
    const config = readFileSync(`demos/${demo}/hotel.config.ts`, 'utf8');
    const look = config.match(/look: '([a-z]+)'/)?.[1];
    const name = config.match(/name: '([^']+)'/)?.[1];
    console.log(`\n=== demo ${demo} (${look}): build`);
    buildWithRetries({ LOOK: look, DEMO: demo });
    const home = readFileSync('.next/server/app/en.html', 'utf8');
    if (!home.includes(`data-look="${look}"`) || !home.includes(name)) {
      throw new Error(`DEMO=${demo} didn't build as ${name} in the ${look} look.`);
    }
  }
} finally {
  rmSync(tmp, { force: true });
}
console.log(`\nAll looks pass: ${looks.join(', ')}${demos.length ? `; demos: ${demos.join(', ')}` : ''}`);
