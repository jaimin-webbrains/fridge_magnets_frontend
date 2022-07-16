import React, { useEffect } from "react";
import enhancer from "./enhancer/paperenhancer";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";

import {
  addPaper,
  updatePaper,
} from "services/paperServices";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const PapersAddModal = (props) => {
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


  const handlePaperSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    var paperData = {
      id:editData.id,
      paper: values.paper,
    };
    if (isValid) {
      fetching();
      isEdit
        ? updatePaper(token, paperData).then((data) => {
            if (data.success) {
              success(data.message);
              onClose();
              toggleRefresh(true);
            } else {
              error(data.message);
            }
          })
        : addPaper(token, paperData).then((data) => {
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

    // eslint-disable-next-line
  }, [editData]);

  return (
    <>
      <ModalHeader toggle={() => onClose()}>
        {`${isEdit ? "Edit" : "Add"} Paper`}
      </ModalHeader>
      <ModalBody>
        
        <div className="form-group">
          <label>
            Paper Name <span className="error-msg">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            placeholder="Enter The Paper Name"
            id="paper"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.paper}
          />
          <Error field="paper" />
        </div>

        <Button
          className="btn c-primary btn-block"
          onClick={(e) => handlePaperSubmit(e)}
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
)(PapersAddModal);
