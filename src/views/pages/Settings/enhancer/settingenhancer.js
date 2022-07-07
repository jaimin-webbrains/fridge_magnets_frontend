import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    phone_no: Yup.string()
      .required("Please Enter Phone Number")
      .max(10)
      .min(10),
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
