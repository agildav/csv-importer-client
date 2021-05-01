import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Toastify from "../shared/components/toastify/Toastify";
import CustomSpinner from "../shared/components/animations/CustomSpinner";
import MissingPage from "./pages/MissingPage";
import Routes from "./Routes";

export class Router extends React.Component {
  constructor(props) {
    super(props);

    this.routes = Routes();
  }

  render() {
    const { auth } = this.props;

    return (
      <main id="main-app">
        <Toastify />
        <Switch>
          <Redirect exact from="/" to="/auth" />

          {this.routes.map((page, idx) => {
            if (page.protected) {
              return (
                <ProtectedRoute
                  key={idx}
                  auth={auth}
                  exact
                  path={page.path}
                  component={page.component}
                />
              );
            } else {
              return (
                <PublicRoute
                  key={idx}
                  auth={auth}
                  exact
                  path={page.path}
                  component={page.component}
                />
              );
            }
          })}

          <MissingRoute path="*" />
        </Switch>
      </main>
    );
  }
}

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return <Component {...props} {...rest} />;
      }}
    />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = rest;
  const { isInvalidToken, isAuth } = auth;
  const tokenFromLocalStorage = window.localStorage.getItem(
    process.env.REACT_APP_TOKEN_NAME
  );
  const haveToken = tokenFromLocalStorage && tokenFromLocalStorage.length > 0;

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth) {
          return <Component {...props} {...rest} />;
        } else {
          if (!haveToken || isInvalidToken) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location
                  }
                }}
              />
            );
          } else {
            return <CustomSpinner />;
          }
        }
      }}
    />
  );
};

export const MissingRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return <MissingPage {...props} {...rest} />;
      }}
    />
  );
};
