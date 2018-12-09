import {
    ADD_COLUMN,
    ADD_COMPOSITE_ROW,
    ADD_ROW
} from './actionTypes'
import {produce} from 'immer'
import {combineReducers} from "redux";


function addColumn(columnState, id){
   return produce(columnState, draft => {
        console.log(columnState);
        console.log(id);
        draft.byId[id] = {id: id, colSpan: 12, content: "I am new"};
        draft.allIds.push(id);
    });
}


export function columns(state = {}, action) {
    switch (action.type) {
        case ADD_COLUMN:
            return addColumn(state, action.columnId);
        default:
            return state;
    }
}

// reducer for rows
const rows = (state = {}, action) =>
    produce(state, draft => {
        switch (action.type) {
            case ADD_COLUMN:
                // find the ID of the row and add it in
                const rowId = action.rowId;
                draft.byId[rowId].columns.push(action.columnId)
       }

    });




// How does the state change interact with the
// entities object
const entities = combineReducers({
    columns,
    rows
});


export const handleAction =  combineReducers({
    entities
});
//     console.log(action)
//     switch (action.type) {
//         case ADD_COLUMN:
//             return produce(state, draft => {
//                 draft.entities.columns = columns(state.entities.columns, action);
//             });
//     }
// }
