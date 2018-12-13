import React from 'react';
import {addRow, encapsulateContent, showModal} from "../actions";
import connect from "react-redux/es/connect/connect";
import {ModalLauncher} from "../modal/ModalLauncher";

const DumbNewRowButton = ({columnId, addAction, dispatch}) => {
  return (
    <div className="font-sans text-center border-2 border-solid border-orange-light bg-orange-lightest">
      <div className="p-2">
        <ModalLauncher title="Add New Row"
                       modalAction={showModal({
                         modalType: 'ADD_ROW',
                         modalProps: {columnId: columnId, addAction: addAction, dispatch: dispatch}
                       })}/>
      </div>
    </div>
  )
}

// We want to pass the new row button an addRow action
// this depends on a few factors:
// if the column has content then first we must encapsulate that content
// in a row and then add the row
// *

const encapsulateAndAdd = (dispatch, columnId) => {
  encapsulateContent(dispatch, columnId);
  dispatch(addRow(null, columnId));
};


const mapStateToProps = (state, ownProps) => {


  const columnId = ownProps.columnId;

  if (columnId == null) {
    return {
      columnId: null,
      addAction: (dispatch, columnId) => {
        dispatch(addRow(null, null))
      }
    }
  }


  // Get the column.
  // if the column in question
  const column = state.entities.columns.byId[columnId];
  if (column.blockId != null) {
    return {
      columnId: ownProps.columnId,
      addAction: encapsulateAndAdd
    }
  } else {
    return {
      columnId: ownProps.columnId,
      addAction: (dispatch, columnId) => {
        dispatch(addRow(null, columnId))
      }
    }
  }

};

export const NewRowButton = connect(
  mapStateToProps,
)(DumbNewRowButton);


