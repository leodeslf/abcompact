import React from 'react';
import ReactDOM from 'react-dom';
import ABChoose from './ABChoose';
import store from './stores/store';
import { Provider } from 'react-redux';
import './scss/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ABChoose />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
