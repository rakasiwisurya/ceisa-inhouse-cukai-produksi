import { notification } from "antd";
import { api } from "configs/api";
import { queryParams } from "./queryParams";

export const requestApi = async ({
  service,
  contentType = "json", //json or formData
  method, //get or post or put or delete or others http method
  endpoint,
  body,
  params,
  setLoading,
}) => {
  if (setLoading) setLoading(false);
  try {
    const newParams = params ? queryParams(params) : "";
    const response = await api[service][contentType][method](`${endpoint}${newParams}`, body);
    if (setLoading) setLoading(false);

    if (response.data.status === true) return response;

    notification.error({
      message: "Failed",
      description: response.data.message,
    });
    return false;
  } catch (error) {
    if (setLoading) setLoading(false);
    notification["error"]({
      message: "Failed",
      description: error?.response?.data?.message || error.message,
    });
    return false;
  }
};
