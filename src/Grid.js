import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Row} from "./RowsColumns"
import {NewRowButton} from "./components/NewRowButton";


// Takes in a rootRows array
class PresentationGrid extends Component {


    renderRoot() {
        return this.props.container.rows.map(
            row => {
                return (
                    <Row key={row} rowId={row} />
                )
            }
        )
    }

    render() {
        return (
            <div className="container">
                {this.renderRoot()}
                <NewRowButton columnId={null}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        container: state.entities.container
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onclick: () => {
            console.log("blah")
        }
    }
};

export const Grid = connect(
    mapStateToProps,
    mapDispatchToProps
)(PresentationGrid);


export default Grid;
