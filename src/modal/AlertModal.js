import React from 'react';
import {connect} from "react-redux";
import Modal from "react-modal";
import {hideModal} from "../actions";

const DumbAlertModal = ({isOpen, title, message, dispatch}) => {
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
                    >{title}</h5>
                    <button type="button" className="close"
                            aria-label="Close"
                            onClick={() => dispatch(hideModal())}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
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

export const AlertModal = connect(
    (state, ownProps) => ({
        ...state.modalProps,
        isOpen: (state.modal.modalType != null),

    })
)(DumbAlertModal);

