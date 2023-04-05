import { IAxiosResponse } from "src/interfaces";
import request from "src/utilities/request";

class ReserveService {
	static createReservations(id): Promise<
		IAxiosResponse<{
			id: number;
			reservated: boolean;
			reservationCount: number;
		}>
	> {
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
