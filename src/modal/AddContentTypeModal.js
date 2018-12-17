import React from 'react';
import {connect} from "react-redux";
import {AddFieldDataForm} from "../components/AddFieldDataForm";
import {addContentChooseTemplate} from "../actions";





export class AddContentTypeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
    };
    this.contentTypes = props.contentTypes;
    this.onSubmit = props.onSubmit;
    this.handleInputChange = this.handleInputChange.bind(this);
  }



  // Handle the input changed
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState(
      {
        selected: value,
      }
    );

    this.onSubmit(value);
  }


  render() {

    const options = this.contentTypes.map((contentType) =>
      <option key={contentType.id} value={contentType.id}>{contentType.name}</option>
    );
    return (
      <form>
        <select value={this.state.selected} onChange={this.handleInputChange} className="form-control">
          <option value="COLUMNS">Columns</option>
          {options}
        </select>
      </form>
    )
  }
}


// The type form displays a type selector.
// And under that a field selector
export class DisplayedContentTypeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTemplate: props.templateId
    };
    this.contentTypes = props.contentTypes;
    this.columnId = props.columnId;
    this.templates = props.templates;
    this.onSelectTemplate = props.onSelectTemplate;
    this.handleTypeSelection = this.handleTypeSelection.bind(this);
  }


  // Handle the selection of the type
  handleTypeSelection(selected) {
    console.log(selected);
    this.setState({selectedTemplate: selected});

    this.onSelectTemplate(selected, this.columnId)

  }


  // Render form
  renderForm() {
    if (!this.state.selectedTemplate) {
      return;
    }
    if (this.state.selectedTemplate === "COLUMNS") {
      return (
        <span>Columns</span>
      )
    }
    console.log("Rending form for " + this.state.selectedTemplate);
    return (

      <AddFieldDataForm/>
    )
  }


  render() {
    return (
      <div>
        <AddContentTypeSelector contentTypes={this.templates}
                                onSubmit={(selected) => this.handleTypeSelection(selected)}/>
        {this.renderForm()}
      </div>
      )
  }

}


function mapStateToProps(state, owmProps) {
  let templates = state.entities.content.templates;
  const ret = {
    templates: [],
    templateId: state.ui.addContent.templateId,
    columnId: state.ui.addContent.columnId
  };

  Object.keys(templates).map( (key) => {
        ret.templates.push(templates[key]);
      });
  return ret;
}


function mapDispatchToProps(dispatch, ownProps) {
        return {
          onSelectTemplate: (templateId, columnId) => dispatch(addContentChooseTemplate(templateId, columnId))
        }
}






export const AddContentTypeForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayedContentTypeForm);

