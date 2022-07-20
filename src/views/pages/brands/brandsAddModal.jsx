import React, { useEffect } from "react";
import enhancer from "./enhancer/brandenhancer";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";

import {
  addBrand,
  updateBrand,
} from "services/brandServices";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const BrandsAddModal = (props) => {
  //VARIABLES
  const {
    token,
    fetching,
    success,
    error,
    isFetching,
    isEdit,
    onClose,
    isValid,
    values,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    errors,
    touched,
    submitCount,
    toggleRefresh,
    editData,
  } = props;
 
  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span />;
    }
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    var brandData = {
      id:editData.id,
      name: values.name,
      description: values.description
    };
    if (isValid) {
  
      fetching();
      isEdit
        ? updateBrand(token, brandData).then((data) => {
            if (data.success) {
              onClose();
              success(data.message);
              toggleRefresh(true);
            } else {
              error(data.message);
            }
          })
        : addBrand(token, brandData).then((data) => {
            if (data.success) {
              success(data.message);
              onClose();
              toggleRefresh(true);
            } else {
              error(data.message);
            }
          });
    }
  };
 

  //USEEFFECTS

  

  useEffect(() => {
    isEdit &&
      setValues({
        ...editData
      });
    // eslint-disable-next-line
  }, [editData]);

  return (
    <>
      <ModalHeader toggle={() => onClose()}>
        {`${isEdit ? "Edit" : "Add"} Brand`}
      </ModalHeader>
      <ModalBody>
        
        <div className="form-group">
          <label>
            Brand Name <span className="error-msg">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            placeholder="Brand Name"
            id="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
          />
          <Error field="name" />
        </div>

        <div className="mb-16">
          <label>
            Description <span className="error-msg">*</span>
          </label>
          <textarea
            className="form-control react-form-input"
            placeholder="Enter description"
            id="description"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
          />

          <Error field="description" />
        </div>

        <Button
          className="btn c-primary btn-block"
          onClick={(e) => handleBrandSubmit(e)}
          type="button"
          disabled={isFetching}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      
      </ModalBody>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.themeChanger,
    token: state.auth.accessToken,
    user: state.auth.user,
    isFetching: state.navigation.isFetching,
  };
};

export default compose(
  withRouter,
  enhancer,
  connect(mapStateToProps, { success, error, fetching, setuser })
)(BrandsAddModal);
