{
    entities: {
        container: {
            id: "container1",
                rows: []
        }
        rows: {
            byId: {
                "row1" : {
                    id: "row1",
                    columns: ["column1", "column2"]
                },
                "row2" : {
                    id: "row2",
                    columns: ["column3", "column4"]
                }
            },
            allIds : ["row1", "row2"]
        },
        columns: {
            byId: {
                "column1" : {
                    id: "column1",
                    colSpan: 6,
                    content: "First Column"
                },
                "column2" : {
                    id: "column2",
                    colspan: 6,
                    content: "Second Column"
                },
                "column3" : {
                    id: "column3",
                    colSpan: 4,
                    content: "Third Column"
                },
                "column4" : {
                    id: "column4",
                    colSpan: 8,
                    content: "Fourth Column"
                }
            },
            allIds: ["column1", "column2", "column3", "column4"]
        }
    }
}
