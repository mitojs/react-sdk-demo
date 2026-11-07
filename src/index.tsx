import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MitoProvider } from '@mitojs/react'
import App from './App'
import { MitoInstance } from './mito'
import { worker } from './mocks/browser'

async function bootstrap() {
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledFrame: 'bypass',
  })

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MitoProvider MitoInstance={MitoInstance}>
        <App />
      </MitoProvider>
    </StrictMode>
  )
}

void bootstrap()
