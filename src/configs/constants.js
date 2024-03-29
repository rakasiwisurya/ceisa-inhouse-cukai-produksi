export const pathName = "/cukai-produksi";
export const baseUrlCeisaInhouse = window.location.origin;
export const endpoints = {
  detailKantor: "/Referensi/v1/kantor",
  listKantorAll: "/Referensi/v1/kantor/all",
  listKabupatenAll: "/Referensi/v1/kabupaten/all",
  listNegaraAll: "/Referensi/v1/negara/all",
  browsePerbenStck: "/perben/piutang/get-piutang-cukai",

  uploadFileTte: "/nadine/uploadFile",
  uploadFileTteSigned: "/nadine/uploadSignedFile",
  detailPegawaiKemenkeu: "/nadine/nik-hris",

  s3UnencryptDownload: "/downloadFileDS",
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
  brck2DaftarMerkMmea: "/brck/daftar-merk-brck2",
  backDaftarMerkMmea: "/back/daftar-merk-mmea",

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
  ck4BrowseDetail: "/ck4/browse-detail",
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
  ck4Pembatalan: "/ck4/pembatalan-ck4",
  ck4Tasktodo: "/ck4/task-todo",
  ck4PerbaikanTasktodo: "/ck4/task-todo-perbaikan",
  ck4PembatalanTasktodo: "/ck4/task-todo-pembatalan-ck4",

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
  jenisPitaPembatalan: "/pita/pembatalan-jenis",
  jenisPitaDetailTasktodo: "/pita/detail-task-todo",
  jenisPitaRekamTasktodo: "/pita/task-todo",
  jenisPitaPembatalanTasktodo: "/pita/pembatalan-task-todo",

  permohonanTarifBrowse: "/pita-cukai/browse-penetapan-tarif",
  permohonanTarifRekam: "/pita-cukai/form-perekaman-tarif",
  permohonanTarifDetail: "/pita-cukai/browse-tarif-cukai-detail",
  permohonanTarifPerbaikan: "/pita-cukai/form-update-tarif",
  permohonanTarifPembatalan: "/pita-cukai/pembatalan-tarif",
  permohonanTarifDetailTasktodo: "/pita-cukai/detail-task-todo",
  permohonanTarifRekamTasktodo: "/pita-cukai/penetapan-pengajuan-tarif",
  permohonanTarifPerbaikanTasktodo: "/tarif-merk/task-todo-perbaikan-tarif",
  permohonanTarifPembatalanTasktodo: "/pita-cukai/pembatalan-tarif-tasktodo",

  pencabutanTarifDetail: "/pita-cukai/browse-detail-pencabutan",
  pencabutanTarif: "/pita-cukai/pencabutan-tarif",

  penetapanKembaliDetail: "/pita-cukai/detail-penetapan-kembali-tarif",
  penetapanKembali: "/pita-cukai/penetapan-kembali-tarif",

  brck1Browse: "/brck/browse-brck1",
  brck1Rekam: "/brck/rekam-brck1",
  brck1Detail: "/brck/detail-brck1",
  brck1Perbaikan: "/brck/perbaikan-brck1",
  brck1ListCk4: "/ck4/browse-brck1",
  brck1ListCk5: "/ck5/browse-brck1",
  brck1SaldoAwal: "/brck/saldo-awal-brck1",

  brck2Browse: "/brck2/browse",
  brck2Rekam: "/brck/rekam-brck2",
  brck2Detail: "/brck/detail-brck2",
  brck2Perbaikan: "/brck/perbaikan-brck2",
  brck2ListCk4: "/ck4/browse-brck2",
  brck2ListCk5: "/ck5/browse-brck2",
  brck2SaldoAwal: "/brck/saldo-awal-brck2",

  backEa67Browse: "/back-ea-6-7/browse",
  backEa67Rekam: "/back-ea-6-7/rekam",
  backEa67Detail: "/back-ea-6-7/detail",
  backEa67Perbaikan: "/back-ea-6-7/update",

  backEa89Browse: "/back-ea-8-9/browse",
  backEa89Rekam: "/back-ea-8-9/rekam",
  backEa89Detail: "/back-ea-8-9/detail",
  backEa89Perbaikan: "/back-ea-8-9/update",

  backMmeaBrowse: "/back-mmea/browse",
  backMmeaRekam: "/back-mmea/rekam",
  backMmeaDetail: "/back-mmea/detail",
  backMmeaPerbaikan: "/back-mmea/update",
};
