import React, {Component} from 'react';
import {connect} from 'react-redux'
import {LinkedNewRow} from './LinkedNewRow'
import {addColumnConfiguration} from "./actions";
import {ModalLauncher} from "./modal/ModalLauncher";
import {showModal} from "./actions";


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
        <LinkedNewRow/>
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
        console.log("Row props :");
    console.log(this.props);

    // We always need columns
    if (this.props.columns.length > 0) {
      return (
        <div className="row">
          {this.renderColumns()}
        </div>
      )
    } else {
      // if we have no columns then add button to make them
      return (
        <div className="row">
          <div className="col-md-12">
            <NewColumnBtn rowId={this.props.id}/>
          </div>
        </div>
      );
    }

  }
}


// NewColumnBtn
export class DumbNewColumnBtn extends Component {
  render() {
    return (
      <div className="border-2 border-solid border-black p-2 text-center"
      >
        <button className="btn btn-primary m-2">
          <ModalLauncher title="Add Columns"
                         modalAction={showModal(
                             {modalType: 'ADD_COLUMNS',
                               modalProps: {rowId: this.props.rowId,}})} />
        </button>
        <button className="btn btn-primary m-2">
          <ModalLauncher title="Add Content"
                         modalAction={showModal(
                             {modalType: 'ADD_COLUMNS',
                               modalProps: {rowId: this.props.rowId,}})} />
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
    onClick: () => dispatch(addColumnConfiguration(ownProps.rowId, [4,4,4]))
  }
};

export const NewColumnBtn = connect(
  mapStateToPropsNewColumnBtn,
  mapDispatchToPropsNewColumnBtn
)(DumbNewColumnBtn);





// ownProps gets given
// a rowId
const mapStateToPropsRow = (state, ownProps) => {
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

