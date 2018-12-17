import React from "react";
import {produce} from "immer";
import {connect} from "react-redux";

class DumbAddFieldForm extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      fields: props.fields,
      onSubmit: props.onSubmit
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
    this.state.onSubmit(this.state.fields);
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



const buildFields = (state, templateId) => {
  const fields = {byId: {}, ordered: []};
  console.log(state);
  state.templates[templateId].fields.map(
    fieldId => {
      fields.byId[fieldId] = state.template_fields[fieldId];
      fields.ordered.push(fieldId);
    }
  );
  return fields;
};

function mapStateToProps(state, ownProps) {
  const data = {
    fields: buildFields(state.entities.content, state.ui.addContent.templateId),
    templateId: state.ui.addContent.templateId,
    columnId: state.ui.addContent.columnId
  };
  console.log(data);
  return data;
}

export const AddFieldDataForm = connect(
  mapStateToProps,
)(DumbAddFieldForm);
