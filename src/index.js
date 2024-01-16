import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>


    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId="201005155607-2253gu1a6nb2c0nkif3cvc6q0al5d0mo.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
