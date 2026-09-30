import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n';
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import PublicationReader from './pages/PublicationReader.jsx'
import { readerIdFromLocation } from './utils/publicationLinks'

// A Feed World issue opened in its own tab (/?publication=<id>) gets the standalone reader, not
// the app - see utils/publicationLinks.js.
const readerId = readerIdFromLocation();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      {readerId ? <PublicationReader id={readerId} /> : <App />}
    </ErrorBoundary>
  </StrictMode>,
)
