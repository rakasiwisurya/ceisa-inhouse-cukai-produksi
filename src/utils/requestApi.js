import { notification } from "antd";
import { api } from "configs/api";

export const requestApi = async ({ service, method, endpoint, payload, setLoading }) => {
  if (setLoading) setLoading(false);
  try {
    const response = await api[service][method](endpoint, payload);
    if (setLoading) setLoading(false);
    return response;
  } catch (error) {
    if (setLoading) setLoading(false);
    notification["error"]({
      message: "Failed",
      description: error?.response?.data?.message || error.message,
    });
    return false;
  }
};
