import Router from "./routes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      !/(quiz)\/[0-9]/.test(pathname) &&
      !/(document)\/[0-9]/.test(pathname)
    ) {
      window.location.replace(`https://home.larchiveum.link`);
    }
  }, [pathname]);

  return <Router />;
}

export default App;
