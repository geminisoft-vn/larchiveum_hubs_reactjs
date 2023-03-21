import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "src/language";

import Router from "./routes";
import store from "./store";

import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<p> Loading...</p>}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;
