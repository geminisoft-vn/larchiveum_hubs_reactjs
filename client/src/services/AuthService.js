import request from "src/utils/request";

class AuthService {
  static oAuthGoogle() {
    return request({
      method: "POST",
      url: `/auth/google/callback`
    });
  }

  static oAuthFacebook(data) {
    return request({
      method: "POST",
      url: `/fblogin`,
      data
    });
  }

  static oAuthNaver(data) {
    return request({
      method: "POST",
      url: `/nvlogin`,
      data
    });
  }

  static oAuthKakao(data) {
    return request({
      method: "POST",
      url: `/kklogin`,
      data
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

  static checkToken(token) {
    return request({
      method: "POST",
      url: `/users/checkToken`,
      data: { token }
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
