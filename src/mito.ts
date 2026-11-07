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
  silentConsole: true,
  enableTraceId: true,
  includeHttpUrlTraceIdRegExp: /.*/,
  beforeAppAjaxSend({ method }, config) {
    if (method === 'GET') {
      config.setRequestHeader('get-id', 'mito-get')
    }
  },
  beforePushBreadcrumb(breadcrumb, hint) {
    queueMicrotask(() => updateBreadcrumbs(breadcrumb.getStack()))
    return hint
  },
})

window.MitoInstance = MitoInstance
