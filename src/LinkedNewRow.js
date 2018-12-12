import {connect} from 'react-redux'
import {NewRowButton} from "./NewRowButton"
import {addRow} from './actions'

const mapStateToProps = (state, ownProps) => {
    return {
        columnId: ownProps.columnId
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNewRow: id => dispatch(addRow(null, null)),
        onClick: () => console.log("blah")
    }
};

export const LinkedNewRow = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewRowButton);


