import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Component } from "react";
import { capitalize } from "utils/formatter";

Font.registerHyphenationCallback((word) => [word]);

Font.register({
  family: "Bookman-Old-Style",
  src: "/assets/fonts/BOOKOS.TTF",
});

Font.register({
  family: "Bookman-Old-Style-Bold",
  src: "/assets/fonts/BOOKOSB.TTF",
});

Font.register({
  family: "Bookman-Old-Style-Italic",
  src: "/assets/fonts/BOOKOSI.TTF",
});

Font.register({
  family: "Bookman-Old-Style-Bold-Italic",
  src: "/assets/fonts/BOOKOSBI.TTF",
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: "113px 95px 95px",
  },
  viewIntroduction: {
    marginTop: 189,
    marginBottom: 20,
  },
  viewTerm: {
    marginBottom: 20,
  },
  viewMenimbang: {
    marginBottom: 5,
  },
  viewMengingat: {
    marginBottom: 30,
  },
  viewMenetapkan: {
    marginBottom: 10,
  },
  viewStatement: {
    marginBottom: 10,
  },
  viewStatementFirst: {
    marginBottom: 20,
  },
  viewStatementSecond: {
    marginBottom: 20,
  },
  viewStatementThird: {
    marginBottom: 20,
  },
  viewDetails: {
    width: "100%",
  },
  viewNppbkc: {
    marginBottom: 10,
  },
  viewSignContainer: {
    marginLeft: "60%",
    marginTop: 35,
    justifyContent: "center",
  },
  viewSign: {
    marginTop: 10,
  },
  viewRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColTitle: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColSubtitle: {
    width: "97%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColGap: {
    width: "3%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColKey: {
    width: "37%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColColon: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
  },
  tableColValue: {
    width: "55%",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    padding: 5,
  },
  tableCell: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 5,
  },
  textBoldTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginBottom: 3,
    textAlign: "center",
    lineHeight: 1.5,
  },
  textTitle: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 3,
    textAlign: "center",
    lineHeight: 1.5,
  },
  textSideTitle: {
    fontFamily: "Helvetica",
    fontSize: 12,
    width: 90,
    lineHeight: 1.5,
    height: "100%",
  },
  textBoldSideTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    width: 90,
    lineHeight: 1.5,
    height: "100%",
  },
  textSideContent: {
    fontFamily: "Helvetica",
    fontSize: 12,
    width: "100%",
    textAlign: "justify",
    lineHeight: 1.5,
    height: "100%",
  },
  textSideContentBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    width: "100%",
    lineHeight: 1.5,
    height: "100%",
  },
  textKey: {
    fontFamily: "Helvetica",
    fontSize: 12,
    width: 400,
    lineHeight: 1.5,
    height: "100%",
  },
  textValue: {
    fontFamily: "Helvetica",
    fontSize: 12,
    width: "100%",
    lineHeight: 1.5,
    height: "100%",
  },
  text: {
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    lineHeight: 1.5,
  },
  gap: {
    marginVertical: 10,
  },
  colon: {
    fontSize: 12,
    width: 25,
    height: "100%",
    textAlign: "center",
  },
  list: {
    fontSize: 12,
    width: 20,
    height: "100%",
  },
  signGap: {
    height: 75,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
  },
  viewQrCode: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeImage: {
    width: 75,
    height: 75,
  },
  textQrCode: {
    fontSize: 9,
    borderWidth: 1,
    borderColor: "#808080",
    padding: 10,
    color: "#808080",
  },
});

export default class PdfPenetapanTarifTTE extends Component {
  render() {
    const {
      nomor_permohonan,
      nomor_kep,
      tanggal_kep,
      id_jenis_bkc,
      jenis_bkc,
      nama_perusahaan,
      nppbkc,
      nama_pengusaha,
      npwp,
      alamat_pengusaha,
      nama_kota,
      nomor_pkp,
      alamat_perusahaan,
      nama_merk,
      jenis_produksi,
      golongan,
      isi_per_kemasan,
      tarif_spesifik,
      satuan,
      hje_per_kemasan,
      hje_per_satuan,
      bahan_kemasan,
      tujuan_pemasaran,
      sisi_depan,
      sisi_belakang,
      sisi_kiri,
      sisi_kanan,
      sisi_atas,
      sisi_bawah,
      asal_produk,
      negara_asal,
      tarif_per_kemasan,
      awal_berlaku,
      nama_kantor,
      nama_kantor_wilayah,
      waktu_rekam,
      tte_jabatan,
      tte_nama,
      qr_data_url,
    } = this.props;

    return (
      <Document title={`penetapan_tarif_${nama_perusahaan}`}>
        <Page size="FOLIO" style={styles.page}>
          <View style={styles.viewIntroduction}>
            <View>
              <Text style={styles.textTitle}>KEMENTRIAN KEUANGAN REPUBLIK INDONESIA</Text>
              <Text style={styles.textBoldTitle}>DIREKTORAT JENDERAL BEA DAN CUKAI</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>KEPUTUSAN KEPALA {nama_kantor?.toUpperCase()}</Text>
              <Text style={styles.textTitle}>NOMOR {nomor_permohonan}</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>TENTANG</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>
                PENETAPAN TARIF CUKAI {jenis_bkc?.toUpperCase()} UNTUK MEREK BARU
              </Text>
              <Text style={styles.textTitle}>ATAS NAMA {nama_perusahaan?.toUpperCase()}</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>KEPALA {nama_kantor?.toUpperCase()} </Text>
            </View>
          </View>

          <View style={styles.viewTerm}>
            <View style={styles.viewMenimbang}>
              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle}>Menimbang</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.list}>a.</Text>
                <Text style={styles.textSideContent}>
                  bahwa {nama_perusahaan} telah mengajukan Surat Permohonan Nomor {nomor_permohonan}{" "}
                  tanggal {tanggal_kep} untuk memperoleh penetapan tarif cukai{" "}
                  {jenis_bkc?.toLowerCase()} untuk merek baru;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>b.</Text>
                <Text style={styles.textSideContent}>
                  bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a dan berdasarkan
                  ketentuan dalam Peraturan Direktur Jenderal Bea dan Cukai Nomor 16/BC/2022, perlu
                  menetapkan Keputusan Kepala {nama_kantor} tentang Penetapan Tarif Cukai Hasil
                  Tembakau Untuk Merek Baru Atas Nama {nama_perusahaan} NPPBKC {nppbkc} Di{" "}
                  {capitalize(nama_kota)};
                </Text>
              </View>
            </View>

            <View style={styles.viewMengingat}>
              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle}>Mengingat</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.list}>1.</Text>
                <Text style={styles.textSideContent}>
                  Undang-Undang Nomor 11 Tahun 1995 tentang Cukai (Lembaran Negara Republik
                  Indonesia Tahun 1995 Nomor 76, Tambahan Lembaran Negara Republik Indonesia Nomor
                  3613) sebagaimana telah beberapa kali terakhir diubah dengan Undang-Undang Nomor 7
                  Tahun 2021 tentang Harmonisasi Peraturan Perpajakan (Lembaran Negara Republik
                  Indonesia Tahun 2021 Nomor 246, Tambahan Lembaran Negara Republik Indonesia Nomor
                  6736);
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>2.</Text>
                <Text style={styles.textSideContent}>
                  Peraturan Menteri Keuangan Nomor {nomor_kep} tentang Tarif Cukai{" "}
                  {capitalize(jenis_bkc)} Berupa Sigaret, Cerutu, Rokok Daun atau Klobot, dan
                  Tembakau Iris;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>3.</Text>
                <Text style={styles.textSideContent}>
                  Peraturan Direktur Jenderal Bea dan Cukai Nomor 16/BC/2022 tentang Tata Cara
                  Penetapan Tarif Cukai {capitalize(jenis_bkc)};
                </Text>
              </View>
            </View>

            <View style={styles.viewMenetapkan}>
              <Text style={styles.textTitle}>MEMUTUSKAN :</Text>
              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle}>Menetapkan</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.textSideContent}>
                  KEPUTUSAN KEPALA {nama_kantor?.toUpperCase()} TENTANG PENETAPAN TARIF CUKAI HASIL
                  TEMBAKAU UNTUK MEREK BARU ATAS NAMA {nama_perusahaan?.toUpperCase()} DI{" "}
                  {nama_kota?.toUpperCase()}.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.viewStatement}>
            <View style={styles.viewStatementFirst}>
              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle}>PERTAMA</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.textSideContent}>
                  Memberikan Penetapan Tarif Cukai {capitalize(jenis_bkc)} kepada:
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <View style={styles.viewDetails}>
                  <View style={styles.viewNppbkc}>
                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Nama Pengusaha Pabrik/Importir*)</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>{nama_pengusaha ? nama_pengusaha : "-"}</Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Alamat Pengusaha Pabrik/Importir*)</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>
                        {alamat_pengusaha ? alamat_pengusaha : "-"}
                      </Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Nama Pabrik/Importir*)</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>
                        {nama_perusahaan ? nama_perusahaan : "-"}
                      </Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Nomor NPPBKC</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>{nppbkc ? nppbkc : "-"}</Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Nomor NPWP</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>{npwp ? npwp : "-"}</Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Nomor PKP</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>{nomor_pkp ? nomor_pkp : "-"}</Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Alamat Pabrik/Importir*)</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>
                        {alamat_perusahaan ? alamat_perusahaan : "-"}
                      </Text>
                    </View>

                    <Text style={styles.text}>dengan rincian sebagai berikut:</Text>
                  </View>

                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableColTitle}>
                        <Text style={styles.tableCellBold}>1. Tarif Cukai {tarif_spesifik}</Text>
                      </View>
                    </View>

                    {id_jenis_bkc === 2 ? (
                      <View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Merek</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{nama_merk}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Asal Produk</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{asal_produk}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Negara Asal</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{negara_asal}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Isi Per Kemasan</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{isi_per_kemasan}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Satuan</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{satuan}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Golongan</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{golongan}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Tarif Cukai Per Liter</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{tarif_spesifik}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Tarif Cukai Per Kemasan</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{tarif_per_kemasan}</Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Merek</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{nama_merk}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Jenis HT</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{jenis_produksi}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Golongan Pengusaha Pabrik</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{golongan}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Isi Kemasan</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>
                              {isi_per_kemasan} {satuan}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>HJE (per kemasan)</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>
                              {hje_per_kemasan
                                ? new Intl.NumberFormat().format(hje_per_kemasan)
                                : hje_per_kemasan}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>HJE (per batang/gram)</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>
                              {hje_per_kemasan
                                ? new Intl.NumberFormat().format(hje_per_satuan)
                                : hje_per_kemasan}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Bahan Kemasan</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{bahan_kemasan}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>Tujuan Pemasaran</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{tujuan_pemasaran}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColSubtitle}>
                            <Text style={styles.tableCellBold}>Tampilan Kemasan :</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>• Sisi Depan</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{sisi_depan}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>• Sisi belakang</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{sisi_belakang}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>• Sisi kiri</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{sisi_kiri}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>• Sisi kanan</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{sisi_kanan}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>• Sisi atas</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{sisi_atas}</Text>
                          </View>
                        </View>

                        <View style={styles.tableRow}>
                          <View style={styles.tableColGap} />
                          <View style={styles.tableColKey}>
                            <Text style={styles.tableCell}>• Sisi bawah</Text>
                          </View>
                          <View style={styles.tableColColon}>
                            <Text style={styles.tableCell}>:</Text>
                          </View>
                          <View style={styles.tableColValue}>
                            <Text style={styles.tableCell}>{sisi_bawah}</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.viewStatementSecond}>
              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle}>KEDUA</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.textSideContent}>
                  Keputusan Kepala {nama_kantor} ini dapat dicabut dalam hal:
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>a.</Text>
                <Text style={styles.textSideContent}>
                  Pengusaha Pabrik {jenis_bkc?.toLowerCase()} atau Importir mengajukan permohonan
                  pencabutan penetapan tarif cukai {jenis_bkc?.toLowerCase()};
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>b.</Text>
                <Text style={styles.textSideContent}>
                  putusan pengadilan yang mempunyai kekuatan hukum tetap;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>c.</Text>
                <Text style={styles.textSideContent}>
                  desain kemasan yang bersangkutan menyerupai desain kemasan milik Pengusaha Pabrik
                  {jenis_bkc?.toLowerCase()} atau Importir lainnya sehingga tidak mudah untuk
                  membedakannya, yang telah terlebih dahulu dimiliki oleh Pengusaha Pabrik hasil
                  tembakau atau Importir lainnya dan tercatat pada administrasi Direktorat Jenderal
                  Bea dan Cukai;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>d.</Text>
                <Text style={styles.textSideContent}>
                  merek memiliki tulisan atau pelafalan yang sama dengan merek yang telah terlebih
                  dahulu dimiliki oleh Pengusaha Pabrik {jenis_bkc?.toLowerCase()} atau Importir
                  lainnya dan tercatat pada administrasi Direktorat Jenderal Bea dan Cukai;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>e.</Text>
                <Text style={styles.textSideContent}>
                  hasil pengawasan di lapangan ditemukan kemasan {jenis_bkc?.toLowerCase()} yang
                  bersangkutan tidak memenuhi persyaratan kemasan barang kena cukai sebagaimana
                  ditetapkan dalam peraturan Menteri yang mengatur mengenai perdagangan barang kena
                  cukai.
                </Text>
              </View>
            </View>

            <View style={styles.viewStatementThird}>
              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle}>KETIGA</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.textSideContent}>
                  Keputusan Kepala {nama_kantor} ini mulai berlaku pada {awal_berlaku}, dengan
                  ketentuan apabila dikemudian hari terdapat kekeliruan akan diadakan perbaikan
                  sebagaimana mestinya.
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.textSideContent}>
                  Salinan Keputusan {nama_kantor} ini disampaikan kepada:
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>1.</Text>
                <Text style={styles.textSideContent}>Direktur Teknis dan Fasilitas Cukai</Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>2.</Text>
                <Text style={styles.textSideContent}>
                  {nama_kantor_wilayah ? `Kepala ${nama_kantor_wilayah}` : "-"}
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>3.</Text>
                <Text style={styles.textSideContent}>
                  {nama_perusahaan ? `Pimpinan ${nama_perusahaan}` : "-"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.viewSignContainer}>
            <Text style={styles.text}>Ditetapkan di {capitalize(nama_kota)}</Text>
            <Text style={styles.text}>pada tanggal {waktu_rekam}</Text>

            <View style={styles.viewSign}>
              <Text style={styles.text}>
                {tte_jabatan ? tte_jabatan : "..................................."}
              </Text>
              <View style={styles.signGap}>
                {qr_data_url ? (
                  <Image allowDangerousPaths src={qr_data_url} style={styles.qrCodeImage} />
                ) : (
                  <View style={styles.viewQrCode}>
                    <Text style={styles.textQrCode}>QR CODE</Text>
                  </View>
                )}
              </View>
              <Text style={styles.text}>
                {tte_nama ? tte_nama : "..................................."}
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
