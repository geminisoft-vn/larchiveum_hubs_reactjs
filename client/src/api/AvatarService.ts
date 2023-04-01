import request from "src/utilities/request";

class AvatarService {
	static create(data) {
		return request.post("v1/auth/avatars", data);
	}

	static getListAvatar() {
		return request({
			method: "GET",
			url: `/v1/avatars`,
		});
	}
}

export default AvatarService;
