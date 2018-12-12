import React from 'react'
import ReactModal from 'react-modal'

const AlertModal = ({closeModal}) => {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5
                    className="modal-title"
                >I am modal</h5>
                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>I am body</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>close</button>
            </div>
        </div>
    )
};


const mapStateToProps = state => ({
})




