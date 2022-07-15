import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    category_id: Yup.string()
      .required("Please Enter Gallery")

    
  }),
  validateOnMount: true,
  mapPropsToValues: props => ({
    category_id: ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;