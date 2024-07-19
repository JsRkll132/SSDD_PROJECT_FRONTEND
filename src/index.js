import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import AuthProvider from 'react-auth-kit/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import createStore from 'react-auth-kit/createStore';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
  <AuthProvider store={createStore({
                authName:'_auth',
                authType:'cookie',
                cookieDomain: window.location.hostname,
                cookieSecure: false
              })}
        >
  

        <App />
  
   
    </AuthProvider>
    
  </React.StrictMode>
);
