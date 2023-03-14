import Cookies from "js-cookie";
import StoreHub from "../../storage/store";
import hubChannel from "../../utils/hub-channel";
import { expireCookies } from "./constants";
const store = new StoreHub();

class Store {
  static getUser() {
    if (Cookies.get("_larchiveum_user") && Cookies.get("_larchiveum_user") != "") {
      const str = Cookies.get("_larchiveum_user");
      const user = JSON.parse(str || "{}");
      if (user && user.token) {
        return user;
      }
    }
    return null;
  }

  static setUser(data) {
    if (data != undefined) {
      Cookies.set("_larchiveum_user", data, {
        expires: expireCookies,
        path: "/"
      });
    }
  }

  static removeUser() {
    Cookies.remove("_larchiveum_user");
  }

  static getAccessToken() {
    const { token } = Store.getUser();
    return token;
  }
}

export default Store;
