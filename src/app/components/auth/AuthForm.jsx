import React from "react";
import Login from "./login/Login";
import Register from "./register/Register";

class AuthForm extends React.Component {
  initialState = {
    wantToLogin: true
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  handleAuth = (section, credentials) => {
    switch (section) {
      case "login":
        this.props.auth.login(credentials);
        break;
      case "register":
        this.props.auth.register(credentials);
        break;
      default:
        return;
    }
  };

  changeAuthSection = () => {
    this.setState(state => {
      return {
        wantToLogin: !this.state.wantToLogin
      };
    });
  };

  render() {
    const { wantToLogin } = this.state;

    return (
      <div>
        {wantToLogin ? (
          <Login
            {...this.props}
            handleAuth={this.handleAuth}
            changeAuthSection={this.changeAuthSection}
          />
        ) : (
          <Register
            {...this.props}
            handleAuth={this.handleAuth}
            changeAuthSection={this.changeAuthSection}
          />
        )}
      </div>
    );
  }
}

export default AuthForm;
