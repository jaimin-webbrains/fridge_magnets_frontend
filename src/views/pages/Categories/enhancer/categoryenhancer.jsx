import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Please enter Name")
      .max(50)
      ,
      description:Yup.string()
      .required("Please enter description"),
    
  }),
  validateOnMount: true,
  mapPropsToValues: props => ({
    name: "",
    description:"",
    parent_id:0
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;