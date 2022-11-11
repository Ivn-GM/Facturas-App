import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './store/store';
import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} > 
      <MantineProvider theme={{ colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
