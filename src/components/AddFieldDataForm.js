import React from "react";
import {produce} from "immer";
import {connect} from "react-redux";



class DumbAddFieldForm extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructing DumbAddFieldForm");
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.props.fields.byId[name].value = value;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.fields);
  }

  renderField(field){
      switch(field.type){
          case "TEXT": {
              return (
                  <div className="form-group" key={field.id}>
                      <label>{field.name}</label>
                      <input
                          placeholder={field.value}
                          type="text"
                          onChange={this.handleInputChange}
                          name={field.id}
                          key={field}
                          className="form-control"
                      />
                      <small className="form-text text-muted">{field.desc}</small>
                  </div>
              )
          }
          case "LONGTEXT": {
              return (
                  <div className="form-group" key={field.id}>
                      <label>{field.name}</label>
                      <textarea
                          placeholder={field.value}
                          type="text"
                          onChange={this.handleInputChange}
                          name={field.id}
                          key={field}
                          className="form-control"
                      />
                      <small className="form-text text-muted">{field.desc}</small>
                  </div>

              )
          }
          case "NUMBER": {
              return (
                  <div className="form-group" key={field.id}>
                      <label>{field.name}</label>
                      <input
                          placeholder={field.value}
                          type="text"
                          onChange={this.handleInputChange}
                          name={field.id}
                          key={field.id}
                          className="form-control"
                      />
                      <small className="form-text text-muted">{field.desc}</small>
                  </div>

              )

          }
      }
  }

  renderFields() {
    console.log("Rendering fields");
    console.log(this.props.fields.ordered);
    return this.props.fields.ordered.map(
      field => {
          return this.renderField(this.props.fields.byId[field]);
      }
    );
  }


  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
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
