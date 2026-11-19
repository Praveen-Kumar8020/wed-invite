import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Reveal styles only hide content once JS is confirmed running.
document.documentElement.classList.add('js');

// The invitation always opens at the mandapam doors, not mid-page.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
