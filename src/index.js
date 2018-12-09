import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './game.css';
import GridContainer from './App';
import * as serviceWorker from './serviceWorker';
import {rootReducer} from './reducers'
import {Provider} from "react-redux";
import {createStore} from "redux";


var originalState = {
    rootRows: ["row1", "row2"],
    entities: {
        rows: {
            byId: {
                "row1" : {
                    id: "row1",
                    columns: ["column1", "column2"]
                },
                "row2" : {
                    id: "row2",
                    columns: ["column3", "column4"]
                }
            },
            allIds : ["row1", "row2"]
        },
        columns: {
            byId: {
                "column1" : {
                    id: "column1",
                    colSpan: 6,
                    content: "First Column"
                },
                "column2" : {
                    id: "column2",
                    colspan: 6,
                    content: "Second Column"
                },
                "column3" : {
                    id: "column3",
                    colSpan: 4,
                    content: "Third Column"
                },
                "column4" : {
                    id: "column4",
                    colSpan: 8,
                    content: "Fourth Column"
                }
            },
            allIds: ["column1", "column2", "column3", "column4"]
        }
    }
};

const store = createStore(rootReducer, originalState);
ReactDOM.render(
    <Provider store={store}>
        <GridContainer />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
