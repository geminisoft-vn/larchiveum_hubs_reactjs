class Store {
  static getUserID() {
    let userId = window.localStorage.getItem("__LARCHIVEUM__USER_ID");
    return userId;
  }
}

export default Store;
