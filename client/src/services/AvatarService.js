import request from "src/utils/request";

class AvatarService {
  static getAll() {
    return request.get("/avatars").then((res) => res.data.data);
  }
}

export default AvatarService;
