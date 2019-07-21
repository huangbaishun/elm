import axios from "axios";

class http {
  constructor() {
    // this.URL = "//elm.cangdu.org";
    this._http = axios.create({
      timeout: 100000,
      baseURL: "//elm.cangdu.org",
      withCredentials: true
    });
    this.interceptors();
  }
  // get接口
  getHttp(url, Params) {
    return this._http.get(url, {
      params: {
        ...Params
      }
    });
  }
  // post接口
  postHttp(url, Params) {
    return this._http.post(url, { ...Params });
  }
  interceptors() {
    this._http.interceptors.request.use(
      function(config) {
        return config;
      },
      function(err) {
        return Promise.reject(err);
      }
    );
    this._http.interceptors.response.use(
      function(response) {
        return response;
      },
      function(err) {
        return Promise.reject(err);
      }
    );
  }
}
export default new http();
