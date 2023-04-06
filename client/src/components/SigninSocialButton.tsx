import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
// import NaverLogin from "react-naver-login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserService from "src/api/UserService";
import facebook from "src/assets/images/facebook.png";
import google from "src/assets/images/google.png";
import kakaotalk from "src/assets/images/kakao-talk.png";
import naver from "src/assets/images/naver.png";
import {
	facebookApp,
	googleApp,
	kakaoApp,
	naverApp,
} from "src/utilities/constants";

const SigninSocialButton = () => {
	// useEffect(() => {
	//   gapi.load('client:auth2', ()=>{
	//     gapi.client.init({
	//       clientID: googleApp.clientID,
	//       scope: ""
	//     })
	//   })
	// }, []);

	const navigate = useNavigate();

	const signupWithGoogle = (response) => {
		try {
			const data = { ggtoken: response.tokenId };
			UserService.googleLogin(data)
				.then((res) => {
					if (res.result === "ok") {
						navigate("/");
					} else {
						toast.error("Login failed !", { autoClose: 5000 });
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const signupWithFacebook = (response) => {
		try {
			const data = { fbtoken: response.accessToken };
			UserService.facebookLogin(data)
				.then((res) => {
					if (res.result === "ok") {
						navigate("/");
					} else {
						toast.error("Login failed !", { autoClose: 5000 });
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const signupWithKakao = (response) => {
		try {
			const data = { kktoken: response.response.access_token };
			UserService.kakaoLogin(data)
				.then((res) => {
					if (res.result === "ok") {
						navigate("/");
					} else {
						toast.error("Login failed !", { autoClose: 5000 });
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const signupWithNaver = (response) => {
		console.log(
			"🚀 ~ file: SigninSocialButton.tsx:96 ~ signupWithNaver ~ response:",
			response,
		);
		try {
			const data = { fbtoken: response.accessToken };
			UserService.naverLogin(data)
				.then((res) => {
					if (res.result === "ok") {
						navigate("/");
					} else {
						toast.error("Login failed !", { autoClose: 5000 });
					}
				})
				.catch((error) => {
					console.error(
						"🚀 ~ file: SigninSocialButton.tsx:108 ~ signupWithNaver ~ error:",
						error,
					);
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex items-center gap-4">
			<KakaoLogin
				token={kakaoApp.jsKey}
				onSuccess={signupWithKakao}
				onFail={(err) => {
					console.log("Kakao Login Error: ", err);
				}}
				render={(props) => (
					<button onClick={props.onClick}>
						<img
							src={kakaotalk}
							alt=""
							style={{
								width: "48px",
								height: "48px",
							}}
							className="cursor-pointer"
						/>
					</button>
				)}
			/>

			{/* <NaverLogin
				clientId={naverApp.clientID}
				callbackUrl={`${APP_ROOT}?page=callback-naver-oauth`}
				onSuccess={signupWithNaver}
				onFailure={(err) => {
					console.log("Naver Login Error: ", err);
				}}
				render={(props) => (
					<button onClick={props.onClick} className="naver-btn">
						<img
							src={naver}
							alt=""
							style={{
								width: "48px",
								height: "48px",
							}}
							className="cursor-pointer"
						/>
					</button>
				)}
			/> */}

			<FacebookLogin
				appId={facebookApp.clientID}
				autoLoad={false}
				fields="name,email,picture"
				callback={signupWithFacebook}
				render={(renderProps) => (
					<button onClick={renderProps.onClick}>
						<img
							src={facebook}
							alt=""
							style={{
								width: "48px",
								height: "48px",
							}}
							className="cursor-pointer"
						/>
					</button>
				)}
			/>

			<GoogleLogin
				clientId={googleApp.clientID}
				onSuccess={signupWithGoogle}
				onFailure={(err) => {
					console.log("Google Login Error: ", err);
				}}
				render={(props) => (
					<button onClick={props.onClick}>
						<img
							src={google}
							alt=""
							style={{
								width: "48px",
								height: "48px",
							}}
							className="cursor-pointer"
						/>
					</button>
				)}
				cookiePolicy="single_host_origin"
				// isSignedIn={true}
			/>
		</div>
	);
};

export default SigninSocialButton;
