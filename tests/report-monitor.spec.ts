import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('button', { name: '手动上报', exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true)
})

test('the local POST receiver displays the exact received payload and clears its selection', async ({
  page,
}) => {
  const payload = {
    authInfo: { sdkName: 'mitojs', sdkVersion: '4.0.0-beta.0', apikey: 'receiver-verification' },
    data: {
      type: 'LOG',
      message: 'receiver-direct-payload',
      tag: 'direct-post',
      time: 1794064889843,
      url: 'http://localhost/react-sdk-demo/',
    },
    breadcrumb: [{ type: 'Route', category: 'navigation', time: 1794064889800, data: { to: '/page-one' } }],
  }
  const status = await page.evaluate(async (payload) => {
    const response = await fetch('/upload', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return response.status
  }, payload)
  expect(status).toBe(200)
  const row = page.locator('.report-monitor__row').filter({ hasText: 'receiver-direct-payload' })
  await expect(row).toBeVisible()
  await row.click()
  await expect(row).toHaveAttribute('aria-pressed', 'true')
  const details = page.getByRole('region', { name: '选中记录详情' })
  await expect(details.locator('.report-monitor__detail-title strong')).toBeVisible()
  await details.getByText('完整 JSON', { exact: true }).click()
  expect(JSON.parse(await details.locator('pre').innerText())).toEqual(payload)
  await page.getByRole('button', { name: '清空记录', exact: true }).click()
  await expect(page.locator('.report-monitor__row')).toHaveCount(0)
  await expect(page.getByText('还没有上报记录', { exact: true })).toBeVisible()
  await expect(details).toHaveCount(0)
})

for (const [button, transport, source] of [
  ['正常 Fetch', 'fetch', 'Fetch'],
  ['正常 XHR', 'xhr', 'XHR'],
] as const) {
  test(`successful ${source} requests are uploaded and shown in the report monitor`, async ({ page }) => {
    const [upload, response] = await Promise.all([
      page.waitForRequest(
        (request) =>
          request.method() === 'POST' &&
          new URL(request.url()).pathname === '/upload' &&
          request.postDataJSON()?.data?.type === 'HTTP' &&
          request.postDataJSON()?.data?.request?.httpType === transport &&
          request.postDataJSON()?.data?.request?.url === '/normal',
        { timeout: 10000 },
      ),
      page.waitForResponse((response) => new URL(response.url()).pathname === '/normal'),
      page.getByRole('button', { name: button, exact: true }).click(),
    ])
    expect(response.status()).toBe(200)
    expect((await upload.response())?.status()).toBe(200)
    const payload = upload.postDataJSON()
    expect(payload.authInfo.sdkVersion).toBe('4.0.0')
    expect(payload.data).toMatchObject({
      type: 'HTTP',
      request: { method: 'GET', url: '/normal', httpType: transport },
      response: { status: 200 },
    })
    expect(payload.data.elapsedTime).toBeGreaterThanOrEqual(0)
    expect(payload.breadcrumb).toEqual(expect.arrayContaining([
      expect.objectContaining({
        category: 'http',
        data: expect.objectContaining({
          request: expect.objectContaining({ url: '/normal', httpType: transport }),
          response: expect.objectContaining({ status: 200 }),
        }),
      }),
    ]))
    expect(payload.breadcrumb.some((entry: any) => entry.data?.request?.url === '/upload')).toBe(false)
    const row = page.locator('.report-monitor__row').filter({ hasText: 'GET /normal' })
    await expect(row).toHaveCount(1)
    await expect(row).toContainText(source)
    await expect(row).toContainText('200')
    await expect(row).toContainText('本地演示请求已完成')
    await expect(row).toContainText(/\d+(?:\.\d+)?\s?ms/)
    await row.click()
    const details = page.getByRole('region', { name: '选中记录详情' })
    await expect(details).toContainText('GET /normal')
    await expect(details).toContainText('200')
    await details.getByText('完整 JSON', { exact: true }).click()
    expect(JSON.parse(await details.locator('pre').innerText())).toEqual(payload)
    await expect(page.locator('.report-monitor__row')).toHaveCount(1)
  })
}

test('repeated successful Fetch and XHR clicks each create an independent SDK upload', async ({ page }) => {
  const uploaded: unknown[] = []
  page.on('request', (request) => {
    if (request.method() === 'POST' && new URL(request.url()).pathname === '/upload') {
      uploaded.push(request.postDataJSON())
    }
  })
  const rows = page.locator('.report-monitor__row')
  for (const [index, [button, transport]] of [
    ['正常 Fetch', 'fetch'],
    ['正常 Fetch', 'fetch'],
    ['正常 XHR', 'xhr'],
    ['正常 XHR', 'xhr'],
  ].entries()) {
    const [upload] = await Promise.all([
      page.waitForRequest(
        (request) => request.method() === 'POST' &&
          new URL(request.url()).pathname === '/upload' &&
          request.postDataJSON()?.data?.request?.httpType === transport &&
          request.postDataJSON()?.data?.response?.status === 200,
        { timeout: 10000 },
      ),
      page.getByRole('button', { name: button, exact: true }).click(),
    ])
    expect((await upload.response())?.status()).toBe(200)
    await expect(rows).toHaveCount(index + 1)
  }
  expect(uploaded).toHaveLength(4)
  expect(new Set(await rows.evaluateAll((rows) => rows.map((row) => row.getAttribute('data-report-id')))).size).toBe(4)
  await expect(rows.locator('.report-monitor__source-detail')).toHaveText(['XHR', 'XHR', 'Fetch', 'Fetch'])
})

test('HTTP search and status filtering use only each event and retain transport and duration', async ({
  page,
}) => {
  await page.getByRole('button', { name: '手动上报', exact: true }).click()
  await expect(page.locator('.report-monitor__row')).toHaveCount(1)
  for (const name of ['异常 Fetch', '异常 XHR']) {
    const [upload] = await Promise.all([
      page.waitForRequest(
        (request) =>
          request.method() === 'POST' &&
          new URL(request.url()).pathname === '/upload' &&
          request.postDataJSON()?.data?.type === 'HTTP',
      ),
      page.getByRole('button', { name, exact: true }).click(),
    ])
    expect((await upload.response())?.status()).toBe(200)
  }
  await page.evaluate(async () => {
    await fetch('/upload', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        authInfo: { sdkVersion: '4.0.0-beta.0' },
        data: {
          type: 'JAVASCRIPT',
          name: 'Error',
          message: '状态筛选不应命中堆栈列号',
          stack: [{ url: `${location.origin}/assets/component.js`, line: 1500, column: 82500 }],
          time: Date.now(),
        },
        breadcrumb: [],
      }),
    })
  })
  await expect(page.locator('.report-monitor__row')).toHaveCount(4)
  const search = page.getByRole('searchbox', { name: '搜索上报记录' })
  await search.fill('HTTP')
  const rows = page.locator('.report-monitor__row')
  await expect(rows).toHaveCount(2)
  await expect(rows.filter({ hasText: 'Fetch' })).toHaveCount(1)
  await expect(rows.filter({ hasText: 'XHR' })).toHaveCount(1)
  for (const row of await rows.all()) {
    await expect(row).toContainText('GET /abnormal')
    await expect(row).toContainText('本地演示服务暂不可用')
    await expect(row).toContainText('500')
    await expect(row).toContainText(/\d+(?:\.\d+)?\s?ms/)
  }
  await search.fill('500')
  await expect(rows).toHaveCount(2)
  await search.fill('no-such-event')
  await expect(rows).toHaveCount(0)
  await expect(page.getByText('没有匹配的记录', { exact: true })).toBeVisible()
  await expect(page.getByRole('region', { name: '选中记录详情' })).toHaveCount(0)
  await search.fill('')
  await expect(rows).toHaveCount(4)
})

test('selection stays on the chosen report while live reports arrive and breadcrumbs stay local', async ({
  page,
}) => {
  const external: string[] = []
  page.on('request', (request) => {
    if (!['localhost', '127.0.0.1'].includes(new URL(request.url()).hostname)) external.push(request.url())
  })
  await page.getByRole('button', { name: '手动上报', exact: true }).click()
  const logRow = page
    .locator('.report-monitor__row')
    .filter({ hasText: '这是一条来自 React 19 演示的手动上报' })
  await expect(logRow).toBeVisible()
  await logRow.click()
  const selectedId = await logRow.getAttribute('data-report-id')
  await page.getByRole('button', { name: '异常 Fetch', exact: true }).click()
  await expect(page.locator('.report-monitor__row')).toHaveCount(2)
  await expect(page.locator(`.report-monitor__row[data-report-id="${selectedId}"]`)).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.getByRole('tab', { name: /行为轨迹/ }).click()
  const timeline = page.getByRole('list', { name: '行为轨迹列表' })
  await expect(timeline.getByRole('listitem').first()).toBeVisible()
  await expect(timeline).toContainText(/Click|点击|Fetch|GET/)
  await expect(page.locator('iframe')).toHaveCount(0)
  expect(external).toEqual([])
})

test('the real SDK ErrorBoundary report is readable in the monitor and the compact table fits mobile', async ({
  page,
}, testInfo) => {
  const [upload] = await Promise.all([
    page.waitForRequest(
      (request) =>
        request.method() === 'POST' &&
        new URL(request.url()).pathname === '/upload' &&
        request.postDataJSON()?.data?.type === 'REACT',
    ),
    page.getByRole('button', { name: 'React 组件异常', exact: true }).click(),
  ])
  expect(upload.postDataJSON().authInfo.sdkVersion).toBe('4.0.0')
  expect((await upload.response())?.status()).toBe(200)
  await expect(page.getByText('Oops，触发了render error', { exact: true })).toBeVisible()
  const row = page.locator('.report-monitor__row').filter({ hasText: 'is Render error' })
  await expect(row).toContainText(/React/i)
  await row.click()
  const details = page.getByRole('region', { name: '选中记录详情' })
  await expect(details).toContainText(/is Render error/)
  await details.getByText('完整 JSON', { exact: true }).click()
  expect(JSON.parse(await details.locator('pre').innerText())).toEqual(upload.postDataJSON())
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: testInfo.outputPath('compact-monitor.png'), fullPage: true })
})
