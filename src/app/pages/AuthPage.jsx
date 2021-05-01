import React from "react";
import AuthForm from "../components/auth/AuthForm";
import CustomFade from "../../shared/components/animations/CustomFade";
import { Redirect } from "react-router-dom";
import CustomSpinner from "../../shared/components/animations/CustomSpinner";

class Auth extends React.Component {
  render() {
    const { auth } = this.props;
    const { isInvalidToken, isAuth } = auth;
    const tokenFromLocalStorage = window.localStorage.getItem(
      process.env.REACT_APP_TOKEN_NAME
    );
    const haveToken = tokenFromLocalStorage && tokenFromLocalStorage.length > 0;

    if (isAuth) {
      return <Redirect to="/dashboard" />;
    } else {
      if (!haveToken || isInvalidToken) {
        return (
          <CustomFade in={true}>
            <div id="auth-page">
              <AuthForm {...this.props} />
            </div>
          </CustomFade>
        );
      } else {
        return <CustomSpinner />;
      }
    }
  }
}

export default Auth;
