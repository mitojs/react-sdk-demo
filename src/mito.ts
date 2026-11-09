import { init, type BrowserClient } from '@mitojs/browser'
import { updateBreadcrumbs } from './monitoring/store'

declare global {
  interface Window {
    MitoInstance: BrowserClient
  }
}

export const MitoInstance = init({
  apikey: 'abc-123',
  dsn: '/upload',
  maxBreadcrumbs: 100,
  maxDuplicateCount: 100,
  silentConsole: true,
  enableTraceId: true,
  includeHttpUrlTraceIdRegExp: /.*/,
  beforeAppAjaxSend({ method }, config) {
    if (method === 'GET') {
      config.setRequestHeader('get-id', 'mito-get')
    }
  },
  beforePushBreadcrumb(breadcrumb, hint) {
    queueMicrotask(() => {
      updateBreadcrumbs(breadcrumb.getStack())
      const data = hint.data as {
        type?: string
        request?: { httpType?: string }
        response?: { status?: number }
      }
      const status = data?.response?.status
      if (
        hint.category === 'http' && data?.type === 'HTTP' &&
        (data.request?.httpType === 'fetch' || data.request?.httpType === 'xhr') &&
        typeof status === 'number' && status >= 200 && status < 400
      ) {
        void MitoInstance.transport.send(data, breadcrumb.getStack().slice())
      }
    })
    return hint
  },
})

window.MitoInstance = MitoInstance
