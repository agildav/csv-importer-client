import React from "react";
import LoginForm from "./LoginForm";

const Login = props => {
  const texts = {
    signUp: "Crear una cuenta"
  };

  const canShowOutro = !props.auth.isHandlingAuth;

  return (
    <div id="login">
      <div className="wrapper">
        <LoginForm {...props} />
        {canShowOutro && (
          <div id="login-outro">
            <h4 className="create-account" onClick={props.changeAuthSection}>
              {texts.signUp}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
