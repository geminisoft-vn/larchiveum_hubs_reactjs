import request from "src/utilities/axiosInstance";
import { API_ROOT } from "src/utilities/constants";
import Store from "src/utilities/store";

class ReserveService {
	static createReservations(id) {
		return fetch(`${API_ROOT}/v1/auth/reservations`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				access_token: Store.getUser()?.token,
			},
			body: JSON.stringify({
				exhibitionId: id,
			}),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}

	static deleteReservations(data) {
		return fetch(`${API_ROOT}/v1/auth/reservations/${data.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				access_token: "",
			},
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log(error);
			});
	}
}

export default ReserveService;
