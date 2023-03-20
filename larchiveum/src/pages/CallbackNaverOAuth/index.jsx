import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import UserService from "src/utilities/apiServices/UserService";
import Store from "src/utilities/store";

const CallbackNaverOAuthPage = (props) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let hash = location.hash;
    if (hash && hash !== "error" && hash.length > 0) {
      let search = hash.substring(1); // remove #
      let obj = JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }
      );
      /**
                access_token: ""
                expires_in: "3600"
                state: ""
                token_type: "bearer"
            */
      const data = { nvtoken: obj.access_token };
      UserService.naverLogin(data)
        .then((response) => {
          if (response.result == "ok") {
            Store.setUser(response.data);
            window.opener.window.location.href = "/";
            window.close();
          } else {
            setError(response.error);
          }
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      console.log("Error");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!error ? (
        <span>Authenticating...</span>
      ) : (
        <span>Authentication Error: {error.toString()}</span>
      )}
    </div>
  );
};

export default CallbackNaverOAuthPage;
