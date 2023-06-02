import request from "src/utils/request";

class ReservationService {
  static create(data) {
    return request.post("/reservations", data).then((res) => res.data.data);
  }
}

export default ReservationService;
