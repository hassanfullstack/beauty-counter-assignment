import axios from "axios";
import { config, HOST_URL } from "./endPoints";
import { WebStorage, WebStorageNames, messages, Common } from "../utils";

const { Exception } = messages;

const axiosBasic = axios.create({
  baseURL: HOST_URL,
  timeout: 120 * 1000,
  headers: { Pragma: "no-cache" },
});

export const getAuthToken = () =>
  WebStorage.getLocalStore(WebStorageNames.AuthInfo);
  
export const configureAxiosDefaults = async () => {
  axiosBasic.defaults.baseURL = HOST_URL;
  axiosBasic.defaults.headers.post["Content-Type"] = "application/json";

  await axiosBasic.interceptors.request.use(
    (configuration) => {
      const cfg = configuration;
      cfg.headers.Pragma = "no-cache";
      const url = cfg.url.toLowerCase();
      if (
        url.endsWith("auth/v1")
      ) {
        return cfg;
      }
      const res = getAuthToken();
      if (res !== null) {
        cfg.headers.Authorization = `Bearer ${res}`;
      }
      return Promise.resolve(cfg);
    },
    (err) => {
      Promise.reject(err);
    }
  );
};

export const axiosResponse = async () => {
  await axiosBasic.interceptors.response.use(null, async (err) => {
    if (err.config && err.response && err.response.status === 401) {
      Common.showErrorMessage(err.response.status);
      return Promise.reject(err);
    }
    if (err.message === Exception.networkError) {
      return Promise.reject(err);
    }
    return Promise.reject(err);
  });
};

export { axiosBasic };