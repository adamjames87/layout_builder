import React, {Component} from 'react';
import {connect} from 'react-redux'
import LinkedNewRow from "./LinkedNewRow"
import {PresentationColumn} from "./RowsColumns"



// Takes in a rootRows array
class PresentationGrid extends Component {


    renderRoot() {
        return PresentationColumn.renderRows(this.props.rootRows);
    }

    render() {
        return (
            <div>
                <LinkedNewRow/>
                {this.renderRoot()}
                <LinkedNewRow/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        rootRows: state.rootRows
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
