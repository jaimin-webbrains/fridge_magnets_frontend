import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    product_name: Yup.string().required("Please Enter Product Name"),
    parent_category_id: Yup.string().required("Please Select Parent Category"),
    category_id: Yup.string().required("Please Select Category"),
    // color_id: Yup.string().required("Please Select Parent Color"),
    // size_id: Yup.string().required("Please Select Parent Size"),
    // paper_type_id: Yup.string().required("Please Select Paper Type"),
    // marker_id: Yup.string().required("Please Select Parent Marker"),
  
    brands: Yup.array()
    .of(
      Yup.object().shape({
        brand_id: Yup.string().required("Please enter Brand Id"),
        brandimg: Yup.string().required("Please Select Image"),
      })
    )
  }),
  validateOnMount: true,
  mapPropsToValues: (props) => ({
    product_name: "",
    parent_category_id: "",
    size_id:0,
    category_id: "",
    color_id: 0,
    paper_type_id:0,
    marker_id: 0,
    product_image: "",
    show_on_home_page: 0,
    brands:[{ position: 1, brand_id: "" ,brandimg:"",product_show:0}],
    deleted_brands: []
  }),
  handleSubmit: (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
