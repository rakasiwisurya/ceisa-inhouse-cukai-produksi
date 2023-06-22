import Axios from "axios";
import { getUserAccessToken } from "utils/DataUser";

const axiosConfig = (baseURL, contentType) => {
  const instance = Axios.create({ baseURL });

  instance.interceptors.request.use(
    async (config) => {
      const headers = {
        "Beacukai-api-key": process.env.REACT_APP_API_ALL_V2_KEY,
        Authorization: `Bearer ${await getUserAccessToken()}`,
        "Content-Type": contentType,
      };
      const newConfig = {
        ...config,
        headers,
      };

      return newConfig;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

const apiContentType = (baseURL) => ({
  json: axiosConfig(baseURL, "application/json"),
  formData: axiosConfig(baseURL, "multipart/form-data"),
});

export const api = {
  referensi: apiContentType(process.env.REACT_APP_API_REFERENSI),
  produksi: apiContentType(process.env.REACT_APP_API_PRODUKSI),
};
