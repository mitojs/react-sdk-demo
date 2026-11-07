import { http, HttpResponse } from 'msw/http'

export const handlers = [
  http.get('/normal', () => HttpResponse.json({ data: 'Normal Get Request' })),
  http.get('/abnormal', () => HttpResponse.json({ data: 'Abnormal Get Request' }, { status: 500 })),
  http.post('/upload', () => HttpResponse.json({ data: 'ok' })),
]
