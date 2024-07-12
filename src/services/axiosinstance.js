import axios from "axios";
import {
  AUTH_MAX_REQ_TIME_OUT_MS,
  LS_KEY_USER_TOKENS,
} from "../utils/constants";

const axiosInstance = () => {
  const defaultOptions = {
    baseURL: `${import.meta.env.VITE_API_URL}`,
    method: "get",
    timeout: AUTH_MAX_REQ_TIME_OUT_MS,
  };
  const instance = axios.create(defaultOptions);
  const response = processInstanceRequest(instance);
  return processInstanceResponse(response);
};

const processInstanceRequest = (instance) => {
  instance.interceptors.request.use((config) => {
    if (!config?.url?.includes("/login")) {
      const userToken =
        JSON.parse(localStorage.getItem(`${LS_KEY_USER_TOKENS}`))
          ?.AccessToken || "";
      config.headers["Authorization"] = userToken ? `Bearer ${userToken}` : "";
    }
    return config;
  });
  return instance;
};

const processInstanceResponse = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error) {
        return Promise.reject({
          success: error?.response?.data?.success,
          message: error?.response?.data?.message,
          statusCode: error?.response?.status,
        });
      } else {
        return Promise.reject({
          success: false,
          message: "Unauthorized",
          statusCode: 400,
        });
      }
    }
  );
  return instance;
};

export default axiosInstance();
