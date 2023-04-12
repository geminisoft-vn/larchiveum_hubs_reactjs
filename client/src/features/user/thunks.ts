// @ts-nocheck

import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import _omit from "lodash/omit";
import _pick from "lodash/pick";

import UserService from "src/api/UserService";
import { IUser } from "src/interfaces";

interface IJWTPayload {
	email: string;
	method: number;
	type: number;
	iat: number;
	exp: number;
}

const login = createAsyncThunk(
	"user/login",
	async (data: { email: string; password: string }) => {
		const res = await UserService.login(data);

		const result: {
			data: Partial<IUser>;
			authentication: {
				token: string;
				expire: number;
				isAuthenticated: boolean;
			};
		} = {
			data: {},
			authentication: {
				token: "",
				expire: 0,
				isAuthenticated: false,
			},
		};

		if (res.result === "ok") {
			result.data = _omit(res.data, ["token"]);
			const { token } = _pick(res.data, ["token"]);
			const { exp } = jwtDecode<IJWTPayload>(token);
			result.authentication = {
				token,
				expire: exp,
				isAuthenticated: true,
			};
		}

		return result;
	},
);

export { login };
