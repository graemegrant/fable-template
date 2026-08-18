import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tailwind from 'eslint-plugin-tailwindcss';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // Build output, generated files, and config files are exempt —
    // ESLint should only ever run against actual source code.
    ignores: [
      'tailwind.config.ts',
      'app/globals.css',
      '**/*.config.*',
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.sanity/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        // Custom semantic tokens from tailwind.config.ts — the plugin
        // needs to know these are valid so it doesn't flag them, while
        // still flagging arbitrary values and raw hex.
        callees: ['classnames', 'clsx', 'cn', 'cva'],
      },
    },
    rules: {
      // No arbitrary Tailwind values — e.g. bg-[#123456], w-[37px].
      // Forces re-skinning through tailwind.config.ts tokens instead.
      'tailwindcss/no-arbitrary-value': 'error',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',

      // No inline hex colours in className or style props anywhere in
      // app/ or components/. If a design needs a colour outside the
      // seven brand tokens, it goes into tailwind.config.ts as a named
      // token — never inlined at the call site.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXAttribute[name.name='style'] Literal[value=/#[0-9A-Fa-f]{3,8}/]",
          message:
            'No inline hex colours. Add the colour as a named token in tailwind.config.ts and reference it via className.',
        },
        {
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/#[0-9A-Fa-f]{3,8}/]",
          message:
            'No inline hex colours in className. Use a semantic Tailwind token instead.',
        },
      ],
    },
  },
];

export default eslintConfig;