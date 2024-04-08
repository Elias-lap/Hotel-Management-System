import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { AuthContextProvider } from './Context/Components/AuthContext.tsx'
import { ToastContextProvider } from './Context/Components/TousterContext.tsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContextProvider>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    <ToastContainer/>
    </ToastContextProvider>
  
  </React.StrictMode>,
)
