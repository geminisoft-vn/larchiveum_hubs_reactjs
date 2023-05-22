import { IAvatar, IAxiosResponse } from "src/interfaces";
import request from "src/utilities/request";

class AvatarService {
	static create(data) {
		return request.post("auth/avatars", data);
	}

	static getOne(id): Promise<IAxiosResponse<IAvatar>> {
		return request({
			method: "GET",
			url: `/auth/avatars/${id}`,
		});
	}

	static getListAvatar(): Promise<IAxiosResponse<IAvatar[]>> {
		return request({
			method: "GET",
			url: `/avatars`,
		});
	}
}

export default AvatarService;