import request from "src/utils/request";

class UserService {
  static getAvatar(userId) {
    return request
      .get(`/auth/users/${userId}/avatar`)
      .then(res => res.data.data);
  }
  static update(id, data) {
    return request.put(`/auth/users/${id}`, data).then(res => res.data.data);
  }
  static isAdmin(email) {
    return request.put(`/auth/is-admin?email=${email}`).then(res => res.data.data);
  }
}

export default UserService;
