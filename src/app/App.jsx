import React from "react";
import { AuthConsumer } from "./contexts/AuthContext";
import { Router } from "./Router";
import Navbar from "./components/navbar/Navbar";

class App extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {authCtx => (
          <div id="app">
            <Navbar {...authCtx} />
            <Router {...authCtx} />
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default App;
