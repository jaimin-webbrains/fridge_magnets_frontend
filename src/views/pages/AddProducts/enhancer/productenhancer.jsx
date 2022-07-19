import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    product_name: Yup.string()
      .required("Please Enter Product Name")
      .matches(
        /^[a-zA-Z0-9][a-zA-Z0-9- ]*[a-zA-Z0-9]$/,
        "Please enter valid Product Name"
      ),

    parent_category_id: Yup.string().required("Please Select Parent Category"),
    category_id: Yup.string().required("Please Select Category"),
    category_name: Yup.string().when("category_id", {
      is: (value) => (parseInt(value) === 0 ? true : false),
      then: Yup.string().matches(
        /^[a-zA-Z0-9][a-zA-Z0-9- ]*[a-zA-Z0-9]$/,
        "Please Enter Valid Category Name"
      ),
      otherwise: Yup.string(),
    }),

    brands: Yup.array().of(
      Yup.object().shape({
        brand_id: Yup.string().required("Please enter Brand name"),
        brandimg: Yup.string().required("Please Select Image"),
      })
    ),

    // color_ext: Yup.boolean(),
    //   color_name: Yup.string().when('color_ext', {
    //     is: true ,
    //     then: Yup.string().required("Please Select color")
    //     .matches(/^[A-Za-z]*$/, "Please Enter Valid color"),
    //     otherwise: Yup.string()
    // }),
    color_name: Yup.string().matches(/^[A-Za-z]*$/, "Please Enter Valid color"),
    product_image: Yup.string().required("Please select Product Image"),
    product_quantity: Yup.string()
      .required("Please Enter Product Quantity")
      .matches(/^[0-9,]*[0-9]$/, "Please enter valid Quantity"),
    // SKU:Yup.string().required("Please enter SKU"),
  }),
  validateOnMount: true,
  mapPropsToValues: (props) => ({
    product_name: "",
    parent_category_id: "",
    size_id: 0,
    category_id: "",
    color_id: 0,
    paper_type_id: 0,
    marker_id: 0,
    product_image: "",
    show_on_home_page: 0,
    brands: [{ position: 1, brand_id: "", brandimg: "", show_on_homepage: 0 }],
    deleted_brands: [],
    product_quantity: "",
    SKU: "",
    color_name: "",
    category_name: "",
    paper_type: "",
    size_val: "",
    marker_val: "",
  }),
  handleSubmit: (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
