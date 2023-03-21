import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import logo from "src/assets/images/larchiveum_logo.png";
import { Alert, Button, SigninSocialButton, TextInput } from "src/components";
import { getLanguage, setLanguage } from "src/language";
import UserService from "src/utilities/apiServices/UserService";
import Store from "src/utilities/store";

// import Popup from "../../../../react-components/popup/popup";
import "reactjs-popup/dist/index.css";

const ForgotPasswordPage = () => {
  const user = Store.getUser();
  const { t } = useTranslation();

  const [email, setEmail] = useState(null);
  const [submitted, setSubmited] = useState(false);
  const [isOpenPoupEmailSentNotification, setIsOpenPoupEmailSentNotification] =
    useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    setError();
  };

  const handleChangeLanguage = (event) => {
    const lang = event.target.value;
    setLanguage(lang);
    setLanguage(lang);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmited(true);

    const data = { email: email };
    UserService.requestResetPassword(data).then((res) => {
      if (res.result == "ok") {
        setIsOpenPoupEmailSentNotification(true);
      } else if (res.result == "fail") {
        setError(t("signup.SIGN_UP_ERROR__" + res.error.toUpperCase()));
        setError(res.error);
      }
    });
  };

  return (
    // <div className="limiter">
    //   <div className="container-login100">
    //     <div className="wrap-login100 p-l-80 p-r-80 p-t-62 p-b-62">
    //       <div className="gohome" style={{ width: "100%" }}>
    //         <div style={{ float: "left" }}>
    //           <a href="./">
    //             <FaHome size={30} />
    //           </a>
    //         </div>
    //       </div>
    //       <form
    //         className="login100-form validate-form flex-sb flex-w"
    //         name="form"
    //         onSubmit={handleSubmit}
    //       >
    //         <span className="login100-form-title">
    //           {t("forgot_password.FORGOT_PASSWORD")}
    //         </span>
    //         <div className="p-t-13 p-b-9">
    //           <span className="txt1">{t("forgot_password.EMAIL_LABEL")}</span>
    //         </div>
    //         <div
    //           className="wrap-input100 validate-input"
    //           data-validate="Email is required"
    //         >
    //           <input
    //             className="input100"
    //             type="email"
    //             name="email"
    //             value={email || ""}
    //             onChange={handleChangeEmail}
    //           />
    //           <span className="focus-input100" />
    //         </div>
    //         <div className="container-login100-form-btn m-t-27 m-b-30">
    //           <button className="login100-form-btn">
    //             {t("forgot_password.SEND_BUTTON")}
    //           </button>
    //         </div>
    //         {error ? <div className="error-form">{error}</div> : ""}
    //         <div id="alternativeLogin">
    //           <label className="txt1">
    //             {t("forgot_password.SIGN_IN_LABEL")}{" "}
    //             <a href="/?page=signin" className="btn_signup">
    //               {t("forgot_password.SIGN_IN_BUTTON")}
    //             </a>
    //           </label>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    //   {isOpenPoupEmailSentNotification && (
    //     <Popup
    //       title={<>{t("forgot_password.POPUP_NOTIFICATION__TITLE")}</>}
    //       size={"sm"}
    //       content={
    //         <div style={{ textAlign: "center" }}>
    //           {t("forgot_password.POPUP_NOTIFICATION__MESSAGE")}
    //         </div>
    //       }
    //       actions={[
    //         {
    //           text: t("forgot_password.POPUP_NOTIFICATION__OKAY"),
    //           class: "btn1",
    //           callback: () => {
    //             setIsOpenPoupEmailSentNotification(false);
    //           },
    //         },
    //       ]}
    //       handleClose={() => {
    //         setIsOpenPoupEmailSentNotification(false);
    //       }}
    //     />
    //   )}
    // </div>
    <Box
      sx={{
        backgroundImage: `url(https://hubs-dev-01-assets.larchiveum.link/hubs/assets/login/background-da651ea8f8f4db5bec199e614ba84843.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",

        width: "100%",
        height: "100%",
      }}
      component="div">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          width: "100%",
          height: "100%",
        }}>
        <Paper
          elevation={4}
          sx={{ p: 2, width: "512px" }}
          component="form"
          onSubmit={handleSubmit}>
          <Stack direction="column" justifyContent="flex-start" spacing={4}>
            <Typography
              component="h5"
              variant="h5"
              sx={{ textAlign: "center", fontWeight: 700 }}>
              {t("forgot_password.FORGOT_PASSWORD")}
            </Typography>
            <Stack direction="column" spacing={2}>
              {error && <Alert type="error" message={error} />}
              <TextInput
                name="email"
                label={t("signin.EMAIL_LABEL")}
                fullWidth
                value={email}
                onChange={handleChangeEmail}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: `linear-gradient(45deg, #00dbde, #fc00ff) !important`,
                }}>
                {t("forgot_password.SEND_BUTTON")}
              </Button>
            </Stack>

            <Typography sx={{ textAlign: "center" }}>
              <a href="/?page=signin">Sign in</a>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
