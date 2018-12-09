import React, {Component} from 'react';
import {connect} from 'react-redux'


// props:
// id
// rows
export class PresentationColumn extends Component {

     renderRows(column) {
        if (this.props.rows == null || this.props.length === 0) {
            return (
                <span>{this.props.content}</span>
            );

        } else {
            return this.props.rows.map(
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
        const classNames = PresentationColumn.colClasses() + " col-md-" + this.props.colSpan;
        return (
            <div className={classNames}>
                {this.renderRows()}
            </div>
        )
    }
}

export class PresentationRow extends Component {

    renderColumns() {
        console.log(this.props)
        return this.props.columns.map(
            col => {
                return (
                    <Column key={col.id} columnId={col}/>
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
        rows: byIdElement.columns,
        colSpan: byIdElement.colSpan,
        content: byIdElement.content,
    }
};

const mapDispatchToPropsColumn = (dispatch, ownProps) => {
    return {
        onclick: () => {
            console.log("blah")
        }
    }
};

const Column = connect(
    mapStateToPropsColumn,
    mapDispatchToPropsColumn,
)(PresentationColumn);

