import { webStorage } from "./webStorage";

export const idMenu = (() => {
  const { pathname } = this.props.location;
  const dataUser = webStorage.get("dataUser");
  return dataUser?.microScope?.find((menu) => menu.pathName === pathname)?.id;
})();
