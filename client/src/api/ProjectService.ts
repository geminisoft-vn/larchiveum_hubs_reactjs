import { IAxiosResponse } from "src/interfaces";
import request from "src/utilities/request";

class ProjectService {
	static getListProject(data) {
		return request({
			method: "GET",
			url: `/auth/projects?page=${data.page ? data.page : 1}&pageSize=${
				data.pageSize ? data.pageSize : 15
			}&sort=${data.sort ? data.sort : ""}`,
		});
	}

	static getListObject(id): Promise<IAxiosResponse> {
		return request({
			method: "GET",
			url: `/auth/projects/${id}/objects?sort=type|desc`,
		});
	}

	static getListProjectWithObjects(data) {
		return request({
			method: "GET",
			url: `/auth/projects/objects?page=${data.page ? data.page : 1}&pageSize=${
				data.pageSize ? data.pageSize : 15
			}&sort=${data.sort ? data.sort : ""}`,
		});
	}

	static updateChangeableObjects(projectId, data) {
		return request({
			method: "PUT",
			url: `/auth/projects/${projectId}/objects`,
			data: {
				uuids: data,
			},
		});
	}
}

export default ProjectService;