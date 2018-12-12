import React from 'react';
import {connect} from "react-redux";
import Modal from "react-modal";
import {addColumn, addColumnConfiguration, hideModal} from "../actions";

const DumbAddColumnsModal = ({isOpen, rowId, dispatch}) => {
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
                    >Add Columns</h5>
                    <button type="button" className="close"
                            aria-label="Close"
                            onClick={() => dispatch(hideModal())}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Would you like to add some columns to row {rowId}?</p>
                    <button className="btn btn-secondary"
                            onClick={() => {
                                dispatch(addColumnConfiguration(rowId, [12]));
                                dispatch(hideModal());
                            }}
                    >Add 1</button>
                    <button className="btn btn-secondary"
                            onClick={() => {
                                dispatch(addColumnConfiguration(rowId, [6,6]));
                                dispatch(hideModal());
                            }}
                    >Add 2</button>
                    <button className="btn btn-secondary"
                            onClick={() => {
                                dispatch(addColumnConfiguration(rowId, [4,4,4]));
                                dispatch(hideModal())
                            }}
                    >Add 3</button>
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

export const AddColumnsModal = connect(
    (state, ownProps) => ({
        ...state.modalProps,
        isOpen: (state.modal.modalType != null),

    })
)(DumbAddColumnsModal);

