import request from "src/utils/request";

class AuthService {
  static checkToken(token) {
    return request({
      method: "POST",
      url: "/check-token",
      data: {
        token
      }
    });
  }

  static register(username, email, password) {
    return request({
      method: "POST",
      url: `/register`,
      data: {
        username,
        email,
        password
      }
    });
  }

  static login(email, password) {
    return request({
      method: "POST",
      url: `/login`,
      data: {
        email,
        password
      }
    });
  }

  static requestResetPassword(data) {
    return request({
      method: "POST",
      url: `/users/requestResetPassword`,
      data
    });
  }

  static resetPassword(data) {
    return request({
      method: "POST",
      url: `/users/resetPassword`,
      data
    });
  }

  static verifyUser(token) {
    return request.post("/auth/users/verifyUser", {
      access_token: token
    });
  }

  static reSendVerifyMail(email) {
    return request.post("/users/reSendVerifyMail", { email });
  }
}

export default AuthService;
