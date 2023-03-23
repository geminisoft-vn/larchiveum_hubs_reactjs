import UserService from "./apiServices/UserService";
import Store from "./store";

export function auth() {
	const user = Store.getUser();
	return UserService.checkToken(user?.token)
		.then((res) => {
			if (res.result == "ok") {
				if (!res.data.id != user?.id) {
					Store.removeUser();
					window.location = "/signin";
				} else {
					return true;
				}
			} else {
				Store.removeUser();
				window.location = "/signin";
			}
		})
		.catch(() => {
			Store.removeUser();
			window.location = "/signin";
		});
}
