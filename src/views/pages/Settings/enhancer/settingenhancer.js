import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    phone_no: Yup.string()
      .matches(/^[0-9]*$/, "Please enter valid mobile number")
      .min(9, "mobile number must be at least 9 characters")
      .max(10, "mobile number must be at most 10 characters")
      .required("Please Enter Mobile Number"),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Required"),
    logo: Yup.string().required("please select logo"),
    artwork_label1: Yup.string().required("please Enter Artwork Label"),
    artwork_label2: Yup.string().required("please Enter Artwork Label"),
  }),
  validateOnMount: true,
  mapPropsToValues: (props) => ({
    phone_no: "",
    email: "",
    logo: "",
    artwork_label1: "",
    artwork_label2: "",
  }),
  handleSubmit: (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
