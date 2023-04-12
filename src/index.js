/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import registerTelemetry from "./telemetry";
import Store from "./storage/store";

registerTelemetry("/home", "Hubs Home Page");

const store = new Store();
window.APP = { store };

function Root() {
  return (
    <div>
      <center>
        <h1>{"Wellcome"}</h1>
      </center>
    </div>
  );
}

ReactDOM.render(<Root />, document.getElementById("home-root"));
