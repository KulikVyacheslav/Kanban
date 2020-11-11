import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import {App} from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {ModalProvider} from "react-modal-hook";
import {Provider} from 'react-redux';
import {store, persistor} from './store';

import reportWebVitals from './reportWebVitals';
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.render(
    <Router>

        <React.StrictMode>
            <Provider store={store}>
                <ModalProvider>
                    <PersistGate loading={null} persistor={persistor}>
                        <App/>
                    </PersistGate>
                </ModalProvider>
            </Provider>
        </React.StrictMode>

    </Router>
    , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
