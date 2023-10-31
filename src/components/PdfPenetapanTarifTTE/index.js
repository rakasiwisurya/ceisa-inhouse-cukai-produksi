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
      nomorPermohonan,
      nomorKep,
      tanggalKep,
      idJenisBkc,
      jenisBkc,
      namaPerusahaan,
      nppbkc,
      namaPengusaha,
      npwp,
      alamatPengusaha,
      namaKota,
      nomorPkp,
      alamatPerusahaan,
      namaMerk,
      jenisProduksi,
      golongan,
      isiPerKemasan,
      tarifSpesifik,
      satuan,
      hjePerKemasan,
      hjePerSatuan,
      bahanKemasan,
      tujuanPemasaran,
      sisiDepan,
      sisiBelakang,
      sisiKiri,
      sisiKanan,
      sisiAtas,
      sisiBawah,
      asalProduk,
      negaraAsal,
      tarifPerKemasan,
      awalBerlaku,
      namaKantor,
      namaKantorWilayah,
      waktuRekam,
      tteJabatan,
      tteNama,
      qrDataUrl,
    } = this.props;

    return (
      <Document title={`penetapan_tarif_${namaPerusahaan}`}>
        <Page size="FOLIO" style={styles.page}>
          <View style={styles.viewIntroduction}>
            <View>
              <Text style={styles.textTitle}>KEMENTRIAN KEUANGAN REPUBLIK INDONESIA</Text>
              <Text style={styles.textBoldTitle}>DIREKTORAT JENDERAL BEA DAN CUKAI</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>KEPUTUSAN KEPALA {namaKantor?.toUpperCase()}</Text>
              <Text style={styles.textTitle}>NOMOR {nomorPermohonan}</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>TENTANG</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>
                PENETAPAN TARIF CUKAI {jenisBkc?.toUpperCase()} UNTUK MEREK BARU
              </Text>
              <Text style={styles.textTitle}>ATAS NAMA {namaPerusahaan?.toUpperCase()}</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>KEPALA {namaKantor?.toUpperCase()} </Text>
            </View>
          </View>

          <View style={styles.viewTerm}>
            <View style={styles.viewMenimbang}>
              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle}>Menimbang</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.list}>a.</Text>
                <Text style={styles.textSideContent}>
                  bahwa {namaPerusahaan} telah mengajukan Surat Permohonan Nomor {nomorPermohonan}{" "}
                  tanggal {tanggalKep} untuk memperoleh penetapan tarif cukai{" "}
                  {jenisBkc?.toLowerCase()} untuk merek baru;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>b.</Text>
                <Text style={styles.textSideContent}>
                  bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a dan berdasarkan
                  ketentuan dalam Peraturan Direktur Jenderal Bea dan Cukai Nomor 16/BC/2022, perlu
                  menetapkan Keputusan Kepala {namaKantor} tentang Penetapan Tarif Cukai Hasil
                  Tembakau Untuk Merek Baru Atas Nama {namaPerusahaan} NPPBKC {nppbkc} Di{" "}
                  {capitalize(namaKota)};
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
                  Peraturan Menteri Keuangan Nomor {nomorKep} tentang Tarif Cukai{" "}
                  {capitalize(jenisBkc)} Berupa Sigaret, Cerutu, Rokok Daun atau Klobot, dan
                  Tembakau Iris;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>3.</Text>
                <Text style={styles.textSideContent}>
                  Peraturan Direktur Jenderal Bea dan Cukai Nomor 16/BC/2022 tentang Tata Cara
                  Penetapan Tarif Cukai {capitalize(jenisBkc)};
                </Text>
              </View>
            </View>

            <View style={styles.viewMenetapkan}>
              <Text style={styles.textTitle}>MEMUTUSKAN :</Text>
              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle}>Menetapkan</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.textSideContent}>
                  KEPUTUSAN KEPALA {namaKantor?.toUpperCase()} TENTANG PENETAPAN TARIF CUKAI HASIL
                  TEMBAKAU UNTUK MEREK BARU ATAS NAMA {namaPerusahaan?.toUpperCase()} DI{" "}
                  {namaKota?.toUpperCase()}.
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
                  Memberikan Penetapan Tarif Cukai {capitalize(jenisBkc)} kepada:
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
                      <Text style={styles.textValue}>{namaPengusaha ? namaPengusaha : "-"}</Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Alamat Pengusaha Pabrik/Importir*)</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>
                        {alamatPengusaha ? alamatPengusaha : "-"}
                      </Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Nama Pabrik/Importir*)</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>{namaPerusahaan ? namaPerusahaan : "-"}</Text>
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
                      <Text style={styles.textValue}>{nomorPkp ? nomorPkp : "-"}</Text>
                    </View>

                    <View style={styles.viewRow}>
                      <Text style={styles.textKey}>Alamat Pabrik/Importir*)</Text>
                      <Text style={styles.colon}>:</Text>
                      <Text style={styles.textValue}>
                        {alamatPerusahaan ? alamatPerusahaan : "-"}
                      </Text>
                    </View>

                    <Text style={styles.text}>dengan rincian sebagai berikut:</Text>
                  </View>

                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableColTitle}>
                        <Text style={styles.tableCellBold}>1. Tarif Cukai {tarifSpesifik}</Text>
                      </View>
                    </View>

                    {idJenisBkc === 2 ? (
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
                            <Text style={styles.tableCell}>{namaMerk}</Text>
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
                            <Text style={styles.tableCell}>{asalProduk}</Text>
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
                            <Text style={styles.tableCell}>{negaraAsal}</Text>
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
                            <Text style={styles.tableCell}>{isiPerKemasan}</Text>
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
                            <Text style={styles.tableCell}>{tarifSpesifik}</Text>
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
                            <Text style={styles.tableCell}>{tarifPerKemasan}</Text>
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
                            <Text style={styles.tableCell}>{namaMerk}</Text>
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
                            <Text style={styles.tableCell}>{jenisProduksi}</Text>
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
                              {isiPerKemasan} {satuan}
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
                              {hjePerKemasan
                                ? new Intl.NumberFormat().format(hjePerKemasan)
                                : hjePerKemasan}
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
                              {hjePerKemasan
                                ? new Intl.NumberFormat().format(hjePerSatuan)
                                : hjePerKemasan}
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
                            <Text style={styles.tableCell}>{bahanKemasan}</Text>
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
                            <Text style={styles.tableCell}>{tujuanPemasaran}</Text>
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
                            <Text style={styles.tableCell}>{sisiDepan}</Text>
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
                            <Text style={styles.tableCell}>{sisiBelakang}</Text>
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
                            <Text style={styles.tableCell}>{sisiKiri}</Text>
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
                            <Text style={styles.tableCell}>{sisiKanan}</Text>
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
                            <Text style={styles.tableCell}>{sisiAtas}</Text>
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
                            <Text style={styles.tableCell}>{sisiBawah}</Text>
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
                  Keputusan Kepala {namaKantor} ini dapat dicabut dalam hal:
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>a.</Text>
                <Text style={styles.textSideContent}>
                  Pengusaha Pabrik {jenisBkc?.toLowerCase()} atau Importir mengajukan permohonan
                  pencabutan penetapan tarif cukai {jenisBkc?.toLowerCase()};
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
                  {jenisBkc?.toLowerCase()} atau Importir lainnya sehingga tidak mudah untuk
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
                  dahulu dimiliki oleh Pengusaha Pabrik {jenisBkc?.toLowerCase()} atau Importir
                  lainnya dan tercatat pada administrasi Direktorat Jenderal Bea dan Cukai;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>e.</Text>
                <Text style={styles.textSideContent}>
                  hasil pengawasan di lapangan ditemukan kemasan {jenisBkc?.toLowerCase()} yang
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
                  Keputusan Kepala {namaKantor} ini mulai berlaku pada {awalBerlaku}, dengan
                  ketentuan apabila dikemudian hari terdapat kekeliruan akan diadakan perbaikan
                  sebagaimana mestinya.
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textBoldSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.textSideContent}>
                  Salinan Keputusan {namaKantor} ini disampaikan kepada:
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
                  {namaKantorWilayah ? `Kepala ${namaKantorWilayah}` : "-"}
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>3.</Text>
                <Text style={styles.textSideContent}>
                  {namaPerusahaan ? `Pimpinan ${namaPerusahaan}` : "-"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.viewSignContainer}>
            <Text style={styles.text}>Ditetapkan di {capitalize(namaKota)}</Text>
            <Text style={styles.text}>pada tanggal {waktuRekam}</Text>

            <View style={styles.viewSign}>
              <Text style={styles.text}>
                {tteJabatan ? tteJabatan : "..................................."}
              </Text>
              <View style={styles.signGap}>
                {qrDataUrl ? (
                  <Image allowDangerousPaths src={qrDataUrl} style={styles.qrCodeImage} />
                ) : (
                  <View style={styles.viewQrCode}>
                    <Text style={styles.textQrCode}>QR CODE</Text>
                  </View>
                )}
              </View>
              <Text style={styles.text}>
                {tteNama ? tteNama : "..................................."}
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
