import React, { useEffect, useState } from "react";
import enhancer from "./enhancer/categoryenhancer";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";
import Select from "react-select";
import {
  addCategory,
  getParentCategories,
  updateCategory,
} from "services/categoryServices";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const CategoriesAddModal = (props) => {
  //VARIABLES
  const {
    token,
    fetching,
    success,
    error,
    isEdit,
    onClose,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    isValid,
    handleBlur,
    errors,
    touched,
    submitCount,
    toggleRefresh,
    editData,
    isFetching,
  } = props;

  const [categoryOptions, setCategoryOptions] = useState([]);
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

  const get_ParentCategories = async () => {
    await getParentCategories(token).then((data) => {
      if (data.success) {
        setCategoryOptions(
          data.data.map((val) => ({ value: val.id, label: val.name }))
        );
      } else {
        error(data.message);
      }
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    var categoryData = {
      id: editData.id,
      name: values.name,
      description: values.description,
      parent_id: values.parent_id,
    };
    if (isValid) {
      fetching();
      isEdit
        ? updateCategory(token, categoryData).then((data) => {
            if (data.success) {
              success(data.message);
              onClose();
              toggleRefresh(true);
            } else {
              error(data.message);
            }
          })
        : addCategory(token, categoryData).then((data) => {
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
    get_ParentCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    isEdit &&
      setValues({
        ...editData,
      });

    // eslint-disable-next-line
  }, [editData]);

  return (
    <>
      <ModalHeader toggle={() => onClose()}>
        {`${isEdit ? "Edit" : "Add"} Category`}
      </ModalHeader>
      <ModalBody> 

      {( editData.parent_id === 0
                ? categoryOptions.filter((x) => x.value !== editData.id)
                : categoryOptions).length > 0? 
                <div className="form-group">
          <label>Parent Category</label>
          <Select
            id="parent_id"
            value={categoryOptions.find((x) => x.value === values.parent_id)}
            placeholder="Select Parent Category"
            onChange={(e) => {
              setFieldValue("parent_id", e.value);
            }}
            options={
              editData.parent_id === 0
                ? categoryOptions.filter((x) => x.value !== editData.id)
                : categoryOptions
            }
          />
          <Error field="parentCategory" />
        </div>
        :
        <></>

        } 
          
        
        <div className="form-group">
          <label>
            Category Name <span className="error-msg">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            placeholder="Category Name"
            id="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
          />
          <Error field="name" />
        </div>

        <div className="mb-3">
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
          onClick={(e) => handleCategorySubmit(e)}
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
)(CategoriesAddModal);
