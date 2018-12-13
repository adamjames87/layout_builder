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
                    contentId: "content2",
                    rows: []
                },
                "column3" : {
                    id: "column3",
                    colSpan: 4,
                    contentId: "content3",
                    rows: []
                },
                "column4" : {
                    id: "column4",
                    colSpan: 8,
                    contentId: "content4",
                    rows: []
                },
                "column5" : {
                    id: "column5",
                    colSpan: 12,
                    contentId: "content1",
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
            "content1" : {
              id: "content1",
              data: "I am content 1"
            },
            "content2" : {
                id: "content2",
                data: "I am content 2"
            },
            "content3" : {
                id: "content3",
                data: "Look at me update"
            },
            "content4" : {
                id: "content4",
                data: "I am content 4"
            }
        }

    }
};
