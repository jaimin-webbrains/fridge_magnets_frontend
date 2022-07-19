import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { compose } from "redux";
import authActions from "redux/auth/actions";
import { history } from "./redux/store";
// import CardLoader from "components/common/CardLoader";
import { checkApi } from "services/loginServices";
// Layout Routes
import layoutRoutes from "./routes/index.jsx";
import navigationAction from "redux/navigation/actions";

const { check , logout } = authActions;
const { fetching, success, error, toggleSubscriptionLoader } = navigationAction;

const Routes = (props) => {
  const {
    token,
    check,
    logout,
    success,
    fetching,
    error,
    user,
    user_id,
    toggleSubscriptionLoader,
  } = props;

  const location = useLocation();


  const [isLoading, setIsLoading] = useState(true);
  var excludePath = [
    "login",
    "register",
    "forgotPassword",
    "resetPassword",
    "quotes-accept",
    "login_as",
  ];
  const checkLogin = async () => {
    const data = {id:user_id,token:token}
    fetching();
    await checkApi(token,data).then((data) => {
      if (data.success) {
        check(data.data);
        toggleSubscriptionLoader(false);
        success();
      } else {
        logout(token);
        error();
      }
    });
  };
  useEffect(() => {
    if (!excludePath.includes(location.pathname.split("/")[1])) {
      checkLogin();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    //    isLoading ? (
    //     <CardLoader />
    //   ) : (
    // <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            user?.id ? <Redirect to="/products" /> : <Redirect to="/login" />
          }
        />
        {layoutRoutes.map((prop, key) => {
          return (
            <Route
              path={prop.path}
              component={prop.component}
              key={key}
              history={history}
            />
          );
        })}
      </Switch>
    // </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.accessToken,
    user: state.auth.user,
    user_id:state.auth.user_id
  };
};

export default compose(
  connect(mapStateToProps, {
    check,
    logout,
    fetching,
    success,
    error,
    toggleSubscriptionLoader,
  })
)(Routes);
