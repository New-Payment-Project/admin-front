import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './router/Router';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterConfig />
);
