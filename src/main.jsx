import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginButton from './LoginButton';
import { Auth0Provider } from '@auth0/auth0-react';

let CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
let DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
let REDIRECT_URI = import.meta.env.VITE_AUTH0_REDIRECT_URI;
console.log(CLIENT_ID, DOMAIN, REDIRECT_URI);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    authorizationParams={{
      redirect_uri: REDIRECT_URI
    }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
