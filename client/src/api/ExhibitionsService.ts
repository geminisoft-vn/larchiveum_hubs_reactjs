import moment from "moment-timezone";

import { IAxiosResponse, IExhibition, IScene } from "src/interfaces";
import request from "src/utilities/request";

class ExhibitionsService {
	static getAllExhibitions(params): Promise<IAxiosResponse<IExhibition[]>> {
		return request({
			method: "GET",
			url: `/exhibitions?page=${params.page || 1}&pageSize=${
				params.pageSize || 15
			}&sort=${params.sort ? params.sort : ""}`,
		});
	}

	static getAllWithAuthExhibitions(
		params,
	): Promise<IAxiosResponse<IExhibition[]>> {
		return request({
			method: "GET",
			url: `/auth/exhibitions?page=${params.page || 1}&pageSize=${
				params.pageSize || 15
			}&sort=${
				params.sort ? params.sort : ""
			}&timezone=${moment.tz.guess()}&isAdmin=1`,
		}).then((res) => res.data);
	}

	static getAllScenes(): Promise<IAxiosResponse<IScene[]>> {
		return request({
			method: "GET",
			url: `/auth/exhibitions/getAllScenes`,
		}).then((res) => res.data);
	}

	static postCreateOne(data): Promise<IAxiosResponse<IExhibition>> {
		return request({
			method: "POST",
			url: `/auth/exhibitions`,
			data,
		});
	}

	static putUpdateOne(id, data): Promise<IAxiosResponse<IExhibition>> {
		return request({
			method: "PUT",
			url: `/auth/exhibitions/${id}`,
			data,
		});
	}

	static patchTogglePublic(
		id: number,
	): Promise<IAxiosResponse<{ id: number; public: boolean }>> {
		return request({
			method: "PATCH",
			url: `/auth/exhibitions/${id}/togglePublic`,
			data: { id },
		});
	}

	static deleteOneExhibition(
		id,
	): Promise<IAxiosResponse<Partial<IExhibition>>> {
		return request({
			method: "DELETE",
			url: `/auth/exhibitions/${id}`,
		});
	}

	static closeOneExhibition(id: number): Promise<IAxiosResponse<IExhibition>> {
		return request({
			method: "POST",
			url: `/auth/exhibitions/close`,
			data: { id },
		});
	}

	static openOneExhibition(id): Promise<IAxiosResponse<{ closed: boolean }>> {
		return request({
			method: "POST",
			url: `/auth/exhibitions/open`,
			data: { id },
		});
	}
}

export default ExhibitionsService;