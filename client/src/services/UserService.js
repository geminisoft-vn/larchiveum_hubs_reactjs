import request from "src/utils/request";

class UserService {
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
