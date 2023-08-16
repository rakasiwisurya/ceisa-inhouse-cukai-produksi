import Axios from "axios";
import { getUserAccessToken } from "utils/DataUser";

const axiosConfig = (baseURL, contentType, apiKey) => {
  const instance = Axios.create({ baseURL });

  instance.interceptors.request.use(
    async (config) => {
      const headers = {
        "Beacukai-api-key": apiKey ? apiKey : process.env.REACT_APP_API_ALL_V2_KEY,
        "Content-Type": contentType,
      };

      if (!apiKey) headers.Authorization = `Bearer ${await getUserAccessToken()}`;

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

const apiContentType = (baseURL, apiKey) => ({
  json: axiosConfig(baseURL, "application/json", apiKey),
  formData: axiosConfig(baseURL, "multipart/form-data", apiKey),
});

export const api = {
  referensi: apiContentType(process.env.REACT_APP_API_REFERENSI),
  produksi: apiContentType(process.env.REACT_APP_API_PRODUKSI),
  pita_cukai: apiContentType(process.env.REACT_APP_API_PITA_CUKAI),
  perbendaharaan: apiContentType(process.env.REACT_APP_API_PERBENDAHARAAN),
  referensi_beacukai: apiContentType(
    process.env.REACT_APP_REFERENSI_BC,
    process.env.REACT_APP_API_REFERENSI_BC_KEY
  ),
};
