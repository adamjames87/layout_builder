import React from 'react';
import {connect} from "react-redux";
import Modal from "react-modal";
import { hideModal} from "../actions";
import {Formik} from "formik";

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
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // className={
                    //     errors.email && touched.email ? 'text-input error' : 'text-input'
                    // }
                />

            )
        }
    )

}


const AddFieldForm = () => {
    return (
    <Formik
        // initialValues={{ email: '' }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 500);
        }}
    >
        {props => {
            const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
            } = props;
            return (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" style={{ display: 'block' }}>
                        Email
                    </label>
                    <input
                        id="email"
                        placeholder="Enter your email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.email && touched.email ? 'text-input error' : 'text-input'
                        }
                    />

                    {renderFields(values, ["first", "second"])}
                    <input
                        id="something"
                        placeholder="Enter your email"
                        type="text"
                        value={values["something"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.email && touched.email ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.email &&
                    touched.email && <div className="input-feedback">{errors.email}</div>}

                    <button
                        type="button"
                        className="outline"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                    >
                        Reset
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            );
        }}
    </Formik>
    )
};



const DumbAddFieldDataModal = ({isOpen, rowId, dispatch}) => {
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
                    >Add Columns</h5>
                    <button type="button" className="close"
                            aria-label="Close"
                            onClick={() => dispatch(hideModal())}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <AddFieldForm/>
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

export const AddFieldDataModal = connect(
    (state, ownProps) => ({
        ...state.modalProps,
        isOpen: (state.modal.modalType != null),

    })
)(DumbAddFieldDataModal);
