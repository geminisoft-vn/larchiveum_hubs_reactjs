import { IUserAuthenticationForm } from "src/interfaces";
import apiRequest from "src/utilities/axiosInstance";
import { API_ROOT } from "src/utilities/constants";

class UserService {
	static googleLogin(data: { ggtoken: string }) {
		return fetch(`${API_ROOT}/v1/gglogin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	}

	static facebookLogin(data: { fbtoken: string }) {
		return fetch(`${API_ROOT}/v1/fblogin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	}

	static naverLogin(data: { fbtoken: string }) {
		return fetch(`${API_ROOT}/v1/nvlogin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	}

	static kakaoLogin(data: { kktoken: string }) {
		return fetch(`${API_ROOT}/v1/kklogin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	}

	static signupWithEmail(data: Partial<IUserAuthenticationForm>) {
		return fetch(`${API_ROOT}/v1/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	}

	static login(data: Partial<IUserAuthenticationForm>) {
		return fetch(`${API_ROOT}/v1/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	}

	static checkToken(token: string) {
		return fetch(`${API_ROOT}/v1/users/checkToken`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token,
			}),
		}).then((res) => res.json());
	}

	static requestResetPassword(data: { email: string }) {
		return fetch(`${API_ROOT}/v1/users/requestResetPassword`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	}

	static resetPassword(data: { access_token: string; pasword: string }) {
		return fetch(`${API_ROOT}/v1/users/resetPassword`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	}

	static verifyUser(token: string) {
		return apiRequest.post("/v1/auth/users/verifyUser", {
			access_token: token,
		});
	}

	static reSendVerifyMail(email: string) {
		return apiRequest.post("v1/users/reSendVerifyMail", { email });
	}

	static update(id: number, data: Partial<IUserAuthenticationForm>) {
		return apiRequest
			.patch(`v1/auth/users/${id}`, data)
			.then((response) => response.data);
	}
}

export default UserService;
