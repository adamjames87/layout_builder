import {
    ADD_COLUMN,
    ADD_COMPOSITE_ROW,
    ADD_ROW
} from './actionTypes'

import {
    addColumn,
    addRow
} from './actions'



function columns(state, action) {
    switch (action.type) {
        case ADD_COLUMN:
            const newId = generateUUID();
            const added = state.setIn(['byId', newId], Map({id: newId, colSpan: 12, content: "I am new"}));
            const intoList = added.set("allIds", added.get("allIds").push(newId));
            return intoList;
        default:
            return state;
    }
}


function handleAction(state = originalState, action) {
    console.log(action)
    switch (action.type) {
        case ADD_COLUMN:
            return  setIn(state, ['entities', 'columns'], columns(getIn(state, ['entities', 'columns']), action));
    }
}
