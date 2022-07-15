import React, { useEffect } from "react";
import enhancer from "./enhancer/galleryenhancer";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";
import Select from "react-select";
import { addGallery } from "services/galleryServices";
import { getCategories } from "services/categoryServices";
import { useState } from "react";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const GallerysAddModal = (props) => {
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
    handleSubmit,
    setValues,
    isValid,
    handleBlur,
    errors,
    setFieldValue,
    touched,
    submitCount,
    toggleRefresh,
    editData,
  } = props;

  // useStates

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productImagesArr, setProductImagesArr] = useState([])

  //FUNCTIONS

  const get_categories = async () => {
    await getCategories(token).then((data) => {
      if (data.success) {
        success();
        const categories = data.data.filter(val=>val.parent_id!==0);
        setCategoryOptions(categories.map(val=>({ value: val.id, label: val.name })))
        
      } else {
        error(data.message);
      }
    });
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

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    var galleryData = {
      category_id:values.category_id.value,
      product_images: values.product_images
    };
    // var id = editData.id;

   const formData = new FormData();


   for(const val in values){


    if(val==="product_images"){

      for(let i = 0 ;i<productImagesArr.length;i++){
      formData.append("product_Images",productImagesArr[i])
      }
      // formData.append(val, JSON.stringify(galleryData[val]));
    }
    else{
      formData.append(val, galleryData[val]);
    }    
   }

  
    if (isValid) {
      fetching();
      // isEdit
      //   ? updateGallery(token,formData,id).then((data) => {
      //       if (data.success) {
      //         success(data.message);
      //         onClose();
      //         toggleRefresh(true);
      //       } else {
      //         error(data.message);
      //       }
      //     })
      //   : 
        addGallery(token, formData).then((data) => {
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
    get_categories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    isEdit &&
      setValues({
        ...editData,
      });
    // eslint-disable-next-line
  }, [editData]);

    
    
    
  // console.log(editData,"editData")

  return (
    <>
      <ModalHeader toggle={() => onClose()}>
        {`${isEdit ? "Edit" : "Add"} Gallery`}
      </ModalHeader>
      <ModalBody>
        <div className="container">
        <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label>
              Category Name <span className="error-msg">*</span>
            </label>
            <Select
            id="category_id"
            value={values.category_id}
            placeholder="Select Category"
            onChange={(val) => {
                setFieldValue("category_id", val);
            }}
            options={ categoryOptions }
          />
          <Error field="category_id" />
           
        </div>
        </div>
        <div className="col-12">
          <div>
            <label>
              Product Image<span className="error-msg"> *</span>
            </label>
          </div>
          <input
            type="file"
            className="mr-2"
            id="product_images"
            accept="image/png, image/gif, image/jpeg,image/jpg"
            onBlur={handleBlur}
            multiple
            onChange={(e) => {
              console.log(e.target.files)
              setProductImagesArr(e.target.files)
              setFieldValue("product_images",e.target.files)
            }}
          />
        </div>

        <Button
          className="btn c-primary btn-block mt-3"
          onClick={(e) => handleGallerySubmit(e)}
          type="button"
          disabled={isFetching}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
        </div>
        </div>
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
)(GallerysAddModal);
