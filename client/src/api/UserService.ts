import { IUserAuthenticationForm } from "src/interfaces";
import { API_ROOT } from "src/utilities/constants";
import request from "src/utilities/request";

class UserService {
	static googleLogin(data: { ggtoken: string }) {
		return request({
			method: "POST",
			url: `/v1/gglogin`,
			data,
		});
	}

	static facebookLogin(data: { fbtoken: string }) {
		return request({
			method: "POST",
			url: `/v1/fblogin`,
			data,
		});
	}

	static naverLogin(data: { fbtoken: string }) {
		return request({
			method: "POST",
			url: `/v1/nvlogin`,
			data,
		});
	}

	static kakaoLogin(data: { kktoken: string }) {
		return request({
			method: "POST",
			url: `/v1/kklogin`,
			data,
		});
	}

	static signupWithEmail(data: Partial<IUserAuthenticationForm>) {
		return request({
			method: "POST",
			url: `/v1/users`,
			data,
		});
	}

	static login(data: Partial<IUserAuthenticationForm>) {
		return request({
			method: "POST",
			url: `/v1/login`,
			data,
		});
	}

	static checkToken(token: string) {
		return request({
			method: "POST",
			url: `/v1/users/checkToken`,
			data: { token },
		});
	}

	static requestResetPassword(data: { email: string }) {
		return request({
			method: "POST",
			url: `/v1/users/requestResetPassword`,
			data,
		});
	}

	static resetPassword(data: { access_token: string; pasword: string }) {
		return request({
			method: "POST",
			url: `/v1/users/resetPassword`,
			data,
		});
	}

	static verifyUser(token: string) {
		return request.post("/v1/auth/users/verifyUser", {
			access_token: token,
		});
	}

	static reSendVerifyMail(email: string) {
		return request.post("v1/users/reSendVerifyMail", { email });
	}

	static update(id: number, data: Partial<IUserAuthenticationForm>) {
		return request.patch(`v1/auth/users/${id}`, data);
	}
}

export default UserService;