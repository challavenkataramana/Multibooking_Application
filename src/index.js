import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18

import App from './App'; // Make sure this path is correct
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
// Create the root element with React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
const CLIENT_ID = "1037458885721-e6ftqa2m1jdrhuj20md6soaj29asjq1l.apps.googleusercontent.com"

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>

  </React.StrictMode>


);
