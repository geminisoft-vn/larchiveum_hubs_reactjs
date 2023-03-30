import moment from "moment-timezone";

import { API_ROOT } from "src/utilities/constants";
import Store from "src/utilities/store";

class ExhibitionsService {
	static getAllExhibitions(data) {
		return fetch(
			`${API_ROOT}/v1/exhibitions?page=${data.page ? data.page : 1}&pageSize=${
				data.pageSize ? data.pageSize : 15
			}&sort=${data.sort ? data.sort : ""}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					access_token: "",
				},
			},
		)
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static getAllWithAuthExhibitions(data) {
		return fetch(
			`${API_ROOT}/v1/auth/exhibitions?page=${
				data.page ? data.page : 1
			}&pageSize=${data.pageSize ? data.pageSize : 15}&sort=${
				data.sort ? data.sort : ""
			}&timezone=${moment.tz.guess()}&isAdmin=${
				data.isAdmin ? data.isAdmin : ""
			}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					access_token: Store.getUser()?.token,
				},
			},
		)
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static getAllScenes() {
		return fetch(`${API_ROOT}/v1/auth/exhibitions/getAllScenes`, {
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

	static postCreateOne(data) {
		return fetch(`${API_ROOT}/v1/auth/exhibitions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static putUpdateOne(data) {
		return fetch(`${API_ROOT}/v1/auth/exhibitions/${data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static patchTogglePublic(id) {
		return fetch(`${API_ROOT}/v1/auth/exhibitions/${id}/togglePublic`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
			body: JSON.stringify({
				id,
			}),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static deleteOneExhibition(id) {
		return fetch(`${API_ROOT}/v1/auth/exhibitions/${id}`, {
			method: "DELETE",
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

	static closeOneExhibition(id) {
		return fetch(`${API_ROOT}/v1/auth/exhibitions/close`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
			body: JSON.stringify({
				id,
			}),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static openOneExhibition(id) {
		return fetch(`${API_ROOT}/v1/auth/exhibitions/open`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
			body: JSON.stringify({
				id,
			}),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}
}

export default ExhibitionsService;
