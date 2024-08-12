import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store';

const gooleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(gooleClientId);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={gooleClientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
