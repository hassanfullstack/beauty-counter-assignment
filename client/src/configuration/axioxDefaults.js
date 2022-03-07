import axios from "axios";
import { config } from "../api/config";
var jwtDecode = require("jwt-decode"); //Was not working with ES6 syntax

const { ROOT_URL, REST_API } = config;

const getAuthToken = () => {
  try {
    const state = localStorage !== undefined ? localStorage.userInfo : "";
    if (state) {
      const stateObject = JSON.parse(state);
      const authToken = stateObject.token.access_token;
      return authToken;
    } else {
      return null;
    }
  } catch (err) {
    Common.showErrorMessage(err);
    return null;
  }
};
export const configureAxiosDefaults = async () => {
  axios.defaults.baseURL = ROOT_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.interceptors.request.use(
    config => {
      const cfg = config;
      cfg.headers.Pragma = "no-cache";
      const url = cfg.url.toLowerCase();
      if (url.startsWith(GlobalKey.bucketUrl)) {
        return cfg;
      }
      const token = getAuthToken();
      if (token === null) return cfg;

      cfg.headers.common["Authorization"] = `Bearer ${token}`;
      return cfg;
    },
    err => {
      return Promise.reject(err);
    }
  );
};

export const setToken = () => {
  var token = getAuthToken();
  if (token !== null) {
    var decode = jwtDecode(token).exp;
    var TokenDate = new Date(decode * 1000);
    var currentDate = new Date(Date.now());
    if (TokenDate > currentDate) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.clear();
    }
  } else {
    localStorage.clear();
  }
};
