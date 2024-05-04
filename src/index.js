import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styles from './index.module.css'
import { BrowserRouter } from "react-router-dom";
import 'normalize.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
          <App />
    </React.StrictMode>
  </BrowserRouter>
);