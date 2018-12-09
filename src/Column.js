import {connect} from 'react-redux'
import {PresentationColumn} from "./PresentationColumn";


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

const Column = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PresentationColumn);

export default Column
