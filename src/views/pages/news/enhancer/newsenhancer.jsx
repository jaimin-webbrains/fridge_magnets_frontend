import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    news: Yup.string()
      .required("Please Enter News")
      .max(50),
    news_image:Yup.string()
      .required("Please select News Feed Image"),
    news_description: Yup.string()
      .required("Please Enter News")

    
  }),
  validateOnMount: true,
  mapPropsToValues: props => ({
    news: "",
    news_image:"",
    news_description:""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;