import React, {Component} from 'react';

export class NewRowButton extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 font-sans text-center border-2 border-solid border-black">
                    <div className="p-2">
                        <i className="far fa-plus-square mr-2"></i>
                        Add New Row
                        {this.props.test}
                    </div>
                </div>
            </div>
        )
    }
}


