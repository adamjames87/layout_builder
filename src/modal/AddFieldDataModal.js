import React from 'react';
import {connect} from "react-redux";
import Modal from "react-modal";
import { hideModal} from "../actions";
import {produce} from 'immer'

// return this.props.rows.map(
//     row => {
//         return (
//             <Row key={row} rowId={row}/>
//         );
//     });



const renderFields = (values, fields) => {
    return fields.map(
        field => {
            return (
                <input
                    id={field}
                    placeholder={field}
                    type="text"
                    value={values[field]}
                    key={field}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // className={
                    //     errors.email && touched.email ? 'text-input error' : 'text-input'
                    // }
                />

            )
        }
    )

};


class AddFieldForm extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      fields: props.fields
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(produce(this.state, draftState => {
        draftState.fields.byId[name].value = value;
      }));

  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("submitting form");
    console.log(this.state);
  }

  renderFields() {
    return this.state.fields.ordered.map(
      field => {
        return (
          <div className="form-group" key={field}>
            <label>{this.state.fields.byId[field].name}</label>
            <input
              placeholder={this.state.fields.byId[field].value}
              type="text"
              onChange={this.handleInputChange}
              name={this.state.fields.byId[field].id}
              key={field}
              className="form-control"
            />
            <small className="form-text text-muted">{this.state.fields.byId[field].desc}</small>
          </div>

        )
      }
    );
  }


  render() {
        return (
          <form onSubmit={this.handleSubmit}>
            {this.renderFields()}
            <input type="submit" className="btn btn-primary" value="Add Content"></input>
          </form>
        )
  }

}




const DumbAddFieldDataModal = ({isOpen, fields, dispatch}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(hideModal())}
            ariaHideApp={false}
            // overlayClassName="modal fade show"
            bodyOpenClassName="modal-open"
            className="modal-dialog modal-dialog-centered" >
            <div className="modal-content">
                <div className="modal-header">
                    <h5
                        className="modal-title"
                    >Add Content</h5>
                    <button type="button" className="close"
                            aria-label="Close"
                            onClick={() => dispatch(hideModal())}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <AddFieldForm fields={fields}/>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            className="btn btn-secondary"
                            onClick={() => dispatch(hideModal())}>close
                    </button>
                </div>
            </div>
        </Modal>
    )
};


const buildFields = (state, templateId) => {
  var fields = { byId: {}, ordered: []};

  state.templates[templateId].fields.map(
    fieldId => {
      fields.byId[fieldId] = state.template_fields[fieldId];
      fields.ordered.push(fieldId);
    }
  );
  return fields;
};

function mapStateToProps(state, ownProps) {

  console.log(state.modalProps);
  return {
    fields: buildFields(state.entities.content, state.modal.modalProps.templateId),
    ...state.modalProps,
    isOpen: (state.modal.modalType != null),

  };
}

export const AddFieldDataModal = connect(
  mapStateToProps
)(DumbAddFieldDataModal);
