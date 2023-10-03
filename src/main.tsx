import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts';
import App from './App.tsx';
import GlobalStyles from './styles/global-styles.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={ i18n }>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>,
);
