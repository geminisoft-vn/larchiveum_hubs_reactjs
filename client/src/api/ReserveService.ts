import request from "src/utilities/request";

class ReserveService {
	static createReservations(id) {
		return request({
			method: "POST",
			url: `/v1/auth/reservations`,
			data: {
				exhibitionId: id,
			},
		});
	}

	static deleteReservations(data) {
		return request({
			method: "DELETE",
			url: `/v1/auth/reservations/${data.id}`,
		});
	}
}

export default ReserveService;
