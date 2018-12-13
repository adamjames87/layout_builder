import React from 'react';
import {connect} from "react-redux";
import Modal from "react-modal";
import {hideModal} from "../actions";



const DumbAddRowModal = ({isOpen, columnId, addAction, dispatch}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(hideModal())}
            ariaHideApp={false}
            // overlayClassName="modal fade show"
            bodyOpenClassName="modal-open"
            className="modal-dialog modal-dialog-centered" >
            <div className="modal-content">
                <div className="modal-header">
                    <h5
                        className="modal-title"
                    >Add Row</h5>
                    <button type="button" className="close"
                            aria-label="Close"
                            onClick={() => dispatch(hideModal())}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Would you like to add a row to column {columnId}?</p>
                    <button className="btn btn-secondary"
                            onClick={() => {
                                addAction(dispatch, columnId);
                                dispatch(hideModal());
                            }}
                    >Yes</button>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            className="btn btn-secondary"
                            onClick={() => dispatch(hideModal())}>close
                    </button>
                </div>
            </div>
        </Modal>
    )
};

export const AddRowModal = connect(
    (state, ownProps) => ({
        ...state.modalProps,
        isOpen: (state.modal.modalType != null),

    })
)(DumbAddRowModal);

