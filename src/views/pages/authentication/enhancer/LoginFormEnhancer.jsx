import {
    withFormik
} from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Please Enter Any Email').email(),
        password: Yup.string().required('Please Enter Any Password').min(8).max(16),
    }),
    mapPropsToValues: props => ({
        email: '',
        password: '',
    }),
    handleSubmit: (values) => {},
    displayName: 'CustomValidationForm',
    enableReinitialize:true,
});

export default formikEnhancer;