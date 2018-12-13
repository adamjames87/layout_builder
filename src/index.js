import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './game.css';
import GridContainer from './App';
import * as serviceWorker from './serviceWorker';
import {rootReducer} from './reducers'
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {originalState} from "./schema";
import {logger} from './middleware/Logger'


const store = createStore(rootReducer, originalState,applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <GridContainer />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
