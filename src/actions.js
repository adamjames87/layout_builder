import {ADD_ROW, ADD_CONTAINER_ROW, ADD_COLUMN, ADD_COLUMNS, HIDE_MODAL, SHOW_MODAL} from "./actionTypes";
import {generateUUID} from "./utils";

export function addRow(afterId, columnId ) {
    const rowId = generateUUID();
    return {
        type: ADD_ROW,
        rowId: rowId,
        afterId: afterId,
        columnId:  columnId
    }
}

export function addContainerRow(afterId) {
    const rowId = generateUUID();
    return {
        type: ADD_CONTAINER_ROW,
        id: rowId,
        afterId: afterId
    }
}

// Add a column
export function addColumn(rowId, afterId) {
    const id = generateUUID();
    return {
        type: ADD_COLUMN,
        rowId: rowId,
        afterId: afterId,
        columnId: id
    }
}

export function addColumnConfiguration(rowId, colSpans) {
    const id = generateUUID();
    const columnIds = colSpans.map(() => generateUUID());
    return {
        type: ADD_COLUMNS,
        rowId: rowId,
        columnIds: columnIds,
        colSpans: colSpans
    }
}

export const showModal = ({modalProps, modalType}) => dispatch => {
    dispatch({
        type: SHOW_MODAL,
        modalProps,
        modalType
    });
}

export const hideModal = () => {
     return {
        type: HIDE_MODAL
    };
}


