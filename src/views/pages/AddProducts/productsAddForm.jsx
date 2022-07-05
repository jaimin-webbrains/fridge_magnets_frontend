import React, { useEffect, useState } from "react";
import enhancer from "./enhancer/productenhancer";
import NavigationActions from "redux/navigation/actions";
import { useParams, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { Button } from "reactstrap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CreatableSelect from "react-select/creatable";

import {
  addProduct,
  getProductById,
  updateProduct,
} from "services/productServices";
import { getCategories, getParentCategories } from "services/categoryServices";
import { getBrands } from "services/brandServices";
import { getColors } from "services/colorServices";
import { getPapers } from "services/paperServices";
import { getSizes } from "services/sizeServices";
import { getMarkers } from "services/markerServices";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const ProductsAddModal = (props) => {
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
  console.log("values", values);
  //USESTATE

  // const [inputValues, setInputValues] = useState({
  //   parentCategory: "",
  //   brands: "",
  //   category: "",
  //   color: "",
  //   size: "",
  //   paperType: "",
  //   marker: "",
  // });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [parentCatOptions, setParentCatOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [colorOptions, setcolorOptions] = useState([]);
  const [paperOptions, setPaperOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [markerOptions, setMarkerOptions] = useState([]);

  // FUNCTIONS

  //List API CALLING

  const List_allItems = async () => {
    await getCategories(token).then((data) => {
      if (data.success) {
        success();
        setCategoryOptions(
          data.data.map((val) => ({ value: val.id, label: val.name }))
        );
      } else {
        error(data.message);
      }
    });

    await getParentCategories(token).then((data) => {
      if (data.success) {
        success();
        console.log("data", data.data);
        setParentCatOptions(
          data.data.map((val) => ({ value: val.id, label: val.name }))
        );
      } else {
        error(data.message);
      }
    });

    await getBrands(token).then((data) => {
      if (data.success) {
        success();
        console.log("brands", data.data);
        setBrandOptions(
          data.data.map((val) => ({ value: val.id, label: val.name }))
        );
      } else {
        error(data.message);
      }
    });

    await getColors(token).then((data) => {
      if (data.success) {
        success();
        setcolorOptions(
          data.data.map((val) => ({ value: val.id, label: val.color }))
        );
      } else {
        error(data.message);
      }
    });

    await getPapers(token).then((data) => {
      if (data.success) {
        success();
        setPaperOptions(
          data.data.map((val) => ({ value: val.id, label: val.paper }))
        );
      } else {
        error(data.message);
      }
    });

    await getSizes(token).then((data) => {
      if (data.success) {
        success();
        setSizeOptions(
          data.data.map((val) => ({ value: val.id, label: val.size }))
        );
      } else {
        error(data.message);
      }
    });

    await getMarkers(token).then((data) => {
      if (data.success) {
        success();
        setMarkerOptions(
          data.data.map((val) => ({ value: val.id, label: val.marker }))
        );
      } else {
        error(data.message);
      }
    });
  };

  const get_Product_list = async () => {
    const id_data = { id: id };

    await getProductById(token, id_data).then((data) => {
      if (data.success) {
        success();
        setValues(data.data);
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

  const BrandsError = (props) => {
    const field1 = props.field;
    const index = props.index;
    if (
      (errors &&
        errors.hasOwnProperty("brands") &&
        errors?.brands[index] &&
        errors?.brands[index][field1] &&
        touched &&
        touched.hasOwnProperty("brands") &&
        touched?.brands[index] &&
        touched?.brands[index][field1]) ||
      submitCount > 0
    ) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors &&
            errors.hasOwnProperty("brands") &&
            errors?.brands[index] &&
            errors?.brands[index][field1]}
        </span>
      );
    } else {
      return <span />;
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    var formData = new FormData();
    for (const val in values) {
      console.log(val, "val");
      if (val === "deleted_brands") {
        formData.append(val, JSON.stringify(values[val]));
      } else if (val === "brands") {
        values.brands.map((x) => formData.append("brand_image", x.brandimg));
        formData.append(val, JSON.stringify(values[val]));
      } else if (val === "brandimg2") {
        // console.log("getting in brandimg2",val)
        formData.append(val, values[val]);
        console.log("getting in brandimg2", val, formData);
      } else {
        formData.append(val, values[val]);
      }
    }

    if (isValid) {
      fetching();
      id
        ? updateProduct(token, id, formData).then((data) => {
            if (data.success) {
              success(data.message);
              props.history.push("/products");
            } else {
              error(data.message);
            }
          })
        : addProduct(token, formData).then((data) => {
            if (data.success) {
              success(data.message);
              props.history.push("/products");
            } else {
              error(data.message);
            }
          });
    }
  };

  //USEEFFECTS

  useEffect(() => {
    id && get_Product_list();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    List_allItems();
    // eslint-disable-next-line
  }, []);

  console.log("values", values);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-2">
          <span className="">{`${id ? "Edit" : "Add"} Product`}</span>
        </div>
      </div>

      {/* ADD PRODUCT */}

      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>
              Product Name <span className="error-msg">*</span>
            </label>
            <input
              type="text"
              className="form-control react-form-input"
              placeholder="Enter The Product Name"
              id="product_name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.product_name}
            />
            <Error field="product_name" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>
              Parent Category <span className="error-msg">*</span>
            </label>
            <CreatableSelect
              isClearable
              value={parentCatOptions.find(
                (x) => x.value === values.parent_category_id
              )}
              onChange={(val) => setFieldValue("parent_category_id", val.value)}
              onInputChange={(val) => console.log(val)}
              options={parentCatOptions}
            />
            <Error field="parent_category_id" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>
              Category <span className="error-msg">*</span>
            </label>
            <CreatableSelect
              isClearable
              value={categoryOptions.find(
                (x) => x.value === values.category_id
              )}
              onChange={(val) => setFieldValue("category_id", val.value)}
              onInputChange={(val) => console.log(val)}
              options={categoryOptions}
            />
            <Error field="category_id" />
          </div>
        </div>
      </div>

      {/* ATTRIBUTES */}

      <div className="row">
        <div className="col-12 mb-2">
          <span>Attributes</span>
        </div>

        <div className="col-md-3">
          <div className="form-group">
            <label>
              Color <span className="error-msg">*</span>
            </label>
            <CreatableSelect
              isClearable
              value={colorOptions.find((x) => x.value === values.color_id)}
              onChange={(val) => setFieldValue("color_id", val.value)}
              onInputChange={(val) => console.log(val)}
              options={colorOptions}
            />
            <Error field="color_id" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>
              Size <span className="error-msg">*</span>
            </label>
            <CreatableSelect
              isClearable
              value={sizeOptions.find((x) => x.value === values.size_id)}
              onChange={(val) => setFieldValue("size_id", val.value)}
              onInputChange={(val) => console.log(val)}
              options={sizeOptions}
            />
            <Error field="size_id" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>
              Paper Type<span className="error-msg">*</span>
            </label>
            <CreatableSelect
              isClearable
              value={paperOptions.find((x) => x.value === values.paper_type_id)}
              onChange={(val) => setFieldValue("paper_type_id", val.value)}
              onInputChange={(val) => console.log(val)}
              options={paperOptions}
            />
            <Error field="paper_type_id" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>
              Marker <span className="error-msg">*</span>
            </label>
            <CreatableSelect
              isClearable
              value={markerOptions.find((x) => x.value === values.marker_id)}
              onChange={(val) => setFieldValue("marker_id", val.value)}
              onInputChange={(val) => console.log(val)}
              options={markerOptions}
            />
            <Error field="marker_id" />
          </div>
        </div>
      </div>

      {/* BRANDS */}
      
      <div className="row mb-2">
        <div className="col-9 ">
          Brands <span className="error-msg">*</span>
        </div>
        <div className="col-3 text-center">
          <button
            className="btn btn-white border-0"
            onClick={() => {
              values.brands.push({
                position: values.brands.length + 1,
                brand_id: "",
                brandimg: "",
                product_show: "",
              });
              setValues(values);
            }}
          >
            <AddCircleOutlineIcon />
          </button>
        </div>
      </div>
      {values.brands !== undefined &&
        values.brands.map((s, k) => (
          <div className="row">
            <div className="col-md-3">
              <CreatableSelect
                isClearable
                value={brandOptions.find(
                  (x) => x.value === values.brands[k].brand_name
                )}
                placeholder="Select or Create Brand"
                onChange={(val) =>
                  setFieldValue(`brands[${k}].brand_id`, val.value)
                }
                options={brandOptions}
              />
              <BrandsError field="brand_name" index={k} />
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="file"
                  className="mr-2"
                  id={`brands[${k}].brandimg`}
                  accept="image/png, image/gif, image/jpeg"
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setFieldValue(`brands[${k}].brandimg`, e.target.files[0])
                  }
                />
              </div>
              <BrandsError field="brandimg" index={k} />
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="checkbox"
                  className="mr-2 react-form-input"
                  checked={s.product_show}
                  id={`brands[${k}].product_show`}
                  onBlur={handleBlur}
                  onChange={(e)=>{
                    // {console.log("e.target.checked",e.target.checked)}
                    e.target.checked === true ?
                    setFieldValue(`brands[${k}].product_show`,1): setFieldValue(`brands[${k}].product_show`,0)
                  }}
                />
                <label>
                  <span> Show on Homepage </span>
                </label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center color-black">
                <button
                  className="btn btn-link  btn-white border-0 react-form-input"
                  type="button"
                  disabled={values.brands.length <= 1}
                  onClick={() => {
                    console.log("values", values.brands, id);
                    // if (id) {
                    values.deleted_brands.push(values.brands[k]);
                    // }
                    values.brands.splice(k, 1);
                    setValues(values);
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </button>
              </div>
            </div>
          </div>
        ))}

      {/* IMAGE */}

      <div className="row">
        <div className="col-12 mb-2">
          <span>Image</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <input
            type="file"
            className="mr-2"
            id="product_image"
            accept="image/png, image/gif, image/jpeg"
            onBlur={handleBlur}
            onChange={(e) => setFieldValue("product_image", e.target.files[0])}
          />
          {typeof values.product_image === "string" ? (
            <a
              href={`${process.env.REACT_APP_BACKEND_UPLOAD_PATH}/${values?.product_image}`}
              alt={"product_image"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {values?.product_image}
            </a>
          ) : (
            <></>
          )}
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="checkbox"
              className="mr-2 react-form-input"
              id="show_on_home_page"
              checked={values.show_on_home_page ? true : false}
              onBlur={handleBlur}
              onChange={(e) => {
                e.target.checked === true
                  ? setFieldValue("show_on_home_page", 1)
                  : setFieldValue(`show_on_home_page`, 0);
              }}
            />
            <label>
              <span> Show on Homepage </span>
            </label>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="row">
        <div className="col-12 text-center">
          <Button
            className="btn c-primary px-5"
            onClick={(e) => handleProductSubmit(e)}
            type="button"
            disabled={isFetching}
          >
            {id ? "Edit" : "Add"}
          </Button>
        </div>
      </div>
    </div>
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
)(ProductsAddModal);
