import {
    ADD_COLUMN,
    ADD_COMPOSITE_ROW,
    ADD_ROW
} from './actionTypes'
import {produce} from 'immer'


function addColumn(columnState, id){
   return produce(columnState, draft => {
        console.log(columnState);
        console.log(id);
        draft.byId[id] = {id: id, colSpan: 12, content: "I am new"};
        draft.allIds.push(id);
    });
}



export function columns(state, action) {
    console.log(state)
    switch (action.type) {
        case ADD_COLUMN:
            return addColumn(action.columnId);
        default:
            return state;
    }
}


export function handleAction(state, action) {
    console.log(action)
    switch (action.type) {
        case ADD_COLUMN:
            return produce(state, draft => {
                draft.entities.columns = columns(state.entities.columns, action);
            });
    }
}
