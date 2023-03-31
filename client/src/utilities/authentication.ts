import UserService from "src/api/UserService";

import Store from "./store";

export function auth() {
	const user = Store.getUser();
	return UserService.checkToken(user?.token)
		.then((res) => {
			if (res.result === "ok") {
				if (!res.data.id !== user?.id) {
					Store.removeUser();
					// window.location = "/auth/signin";
				} else {
					return true;
				}
			} else {
				Store.removeUser();
				// window.location = "/auth/signin";
			}
			return false;
		})
		.catch(() => {
			Store.removeUser();
			// window.location = "/auth/signin";
		});
}
