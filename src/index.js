import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom'

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from './redux/reducer';


ReactDOM.render
    (
        <Provider store={ createStore(reducer) }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </Provider>, 
        document.getElementById('root')
        );

