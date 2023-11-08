import jwtDecode from "jwt-decode";
import { getUserAccessToken } from "./DataUser";

export const getTokenPayload = async () => {
  const token = await getUserAccessToken();
  return jwtDecode(token);
};
