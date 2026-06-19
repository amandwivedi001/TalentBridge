import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "@fontsource/inter";
import "./index.css";

import App from "./App";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppInitializer from "./app/AppInitializer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppInitializer>
        <App />
      </AppInitializer>
      <Toaster position="top-right" />
    </BrowserRouter>
  </Provider>
);