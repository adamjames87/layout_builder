import {
    ADD_ROW,
    ADD_CONTAINER_ROW,
    ADD_COLUMN,
    ADD_COLUMNS,
    SHOW_MODAL,
    HIDE_MODAL,
    MOVE_CONTENT,
    CREATE_BLOCK, CREATE_BLOCK_FIELD, GENERATE_PREVIEW
} from "./actionTypes";
import {generateUUID} from "./utils";

export function addRow(afterId, columnId, rowId = generateUUID()) {
    return {
        type: ADD_ROW,
        rowId: rowId,
        afterId: afterId,
        columnId: columnId
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

export function createBlock(templateId, blockId = generateUUID()) {
    // OK so first create the blocks
    return {
        blockId: blockId,
        type: CREATE_BLOCK,
        templateId: templateId,
    }
}


export function createBlockField(templateFieldId, fieldType, value, blockId, blockFieldId = generateUUID()) {
    return {
        type: CREATE_BLOCK_FIELD,
        blockFieldId: blockFieldId,
        templateField: templateFieldId,
        fieldType: 'STATIC',
        blockId: blockId,
        value: value
    }
}


export function attachBlock(blockId, columnId) {
    return {
        type: 'ATTACH_BLOCK',
        blockId: blockId,
        columnId: columnId
    }
}


export function createContent(dispatch, templateId, templateFields, columnId) {
    const blockId = generateUUID();

    // Create the block
    dispatch(createBlock(templateId, blockId));

    // Create the block fields
    Object.keys(templateFields.byId).forEach(
        templateId => dispatch(createBlockField(
            templateFields.byId[templateId].id,
            'STATIC',
            templateFields.byId[templateId].value,
            blockId)
        ));

    // Now attach the block
    dispatch(attachBlock(blockId, columnId));

    // Now try and preview
    dispatch(generatePreview(blockId));
}


export function encapsulateContent(dispatch, columnId) {
    console.log("Encapsulating content");
    const newRowId = generateUUID();
    const newcolumnId = generateUUID();
    dispatch(addRow(null, columnId, newRowId));
    dispatch(addColumn(newRowId, null, newcolumnId));
    moveContent(columnId, newcolumnId);
}


export function generatePreview(blockId) {
    return {
        type: GENERATE_PREVIEW,
        blockId: blockId
    }
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







