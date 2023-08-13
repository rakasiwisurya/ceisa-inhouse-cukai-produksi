import Cookies from "js-cookie";

export const clearCookies = () => {
  const allCookies = Cookies.get();

  for (const cookieName in allCookies) {
    Cookies.remove(cookieName);
  }
};
