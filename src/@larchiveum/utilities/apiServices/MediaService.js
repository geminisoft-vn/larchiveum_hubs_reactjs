import { API_ROOT } from "../constants";
import Store from "../store";
import request from "./apiRequest";

class MediaService {
  getListMedia(id) {
    return fetch(`${API_ROOT}/v1/auth/media?exhibitionId=${id}`, {
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
    return fetch(`${API_ROOT}/v1/media/proxy/${objectId}`, {
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
    return fetch(`${API_ROOT}/v1/auth/media`, {
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

  upload(file, onProgress, cancellation) {
    const data = new FormData();
    data.append("file", file);
    return request
      .post("/v1/auth/media/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) onProgress(percent);
        },
        cancelToken: cancellation.token
      })
      .then(res => {
        return res.data;
      });
  }
}

export default new MediaService();
