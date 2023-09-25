import request from "src/utils/request";

class StatisticService {
  static getHubVersion(data) {
    return request.get("/auth/hub-version", data).then(res => res.data.data);
  }
}

export default StatisticService;
