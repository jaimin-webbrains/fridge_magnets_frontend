import React, { useEffect, useState } from "react";
import enhancer from "./enhancer/categoryenhancer";
import NavigationActions from "redux/navigation/actions";
import { useParams, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { Button } from "reactstrap";
import Select from "react-select";
import {
  addCategory,
  getCategories,
  getParentCategories,
  updateCategory,
} from "services/categoryServices";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions


const CategoriesAddForm = (props) => {
  
  //VARIABLES
  const {
    token,
    success,
    fetching,
    isFetching,
    error,
    setFieldValue,
    values,
    handleChange,
    handleSubmit,
    setValues,
    isValid,
    handleBlur,
    errors,
    touched,
    submitCount,
  } = props;

  const { id } = useParams();

  //USESTATE

  const [categoryOptions, setCategoryOptions] = useState([]);


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

  const get_Categoriesby_id = async () => {
    await getCategories(token).then((data) => {
      if (data.success) {
       setValues(data.data.find(val=>val.id==id))
        // setValues(
        //   data.data.map((val) => ({ value: val.id, label: val.name }))
        // );
      } else {
        error(data.message);
      }
    });
}

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    var categoryData = {
      id: id,
      name: values.name,
      description: values.description,
      parent_id: values.parent_id,
    };
    if (isValid) {
      fetching();
      id
        ? updateCategory(token, categoryData).then((data) => {
            if (data.success) {
              success(data.message);
              props.history.push("/categories");
        
            } else {
              error(data.message);
            }
          })
        : addCategory(token, categoryData).then((data) => {
            if (data.success) {
              success(data.message);
              props.history.push("/categories");
            
            } else {
              error(data.message);
            }
          });
    }
  };



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



  //USEEFFECTS

  useEffect(() => {
    get_ParentCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    id && get_Categoriesby_id();
    // eslint-disable-next-line
  }, [id]);

  console.log("values",values)

  return (
    <div className="card m-2 p-2">
      <div className="container">
        <div className="mx-3 mt-3">
          <div className="row">
            <div className="col-12 mb-2">
              <span style={{ fontSize: "20px", fontWeight: "bolder" }}>{`${
                id ? "Edit" : "Add"
              } Categories`}</span>
            </div>
          </div>
        </div>

        {/* ADD PRODUCT */}

        <div className="card-body">
          <div className="row">
            <div className="col-6">

          {( values.parent_id === 0
                ? categoryOptions.filter((x) => x.value !== values.id)
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
              values.parent_id === 0
              ? categoryOptions.filter((x) => x.value !== values.id)
                : categoryOptions
            }
          />
          <Error field="parentCategory" />
        </div>
        :
        <></>
        
    } 
    </div>
          
        <div className="col-6">

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
            </div>

        <div className="col-12">
          <label>
            Description <span className="error-msg">*</span>
          </label>
          <div className="">
          <ReactQuill
            onChange={(content, delta, source, editor) => {

              if (editor.getLength() <= 1) {
                setFieldValue("description", "");
              } else {
                setFieldValue("description", content);
              }
            }}
            value={values.description}
            theme={"snow"}
            placeholder={"Enter Description... "}
            modules={CategoriesAddForm.modules}
            formats={CategoriesAddForm.formats}
            bounds={".app"}
            id="description"
            name="description"
          />
         
          <Error field="description" />
        </div>
          </div>    
          </div>  

             
          <div className="row">
            <div className="col-12 text-center mt-3">
              <Button
                className="btn c-primary px-5"
                onClick={(e) => handleCategorySubmit(e)}
                type="button"
                disabled={isFetching}
              >
                {id ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoriesAddForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ]
  ],
  clipboard: {
    matchVisual: false
  }
};
CategoriesAddForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent"
];
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
)(CategoriesAddForm);
