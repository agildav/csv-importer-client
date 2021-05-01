import { CircularProgress } from "@material-ui/core";
import React from "react";
import { toast } from "react-toastify";
import CustomButton from "../../../../shared/components/inputs/CustomButton";
import CustomInputTextField from "../../../../shared/components/inputs/CustomTextField";
import UserValidation from "../../../../shared/components/validations/UserValidation";

class RegisterForm extends React.Component {
  initialState = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  texts = {
    invalidCredentials: "Credenciales inválidas",
    email: "Email",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    register: "Registrarme"
  };

  handleEmailChange = event => {
    event.persist();

    this.setState(state => {
      return {
        email: event.target.value.trim().toLowerCase()
      };
    });
  };

  handlePasswordChange = event => {
    event.persist();

    this.setState(state => {
      return {
        password: event.target.value.trim().toLowerCase()
      };
    });
  };

  handleConfirmPasswordChange = event => {
    event.persist();

    this.setState(state => {
      return {
        confirmPassword: event.target.value.trim().toLowerCase()
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const credentials = this.state;
    if (UserValidation.isValidCredentials(credentials)) {
      delete credentials.confirmPassword;
      this.props.handleAuth("register", credentials);
    } else {
      toast.error(this.texts.invalidCredentials);
    }
  };

  render() {
    const { isHandlingAuth } = this.props.auth;

    return (
      <form id="register-form" onSubmit={this.handleSubmit}>
        <div className="form-control">
          <CustomInputTextField
            required
            onChange={this.handleEmailChange}
            label={this.texts.email}
            type="email"
            name="email"
            id="email-register"
            margin="dense"
          />
        </div>

        <div className="form-control">
          <CustomInputTextField
            required
            onChange={this.handlePasswordChange}
            label={this.texts.password}
            type="password"
            name="password"
            id="password-register"
            margin="dense"
            minLength={4}
            autoComplete="new-password"
          />
        </div>

        <div className="form-control">
          <CustomInputTextField
            required
            onChange={this.handleConfirmPasswordChange}
            label={this.texts.confirmPassword}
            type="password"
            name="confirm-password"
            id="confirm-password-register"
            margin="dense"
            minLength={4}
            autoComplete="new-password"
          />
        </div>

        <div className="form-action">
          {isHandlingAuth && <CircularProgress thickness={1} />}
          <CustomButton
            disabled={isHandlingAuth}
            size="medium"
            type="submit"
            variant="contained"
            colorVariant="primary"
          >
            {this.texts.register}
          </CustomButton>
        </div>
      </form>
    );
  }
}

export default RegisterForm;
