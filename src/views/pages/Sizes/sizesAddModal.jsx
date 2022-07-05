import React, { useEffect } from "react";
import enhancer from "./enhancer/sizeenhancer";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";

import {
  addSize,
  updateSize,
} from "services/sizeServices";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const SizesAddModal = (props) => {
  //VARIABLES
  const {
    token,
    success,
    isFetching,
    fetching,
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


  const handleSizeSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    var sizeData = {
      id:editData.id,
      size: values.size,
    };
    if (isValid) {
      fetching();
      isEdit
        ? updateSize(token, sizeData).then((data) => {
            if (data.success) {
              success(data.message);
              onClose();
              toggleRefresh(true);
            } else {
              error(data.message);
            }
          })
        : addSize(token, sizeData).then((data) => {
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
        {`${isEdit ? "Edit" : "Add"} Size`}
      </ModalHeader>
      <ModalBody>
        
        <div className="form-group">
          <label>
            Size  <span className="error-msg">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            placeholder=" Enter The Size"
            id="size"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.size}
          />
          <Error field="size" />
        </div>

        <Button
          className="btn c-primary btn-block"
          onClick={(e) => handleSizeSubmit(e)}
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
)(SizesAddModal);
