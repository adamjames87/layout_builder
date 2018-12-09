import {connect} from 'react-redux'
import PresentationRow from "./PresentationRow";



// ownProps gets given
// a rowId
const mapStateToProps = (state, ownProps) => {
    return {
        id: state.entities.rows.byId[ownProps.rowId].id,
        columns: state.entities.rows.byId[ownProps.rowId].columns,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onclick: () => {
            console.log("blah")
        }
    }
};

export const Row = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PresentationRow);

