import './sass/main.scss';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import React from 'react';
import store from './stores/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
