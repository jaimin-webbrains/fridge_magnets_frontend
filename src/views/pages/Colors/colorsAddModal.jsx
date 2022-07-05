import React, { useEffect } from "react";
import enhancer from "./enhancer/colorenhancer";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";

import {
  addColor,
  updateColor,
} from "services/colorServices";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const ColorsAddModal = (props) => {
  //VARIABLES
  const {
    token,
    success,
    fetching,
    isFetching,
    error,
    isEdit,
    onClose,
    values,
    handleChange,
    handleSubmit,
    setValues,
    isValid,
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


  const handleColorSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    var colorData = {
      id:editData.id,
      color: values.color,
    };
    if (isValid) {
      fetching();
      isEdit
        ? updateColor(token, colorData).then((data) => {
            if (data.success) {
              success(data.message);
              onClose();
              toggleRefresh(true);
            } else {
              error(data.message);
            }
          })
        : addColor(token, colorData).then((data) => {
            if (data.success) {
              success(data.message);
              toggleRefresh(true);
              onClose();
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

      console.log("editData",editData)
    // eslint-disable-next-line
  }, [editData]);

  return (
    <>
      <ModalHeader toggle={() => onClose()}>
        {`${isEdit ? "Edit" : "Add"} Color`}
      </ModalHeader>
      <ModalBody>
        
        <div className="form-group">
          <label>
            Color <span className="error-msg">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            placeholder="Enter The Color Name"
            id="color"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.color}
          />
          <Error field="color" />
        </div>

        <Button
          className="btn c-primary btn-block"
          onClick={(e) => handleColorSubmit(e)}
          type="button"
          disabled={ isFetching }
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
)(ColorsAddModal);
