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

      if (!apiKey) {
        // headers.Authorization = `Bearer ${await getUserAccessToken()}`;
        headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJySDN6VVB6ZGFqT2E4WEdQeVlsNVloaWRFblpFZ1hSVlVJc3BaSEthY0xVIn0.eyJleHAiOjE2ODM4NjUxMzcsImlhdCI6MTY4Mzg2NDIzNywianRpIjoiYTVmNzE4YWItNTJiOC00NmVjLWExODEtNWQ5YzNmN2IzY2I5IiwiaXNzIjoiaHR0cDovL2FjY291bnQtZGV2LmJlYWN1a2FpLmdvLmlkL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxZmQ0MDMyOS04ODY5LTQzY2YtYjkxNy1mYTBkOTZlY2I2NzIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzbWFydF9jdXN0b20iLCJzZXNzaW9uX3N0YXRlIjoiNzBlMDcyMWItYjU0ZS00N2YxLWIwMWYtMDBmZjEzNjZiOTkyIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuaXAiOiIxOTkwMTIyMzIwMTAwMTEwMDMiLCJuYW1lIjoiR0FURSBQUklPSyIsInByZWZlcnJlZF91c2VybmFtZSI6ImdhdGUucHJpb2siLCJnaXZlbl9uYW1lIjoiR0FURSIsImZhbWlseV9uYW1lIjoiUFJJT0siLCJlbWFpbCI6ImdhdGUucHJpb2tAZ21haWwuY29tIn0.VZUUH4kbDw-SVjyqnL36pvThWIxhROp-i68cZYGW7X2sdlVjxoVg5XrhbIuGdhS6fPcr-gV6iYMFImYoqi-udVYn8xFFwfF70O9yoew4UqBBVV_AxoiE7RR2j393s5ZM1reoB6No3rTuYAHXn_NJVigSJ9BQV7sQKNeSBWf6CqReTqNxxF0rbJsnCaKT9t8dJlJRLzGp0Qxz4uHcQvqSNIBpXUt8YyV76t6wFIH54MCYIpyiXTC_zFNkWNkBjcpVHYBwMMCI2Ajt7BplhqvQFIGV4dnTSVF21eXKiLSJoM2e5qtKfR7MpvqpIM375fGsk-h6O0D7krM0GyopuuvKyw`;
      }

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
  referensi_beacukai: apiContentType(
    process.env.REACT_APP_REFERENSI_BC,
    process.env.REACT_APP_API_REFERENSI_BC_KEY
  ),
};
