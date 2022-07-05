import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    color: Yup.string()
      .required("Please Enter Color")
      .max(50)

    
  }),
  validateOnMount: true,
  mapPropsToValues: props => ({
    color: ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;