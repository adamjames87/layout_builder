export const originalState = {
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
                },
                row3: {
                  id: "row3",
                    columns: []
                },
                row4: {
                    id: "row4",
                    columns: []
                }
            },
            allIds : ["row1", "row2"]
        },
        columns: {
            byId: {
                "column1" : {
                    id: "column1",
                    colSpan: 6,
                    contentId: null,
                    rows: ["row3", "row4"]
                },
                "column2" : {
                    id: "column2",
                    colSpan: 6,
                    blockId: "block1",
                    rows: []
                },
                "column3" : {
                    id: "column3",
                    colSpan: 4,
                    blockId: "block1",
                    rows: []
                },
                "column4" : {
                    id: "column4",
                    colSpan: 8,
                    blockId: "block1",
                    rows: []
                },
                "column5" : {
                    id: "column5",
                    colSpan: 12,
                    blockId: "block1",
                    rows: []
                }
            },
            allIds: ["column1", "column2", "column3", "column4"]
        },
        container: {
            id: "container1",
            rows: ["row1", "row2"]
        },
        content: {
            templates: {
                "template1" : {
                    id: "template1",
                    type: "BUTTON_BLOCK",
                    fields: ["templateField1", "templateField2"]
                }
            },
            template_fields : {
                "templateField1" : {
                    id: "templateField1",
                    type: "TEXT",
                    name: "button_text",
                    desc: "The button text"
                },
                "templateField2" : {
                    id: "templateField2",
                    type: "TEXT",
                    name: "link",
                    desc: "where the button leads"
                }
            },
            blocks : {
                "block1" : {
                    id: "block1",
                    templateId: "template1",
                    preview: "<button class='btn btn-block btn-primary text-center'>A button</button>",
                    blockFields: ["blockField1"]
                },

            },
            blockFields: {
                "blockField1": {
                    id : "blockField1",
                    templateField: "templateField1",
                    fieldType: 'STATIC',
                    value: "A test"
                }
            },
        },

    }
};
