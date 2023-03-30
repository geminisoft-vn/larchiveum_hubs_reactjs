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
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static facebookLogin(data: { fbtoken: string }) {
		return fetch(`${API_ROOT}/v1/fblogin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static naverLogin(data: { fbtoken: string }) {
		return fetch(`${API_ROOT}/v1/nvlogin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static kakaoLogin(data: { kktoken: string }) {
		return fetch(`${API_ROOT}/v1/kklogin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static signupWithEmail(data) {
		return fetch(`${API_ROOT}/v1/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static login(data) {
		return fetch(`${API_ROOT}/v1/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static checkToken(token) {
		return fetch(`${API_ROOT}/v1/users/checkToken`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token,
			}),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static requestResetPassword(email) {
		return fetch(`${API_ROOT}/v1/users/requestResetPassword`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(email),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static resetPassword(data) {
		return fetch(`${API_ROOT}/v1/users/resetPassword`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static verifyUser(token) {
		return apiRequest.post("/v1/auth/users/verifyUser", {
			access_token: token,
		});
	}

	static reSendVerifyMail(email) {
		return apiRequest.post("v1/users/reSendVerifyMail", { email });
	}

	static update(id, data) {
		return apiRequest
			.patch(`v1/auth/users/${id}`, data)
			.then((response) => response.data);
	}
}

export default UserService;
