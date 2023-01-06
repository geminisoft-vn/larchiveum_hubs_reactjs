import Cookies from "js-cookie";
import { expireCookies } from "./constants.js";

class Store {
  static getAccessToken(){
    return Cookies.get("access_token") || null;
  }

  static setAccessToken(token){
    if (token) {
      Cookies.set("access_token", token, {
        expires: expireCookies,
        path: "/"
      });
    }
  }

  static removeAccessToken() {
    Cookies.remove("access_token");
  }
}

export default Store;
