import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { checkExpireJwtToken } from "src/utils/common";

const ProtectedRoute = props => {
  const { children } = props;

  const jwt = Cookies.get("__LARCHIVEUM__COOKIES");

  if (jwt) {
    const decoded = jwtDecode(jwt);
    if (decoded && decoded.exp) {
      if (!checkExpireJwtToken(decoded.exp)) {
        Cookies.remove("__LARCHIVEUM__COOKIES");
        return <Navigate to="/auth/signin" replace />;
      }
    }
  } else {
    return <Navigate to="/auth/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
