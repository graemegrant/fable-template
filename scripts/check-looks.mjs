#!/usr/bin/env node
/**
 * Type-checks and builds every look (AGENTS.md §3a), so a look can't
 * quietly miss a view or component the shared routes import, or break the
 * build. Locally: `npm run check:looks` (add `--no-build` for the quick
 * type check only). CI passes `--skip-default-build`, since build-check
 * already builds the look set in hotel.config.ts.
 *
 * The default tsconfig.json maps `@look/*` to Heritage; for each look this
 * writes a temporary tsconfig pointing `@look/*` at that look instead. Each
 * build is then checked for the look's name on <body data-look>.
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';

const looksSource = readFileSync('themes/looks.ts', 'utf8');
const looks = [...looksSource.matchAll(/'([a-z]+)'/g)].map((m) => m[1]);
const build = !process.argv.includes('--no-build');
const defaultLook = readFileSync('hotel.config.ts', 'utf8').match(/look: '([a-z]+)'/)?.[1];
const skipDefault = process.argv.includes('--skip-default-build');
const tmp = 'tsconfig.look.json';
const base = JSON.parse(readFileSync('tsconfig.json', 'utf8'));

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
      execSync('npx next build', { stdio: 'inherit', env: { ...process.env, LOOK: look } });
      // Prove the build really used this look: the layout stamps the name
      // from @look/meta on <body>, so a broken @look switch shows up here.
      const home = readFileSync('.next/server/app/en.html', 'utf8');
      const built = home.match(/data-look="([a-z]+)"/)?.[1];
      if (built !== look) throw new Error(`LOOK=${look} built the "${built}" look instead.`);
    }
  }
} finally {
  rmSync(tmp, { force: true });
}
console.log(`\nAll looks pass: ${looks.join(', ')}`);
