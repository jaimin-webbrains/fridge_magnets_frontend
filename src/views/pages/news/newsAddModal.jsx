import React, { useEffect, useState } from "react";
import enhancer from "./enhancer/newsenhancer";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";

import { addNews, updateNews } from "services/newsServices";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const NewsAddModal = (props) => {
  //VARIABLES
  const {
    token,
    success,
    fetching,
    isFetching,
    error,
    isEdit,
    onClose,
    setFieldValue,
    values,
    setValues,
    handleChange,
    handleSubmit,
    isValid,
    editData,
    handleBlur,
    errors,
    touched,
    submitCount,
    toggleRefresh,
  } = props;

  const [img,setImg] = useState()

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

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
  
    var formData = new FormData();
    for(const val in values){
      if(val === "news_image"){
        formData.append(val,values[val])
      }
      else{
        formData.append(val,values[val])
      }
    }  
    const id = {id:editData?.id}
    
    if (isValid) {
      fetching();
      isEdit
        ? updateNews(token, formData,id).then((data) => {
            if (data.success) {
              success(data.message);
              onClose();
              toggleRefresh(true);
            } else {
              error(data.message);
            }
          })
        : addNews(token, formData).then((data) => {
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
        {`${isEdit ? "Edit" : "Add"} News`}
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>
            News Title <span className="error-msg">*</span>
          </label>
          <input
            type="text"
            className="form-control react-form-input"
            placeholder="Enter The News Name"
            id="news"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.news}
          />
          <Error field="news" />
        </div>
        <div>
          <label className="d-block my-2">
           Description <span className="error-msg">*</span>
          </label>
          <textarea
            className="form-control"
            id="news_description"
            onBlur={handleBlur}
            placeholder="Please Enter The News Description"
            onChange={handleChange}
            value={values.news_description}
          >            
          </textarea>
          <div>
            <Error field="news_description" />
          </div>
        </div>
       
        <div className="mb-10">
        
               <label  className="d-block my-2">
                  News Feed Image<span className="error-msg"> *</span>
                </label>
          
              <input
                type="file"
                className="mr-2 mb-10"
                id="news_image"
                accept="image/png, image/gif, image/jpeg"
                onBlur={handleBlur}
                onChange={(e) => {
                  if(e.target.files[0]){
                    const [file] = e.target.files;
                    if(file){
                      setImg(URL.createObjectURL(file) );
                    }
                    setFieldValue("news_image", e.target.files[0]);
                  }
                  else{  
                    setImg()
                    setFieldValue("news_image","");                 
                  }
                }}
              />              

        </div>
        <Error field="news_image" />

        <div>
        {img ? (
                <>
                  <a
                    href={img}
                    alt={"News_Feed_Image"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      img ? "d-block thumbnail_img" : "d-none"
                    }
                  >
                    <img src={img} alt="product-img" />
                  </a>
                </>
              ) : (
                <a
                  href={`${process.env.REACT_APP_BACKEND_UPLOAD_PATH}/${values?.news_image}`}
                  alt={"News_Feed_Image"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    values?.news_image ? "d-block thumbnail_img" : "d-none"
                  }
                >
                  <img
                    src={`${process.env.REACT_APP_BACKEND_UPLOAD_PATH}/${values?.news_image}`}
                    alt="product-img"
                  />
                </a>
              )}
        </div>

        <Button
          className="btn c-primary btn-block mt-10"
          onClick={(e) => handleNewsSubmit(e)}
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
)(NewsAddModal);
