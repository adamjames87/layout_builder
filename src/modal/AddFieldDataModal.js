import React from 'react';
import {connect} from "react-redux";
import Modal from "react-modal";
import {createContent, hideModal} from "../actions";
import {produce} from 'immer'


class AddFieldForm extends React.Component {

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
        console.log("submitting form");
        console.log(this.state);
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


const DumbAddFieldDataModal = ({isOpen, templateId, fields, onSubmit, dispatch, columnId}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(hideModal())}
            ariaHideApp={false}
            // overlayClassName="modal fade show"
            bodyOpenClassName="modal-open"
            className="modal-dialog modal-dialog-centered">
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
                    <AddFieldForm
                        fields={fields}
                        onSubmit={(fields) => {
                            createContent(dispatch, templateId, fields, columnId);
                            dispatch(hideModal());
                        }}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button"
                            className="btn btn-secondary"
                            onClick={() => dispatch(hideModal())}
                    >close
                    </button>
                </div>
            </div>
        </Modal>
    )
};


const buildFields = (state, templateId) => {
    const fields = {byId: {}, ordered: []};

    state.templates[templateId].fields.map(
        fieldId => {
            fields.byId[fieldId] = state.template_fields[fieldId];
            fields.ordered.push(fieldId);
        }
    );
    return fields;
};

function mapStateToProps(state, ownProps) {
    return {
        fields: buildFields(state.entities.content, state.modal.modalProps.templateId),
        ...state.modal.modalProps,
        isOpen: (state.modal.modalType != null),
    };
}

export const AddFieldDataModal = connect(
    mapStateToProps,
)(DumbAddFieldDataModal);
