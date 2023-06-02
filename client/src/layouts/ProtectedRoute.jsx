import { Navigate } from "react-router-dom";

import { checkExpireJwtToken } from "src/utils/common";

import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const { children } = props;

  if(Cookies.get('__LARCHIVEUM__COOKIES')) {
    if (!checkExpireJwtToken(Cookies.get('__LARCHIVEUM__COOKIES'))) {
      return <Navigate to="/auth/signin" replace />;
    }
  } else {
    return <Navigate to="/auth/signin" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
