import { Suspense, useEffect } from "react";

import ThemeProvider from "src/theme";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "src/utils/snackbar";

import { AuthProvider } from "src/hooks/useAuth";

import Alert from "src/components/Alert";

import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import NProgress from "nprogress";

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
          maxSnack={5}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <BrowserRouter>
            <AuthProvider>
              <I18nextProvider i18n={i18n}>
                <Suspense fallback={<LazyLoad />}>
                  <Router />
                </Suspense>
              </I18nextProvider>
            </AuthProvider>
          </BrowserRouter>
          <SnackbarUtilsConfigurator />
        </SnackbarProvider>
        <Alert />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
