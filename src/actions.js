import {ADD_ROW, ADD_COMPOSITE_ROW, ADD_COLUMN} from "./actionTypes";
import {generateUUID} from "./utils";

export function addRow(afterId) {
    return {
        type: ADD_ROW,
        id: afterId
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

