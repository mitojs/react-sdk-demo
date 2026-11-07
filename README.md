# React SDK demo

Experience the published MitoJS browser SDK and React ErrorBoundary with React 19.3.1. The counter, request/error buttons, hash routes and SDK ErrorBoundary are retained. A local report monitor displays a compact event table, readable details, complete payload JSON and live breadcrumbs.

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

Browser reports and request payload attachments are written to ignored `playwright-report/` and `test-results/`. After updating MSW, run `pnpm mock:init` to regenerate its checked-in worker. The observer is local and makes no requests to an external monitoring site. The MSW `/upload` handler reads the actual POST JSON before adding a report to the session store; `beforePushBreadcrumb` subscribes to the SDK’s real global behavior stack.

Migration references: [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [MSW browser integration](https://mswjs.io/guides/integrations/browser).

The UI is split into shell layout, scenario controls, ErrorBoundary demo, report monitor/table/row/details and breadcrumb timeline components. `src/monitoring/` owns the external store and its React subscription; `src/shared/` contains the common shell/table styles and event normalization/search contract shared with the Vue demos. The report search uses the current event fields, so searching `HTTP` or `500` does not match unrelated reports through their URLs or historical breadcrumbs.

The shared assets are kept byte-identical to `vue3-sdk-demo/src/shared/` and checked into each repository, so builds do not require a sibling checkout. Update all three copies together. `pnpm verify` also runs the shared view-model tests before the browser checks.
