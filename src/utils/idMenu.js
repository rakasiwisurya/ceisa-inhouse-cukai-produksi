import { pathName } from "configs/constants";
import { webStorage } from "./webStorage";

const getIdMenu = (pathname) => {
  const dataUser = webStorage.get("dataUser");
  return dataUser?.microScope?.find((menu) => menu.pathName === pathname)?.id;
};

export const idMenu = (menuName) => {
  if (menuName === "referensi") return getIdMenu(`${pathName}/referensi-tarif-warna`);
  if (menuName === "ck4") return getIdMenu(`${pathName}/laporan-ck4`);
  return undefined;
};
