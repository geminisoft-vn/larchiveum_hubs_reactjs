import { IAvatar, IAxiosResponse } from "src/interfaces";
import request from "src/utilities/request";

class AvatarService {
	static create(data) {
		return request.post("v1/auth/avatars", data);
	}

	static getOne(id): Promise<IAxiosResponse<IAvatar>> {
		return request({
			method: "GET",
			url: `/v1/auth/avatars/${id}`,
		});
	}

	static getListAvatar(): Promise<IAxiosResponse<IAvatar[]>> {
		return request({
			method: "GET",
			url: `/v1/avatars`,
		});
	}
}

export default AvatarService;
