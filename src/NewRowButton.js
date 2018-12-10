import React, {Component} from 'react';

export class NewRowButton extends Component {
    render() {
        return (
                <div className="font-sans text-center border-2 border-solid border-orange-light bg-orange-lightest">
                    <div className="p-2 " onClick={this.props.addNewRow}>
                        <i className="far fa-plus-square mr-2" onClick={this.props.onClick}>

                        </i>
                        Add New Row
                    </div>
                </div>
        )
    }
}


