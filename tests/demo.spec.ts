import { expect, test, type Page } from '@playwright/test'

const browserIssues = new WeakMap<Page, string[]>()

test.beforeEach(async ({ page }) => {
  const issues: string[] = []
  browserIssues.set(page, issues)
  page.on('pageerror', (error) => issues.push(error.message))
  page.on('console', (message) => {
    if (
      /findDOMNode|ReactDOM\.render|older version of React|outdated JSX transform|Invalid hook call|deprecated/i.test(
        message.text(),
      )
    ) {
      issues.push(message.text())
    }
  })
  // Read the renderer's own version without adding a test API to the demo.
  await page.addInitScript(() => {
    const renderers = new Map()
    Object.assign(window, {
      __REACT_DEVTOOLS_GLOBAL_HOOK__: {
        supportsFiber: true,
        renderers,
        inject(renderer: unknown) {
          const id = renderers.size + 1
          renderers.set(id, renderer)
          return id
        },
        onCommitFiberRoot() {},
        onCommitFiberUnmount() {},
      },
    })
  })
  await page.goto('./', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('button', { name: '手动上报', exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true)
})

test.afterEach(async ({ page }) => {
  expect(browserIssues.get(page), 'no uncaught errors or React compatibility warnings').toEqual([])
})

test('React 19 renders the counter and preserves both hash routes', async ({ page }, testInfo) => {
  const versions = await page.evaluate(() => {
    const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
    return Array.from(hook.renderers.values(), (renderer: any) => renderer.version)
  })
  expect(versions).toEqual(['19.3.1'])
  expect(await page.evaluate(() => window.MitoInstance.SDK_VERSION)).toBe('4.0.0-beta.0')
  await page.getByRole('button', { name: '增加计数', exact: true }).click()
  await expect(page.getByText('1.0', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: '减少计数', exact: true }).click()
  await expect(page.getByText('0.0', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: '路由跳转', exact: true }).click()
  await expect(page).toHaveURL(/#\/page-two$/)
  await expect(page.getByRole('heading', { name: '把操作连成线' })).toBeVisible()
  await page.reload({ waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: '把操作连成线' })).toBeVisible()
  await page.getByRole('button', { name: '返回异常演示' }).click()
  await expect(page).toHaveURL(/#\/page-one$/)
  await expect(page.getByRole('button', { name: '手动上报', exact: true })).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('demo.png'), fullPage: true })
})

test('local MSW handlers answer real Fetch and XHR scenarios', async ({ page }) => {
  for (const [button, path, status, message] of [
    ['正常 XHR', '/normal', 200, 'XHR请求成功：Normal Get Request'],
    ['异常 XHR', '/abnormal', 500, 'XHR请求失败：Abnormal Get Request'],
    ['正常 Fetch', '/normal', 200, 'Fetch请求成功：Normal Get Request'],
    ['异常 Fetch', '/abnormal', 500, 'Fetch请求失败：Abnormal Get Request'],
  ] as const) {
    const [response] = await Promise.all([
      page.waitForResponse((response) => new URL(response.url()).pathname === path),
      page.getByRole('button', { name: button, exact: true }).click(),
    ])
    expect(response.status()).toBe(status)
    expect(response.fromServiceWorker()).toBe(true)
    await expect(page.getByText(message, { exact: true })).toBeVisible()
  }
})

test('MitoProvider reports the registry beta and ErrorBoundary keeps its fallback', async ({
  page,
}, testInfo) => {
  const [manual] = await Promise.all([
    page.waitForRequest(
      (request) =>
        request.method() === 'POST' &&
        new URL(request.url()).pathname === '/upload' &&
        request.postDataJSON()?.data?.message === '这是一条来自 React 19 演示的手动上报',
    ),
    page.getByRole('button', { name: '手动上报', exact: true }).click(),
  ])
  expect(manual.postDataJSON().authInfo).toMatchObject({ sdkName: 'mitojs', sdkVersion: '4.0.0-beta.0' })
  const manualResponse = await manual.response()
  expect(manualResponse?.status()).toBe(200)
  expect(manualResponse?.fromServiceWorker()).toBe(true)
  expect(await manualResponse?.json()).toEqual({ data: 'ok' })

  const [render] = await Promise.all([
    page.waitForRequest(
      (request) =>
        request.method() === 'POST' &&
        new URL(request.url()).pathname === '/upload' &&
        request.postDataJSON()?.data?.type === 'REACT',
    ),
    page.getByRole('button', { name: 'React 组件异常' }).click(),
  ])
  expect(render.postDataJSON().authInfo.sdkVersion).toBe('4.0.0-beta.0')
  expect(render.postDataJSON().data.message).toContain('is Render error')
  expect((await render.response())?.status()).toBe(200)
  await expect(page.getByText('Oops，触发了render error')).toBeVisible()
  await expect(page.getByRole('button', { name: '点击刷新' })).toBeVisible()
  await testInfo.attach('sdk-reports.json', {
    body: JSON.stringify({ manual: manual.postDataJSON(), render: render.postDataJSON() }, null, 2),
    contentType: 'application/json',
  })
  await page.getByRole('button', { name: '点击刷新' }).click()
  await expect(page.getByRole('button', { name: 'React 组件异常' })).toBeVisible()
})

test('the layout fits the viewport and navigation remains usable', async ({ page }, testInfo) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page
    .getByRole('navigation', { name: '演示导航' })
    .getByRole('button', { name: '行为轨迹', exact: true })
    .click()
  await expect(page.getByRole('heading', { name: '把操作连成线' })).toBeVisible()
  await page
    .getByRole('navigation', { name: '演示导航' })
    .getByRole('button', { name: '异常演示', exact: true })
    .click()
  await expect(page.getByRole('button', { name: '手动上报', exact: true })).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('layout.png'), fullPage: true })
})

for (const scenario of [
  { name: 'code errors', button: 'JavaScript 异常', type: 'JAVASCRIPT', error: /JavaScript 演示异常/ },
  {
    name: 'unhandled Promise rejections',
    button: 'Promise 异常',
    type: 'PROMISE',
    error: /Promise 演示异常/,
  },
]) {
  test(`the browser SDK reports ${scenario.name}`, async ({ page }, testInfo) => {
    const [report, error] = await Promise.all([
      page.waitForRequest(
        (request) =>
          request.method() === 'POST' &&
          new URL(request.url()).pathname === '/upload' &&
          request.postDataJSON()?.data?.type === scenario.type,
      ),
      page.waitForEvent('pageerror', (error) => scenario.error.test(error.message)),
      page.getByRole('button', { name: scenario.button }).click(),
    ])
    expect(report.postDataJSON().authInfo.sdkVersion).toBe('4.0.0-beta.0')
    expect((await report.response())?.status()).toBe(200)
    expect(error.message).toMatch(scenario.error)
    const issues = browserIssues.get(page)!
    issues.splice(issues.indexOf(error.message), 1)
    await testInfo.attach('browser-error-report.json', {
      body: JSON.stringify(report.postDataJSON(), null, 2),
      contentType: 'application/json',
    })
    await expect(page.getByRole('button', { name: '手动上报', exact: true })).toBeVisible()
  })
}
