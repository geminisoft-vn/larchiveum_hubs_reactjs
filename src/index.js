import React from "react";
import ReactDOM from "react-dom";
import { WrappedIntlProvider } from "./react-components/wrapped-intl-provider";
import registerTelemetry from "./telemetry";
import Store from "./storage/store";
import { useEffect } from "react";

registerTelemetry("/home", "Hubs Home Page");

const store = new Store();
window.APP = { store };

function Root() {
  useEffect(() => {
    window.addEventListener("message", function (event) {
        if (event.origin !== 'https://hubs.local:8080') {
          document.querySelector('h2#dang').innerHTML = event.data
        
        return;
      }
      console.log("received: " + event.data);
    });
  }, [])
  return (
    <div>
      <center>
        <h1>{"Wellcome"}</h1>
        <h2 id="dang"></h2>
      </center>
    </div>
  );
}

ReactDOM.render(<Root />, document.getElementById("home-root"));
