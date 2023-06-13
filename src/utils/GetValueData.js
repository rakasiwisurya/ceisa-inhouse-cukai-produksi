// Get Value From "data/*.json" by default keyName

// import JenisIdentitas from "data/JenisIdentitas.json";
// import JenisAju from "data/JenisAju.json";
// import JenisKemasanBarang from "data/JenisKemasanBarang.json";
// import JenisSatuanBarang from "data/JenisSatuanBarang.json";
import Kantor from "data/tr_kantor.json";
// import CaraAngkut from "data/CaraAngkut.json";
// import Pelabuhan from "data/Pelabuhan.json";
// import Negara from "data/Negara.json";
// import Marketplace from "data/Marketplace.json";
// import PosTarifHsCodeBarkir from "data/PosTarifHsCodeBarkir.json";
// import Dokumen from "data/Dokumen.json";
// import GudangTPS from "data/GudangTPS.json";
// import JenisTarif from "data/JenisTarif.json";

/* @params
 * kodeJenisIdentitas
 * namaJenisIdentitas
 */
// export const getJenisIdentitas = (kodeJenisIdentitas = "", returnKey = "namaJenisIdentitas") => {
//   const data = JenisIdentitas.data.find(v => v.kodeJenisIdentitas.toString() === kodeJenisIdentitas.toString()) || [];
//   if (Array.isArray(data) && data.length) {
//     return returnKey ? data[0][returnKey] : data;
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * ID_JNS
 * UR_JNS
 */
// export const getJenisAju = (ID_JNS = "", returnKey = "UR_JNS") => {
//   const data = JenisAju.TR_JNS_AJU.find(v => v.ID_JNS.toString() === ID_JNS.toString());
//   if (Array.isArray(data) && data.length) {
//     return returnKey ? data[0][returnKey] : data;
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * kodeKemasan
 * namaKemasan
 */
// export const getJenisKemasanBarang = (kodeKemasan = "", returnKey = "namaKemasan") => {
//   const data = JenisKemasanBarang.data.find(v => v.kodeKemasan.toString() === kodeKemasan.toString());
//   if (Array.isArray(data) && data.length) {
//     return returnKey ? data[0][returnKey] : data;
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * kodeSatuanBarang
 * namaSatuanBarang
 */
// export const getJenisSatuanBarang = (kodeSatuanBarang = "", returnKey = "namaSatuanBarang") => {
//   const data = JenisSatuanBarang.data.find(v => v.kodeSatuanBarang.toString() === kodeSatuanBarang.toString());
//   if (Array.isArray(data) && data.length) {
//     return returnKey ? data[0][returnKey] : data;
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * kodeKantor
 * namaKantorPendek
 * namaKantorPanjang
 * kodeEselon
 * alamat1
 * alamat2
 */
export const getKantor = (kodeKantor = "", returnKey = "namaKantorPendek") => {
  const data = Kantor.data.find(v => v.kodeKantor.toString() === kodeKantor.toString());
  if (Array.isArray(data) && data.length) {
    return returnKey ? data[0][returnKey] : data;
  } else {
    return returnKey ? data[returnKey] : data;
  }
};

/* @params
 * kodeCaraAngkut
 * namaCaraAngkut
 */
// export const getCaraAngkut = (kodeCaraAngkut = "", returnKey = "namaCaraAngkut") => {
//   const data = CaraAngkut.data.find(v => v.kodeCaraAngkut.toString() === kodeCaraAngkut.toString());
//   if (Array.isArray(data) && data.length) {
//     return returnKey ? data[0][returnKey] : data;
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * kodeKantor
 * kodePelabuhan
 * namaPelabuhan
 */
// export const getPelabuhan = (kodeKantor = "", kodePelabuhan = "", returnKey = "namaPelabuhan") => {
//   const data = Pelabuhan.data.find(v => (
//     v.kodeKantor.toString() === kodeKantor.toString()
//     && v.kodePelabuhan.toString() === kodePelabuhan.toString()
//   ));
//   if (Array.isArray(data) && data.length) {
//     return returnKey ? data[0][returnKey] : data;
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * kodeNegara
 * namaNegara
 */
// export const getNegara = (kodeNegara = "", returnKey = "namaNegara") => {
//   const data = Negara.data.find(v => v.kodeNegara.toString() === kodeNegara.toString());
//   if (Array.isArray(data) && data.length) {
//     return returnKey ? data[0][returnKey] : data;
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * NPWP
 * NAMA_MARKETPLACE
 */
// export const getMarketplace = (NPWP = "", returnKey = "NAMA_MARKETPLACE") => {
//   const data = Marketplace.TR_MARKETPLACE.find(v => v.NPWP.toString() === NPWP.toString());
//   if (Array.isArray(data) && data.length) {
//     return returnKey ? data[0][returnKey] : data;
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * HS_CODE
 * TARIF_BM
 * TARIF_PPNBM
 * TARIF_PPN
 * TARIF_PPH
 * UR_IND
 * UR_ENG
 * AKHIR_BERLAKU_POS_TARIF
 * AKHIR_BERLAKU_PPH
 * KET_PPNBM
 * JNS_TARIF_BM
 * 
 * @note
 * tidak di mapping returnKey nya karena belum tahu default yang akan dipakai apa keyName nya
 */
// export const getPosTarifHsCodeBarkir = (HS_CODE = "") => {
//   const data = PosTarifHsCodeBarkir.HS_CODE_TARIF_BARKIR.find(v => v.HS_CODE.toString() === HS_CODE.toString());
//   if (Array.isArray(data) && data.length) {
//     return data;
//   } else {
//     return data || {
//       HS_CODE: HS_CODE,
//       TARIF_BM: "",
//       TARIF_PPNBM: "",
//       TARIF_PPN: "",
//       TARIF_PPH: "",
//       UR_IND: "",
//       UR_ENG: "",
//       AKHIR_BERLAKU_POS_TARIF: "",
//       AKHIR_BERLAKU_PPH: "",
//       KET_PPNBM: "",
//       JNS_TARIF_BM: "",
//     };
//   }
// };

/* @params
 * idEntitas
 * dataJenisPemberitahuan:
   * idJenisPemberitahuan
   * namaJenisPemberitahuan
 * dataAsalBarang:
   * idAsalBarang
   * namaAsalBarang
 * dataTujuanBarang:
   * idTujuanBarang
   * namaTujuanBarang
 * dataJenisAju:
   * idJenisAju
   * namaJenisAju

 * @note
 * tidak di mapping returnKey nya karena belum tahu default yang akan dipakai apa keyName nya
 */
// export const getDokumen = (idEntitas = "") => {
//   const data = Dokumen.data.find(v => v.idEntitas === idEntitas);
//   if (Array.isArray(data) && data.length) {
//     return data[0];
//   } else {
//     return data || {
//       idEntitas: idEntitas,
//       dataJenisPemberitahuan: [],
//       dataAsalBarang: [],
//       dataTujuanBarang: [],
//       dataJenisAju: [],
//     };
//   }
// };

/* @params
 * kodeGudang
 * namaGudang
 * kodeKantor
 * jenisGudang
 * idPengguna
 * flagAktif
 * grupGudang
 */
// export const getGudangTPS = (kodeKantor = "", kodeGudang = "", returnKey = "namaGudang") => {
//   const data = GudangTPS.data.find(v => (
//     v.kodeKantor === kodeKantor
//     && v.kodeGudang === kodeGudang
//   ));
//   if (Array.isArray(data) && data.length) {
//     return data[0];
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "" : [];
//   }
// };

/* @params
 * kodeJenisTarifBm
 * namaJenisTarifBm
 */
// export const getJenisTarif = (kodeJenisTarifBm = "", returnKey = "namaJenisTarifBm") => {
//   const data = JenisTarif.data.find(v => v.kodeJenisTarifBm.toString() === kodeJenisTarifBm.toString());
//   if (Array.isArray(data) && data.length) {
//     return data[0];
//   } else if (data) {
//     return returnKey ? data[returnKey] : data;
//   } else {
//     return returnKey ? "-" : [];
//   }
// };

export const getKantorLengkap = (kdKantor) => {
  const dataKantor =  Kantor.data.find(element => element.kodeKantor === kdKantor)
  if(Object.keys(dataKantor).length > 0){
    return dataKantor
  }else{
    return "Data Kantor Not Found"
  }
}

export const getToday = () => {
  const date = new Date()
  const DD = date.getDate()
  const MM = date.getMonth()
  const YYYY = date.getFullYear()
  return `${DD}-${MM}-${YYYY}`
}