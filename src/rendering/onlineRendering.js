import React from "react";
import ReactDOMServer from 'react-dom/server';
import {BtnBlockPreview} from "./ButtonBlockPreview";

function stateTo(content, blockId ) {
    console.log(content);
    console.log(blockId);
    // Get ownProps.buttonID and extract buttonText
    const block = content.blocks[blockId];
    console.log(block);

    // Extract block field information.
    const fields = {};
    const blockFields = block.blockFields;
    for (let i =0; i < blockFields.length; i++) {
        const fieldId = blockFields[i];
        const blockField = content.blockFields[fieldId];
        const templateField = content.template_fields[blockField.templateField];

        // OK now add this
        fields[templateField.name] =  blockField;
    }
    return fields;
}

export function generateOfflinePreview(state, blockId) {
    return ReactDOMServer.renderToString(
        <BtnBlockPreview {...stateTo(state,blockId)}/>
    )
}