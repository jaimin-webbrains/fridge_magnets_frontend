import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    size: Yup.string()
      .required("Please enter Size")
      .max(50)

    
  }),
  validateOnMount: true,
  mapPropsToValues: props => ({
    size: ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;