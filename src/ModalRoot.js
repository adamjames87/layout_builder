import React, {Component} from 'react';
import {connect} from 'react-redux'
import Modal from 'react-modal'
import {showNewColumnsModal, hideModal, addColumnConfiguration} from "./actions";




export class NewColumnModal extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.hideModal}
          contentLabel="Example Modal"
          bodyOpenClassName="modal-open"
          ariaHideApp={false}
          className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Add Columns to row {this.props.rowId}</h5></div>
            <div className="modal-body">
              <h2>Hello</h2>
              <button className="btn btn-secondary m-2" onClick={() => this.props.createColumns([6,6])}>Create 2</button>
              <button className="btn btn-secondary m-2" onClick={() => this.props.createColumns([4,4,4])}>Create 3</button>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={this.props.hideModal}>Close</button>
            </div>

          </div>

        </Modal>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  console.log(state);
  return {
    isOpen: (state.modal.modalType != null),
    ...state.modal.modalProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideModal: () => dispatch(hideModal()),
    createColumns: (config) => dispatch(addColumnConfiguration(ownProps.rowId, config))
  }
}



export const NewColumnModalContainer  = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewColumnModal);




const MODAL_COMPONENTS = {
  'ADD_COLUMNS_MODAL' : NewColumnModalContainer
};


const ModalRoot = ({modalType, modalProps, dispatch}) => {
  if (!modalType) {
    return <span />
  }
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} dispatch={dispatch}/>
};


export const ModalRootContainer = connect(
  state => state.modal
)(ModalRoot);



// Modal open button.
const OpenModalBtn = ({modalAction, dispatch}) => (
  <button onClick={modalAction(dispatch)}>Open Modal</button>
);

function mapStateToPropsBtn (state, ownProps) {
  return {
    modalAction:  ownProps. modalAction,
  }
};

export const mapDispatchToPropsBtn = (dispatch, ownProps) => {
};


// Usage:
// <ConnectOpenModalBtn  modalAction={showModal({modalType: , modalProps: {}})}/>
export const ConnectedOpenModalBtn = connect(
  mapStateToPropsBtn,
  mapDispatchToPropsBtn
)(OpenModalBtn);





