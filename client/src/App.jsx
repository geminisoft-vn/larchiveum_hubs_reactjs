import { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from "notistack";
import NProgress from "nprogress";

import Alert from "src/components/Alert";
import { AuthProvider } from "src/hooks/useAuth";
import Interceptor from "src/layouts/Interceptor";
import ThemeProvider from "src/theme";

import i18n from "./i18n";
import Router from "./routes";

const LazyLoad = () => {
  useEffect(() => {
    NProgress.configure({});
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);
  return <div />;
};

const App = () => {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <BrowserRouter>
            <AuthProvider>
              <Interceptor>
                <I18nextProvider i18n={i18n}>
                  <Suspense fallback={<LazyLoad />}>
                    <Router />
                  </Suspense>
                </I18nextProvider>
              </Interceptor>
            </AuthProvider>
          </BrowserRouter>
        </SnackbarProvider>
        <Alert />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
