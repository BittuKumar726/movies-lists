import axios from "axios";
import {
  AUTH_MAX_REQ_TIME_OUT_MS,
  LS_KEY_USER_TOKENS,
} from "../utils/constants";

const axiosInstance = () => {
  const defaultOptions = {
    baseURL: `${process.env.REACT_APP_BACKEND}`,
    method: "get",
    timeout: AUTH_MAX_REQ_TIME_OUT_MS,
  };
  const instance = axios.create(defaultOptions);
  const response = processInstanceRequest(instance);
  return processInstanceResponse(response);
};

const processInstanceRequest = (instance) => {
  instance.interceptors.request.use((config) => {
    if (!config.url.includes("/login")) {
      const userToken =
        JSON.parse(localStorage.getItem(`${LS_KEY_USER_TOKENS}`))
          ?.AccessToken || "";
      config.headers["Authorization"] = userToken ? `Bearer ${userToken}` : "";
    }
    config.headers.current_timestamp = new Date().toISOString();
    config.headers = {
      ...config.headers,
      "Content-Language": "en",
      "Accept-Language": "en",
    };
    return config;
  });
  return instance;
};

const processInstanceResponse = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

export default axiosInstance();
