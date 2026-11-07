import { http, HttpResponse } from 'msw/http'
import { receiveReport, type ReportRecord } from '../monitoring/store'

export const handlers = [
  http.get('/normal', () => HttpResponse.json({ data: 'Normal Get Request', message: '本地演示请求已完成' })),
  http.get('/abnormal', () =>
    HttpResponse.json({ data: 'Abnormal Get Request', message: '本地演示服务暂不可用' }, { status: 500 }),
  ),
  http.post('/upload', async ({ request }) => {
    const payload = (await request.json()) as ReportRecord['payload']
    receiveReport(payload)
    return HttpResponse.json({ data: 'ok' })
  }),
]
