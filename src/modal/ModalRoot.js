import React from 'react';
import {connect} from "react-redux";
import {MODAL_COMPONENTS} from "./ModalComponents";


const DumbModalRoot = ({modalType, modalProps}) => {
    if (!modalType) {
        return <span/>
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps}  />
};

export const ModalRoot = connect(
    state => state.modal
)(DumbModalRoot);

