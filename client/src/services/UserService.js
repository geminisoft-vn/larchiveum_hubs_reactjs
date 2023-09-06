import request from "src/utils/request";

class UserService {
  static create(data) {
    return request.post("/auth/user", data).then(res => res.data.data);
  }
  static getAll(params) {
    return request.get("/auth/users", {params}).then(res => res.data.data);
  }
  static getAvatar(userId) {
    return request
      .get(`/auth/users/${userId}/avatar`)
      .then(res => res.data.data);
  }
  static me() {
    return request({
      method: "GET",
      url: `/auth/users/me`,
    });
  }
  static update(id, data) {
    return request.put(`/auth/users/${id}`, data).then(res => res.data.data);
  }
  static isAdmin(email) {
    return request.put(`/auth/is-admin?email=${email}`).then(res => res.data);
  }
}

export default UserService;
