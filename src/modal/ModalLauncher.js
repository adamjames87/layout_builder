import React from 'react';
import {connect} from "react-redux";


// Dumb launcher takes an action and dispatches it...`
const DumbModalLauncher = ({title, modalAction, dispatch}) => {
    return <div onClick={() => modalAction(dispatch)}>{title}</div>
};


// Modal Launcher:
// <ModalLauncher title= modalAction={showModal(modalProps, modalType)}/>
export const ModalLauncher = connect(
    (state, ownProps) => ({
        title: ownProps.title,
        modalAction: ownProps.modalAction
    })
)(DumbModalLauncher);

