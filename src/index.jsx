import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "./app/contexts/AppContext";
import App from "./app/App";
import ScrollToTop from "./shared/components/scrollToTop/ScrollToTop";
import "typeface-roboto";

import "./index.scss";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <AppProviders>
      <App />
    </AppProviders>
  </BrowserRouter>,
  document.getElementById("root")
);
