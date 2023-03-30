import Cookies from "js-cookie";

import { expireCookies } from "./constants";

class Store {
	static getUser() {
		if (
			Cookies.get("__LARCHIVEUM__USER") &&
			Cookies.get("__LARCHIVEUM__USER") !== ""
		) {
			const str = Cookies.get("__LARCHIVEUM__USER");
			const user = JSON.parse(str || "{}");
			if (user && user.token) {
				return user;
			}
		}
		return null;
	}

	static setUser(data) {
		if (data !== undefined) {
			Cookies.set("__LARCHIVEUM__USER", JSON.stringify(data), {
				expires: expireCookies,
				path: "/",
			});
		}
	}

	static removeUser() {
		Cookies.remove("__LARCHIVEUM__USER");
	}

	static getAccessToken() {
		const { token } = Store.getUser();
		return token;
	}
}

export default Store;
