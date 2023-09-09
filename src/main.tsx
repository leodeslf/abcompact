import './sass/main.scss';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import App from './App';
import store from './stores/store';
import { inject } from '@vercel/analytics';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
inject();
