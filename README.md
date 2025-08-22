# PuzzlePop2 Monorepo

<div><a href="https://puzzlepop.site" target="_blank">📍 퍼즐팝 메인 서비스</a></div>
<div><a href="https://www.chromatic.com/library?appId=68a89c409f8f3128db57d129" target="_blank">📍 스토리북</a></div>

### Environment

- node(v22) + npm(v11)
- yarn(v1.22.19) + turbo(v2.3.3)
- Typescript(v5.0.4)
- React(v19)

### apps

- 퍼즐팝 메인서비스(apps/web): Next.js(v15), React(v19)
- 스토리북(apps/storybook): React(v19), Storybook(v8)

### packages

- themes: UI foundation module.
- react: React(v19) Shared UI Component, Hooks, etc.
- esbuild-config: build config module.
- ts-config: typescript base configuration module.

### CI/CD

- 퍼즐팝 메인서비스: Git-Husky(prettier, ESLint), GitHub-Actions(Oracle Cloud VM, Docker-Hub, Docker-Compose)
- 스토리북: GitHub-Actions, Chromatic
