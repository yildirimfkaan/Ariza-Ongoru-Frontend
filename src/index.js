import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PLayout from './layouts/PLayout';

const app = (
  <React.StrictMode>
    <PLayout>
    <App />
    </PLayout>
    
  </React.StrictMode>
);

ReactDOM.render(app,document.getElementById('root'));
