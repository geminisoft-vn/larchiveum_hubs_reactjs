import { AxiosResponse } from "axios";
import moment from "moment-timezone";

import { IAxiosResponse, IExhibition, IScene } from "src/interfaces";
import request from "src/utilities/request";

class ExhibitionsService {
	static getAllExhibitions(data): Promise<IAxiosResponse<IExhibition[]>> {
		return request({
			method: "GET",
			url: `/v1/exhibitions?page=${data.page ? data.page : 1}&pageSize=${data.pageSize ? data.pageSize : 15}&sort=${
				data.sort ? data.sort : ""
			}`,
		});
	}

	static getAllWithAuthExhibitions(data): Promise<IAxiosResponse<IExhibition[]>> {
		return request({
			method: "GET",
			url: `/v1/auth/exhibitions?page=${data.page ? data.page : 1}&pageSize=${
				data.pageSize ? data.pageSize : 15
			}&sort=${data.sort ? data.sort : ""}&timezone=${moment.tz.guess()}&isAdmin=${data.isAdmin ? data.isAdmin : ""}`,
		});
	}

	static getAllScenes(): Promise<IAxiosResponse<IScene[]>> {
		return request({
			method: "GET",
			url: `/v1/auth/exhibitions/getAllScenes`,
		});
	}

	static postCreateOne(data) {
		return request({
			method: "POST",
			url: `/v1/auth/exhibitions`,
			data,
		});
	}

	static putUpdateOne(data) {
		return request({
			method: "PUT",
			url: `/v1/auth/exhibitions/${data.id}`,
			data,
		});
	}

	static patchTogglePublic(id: number): Promise<IAxiosResponse<{ id: number; public: boolean }>> {
		return request({
			method: "PATCH",
			url: `/v1/auth/exhibitions/${id}/togglePublic`,
			data: { id },
		});
	}

	static deleteOneExhibition(id) {
		return request({
			method: "DELETE",
			url: `/v1/auth/exhibitions/${id}`,
		});
	}

	static closeOneExhibition(id) {
		return request({
			method: "POST",
			url: `/v1/auth/exhibitions/close`,
			data: { id },
		});
	}

	static openOneExhibition(id) {
		return request({
			method: "POST",
			url: `/v1/auth/exhibitions/open`,
			data: { id },
		});
	}
}

export default ExhibitionsService;
