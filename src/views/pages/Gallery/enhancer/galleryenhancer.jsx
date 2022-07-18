import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    category_id: Yup.string()
      .required("Please Select Category"),
    
    product_images:Yup.string()
    .required("Please Select Images")
    
  }),
  validateOnMount: true,
  mapPropsToValues: props => ({
    category_id: "",
    product_images:""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;