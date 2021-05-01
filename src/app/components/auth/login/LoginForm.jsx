import React from "react";
import CustomButton from "../../../../shared/components/inputs/CustomButton";
import CustomInputTextField from "../../../../shared/components/inputs/CustomTextField";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";

class LoginForm extends React.Component {
  initialState = {
    email: "",
    password: ""
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  texts = {
    email: "Email",
    password: "Contraseña",
    fillFields: "Por favor, llene los campos",
    login: "Ingresar"
  };

  isEmptyAnyField = credentials => {
    const { email, password } = credentials;
    return !email.length || !password.length;
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

  handleSubmit = event => {
    event.preventDefault();

    const credentials = this.state;

    if (!this.isEmptyAnyField(credentials)) {
      this.props.handleAuth("login", credentials);
    } else {
      toast.error(this.texts.fillFields);
    }
  };

  render() {
    const { isHandlingAuth } = this.props.auth;

    return (
      <form id="login-form" onSubmit={this.handleSubmit}>
        <div className="form-control">
          <CustomInputTextField
            required
            onChange={this.handleEmailChange}
            label={this.texts.email}
            type="email"
            name="email"
            variant="outlined"
            id="login-email"
            margin="dense"
            autoComplete="new-password"
          />
        </div>
        <div className="form-control">
          <CustomInputTextField
            required
            onChange={this.handlePasswordChange}
            label={this.texts.password}
            type="password"
            name="password"
            variant="outlined"
            id="login-password"
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
            {this.texts.login}
          </CustomButton>
        </div>
      </form>
    );
  }
}

export default LoginForm;
