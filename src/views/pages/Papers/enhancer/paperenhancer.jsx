import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    paper: Yup.string()
      .required("Please Enter Type of Paper")
      .max(50)

    
  }),
  validateOnMount: true,
  mapPropsToValues: props => ({
    paper: ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;