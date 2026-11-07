# React SDK demo

Experience the published MitoJS browser SDK and React ErrorBoundary with React 19.3.1. The original counter, request/error buttons, hash routes and embedded breadcrumb viewer are retained.

Use Node 24.22.2 (`.node-version`) and pnpm 12.16.1:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the `/react-sdk-demo/` URL printed by Vite. Production assets use the same base path as [GitHub Pages](https://mitojs.github.io/react-sdk-demo/):

```sh
pnpm build
pnpm preview
```

The demo always starts MSW before rendering, including production builds. `/normal`, `/abnormal` and `/upload` are local simulations; no reporting backend is needed. The SDK's actual upload request contains `authInfo.sdkVersion`; this comes from the installed browser/shared SDK, independently of the React adapter package version. SDK versions and their transitive packages are pinned in `pnpm-workspace.yaml`.

```sh
pnpm exec playwright install --no-shell chromium
pnpm verify
```

Verification runs TypeScript and desktop/mobile browser scenarios against a production build: the renderer's real React version, animated counter, route navigation/reload, Fetch/XHR, manual upload, ErrorBoundary upload/fallback/reload and viewport overflow. `pnpm test` starts its own preview on port 2034. To check an existing preview, use `PREVIEW_BASE_URL=http://localhost:2031/react-sdk-demo/ pnpm test`.

Browser reports and request payload attachments are written to ignored `playwright-report/` and `test-results/`. After updating MSW, run `pnpm mock:init` to regenerate its checked-in worker. The breadcrumb panel embeds the [external MitoJS admin demo](https://mitojs.github.io/mito-admin-demo/#/breadcrumbDemo) and sends breadcrumb updates with `postMessage`.

Migration references: [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [Ant Design 6 migration](https://ant.design/docs/react/migration-v6/), [MSW browser integration](https://mswjs.io/guides/integrations/browser).
