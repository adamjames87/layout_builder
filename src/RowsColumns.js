import React, {Component} from 'react';
import {connect} from 'react-redux'


export class PresentationColumn extends Component {

    static renderRows(column) {
        if (column.rows == null || column.rows.length === 0) {
            return (
                <span>{column.content}</span>
            );

        } else {
            return column.rows.map(
                row => {
                    return (
                        <Row key={row.id} rowId={row.id}/>
                    );
                });
        }
    }

    static colClasses() {
        return "border-2 border-solid border-black p-2"
    }

    render() {
        const column = this.props.column;
        const classNames = PresentationColumn.colClasses() + " col-md-" + column.colSpan;
        return (
            <div className={classNames}>
                {PresentationColumn.renderRows(column)}
            </div>
        )
    }
}

export class PresentationRow extends Component {

    renderColumns() {
        const row = this.props.row;
        return row.columns.map(
            col => {
                return (
                    <Column key={col.id} column={col}/>
                );
            });
    }

    render() {
        return (
            <div className="row">
                {this.renderColumns()}
            </div>
        )
    }
}


// ownProps gets given
// a rowId
const mapStateToPropsRow = (state, ownProps) => {
        console.log(state)
    console.log(ownProps)
    return {
        id: state.entities.rows.byId[ownProps.rowId].id,
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


// ownProps gets given
// a rowId
const mapStateToPropsCols = (state, ownProps) => {
    return {
        id: state.entities.rows.byId[ownProps.rowId].id,
        columns: state.entities.rows.byId[ownProps.rowId].columns,
    }
};

const mapDispatchToPropsCols = (dispatch, ownProps) => {
    return {
        onclick: () => {
            console.log("blah")
        }
    }
};

const Column = connect(
    mapStateToPropsCols,
    mapDispatchToPropsCols,
)(PresentationColumn);

