import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import {HashRouter} from "react-router-dom";
import {AppProvider} from "./hooks/use-app-context";

ReactDOM.render(
    <HashRouter>
        <React.StrictMode>
            <AppProvider>
                <App />
            </AppProvider>
        </React.StrictMode>
    </HashRouter>,
  document.getElementById('root')
);
