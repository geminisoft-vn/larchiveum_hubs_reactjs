import React, { useEffect, useState } from "react";
import "src/utils/theme";
import "src/react-components/styles/global.scss";
import "src/assets/stylesheets/globals.scss";
import "src/assets/login/signin.scss";
import "src/assets/login/utils.scss";
import { SigninSocialButton } from "src/@larchiveum/components";
import UserService from "src/@larchiveum/utilities/apiServices/UserService";
import Store from "src/@larchiveum/utilities/store";
import { FaHome } from "react-icons/fa";
import Language from "src/@larchiveum/languages/language";
import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const user = Store.getUser();
  const { t } = useTranslation();

  const [data, setData] = useState({});
  const [submitted, setSubmited] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setLanguage(Language.getLanguage());
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmited(true);
    UserService.login(data).then(res => {
      if (res.result == "ok") {
        Store.setUser(res.data);
        window.location = `/`;
      } else if (res.result == "fail") {
        setError(t("forgot_password.FORGOT_PASSWORD_ERROR__" + res.error.toUpperCase()));
      }
    });
  };

  const handleChangeLanguage = event => {
    const lang = event.target.value;
    setLanguage(lang);
    Language.setLanguage(lang);
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-80 p-r-80 p-t-62 p-b-62">
          <div className="gohome" style={{ width: "100%" }}>
            <div style={{ float: "left" }}>
              <a href="./">
                <FaHome size={30} />
              </a>
            </div>
          </div>
          <form className="login100-form validate-form flex-sb flex-w" name="form" onSubmit={handleSubmit}>
            <span className="login100-form-title">{t("signin.SIGN_IN")}</span>
            <div className="p-t-31 p-b-9">
              <span className="txt1">{t("signin.EMAIL_LABEL")}</span>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Username is required">
              <input className="input100" type="text" name="email" value={data.email || ""} onChange={handleChange} />
              <span className="focus-input100" />
            </div>
            <div className="p-t-13 p-b-9">
              <span className="txt1">{t("signin.PASSWORD_LABEL")}</span>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input
                className="input100"
                type="password"
                name="password"
                value={data.password || ""}
                onChange={handleChange}
              />
              <span className="focus-input100" />
            </div>
            <div className="container-login100-form-btn m-t-27 m-b-20">
              <button className="login100-form-btn">{t("signin.SIGN_IN_BUTTON")}</button>
            </div>
            <div id="alternativeLogin">
              <label className="txt1">
                {t("signin.SIGN_UP_LABEL")}
                <a href="/?page=signup" className="btn_signup">
                  {" "}
                  {t("signin.SIGN_UP_BUTTON")}
                </a>
              </label>
              {error ? <div className="error-form">{error}</div> : ""}
              <SigninSocialButton />
              <label className="txt1 mt-3">
                {t("signin.RESET_PASSWORD_LABEL")}{" "}
                <a href="/?page=forgot-password" className="btn_signup">
                  {t("signin.RESET_PASSWORD_BUTTON")}
                </a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;