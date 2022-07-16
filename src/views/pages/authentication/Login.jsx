import React from "react";
import { loginBack } from "helper/constant";
import NavigationActions from "redux/navigation/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import enhancer from "./enhancer/LoginFormEnhancer";
import { loginApi } from "services/loginServices";


const { login, check } = AuthActions;
const {
  success,
  error,
  fetching,
} = NavigationActions;

const Login = props => {
    
        const {
        //   token,
          success,
          error,
          values,
          handleChange,
        //   toggleSubscriptionLoader,
          handleBlur,
          errors,
          touched,
          submitCount,
        //   toggleOneTimeModal,
          fetching,
        //   isFetching
        } = props;

    // const handleLogin = e => {
    //     e.preventDefault();
    //     let { values, handleSubmit } = props;

    //     if (values.email !== "" && values.password !== "") {

    //         const data = {
    //             token: "DEMOJWTTOKEN"
    //         };
    //         // using this method you can store token in redux
    //         props.login(data);
    //         props.history.push("/login");
    //     }
    //     handleSubmit();
    // };

    const handleLogin = async (e) => {
        let { values, isValid, handleSubmit } = props;
        e.preventDefault();
        handleSubmit();
        if (isValid) {


          fetching();
          await loginApi(values).then(data => {
            if (data.success) {
              success(data.message);
            //   props.login(data.data);
            //   if (rememberMe) {
            //     var date = new Date();
            //     date.setDate(date.getDate() + 7);
            //     document.cookie = `token=${data.data.token} ;SameSite=strict;expires=${date}`;
            //   }
            //   if (data.data.access_key_send) {
            //     props.history.push("/change-password");
            //   } 
            //   else {
                // if (!data.data.package?.expired) {
                //   if (Object.keys(data.data?.package).length === 0) {
                //     toggleOneTimeModal(true);
                //   } else if (
                //     data.data?.package?.package_type === "Trial" ||
                //     (data.data?.package?.package_type !== "Trial" &&
                //       data.data.package?.difference_in_days <= 5)
                //   ) {
                //     toggleOneTimeModal(true);
                //   }
                // }
                props.history.push("/products");
            //   }
            } else {
              error(data.message);
            }
          });
        }
      };

    const loginContainer = {
        backgroundImage: `url(${loginBack})` ,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        position: "fixed",
        overflow: "auto",
        top: 0,
        bottom: 0,
    };

    const Error = props => {
        const field1 = props.field;
        if ((errors[field1] && touched[field1]) || submitCount > 0) {
            return (
                <span className={props.class ? props.class : "error-msg"}>
                    {errors[field1]}
                </span>
            );
        } else {
            return <span />;
        }
    };

    return (
        <div className="container-fluid" style={loginContainer}>
            <div className="form-container">
                <div className="login-icon">
                    {/* <img src={roelogo2} alt="icon" height="100px" /> */}
                </div>
                <div className="login-title">Sign in to your account</div>
                <form className="pa-24" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control react-form-input"
                            id="email"
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}
                            placeholder="Email"
                        />
                        <Error field="email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control react-form-input"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Password"
                        />
                        <Error field="password" />
                    </div>

                    <div className="form-check text-center mtb-16">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                        >
                            Remember me
                        </label>
                    </div>

                    <button type="submit" className="btn form-button">
                        Login
                    </button>
                    <div
                        className="text-center link-label"
                        onClick={() => props.history.push("/forgotPassword")}
                    >
                        Forgot Password ?
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
      token: state.auth.accessToken,
      isFetching: state.navigation.isFetching
    };
  };

export default compose(
    withRouter,
    enhancer,
    connect(mapStateToProps, {
      check,
      login,
      success,
      error,
    //   toggleOneTimeModal,
    //   toggleSubscriptionLoader,
      fetching
    })
  )(Login);
