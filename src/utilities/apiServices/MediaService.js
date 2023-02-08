import { API_ROOT } from "../constants";
import Store from "../store";
import request from "./apiRequest";

class MediaService {
  getListMedia(id) {
    return fetch(`${API_ROOT}/v1/auth/medias?exhibitionId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: Store.getUser()?.token
      }
    })
      .then(res => res.json())
      .catch(error => {
        console.log(error);
      });
  }

  proxyMedia(objectId) {
    return fetch(`${API_ROOT}/v1/medias/proxy/${objectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: ""
      }
    })
      .then(res => res.json())
      .catch(error => {
        console.log(error);
      });
  }

  updateMediaMany(data) {
    return fetch(`${API_ROOT}/v1/auth/medias`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: Store.getUser()?.token
      },
      body: JSON.stringify({
        medias: data
      })
    })
      .then(res => res.json())
      .catch(error => {
        console.log(error);
      });
  }

  upload(file) {
    const data = new FormData();
    data.append("file", file);
    return request
      .post("/v1/auth/medias/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        return res.data;
      });
  }
}

export default new MediaService();
