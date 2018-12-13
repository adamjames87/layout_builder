import {
  ADD_COLUMN, ADD_COLUMNS,
  ADD_ROW, HIDE_MODAL, MOVE_CONTENT, SHOW_MODAL
} from './actionTypes'
import {produce} from 'immer'
import {combineReducers} from "redux";


function makeColumn(id, colSpan, rows = [], contentId = null) {
  return {
    id: id,
    colSpan: colSpan,
    rows: rows,
    contentId: contentId
  }
}


function addColumn(columnState, id) {
  return produce(columnState, draft => {
    console.log(columnState);
    console.log(id);
    draft.byId[id] = makeColumn(id, 12);
    draft.allIds.push(id);
  });
}

// reducer for columns
export function columns(state = {}, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case ADD_COLUMN:
      {
        const id = action.columnId;
        draftState.byId[id] = makeColumn(id, 12);
        draftState.allIds.push(id);
        break;
      }
      case ADD_COLUMNS:
      {
        action.columnIds.map((id, index) => {
          draftState.byId[id] = makeColumn(id, action.colSpans[index]);
          draftState.allIds.push(id);
        });
        break;
      }
      case ADD_ROW:
      {
        if ((action.rowId != null) && (action.columnId != null)) {
          draftState.byId[action.columnId].rows.push(action.rowId);
        }
        break;
      }
      case MOVE_CONTENT:
      {
        const fromId = action.fromColumnId;
        const toId = action.toColumnId;
        draftState.byID[toId].content = this.state.byId[fromId].content;
        draftState.byID[fromId] = null;
        break;
      }
      default:
        return state;
    }
  });
}



// reducer for rows
const rows = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_COLUMN: {
        // find the ID of the row and add it in
        const rowId = action.rowId;
        draft.byId[rowId].columns.push(action.columnId);
        break;
      }

      case ADD_COLUMNS: {
        console.log(action.columnIds);
        const rowId = action.rowId;
        action.columnIds.map(columnId => draft.byId[rowId].columns.push(columnId));
        break;
      }

      case ADD_ROW: {
        const rowId = action.rowId;
        draft.byId[rowId] = {id: rowId, columns: []};
        draft.allIds.push(rowId);
        break;
      }
      default:
    }

  });


const content = (state = {}, action) => {
  return state;
};

const container = (state = {}, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case ADD_ROW:
      {
        // If the columnId is null then this is to go into
        // a container
        if (action.columnId == null) {
          draftState.rows.push(action.rowId);
        }
        break;
      }
      default:

    }
  });


// How does the state change interact with the
// entities object
const entities = combineReducers({
  columns,
  rows,
  container,
  content
});


// modal reducer
const modalInitialState = {
  modalType: null,
  modalProps: {}
};

const modal = (state = modalInitialState, action) => {
    switch (action.type) {
      case SHOW_MODAL:
        return {
          modalProps: action.modalProps,
          modalType: action.modalType,
          type: action.type
        };
      case HIDE_MODAL:
        return modalInitialState;
      default:
        return state;
    }
};


export const rootReducer = combineReducers({
  modal,
  entities
});
//     console.log(action)
//     switch (action.type) {
//         case ADD_COLUMN:
//             return produce(state, draft => {
//                 draft.entities.columns = columns(state.entities.columns, action);
//             });
//     }
// }
