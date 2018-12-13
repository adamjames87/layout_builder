import {
    ADD_ROW,
    ADD_CONTAINER_ROW,
    ADD_COLUMN,
    ADD_COLUMNS,
    SHOW_MODAL,
    HIDE_MODAL,
    MOVE_CONTENT,
    ENCAPSULATE_CONTENT
} from "./actionTypes";
import {generateUUID} from "./utils";

export function addRow(afterId, columnId, rowId = generateUUID() ) {
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
export function addColumn(rowId, afterId, columnId = generateUUID()) {
    return {
        type: ADD_COLUMN,
        rowId: rowId,
        afterId: afterId,
        columnId: columnId
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

// Move content from one column to another
export function moveContent(fromColumnId, toColumnId) {
    return {
        type: MOVE_CONTENT,
        fromColumnId: fromColumnId,
        toColumnId: toColumnId
    }
}

export function encapsulateContent(dispatch, columnId) {
    console.log("Encapsulating content");
    const newRowId =  generateUUID();
    const newcolumnId = generateUUID();
    dispatch(addRow(null, columnId, newRowId));
    dispatch(addColumn(newRowId, null, newcolumnId));
    moveContent(columnId, newcolumnId);
}

export const showModal = ({modalProps, modalType}) => dispatch => {
    dispatch({
        type: SHOW_MODAL,
        modalProps,
        modalType
    });
};

export const hideModal = () => {
     return {
        type: HIDE_MODAL
    };
};



export function showNewColumnsModal(rowId) {
    return {
        type: SHOW_MODAL,
        modalType: 'ADD_COLUMNS_MODAL',
        modalProps: {
          rowId: rowId
        }
    };
}







