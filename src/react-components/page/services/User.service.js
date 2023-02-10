import request from "./request";

class User {
  static checkToken(token) {
    return request({
      url: "/v1/users/checkToken",
      method: "post",
      data: {
        token: token
      }
    }).then(res => res.data);
  }

  static googleLogin(data) {
    return request({
      url: "/v1/gglogin",
      method: "post",
      data: data
    }).then(res => res.data);
  }

  static facebookLogin(data) {
    return request({
      url: "/v1/gglogin",
      method: "post",
      data: data
    }).then(res => res.data);
  }

  static naverLogin(data) {
    return request({
      url: "/v1/nvlogin",
      method: "post",
      data: data
    }).then(res => res.data);
  }

  static kakaoLogin(data) {
    return request({
      url: "/v1/kklogin",
      method: "post",
      data: data
    }).then(res => res.data);
  }

  static signupWithEmail(data) {
    return request({
      url: "/v1/users",
      method: "post",
      data: data
    }).then(res => res.data);
  }

  static login(data) {
    return request({
      url: "/v1/login",
      method: "post",
      data: data
    }).then(res => res.data);
  }

  static requestResetPassword(data) {
    return request({
      url: "/v1/users/requestResetPassword",
      method: "post",
      data: data
    }).then(res => res.data);
  }

  static resetPassword(data) {
    return request({
      url: "/v1/users/resetPassword",
      method: "post",
      data: data
    }).then(res => res.data);
  }
}

export default User;
