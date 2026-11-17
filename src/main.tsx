import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './styles/globals.css';

const container = document.getElementById('root');

if (container) {
  // If prerendered HTML exists in root, hydrateRoot; otherwise createRoot
  if (container.hasChildNodes()) {
    ReactDOM.hydrateRoot(
      container,
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

