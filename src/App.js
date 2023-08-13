/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import HttpRequest from "utils/HttpRequest";
import jwtDecode from "jwt-decode";
import LoadingWrapperSkeleton from "./components/LoadingWrapperSkeleton";
import { DrawerAlatBantu } from "./components/Drawer";
import { setUser, errorMessage as handleErrorMessage } from "utils/DataUser";
import ErrorContent from "./components/ErrorContent";
import { Provider } from "react-redux";
import store from "./store";
import PageContent from "./pages";
import { decrypt } from "utils/Chiper";
import axios from "axios";
import { setKeycloak, getKeycloak } from "utils/DataKeycloak";
import "./App.css";

const id = document.getElementById("MainContent-container");
const { REACT_APP_AMWS, REACT_APP_SCE_WS } = process.env;

const fetchRole = async (nip) => {
  const resourceUrl = {
    url: `${REACT_APP_AMWS}/v1/user-detail/adv-list-dx?skip=0&take=100&filter=%5B%22idUser%22%2C%22%3D%22%2C%22${nip}%22%5D`,
  };
  try {
    const { data, config } = await HttpRequest.get(resourceUrl);
    const { url } = config;
    const items = data.items || [];
    const idUsers = items.map((np) => {
      return np.idUser;
    });
    let roleArray = [];
    if (!idUsers.includes(nip) && url.includes(nip)) {
      roleArray = undefined;
    } else {
      for (const rl of items) {
        const { namaRole, idRole } = rl.td_role;
        roleArray.push({
          namaRole,
          idRole,
          idUser: rl.idUser,
        });
      }
    }
    return roleArray;
  } catch (e) {
    console.error("roleError", e);
    return [];
  }
};

function MainRoute(props) {
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Kesalahan tidak dikenali, mohon coba lagi");
  const getAttribute = (qualifiedName) =>
    id !== null ? id.getAttribute(qualifiedName) || "unknown qualifiedName" : "";
  const pathValue = getAttribute("pathvalue");
  const pathName = pathValue !== "" ? getAttribute("pathname") : "/path-name";
  const menuName = pathValue !== "" ? getAttribute("menuname") : "Menu Name";
  let stateReduxKeycloak = pathValue !== "" ? decrypt(pathValue) : getKeycloak().refresh_token;

  const fetchKeycloak = (refreshToken) =>
    new Promise((resolve, reject) => {
      const path = `/v1/user/update-token`;
      axios
        .post(REACT_APP_AMWS + path, null, {
          headers: {
            Authorization: refreshToken,
            accept: "application/json",
          },
        })
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

  const fetchUserProfile = (props) =>
    new Promise((resolve, reject) => {
      const path = `/v1/pegawai/get-by-nip/${props.nip}`;
      HttpRequest.get({ url: REACT_APP_AMWS + path })
        .then(async ({ data }) => {
          const { kdKantor, kdUnitOrganisasiInduk, nmPegawai, urlFoto, nip } = data.item;
          if (nip !== props.nip) {
            reject(new Error("Unauthorized"));
            return;
          }
          const roles = await fetchRole(props.nip);
          props.iss = "";
          const dataFetchMenu = {
            ...props,
            kodeKantor: kdKantor,
            kodeUnitOrganisasiInduk: kdUnitOrganisasiInduk,
            namaPegawai: nmPegawai,
            urlFoto: urlFoto,
            roles,
          };
          resolve(dataFetchMenu);
        })
        .catch((err) => {
          reject(err);
        });
    });

  const fetchUserProfilePortal = (email, preferred_username) =>
    new Promise((resolve, reject) => {
      const resourceHttpRequest = {
        url: REACT_APP_AMWS + "/v1/user/user-info-by-email",
        config: {
          params: { email },
        },
      };
      HttpRequest.get(resourceHttpRequest)
        .then(({ data }) => {
          const { idUser, flagBlokir, identitas, nama, email: em } = data.item;
          if (em !== email) {
            reject(new Error("Unauthorized"));
            return;
          }
          const dataUser = {
            idUser,
            flagBlokir,
            identitas,
            name: nama,
            username: preferred_username,
          };
          resolve({ ...dataUser, ...data.item });
        })
        .catch((e) => {
          reject(e);
        });
    });

  const handleAuth = () => {
    fetchKeycloak(stateReduxKeycloak)
      .then((resultKeycloak) => {
        if (resultKeycloak.status !== "success") {
          setErrorMessage("Gagal mengotentifikasi, silahkan coba lagi, atau lakukan login ulang.");
          setIsError(true);
          return;
        }
        setKeycloak(resultKeycloak.item);
        const accessKeycloak = jwtDecode(resultKeycloak.item.access_token);
        const { nip, email, preferred_username } = accessKeycloak;

        /* INI PROFILE UNTUK IN HOUSE */
        if (!nip) {
          setErrorMessage("Data yang diterima tidak memiliki nip, silahkan hubungi admin.");
          setIsError(true);
          return;
        }
        fetchUserProfile({ nip, ...accessKeycloak })
          .then((resultProfile) => {
            setDataUser(resultProfile);
            setUser(resultProfile);
            setLoading(false);
          })
          .catch((e) => {
            setErrorMessage(handleErrorMessage(e));
            setIsError(true);
          });

        /* INI PROFILE UNTUK IN PORTAL */
        // fetchUserProfilePortal(email, preferred_username).then(async (result) => {
        //   if (result.flagBlokir !== '0') {
        //     setErrorMessage('Akun anda terblokir.')
        //     setIsError(true)
        //     return;
        //   }
        //
        //   const {data} = await HttpRequest.get({url: `${REACT_APP_SCE_WS}/profil/perusahaan/perusahaan-by-npwp?npwp=${result.identitas}`})
        //   const {
        //       nib,
        //       npwp,
        //       alamatPerusahaan,
        //       idPerusahaan,
        //       namaPerusahaan,
        //     } = data
        //     const dataUser = {
        //       ...result,
        //       nib,
        //       npwp,
        //       alamatPerusahaan,
        //       idPerusahaan,
        //       namaPerusahaan,
        //     }
        //   setDataUser(dataUser)
        //   setUser(dataUser)
        //   setLoading(false)
        //
        // }).catch((e) => {
        //   setErrorMessage(handleErrorMessage(e))
        //   setIsError(true)
        // });
      })
      .catch((e) => {
        setErrorMessage(handleErrorMessage(e));
        setIsError(true);
      });
  };
  useEffect(() => {
    handleAuth();
  }, []);

  if (isError) {
    return <ErrorContent message={errorMessage} />;
  }

  if (loading) {
    return <LoadingWrapperSkeleton hideContentHeader={true} />;
  }

  const propsExtra = {
    historyParent: props.historyParent,
    pathValue,
    pathName: "/" + pathName.split("/")[1],
    dataUser,
    menuName,
  };

  return (
    <Fragment>
      <PageContent pathName={propsExtra.pathName} propsExtra={propsExtra} />
      {/* <DrawerAlatBantu /> */}
    </Fragment>
  );
}

function App(props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRoute historyParent={props.history} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
