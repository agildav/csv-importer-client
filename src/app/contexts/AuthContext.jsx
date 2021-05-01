import React from "react";
import FetchService from "../../shared/components/fetch/FetchService";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  initialState = {
    currentUser: null,
    isHandlingAuth: false,
    isInvalidToken: false,
    isAuth: false
  };

  updateState = {
    login: this.login.bind(this),
    logout: this.logout.bind(this),
    register: this.register.bind(this)
  };

  constructor(props) {
    super(props);

    this.state = { ...this.initialState, ...this.updateState };
  }

  texts = {
    invalidCredentials: "Credenciales inválidas",
    errorOccurred: "Ha ocurrido un error",
    successRegister: "¡Se ha registrado con éxito!"
  };

  componentDidMount() {
    const token = this.getAuthFromLocalStorage();
    if (token) {
      return this.setState(
        state => {
          return {
            currentUser: null,
            isAuth: false,
            isInvalidToken: false,
            isHandlingAuth: true
          };
        },
        async () => {
          const user = await this.validateToken(token);
          if (!user) {
            this.removeAuthFromLocalStorage();
            return this.setState(state => {
              return {
                currentUser: null,
                isAuth: false,
                isInvalidToken: true,
                isHandlingAuth: false
              };
            });
          }

          this.setState(state => {
            return {
              currentUser: user,
              isAuth: user.token && user.token.length > 0,
              isInvalidToken: false,
              isHandlingAuth: false
            };
          });
        }
      );
    }
  }

  validateToken = async token => {
    try {
      const url = process.env.REACT_APP_API_BASE_URL + "/auth/validate/token";
      const headers = {
        Authorization: "Bearer " + token
      };
      const method = "GET";

      const response = await FetchService.sendRequest(
        url,
        headers,
        null,
        method
      );
      return response.data;
    } catch (e) {
      return null;
    }
  };

  restartState = () => {
    this.setState(state => {
      return {
        ...this.initialState
      };
    });
  };

  login(credentials) {
    this.setState(
      state => {
        return {
          currentUser: null,
          isAuth: false,
          isHandlingAuth: true
        };
      },
      async () => {
        try {
          const response = await this.handleAuthentication(
            "login",
            credentials
          );

          const user = response.data;
          const { token } = user;
          if (!token) {
            throw new Error("no token");
          }

          this.saveAuthInLocalStorage(token);

          this.setState(state => {
            return {
              currentUser: user,
              isAuth: user.token && user.token.length > 0,
              isHandlingAuth: false
            };
          });
        } catch (e) {
          if (e.data && e.data.type) {
            switch (e.data.type) {
              case FetchService.errorTypes.unauthorizedError:
                toast.error(this.texts.invalidCredentials);
                break;
              default:
                toast.error(this.texts.errorOccurred);
                break;
            }
          } else {
            toast.error(this.texts.errorOccurred);
          }

          this.restartState();
        }
      }
    );
  }

  register(credentials) {
    this.setState(
      state => {
        return {
          currentUser: null,
          isAuth: false,
          isHandlingAuth: true
        };
      },
      async () => {
        try {
          const response = await this.handleAuthentication(
            "register",
            credentials
          );

          const user = response.data;
          const { token } = user;
          if (!token) {
            throw new Error("no token");
          }

          this.saveAuthInLocalStorage(token);
          toast.success(this.texts.successRegister);
          this.setState(state => {
            return {
              currentUser: user,
              isAuth: user.token && user.token.length > 0,
              isHandlingAuth: false
            };
          });
        } catch (e) {
          if (e.data && e.data.type) {
            switch (e.data.type) {
              case FetchService.errorTypes.invalidError:
                toast.error(this.texts.invalidCredentials);
                break;
              default:
                toast.error(this.texts.errorOccurred);
                break;
            }
          } else {
            toast.error(this.texts.errorOccurred);
          }

          this.restartState();
        }
      }
    );
  }

  logout() {
    this.setState(
      state => {
        return { isHandlingAuth: true };
      },
      async () => {
        const url = process.env.REACT_APP_API_BASE_URL + "/auth/logout";
        const headers = {
          Authorization: "Bearer " + this.state.currentUser.token
        };
        const method = "DELETE";

        return FetchService.sendRequest(url, headers, {}, method).finally(
          () => {
            this.removeAuthFromLocalStorage();
            window.location.href = "/";
            window.location.reload(true);
          }
        );
      }
    );
  }

  handleAuthentication = (section, reqBody) => {
    const url = process.env.REACT_APP_API_BASE_URL + `/auth/${section}`;
    const headers = {
      "Content-Type": "application/json"
    };
    const method = "POST";
    const body = {
      user: { ...reqBody }
    };

    return FetchService.sendRequest(url, headers, body, method);
  };

  saveAuthInLocalStorage = token => {
    window.localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, token);
  };

  getAuthFromLocalStorage = () => {
    return window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
  };

  removeAuthFromLocalStorage = () => {
    window.localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
  };

  render() {
    return (
      <AuthContext.Provider value={{ auth: this.state }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };
