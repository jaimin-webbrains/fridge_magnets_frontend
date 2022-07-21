import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    phone_no: Yup.string()
      .matches(/^[0-9]*$/, "Please Enter Valid Phone Number")
      .min(9, "Phone Number must be at least 9 Digits")
      .max(10, "Phone Number must be at most 10 Digits")
      .required("Please Enter Phone Number"),
    email: Yup.string()
      .email("Please Enter Valid Email Format")
      .required("Please Enter Email"),
    logo: Yup.string().required("please select logo"),
    artwork_label1: Yup.string().required("Please Enter Artwork Label"),
    artwork_label2: Yup.string().required("Please Enter Artwork Label")
  }),
  validateOnMount: true,
  mapPropsToValues: props => ({
    phone_no: "",
    email: "",
    logo: "",
    artwork_label1: "",
    artwork_label2: ""
  }),
  handleSubmit: values => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true
});

export default formikEnhancer;
