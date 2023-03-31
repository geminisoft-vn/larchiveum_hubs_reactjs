import apiRequest from "src/utilities/axiosInstance";
import { API_ROOT } from "src/utilities/constants";
import Store from "src/utilities/store";

class AvatarService {
	static create(data) {
		return apiRequest
			.post("v1/auth/avatars", data)
			.then((response) => response.data);
	}

	static getListAvatar() {
		return fetch(`${API_ROOT}/v1/avatars`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}
}

export default AvatarService;
