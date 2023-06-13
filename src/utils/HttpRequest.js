import url from "url";
import a from "axios";
import { apiDevToProd, getAccessHeader, isProd } from "./DataUser";

const ignore_token_for_path = ["referensi", "cms"];
const ignore_apikey_for_path = ["amws"];
class HttpRequest {
  getPath(uri) {
    return url
      .parse(uri)
      .pathname.replace("-", "_")
      .split("/")[1]
      .toLowerCase();
  }

  getToken(url) {
    const path = this.getPath(url),
      {
        REACT_APP_SECRET_KEY_LHP,
        REACT_APP_SECRET_KEY_PARSER,
        REACT_APP_SECRET_KEY_AMWS,
        REACT_APP_SECRET_KEY_ESEAL,
        REACT_APP_SECRET_KEY_PERIJINAN,
        REACT_APP_SECRET_KEY_SCE_WS,
        REACT_APP_SECRET_KEY_RISK_ENGINE,
        REACT_APP_SECRET_KEY_CSEARCH,
        REACT_APP_SECRET_KEY_HDFS,
        REACT_APP_SECRET_KEY_PFPD,
        REACT_APP_SECRET_KEY_REFERENSI,
        REACT_APP_SECRET_KEY_PERBAIKAN,
        REACT_APP_SECRET_KEY_SIMAUDI,
        REACT_APP_SECRET_KEY_BROWSE,
        REACT_APP_SECRET_KEY_SURAT_KUASA,
        REACT_APP_SECRET_KEY_AP,
        REACT_APP_SECRET_KEY_BARKIR,

        REACT_APP_SECRET_KEY_LHP__DEV,
        REACT_APP_SECRET_KEY_PARSER__DEV,
        REACT_APP_SECRET_KEY_ESEAL__DEV,
        REACT_APP_SECRET_KEY_PERIJINAN__DEV,
        REACT_APP_SECRET_KEY_RISK_ENGINE__DEV,
        REACT_APP_SECRET_KEY_CSEARCH__DEV,
        REACT_APP_SECRET_KEY_HDFS__DEV,
        REACT_APP_SECRET_KEY_PFPD__DEV,
        REACT_APP_SECRET_KEY_PERBAIKAN__DEV,
        REACT_APP_SECRET_KEY_SIMAUDI__DEV,
        REACT_APP_SECRET_KEY_BROWSE__DEV,
        REACT_APP_SECRET_KEY_SURAT_KUASA__DEV,
        REACT_APP_SECRET_KEY_AP__DEV,
        REACT_APP_SECRET_KEY_BARKIR__DEV,
      } = process.env,
      token = {
        parser: isProd
          ? REACT_APP_SECRET_KEY_PARSER
          : REACT_APP_SECRET_KEY_PARSER__DEV,
        amws: REACT_APP_SECRET_KEY_AMWS,
        perijinan: isProd
          ? REACT_APP_SECRET_KEY_PERIJINAN
          : REACT_APP_SECRET_KEY_PERIJINAN__DEV,
        hdfs: isProd
          ? REACT_APP_SECRET_KEY_HDFS
          : REACT_APP_SECRET_KEY_HDFS__DEV,
        sce_ws: REACT_APP_SECRET_KEY_SCE_WS,
        referensi: REACT_APP_SECRET_KEY_REFERENSI,
        browse_service: isProd
          ? REACT_APP_SECRET_KEY_BROWSE
          : REACT_APP_SECRET_KEY_BROWSE__DEV,
        suratkuasa: isProd
          ? REACT_APP_SECRET_KEY_SURAT_KUASA
          : REACT_APP_SECRET_KEY_SURAT_KUASA__DEV,
        simaudi: isProd
          ? REACT_APP_SECRET_KEY_SIMAUDI
          : REACT_APP_SECRET_KEY_SIMAUDI__DEV,
        perbaikan: isProd
          ? REACT_APP_SECRET_KEY_PERBAIKAN
          : REACT_APP_SECRET_KEY_PERBAIKAN__DEV,
        pfpd: isProd
          ? REACT_APP_SECRET_KEY_PFPD
          : REACT_APP_SECRET_KEY_PFPD__DEV,
        csearch: isProd
          ? REACT_APP_SECRET_KEY_CSEARCH
          : REACT_APP_SECRET_KEY_CSEARCH__DEV,
        risk_engine: isProd
          ? REACT_APP_SECRET_KEY_RISK_ENGINE
          : REACT_APP_SECRET_KEY_RISK_ENGINE__DEV,
        eseal: isProd
          ? REACT_APP_SECRET_KEY_ESEAL
          : REACT_APP_SECRET_KEY_ESEAL__DEV,
        lhp: isProd ? REACT_APP_SECRET_KEY_LHP : REACT_APP_SECRET_KEY_LHP__DEV,
        ap: isProd ? REACT_APP_SECRET_KEY_AP : REACT_APP_SECRET_KEY_AP__DEV,
        barkir_service: isProd
          ? REACT_APP_SECRET_KEY_BARKIR
          : REACT_APP_SECRET_KEY_BARKIR__DEV,
      };
    if (ignore_apikey_for_path.includes(path)) return { headers: {} };
    return {
      headers: {
        "Beacukai-Api-Key": token[path],
      },
    };
  }

  mergeRecursive(obj1, obj2) {
    if (!obj1) return obj2;
    for (let p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj2[p].constructor === Object) {
          obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  }

  async get(resourceHttpRequest) {
    const { url, config } = resourceHttpRequest,
      token = this.getToken(url),
      path = this.getPath(url);

    let accesstToken;
    if (!ignore_token_for_path.includes(path)) {
      try {
        accesstToken = await getAccessHeader();
      } catch (e) {
        accesstToken = { headers: {} };
      }
    } else {
      accesstToken = { headers: {} };
    }

    // CreateLog.set(3, {urldata: url})
    return a.get(apiDevToProd(url), {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async post(resourceHttpRequest) {
    const { url, config, data } = resourceHttpRequest,
      token = this.getToken(url),
      path = this.getPath(url);

    let accesstToken;
    if (!ignore_token_for_path.includes(path)) {
      try {
        accesstToken = await getAccessHeader();
      } catch (e) {
        accesstToken = { headers: {} };
      }
    } else {
      accesstToken = { headers: {} };
    }
    // if (url !== 'https://api.beacukai.go.id/amws/v1/user-log/add') {
    //   CreateLog.set(2, {urldata: url})
    // }
    return a.post(apiDevToProd(url), data, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async put(resourceHttpRequest) {
    const { url, config, data } = resourceHttpRequest,
      token = this.getToken(url),
      path = this.getPath(url);

    let accesstToken;
    if (!ignore_token_for_path.includes(path)) {
      try {
        accesstToken = await getAccessHeader();
      } catch (e) {
        accesstToken = { headers: {} };
      }
    } else {
      accesstToken = { headers: {} };
    }

    return a.put(apiDevToProd(url), data, {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }

  async delete(resourceHttpRequest) {
    const { url, config } = resourceHttpRequest,
      token = this.getToken(url),
      path = this.getPath(url);

    let accesstToken;
    if (!ignore_token_for_path.includes(path)) {
      try {
        accesstToken = await getAccessHeader();
      } catch (e) {
        accesstToken = { headers: {} };
      }
    } else {
      accesstToken = { headers: {} };
    }
    // CreateLog.set(5, {urldata: url})
    return a.delete(apiDevToProd(url), {
      ...this.mergeRecursive(this.mergeRecursive(config, token), accesstToken),
    });
  }
}

export default new HttpRequest();
