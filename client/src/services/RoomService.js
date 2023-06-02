import request from "src/utils/request";

class RoomService {
  static getOne(id) {
    return request.get(`/rooms/${id}`).then((res) => res.data.data);
  }
  static create(data) {
    return request.post("/rooms", data).then((res) => res.data.data);
  }
  static update(id, data) {
    return request.put(`/rooms/${id}`, data).then((res) => res.data.data);
  }
  static delete(id) {
    return request.delete(`/rooms/${id}`).then((res) => res.data.data);
  }
}

export default RoomService;
