import { AxiosError } from "axios";

import { IAxiosResponse, IUser, IUserAuthenticationForm } from "src/interfaces";
import { API_ROOT } from "src/utilities/constants";
import request from "src/utilities/request";

class UserService {
	static googleLogin(data: {
		ggtoken: string;
	}): Promise<IAxiosResponse<Partial<IUser>>> {
		return request({
			method: "POST",
			url: `/gglogin`,
			data,
		});
	}

	static facebookLogin(data: {
		fbtoken: string;
	}): Promise<IAxiosResponse<Partial<IUser>>> {
		return request({
			method: "POST",
			url: `/fblogin`,
			data,
		});
	}

	static naverLogin(data: {
		fbtoken: string;
	}): Promise<IAxiosResponse<Partial<IUser>>> {
		return request({
			method: "POST",
			url: `/nvlogin`,
			data,
		});
	}

	static kakaoLogin(data: {
		kktoken: string;
	}): Promise<IAxiosResponse<Partial<IUser>>> {
		return request({
			method: "POST",
			url: `/kklogin`,
			data,
		});
	}

	static signupWithEmail(
		data: Partial<IUserAuthenticationForm>,
	): Promise<IAxiosResponse<Partial<IUser>>> {
		return request({
			method: "POST",
			url: `/users`,
			data,
		});
	}

	static login(
		data: Partial<IUserAuthenticationForm>,
	): Promise<IAxiosResponse<Partial<IUser>>> {
		return request({
			method: "POST",
			url: `/login`,
			data,
		});
	}

	static checkToken(token: string) {
		return request({
			method: "POST",
			url: `/users/checkToken`,
			data: { token },
		});
	}

	static requestResetPassword(data: {
		email: string;
	}): Promise<IAxiosResponse<Partial<IUser>>> {
		return request({
			method: "POST",
			url: `/users/requestResetPassword`,
			data,
		});
	}

	static resetPassword(data: {
		access_token?: string;
		pasword?: string;
	}): Promise<IAxiosResponse<Partial<IUser>>> {
		return request({
			method: "POST",
			url: `/users/resetPassword`,
			data,
		});
	}

	static verifyUser(token: string): Promise<IAxiosResponse<Partial<IUser>>> {
		return request.post("/auth/users/verifyUser", {
			access_token: token,
		});
	}

	static reSendVerifyMail(email: string) {
		return request.post("/users/reSendVerifyMail", { email });
	}

	static update(
		id: number,
		data: Partial<IUserAuthenticationForm>,
	): Promise<IAxiosResponse<IUserAuthenticationForm>> {
		return request.patch(`/auth/users/${id}`, data);
	}

	static getAll(params?): Promise<IAxiosResponse<IUser[]>> {
		return request({
			method: "GET",
			url: `/auth/users`,
			params,
		});
	}
}

export default UserService;
