import { webStorage } from "./webStorage";

export const idMenu = (pathname) => {
  const dataUser = webStorage.get("dataUser");
  return dataUser?.microScope?.find((menu) => menu.pathName === pathname)?.id;
};
