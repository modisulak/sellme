import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';

import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import awsconfig from './aws-exports';

import ContextProvider from './contexts/ContextProvider';

/** Configure amplify */
// @ts-ignore
Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
