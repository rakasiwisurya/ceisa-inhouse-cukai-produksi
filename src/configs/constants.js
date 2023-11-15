export const pathName = "/cukai-produksi";
export const baseUrlCeisaInhouse = window.location.origin;
export const endpoints = {
  detailKantor: "/Referensi/v1/kantor",
  listKantorAll: "/Referensi/v1/kantor/all",
  listKabupatenAll: "/Referensi/v1/kabupaten/all",
  listNegaraAll: "/Referensi/v1/negara/all",

  s3Download: "/produksi/download",

  listJenisBkc: "/referensi/jenis-bkc",
  listJenisHtlRel: "/referensi/jenis-htl-rel",
  listGolongan: "/referensi/golongan",
  listJenisUsaha: "/referensi/jenis-usaha",
  listJenisProduksiByJenisBkc: "/referensi/jenis-produksi",
  listJenisProduksiByNppbkc: "/nppbkc-produksi-bkc/browse-jenis-produksi",
  listSeriPita: "/seripita/get-seripita-jenis-bkc",
  listTarifByJenisProduksiGolonganHje: "/referensi/browse-tarif",
  listWarnaByJenisProduksiGolongan: "/referensi/browse-warna",
  browsePenjabatBc: "/referensi/daftar-penjabat-bc-new",
  browseNppbkc: "/nppbkc/inhouse/browseNppbkc",
  browseTarifWarna: "/referensi/browse-tarif-warna",
  detailNppbkc: "/nppbkc/getByIdNppbkc",

  ck4DaftarMerkMmea: "/ck4/daftar-merk-mmea",
  ck4DaftarMerkHt: "/ck4/daftar-merk-ht",

  referensiTarifWarnaBrowse: "/referensi/browse",
  referensiWarnaRekam: "/referensi/browse-rekam-warna",
  referensiWarnaDetail: "/referensi/browse-detail-warna",
  refensiWarnaDetailDelete: "/referensi/browse-delete-warna",
  referensiWarnaUpdate: "/referensi/browse-update-warna",
  referensiTarifRekam: "/referensi/browse-rekam-tarif",
  referensiTarifDetail: "/referensi/browse-detail-tarif",
  referensiTarifDetailDelete: "/referensi/browse-delete-tarif",
  referensiTarifUpdate: "/referensi/browse-update-tarif",

  ck4Browse: "/ck4/browse",
  ck4EaRekam: "/ck4/rekam-ea",
  ck4EaDetail: "/ck4/detail-ea",
  ck4EaDetailDelete: "/delete-detail-ea",
  ck4EaPerbaikan: "/ck4/perbaikan-ea",
  ck4MmeaRekam: "/ck4/rekam-mmea",
  ck4MmeaDetail: "/ck4/detail-mmea",
  ck4MmeaDetailDelete: "/delete-detail-mmea",
  ck4MmeaPerbaikan: "/ck4/perbaikan-mmea",
  ck4HtRekam: "/ck4/rekam-ht",
  ck4HtDetail: "/ck4/detail-ht",
  ck4HtDetailDelete: "/delete-detail-ht",
  ck4HtPerbaikan: "/ck4/perbaikan-ht",
  ck4EaDetailTasktodo: "/ck4/detail-ea/task-todo",
  ck4MmeaDetailTasktodo: "/ck4/detail-mmea/task-todo",
  ck4HtDetailTasktodo: "/ck4/detail-ht/task-todo",
  ck4Tasktodo: "/ck4/task-todo",
  ck4PerbaikanTasktodo: "/ck4/task-todo-perbaikan",

  ck4BelumLaporBulanan: "/ck4/browse-belum-lapor",
  ck4BelumLaporHarian: "/ck4/browse-belum-lapor-harian",

  ck4PenelitianBrowse: "/ck4/browse-penelitian-ck4",
  ck4PenelitianSubmit: "/ck4/penelitian-ck4",

  splBrowse: "/spl/browse",
  splRekam: "/spl/rekam",
  splDetail: "/spl/browse-by-id",
  splPerbaikan: "/spl/perbaikan",

  jenisPitaBrowse: "/pita/browse-jenis",
  jenisPitaRekam: "/pita/rekam-jenis",
  jenisPitaDetail: "/pita/browse-by-id",
  jenisPitaPerbaikan: "/pita/perbaikan-jenis",
  jenisPitaSubmitTaskTodo: "/pita/task-todo",
};
