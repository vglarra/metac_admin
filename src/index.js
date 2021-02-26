import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ContextAppProvider } from "./global_context/ContexAppGlobal";

//import './index.css';
import App from "./App";
//import Hamburguer from "./components/hamburger/Hamburger"
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
<ContextAppProvider>
      <App />
      </ContextAppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
