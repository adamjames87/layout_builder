import React, {Component} from 'react';
import {ModalLauncher} from "./modal/ModalLauncher";
import {showModal} from "./actions";

export class NewRowButton extends Component {
    render() {
        return (
                <div className="font-sans text-center border-2 border-solid border-orange-light bg-orange-lightest">
                    <div className="p-2">
                        <ModalLauncher title="Add New Row"
                                       modalAction={showModal({modalType: 'ADD_ROW',
                                           modalProps: {columnId: this.props.columnId}})}/>
                    </div>
                </div>
        )
    }
}


