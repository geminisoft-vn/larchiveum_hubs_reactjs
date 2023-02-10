class Store {
  static getAccessToken() {
    return window.localStorage.getItem("__larchiveum__access_token");
  }

  static setAccessToken(token) {
    window.localStorage.setItem("__larchiveum__access_token", token);
  }

  static removeAccessToken() {
    window.localStorage.removeItem("__larchiveum__access_token");
  }

  static getLanguage() {
    return window.localStorage.getItem("__larchiveum__language");
  }

  static setLanguage(language) {
    window.localStorage.getItem("__larchiveum__language", language);
  }
}

export default Store;
