import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { HashRouter } from 'react-router-dom';

import './styles.sass';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
