import React from "react";
import RegisterForm from "./RegisterForm";

const Register = props => {
  const texts = {
    alreadyHaveAccount: "Ya tengo una cuenta"
  };

  const canShowOutro = !props.auth.isHandlingAuth;

  return (
    <div id="register">
      <div className="wrapper">
        <RegisterForm {...props} />
        {canShowOutro && (
          <div id="register-outro">
            <h4 onClick={props.changeAuthSection}>
              {texts.alreadyHaveAccount}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
