import { init, type BrowserClient } from '@mitojs/browser'

declare global {
  interface Window {
    MitoInstance: BrowserClient
  }
}

export const MitoInstance = init({
  apikey: 'abc-123',
  dsn: '/upload',
  maxBreadcrumbs: 100,
  debug: true,
  silentConsole: true,
  enableTraceId: true,
  includeHttpUrlTraceIdRegExp: /.*/,
  beforeAppAjaxSend({ method }, config) {
    if (method === 'GET') {
      config.setRequestHeader('get-id', 'mito-get')
    }
  },
  beforePushBreadcrumb(_breadcrumb, hint) {
    return hint
  },
})

window.MitoInstance = MitoInstance
