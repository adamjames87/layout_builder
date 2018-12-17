import React from 'react';
import {connect} from "react-redux";


export const BtnBlockPreview = ({button_text, link}) => {
    return (
        <button className="btn btn-block btn-secondary">
            {button_text.value}
        </button>
    )
};



