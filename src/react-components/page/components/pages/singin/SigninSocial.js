import React, { useEffect } from "react";
import google from "../../../assets/icons/google.png";
import kakaotalk from "../../../assets/icons/kakao-talk.png";
import naver from "../../../assets/icons/naver.png";
import facebook from "../../../assets/icons/facebook.png";

import KakaoLogin from "react-kakao-login";
import NaverLogin from "react-naver-login";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import UserService from "../../../services/User.service";
import constants from "../../../utils/constants";
import LocalStorage from "../../../utils/store";
import { toast } from "react-toastify";
import { gapi } from "gapi-script";

function SigninSocial() {
  toast.configure();

  // useEffect(() => {
  //   gapi.load('client:auth2', ()=>{
  //     gapi.client.init({
  //       clientID: GOOGLE_APP.clientID,
  //       scope: ""
  //     })
  //   })
  // }, []);

  const signupWithGoogle = response => {
    console.log("Google Login Success :", response);
    try {
      const data = { ggtoken: response.tokenId };
      UserService.googleLogin(data)
        .then(response => {
          if (response.result === "ok") {
            LocalStorage.setAccessToken(response.data.access_token);
            window.location = "/";
          } else {
            toast.error("Login failed !", { autoClose: 5000 });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const signupWithFacebook = response => {
    try {
      const data = { fbtoken: response.accessToken };
      UserService.facebookLogin(data)
        .then(response => {
          if (response.result === "ok") {
            LocalStorage.setAccessToken(response.data.access_token);
            window.location = "/";
          } else {
            toast.error("Login failed !", { autoClose: 5000 });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const signupWithKakao = response => {
    try {
      const data = { kktoken: response.response.access_token };
      UserService.kakaoLogin(data)
        .then(response => {
          if (response.result === "ok") {
            LocalStorage.setAccessToken(response.data.access_token);
            window.location = "/";
          } else {
            toast.error("Login failed !", { autoClose: 5000 });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const signupWithNaver = response => {
    try {
      const data = { fbtoken: response.accessToken };
      UserService.naverLogin(data)
        .then(response => {
          if (response.result === "ok") {
            LocalStorage.setAccessToken(response.data.access_token);
            window.location = "/";
          } else {
            toast.error("Login failed !", { autoClose: 5000 });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="iconGroup">
      <KakaoLogin
        token={constants.KAKAO_APP.jsKey}
        onSuccess={signupWithKakao}
        onFailure={err => {
          console.log("Kakao Login Error: ", err);
        }}
        render={props => (
          <a onClick={props?.onClick}>
            <img src={kakaotalk} />
          </a>
        )}
      />

      <NaverLogin
        clientId={constants.NAVER_APP.clientID}
        callbackUrl={constants.APP_URL_ROOT + "?page=callback-naver-oauth"}
        onSuccess={signupWithNaver}
        onFailure={err => {
          console.log("Naver Login Error: ", err);
        }}
        render={props => (
          <a onClick={props?.onClick} className="naver-btn">
            <img src={naver} />
          </a>
        )}
      />

      <FacebookLogin
        appId={constants.FACEBOOK_APP.clientID}
        autoLoad={false}
        fields="name,email,picture"
        callback={signupWithFacebook}
        render={renderProps => (
          <a onClick={renderProps.onClick}>
            <img src={facebook} />
          </a>
        )}
      />

      <GoogleLogin
        clientId={constants.GOOGLE_APP.clientID}
        onSuccess={signupWithGoogle}
        onFailure={err => {
          console.log("Google Login Error: ", err);
        }}
        render={props => (
          <a onClick={props?.onClick}>
            <img src={google} />
          </a>
        )}
        cookiePolicy={"single_host_origin"}
        //isSignedIn={true}
      />
    </div>
  );
}

export default SigninSocial;
