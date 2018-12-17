import React, {Component} from 'react';
import {connect} from 'react-redux'
import {addColumnConfiguration} from "./actions";
import {ModalLauncher} from "./modal/ModalLauncher";
import {showModal} from "./actions";
import {ContentDisplayBlock} from "./components/ContentDisplayBlock";
import {ContentAddButton} from "./components/ContentAddButton";
import {NewRowButton} from "./components/NewRowButton";


// props:
// id
// rows
export class PresentationColumn extends Component {

    // logic:
    // if rows then display rows + add new row
    // if content display content + add new row
    // if neither rows nor content + add new content

    renderRows(column) {

        if (this.props.rows == null || this.props.rows.length === 0) {
            if (this.props.blockId != null) {
                return (
                    <ContentDisplayBlock blockId={this.props.blockId}/>
                );
            } else {
                return (
                    <button className="btn btn-primary m-2">
                        <ModalLauncher title="Add Content"
                                       modalAction={showModal(
                                           {
                                               modalType: 'ADD_CONTENT',
                                               modalProps: {columnId: this.props.id,
                                                   templateId: "template1"}
                                           })}/>
                    </button>
                );
            }

        } else {
            return this.props.rows.map(
                row => {
                    return (
                        <Row key={row} rowId={row}/>
                    );
                });
        }
    }

    static colClasses() {
        return "border-2 border-solid border-grey-light"
    }

    render() {
        const classNames = PresentationColumn.colClasses() + " col-md-" + this.props.colSpan;
        return (
            <div className={classNames}>
                {this.renderRows()}
                <NewRowButton columnId={this.props.id}/>
            </div>
        )
    }
}


export class PresentationRow extends Component {
    renderColumns() {

        return this.props.columns.map(
            col => {
                return (
                    <Column key={col} columnId={col}/>
                );
            });
    }

    render() {
        // We always need columns
        if (this.props.columns.length > 0) {
            return (
                <div className="row border-2 border-solid border-blue-lightest">
                    {this.renderColumns()}
                </div>
            )
        } else {
            // if we have no columns then add button to make them
            return (
                <div className="row border-2 border-solid border-blue-lightest">
                    <div className="col-md-12">
                        <NewColumnBtn rowId={this.props.id}/>
                    </div>
                </div>
            );
        }

    }
}


// ownProps gets given
// a rowId
const mapStateToPropsRow = (state, ownProps) => {
    return {
        id: state.entities.rows.byId[ownProps.rowId].id,
        row: state.entities.rows.byId[ownProps.rowId].id,
        columns: state.entities.rows.byId[ownProps.rowId].columns,
    }
};

const mapDispatchToPropsRow = (dispatch, ownProps) => {
    return {
        onclick: () => {
            console.log("blah")
        }
    }
};

export const Row = connect(
    mapStateToPropsRow,
    mapDispatchToPropsRow,
)(PresentationRow);


// A Column is given a column id
// A Presentation Column requires
// id
// rows
// col-span
// content
const mapStateToPropsColumn = (state, ownProps) => {
    let byIdElement = state.entities.columns.byId[ownProps.columnId];
    return {
        id: ownProps.columnId,
        rows: byIdElement.rows,
        colSpan: byIdElement.colSpan,
        blockId: byIdElement.blockId,
    }
};

const Column = connect(
    mapStateToPropsColumn,
)(PresentationColumn);

// NewColumnBtn
export class DumbNewColumnBtn extends Component {
    render() {
        return (
            <div className=" p-2 text-center"
            >
                <button className="btn btn-primary m-2">
                    <ModalLauncher title="Add Columns"
                                   modalAction={showModal(
                                       {
                                           modalType: 'ADD_COLUMNS',
                                           modalProps: {rowId: this.props.rowId}
                                       })}/>
                </button>
            </div>
        );
    }
}

const mapStateToPropsNewColumnBtn = (state, ownProps) => {
    return {
        rowId: ownProps.rowId
    }
}

const mapDispatchToPropsNewColumnBtn = (dispatch, ownProps) => {
    return {
        onClick: () => dispatch(addColumnConfiguration(ownProps.rowId, [4, 4, 4]))
    }
};

export const NewColumnBtn = connect(
    mapStateToPropsNewColumnBtn,
    mapDispatchToPropsNewColumnBtn
)(DumbNewColumnBtn);

