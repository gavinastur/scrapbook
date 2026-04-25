# scrapbook

A TypeScript scrapbook for practising algorithm and coding problems — similar to LeetCode-style exercises.

## Stack

- **Language:** TypeScript
- **Runtime:** Node.js ^24
- **Test framework:** [Vitest](https://vitest.dev/)
- **Linter/Formatter:** [Biome](https://biomejs.dev/)

## Project structure

```
js/
├── src/
│   ├── index.ts        # Solution implementations
│   └── index.test.ts   # Unit tests
├── package.json
├── tsconfig.json
├── biome.json
└── vitest.config.ts
```

## Getting started

```bash
cd js
npm install
```

## Scripts

| Command | Description |
|---|---|
| `npm test` | Run tests with coverage |
| `npm run build` | Compile TypeScript |
| `npm run lint` | Lint and auto-fix with Biome |

