import {connect} from 'react-redux'
import {NewRowButton} from "./NewRowButton"

const mapStateToProps = (state, ownProps) => {
    return {
        test: "blah blah"
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onclick: () => {
            console.log("blah")
        }
    }
};

const LinkedNewRow = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewRowButton);


export default LinkedNewRow
