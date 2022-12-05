import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App2";
import { ContextProvider } from "./store2/auth-context2";
//import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<AuthContextProvider>
  <ContextProvider>
    <App />
  </ContextProvider>
  //</AuthContextProvider>
);
