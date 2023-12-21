import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import React, { Component } from "react";

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 50,
  },
  viewCk4TypeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
    marginTop: -35,
  },
  viewCk4Type: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
  },
  viewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  viewTitle: {
    fontSize: 14,
    marginBottom: 15,
  },
  viewNppbkc: {
    marginTop: 10,
  },
  viewStatementHeader: {
    marginBottom: 15,
  },
  viewStatementFooter: {
    marginTop: 15,
  },
  viewSignContainer: ({ marginLeft = "auto" }) => ({
    marginLeft,
    justifyContent: "center",
  }),
  viewSign: ({ textAlign = "left", marginTop = 10 }) => ({
    textAlign,
    marginTop,
  }),
  viewDescription: {
    marginTop: 10,
  },
  viewCatatan: {
    marginTop: 25,
  },
  viewCatatanDescription: {
    marginBottom: 20,
  },
  viewCatatanNotice: {
    borderStyle: "dashed",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  tableColSpan: ({
    width = "auto",
    borderRightWidth = 0,
    borderBottomWidth = 0,
    textAlign = "center",
    ...rest
  }) => ({
    width,
    borderRightWidth,
    borderBottomWidth,
    textAlign,
    borderStyle: "solid",
    justifyContent: "center",
    ...rest,
  }),
  tableCol: ({ width = "auto", textAlign = "center", ...rest }) => ({
    width,
    textAlign,
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    justifyContent: "center",
    ...rest,
  }),
  tableCell: ({ fontWeight = "normal", textAlign = "center", fontSize = 12, ...rest }) => ({
    fontFamily:
      fontWeight === "bold"
        ? "Helvetica-Bold"
        : fontWeight === "italic"
        ? "Helvetica-Oblique"
        : "Helvetica",
    textAlign,
    fontSize,
    padding: 5,
    justifyContent: "center",
    ...rest,
  }),

  signGap: {
    height: 35,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
  },
  line: {
    borderBottomWidth: 2,
    marginTop: 10,
  },
  textCk4Type: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    textAlign: "center",
  },
  textHeaderKey: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
    width: 110,
  },
  textHeaderValue: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    fontSize: 13,
    margin: 5,
  },
  textNppbkcKey: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
    width: 60,
  },
  textNppbkcValue: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
    width: 410,
  },
  textSign: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
  },
  textDescriptionTitle: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 12,
    marginBottom: 15,
  },
  textCatatan: {
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  textCatatanNotice: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    textAlign: "center",
  },
  text: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "justify",
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "justify",
  },
  colon: {
    marginHorizontal: 8,
    fontSize: 12,
  },
});

export default class PdfCetakanCK4 extends Component {
  render() {
    const {
      jenisBkc,
      nomorPemberitahuan,
      tanggalPemberitahuan,
      nppbkc,
      namaPerusahaan,
      alamatPerusahaan,
      jenisLaporan,
      tanggalProduksiAwal,
      tanggalProduksiAkhir,
      tanggalJamProduksiAwal,
      tanggalJamProduksiAkhir,
      jumlahKemasan,
      jumlahProduksiLiter,
      jumlahProduksiBtg,
      jumlahProduksiGram,
      jumlahKemasanDilekatiPita,
      namaPengusaha,
      kota,
      details,
    } = this.props;

    return (
      <Document title={`Tanda Terima ${namaPerusahaan || ""}`}>
        <Page size="A4" style={styles.page}>
          <View style={styles.viewCk4TypeContainer}>
            <View style={styles.viewCk4Type}>
              <Text style={styles.textCk4Type}>
                {jenisBkc === "EA"
                  ? "CKA"
                  : jenisBkc === "MMEA"
                  ? "CKB"
                  : jenisBkc === "HT"
                  ? "CKC"
                  : null}
              </Text>
            </View>
          </View>

          <View style={styles.viewHeader} fixed>
            <View>
              <View style={styles.viewRow}>
                <Text
                  style={styles.textHeaderKey}
                  render={({ pageNumber }) => pageNumber === 1 && `Nomor`}
                />
                <Text style={styles.colon} render={({ pageNumber }) => pageNumber === 1 && `:`} />
                <Text
                  style={styles.textHeaderValue}
                  render={({ pageNumber }) => pageNumber === 1 && nomorPemberitahuan}
                />
              </View>
              <View style={styles.viewRow}>
                <Text
                  style={styles.textHeaderKey}
                  render={({ pageNumber }) => pageNumber === 1 && `Tanggal`}
                />
                <Text style={styles.colon} render={({ pageNumber }) => pageNumber === 1 && `:`} />
                <Text
                  style={styles.textHeaderValue}
                  render={({ pageNumber }) => pageNumber === 1 && tanggalPemberitahuan}
                />
              </View>
            </View>
            <Text
              style={styles.textHeaderValue}
              render={({ pageNumber, totalPages }) => `Halaman ${pageNumber} dari ${totalPages}`}
            />
          </View>

          <View style={styles.viewTitle}>
            <Text style={styles.title}>
              PEMBERITAHUAN{" "}
              {jenisBkc === "EA"
                ? "ETIL ALKOHOL"
                : jenisBkc === "MMEA"
                ? "MINUMAN YANG MENGANDUNG ETIL ALKOHOL"
                : jenisBkc === "HT"
                ? "HASIL TEMBAKAU"
                : null}{" "}
              YANG SELESAI DIBUAT
            </Text>
          </View>

          <View style={styles.viewNppbkc}>
            <View style={styles.viewStatementHeader}>
              <Text style={styles.text}>
                Dengan ini diberitahukan bahwa mulai{" "}
                {jenisLaporan?.toUpperCase() === "HARIAN"
                  ? tanggalJamProduksiAwal
                  : tanggalProduksiAwal}{" "}
                sampai{" "}
                {jenisLaporan?.toUpperCase() === "HARIAN"
                  ? tanggalJamProduksiAkhir
                  : tanggalProduksiAkhir}
                , pabrik kami :
              </Text>
            </View>

            <View style={styles.viewRow}>
              <Text style={styles.textNppbkcKey}>Nama</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.textNppbkcValue}>{namaPerusahaan}</Text>
            </View>
            <View style={styles.viewRow}>
              <Text style={styles.textNppbkcKey}>Alamat</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.textNppbkcValue}>{alamatPerusahaan}</Text>
            </View>
            <View style={styles.viewRow}>
              <Text style={styles.textNppbkcKey}>NPPBKC</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.textNppbkcValue}>{nppbkc}</Text>
            </View>

            <View style={styles.viewStatementFooter}>
              {jenisBkc === "EA" ? (
                <Text style={styles.text}>
                  telah memproduksi Etil Alkohol sebanyak :{" "}
                  {jumlahProduksiLiter !== null &&
                    new Intl.NumberFormat().format(jumlahProduksiLiter)}{" "}
                  liter, yang perinciannya seperti tersebut di balik pemberitahuan ini.
                </Text>
              ) : jenisBkc === "MMEA" ? (
                <Text style={styles.text}>
                  telah memproduksi Minuman yang Mengandung Etil Alkohol yang sudah dikemas untuk
                  penjualan eceran sebanyak :{" "}
                  {jumlahKemasan !== null && new Intl.NumberFormat().format(jumlahKemasan)} kemasan,
                  yang keseluruhannya berjumlah{" "}
                  {jumlahProduksiLiter !== null &&
                    new Intl.NumberFormat().format(jumlahProduksiLiter)}{" "}
                  liter, yang perinciannya seperti tersebut di balik pemberitahuan ini.
                </Text>
              ) : jenisBkc === "HT" ? (
                <Text style={styles.text}>
                  telah memproduksi hasil tembakau yang sudah dikemas untuk penjualan eceran
                  sebanyak :
                  {jumlahKemasan !== null && new Intl.NumberFormat().format(jumlahKemasan)} kemasan
                  yang keseluruhannya berjumlah{" "}
                  {jumlahProduksiBtg !== null && new Intl.NumberFormat().format(jumlahProduksiBtg)}{" "}
                  batang dan/atau,{" "}
                  {jumlahProduksiGram !== null &&
                    new Intl.NumberFormat().format(jumlahProduksiGram)}{" "}
                  gram dan/atau,{" "}
                  {jumlahProduksiLiter !== null &&
                    new Intl.NumberFormat().format(jumlahProduksiLiter)}{" "}
                  Mililiter, yang perinciannya seperti tersebut di balik pemberitahuan ini.
                </Text>
              ) : null}
            </View>

            <View style={styles.viewStatementFooter}>
              <Text style={styles.text}>Demikian telah diberitahukan dengan sebenarnya.</Text>
            </View>

            <View style={styles.viewSignContainer({ marginLeft: "70%" })}>
              <View style={styles.viewSign({})}>
                <Text style={styles.textSign}>Pengusaha</Text>
                <View style={styles.signGap} />
                <Text style={styles.textSign}>{namaPengusaha}</Text>
              </View>
            </View>

            <View style={styles.line} />

            <View style={styles.viewDescription}>
              <Text style={styles.textDescriptionTitle}>Ruang untuk Bea dan Cukai</Text>
              {jenisBkc === "EA" ? (
                <View>
                  <Text style={styles.text}>
                    Pemberitahuan Etil Alkohol yang selesai dibuat ini telah diterima pada tanggal{" "}
                    {tanggalPemberitahuan}
                  </Text>
                  <Text style={styles.text}>
                    Jumlah pemberitahuan ini telah dibukukan ke dalam Buku Rekening Barang Kena
                    Cukai Etil Alkohol yang bersangkutan pada tanggal {tanggalPemberitahuan}
                  </Text>
                </View>
              ) : jenisBkc === "MMEA" ? (
                <View>
                  <Text style={styles.text}>
                    Pemberitahuan Minuman yang Mengandung Etil Alkohol yang selesai dibuat ini telah
                    diterima {tanggalPemberitahuan}
                  </Text>
                  <Text style={styles.text}>
                    Jumlah pemberitahuan ini telah dibukukan ke dalam Buku Rekening Barang Kena
                    Cukai Minuman yang Mengandung Etil Alkohol yang bersangkutan pada tanggal{" "}
                    {tanggalPemberitahuan}
                  </Text>
                </View>
              ) : jenisBkc === "HT" ? (
                <View>
                  <Text style={styles.text}>
                    Pemberitahuan Hasil Tembakau yang selesai dibuat ini telah diterima pada tanggal{" "}
                    {tanggalPemberitahuan}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.viewCatatan}>
              <View style={styles.viewCatatanDescription}>
                <Text style={styles.textCatatan}>Catatan:</Text>
                <Text style={styles.textCatatan}>
                  1. Lembar pertama untuk Pejabat Bea dan Cukai.
                </Text>
                <Text style={styles.textCatatan}>2. Lembar kedua sebagai arsip Pengusaha.</Text>
              </View>

              <View style={styles.viewCatatanNotice}>
                <Text style={styles.textCatatanNotice}>
                  FORMULIR INI DICETAK SECARA OTOMATIS OLEH SISTEM KOMPUTER DAN TIDAK MEMERLUKAN
                  NAMA, TANDA TANGAN PEJABAT DAN CAP DINAS
                </Text>
              </View>
            </View>
          </View>

          <View break />

          <View style={styles.viewTitle}>
            <Text style={styles.title}>RINCIAN PEMBERITAHUAN PRODUKSI</Text>
            <Text style={styles.title}>
              {jenisBkc === "EA"
                ? "ETIL ALKOHOL"
                : jenisBkc === "MMEA"
                ? "MINUMAN YANG MENGANDUNG ETIL ALKOHOL"
                : jenisBkc === "HT"
                ? "HASIL TEMBAKAU"
                : null}
            </Text>
          </View>

          {jenisBkc === "EA" ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol({ width: "40%" })}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "100%", borderBottomWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold" })}>Dokumen Produksi</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "50%", borderRightWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold" })}>Nomor</Text>
                    </View>
                    <View style={styles.tableColSpan({ width: "50%" })}>
                      <Text style={styles.tableCell({ fontWeight: "bold" })}>Tanggal</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableCol({ width: "30%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold" })}>
                    Nomor / Identitas Tangki
                  </Text>
                </View>
                <View style={styles.tableCol({ width: "30%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold" })}>Jumlah Liter</Text>
                </View>
              </View>

              {details?.map((detail, index) => (
                <View style={styles.tableRow} key={`row-${index}`}>
                  <View style={styles.tableCol({ width: "20%" })}>
                    <Text style={styles.tableCell({ textAlign: "left" })}>
                      {detail?.nomorDokumenProduksi}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "20%" })}>
                    <Text style={styles.tableCell({})}>
                      {moment(detail?.tanggalDokumenProduksi).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "30%" })}>
                    <Text style={styles.tableCell({ textAlign: "left" })}>
                      {detail?.nomorTangki}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "30%" })}>
                    <Text style={styles.tableCell({ textAlign: "right" })}>
                      {detail?.jumlahIsi !== null &&
                        new Intl.NumberFormat().format(detail?.jumlahIsi)}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.tableRow}>
                <View style={styles.tableCol({ width: "70%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold" })}>Jumlah</Text>
                </View>
                <View style={styles.tableCol({ width: "30%" })}>
                  <Text style={styles.tableCell({ textAlign: "right" })}>
                    {jumlahProduksiLiter !== null &&
                      new Intl.NumberFormat().format(jumlahProduksiLiter)}
                  </Text>
                </View>
              </View>
            </View>
          ) : jenisBkc === "MMEA" ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol({ width: "4%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>No</Text>
                </View>

                <View style={styles.tableCol({ width: "23%" })}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "100%", borderBottomWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                        Dokumen Produksi
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "50%", borderRightWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                        Nomor
                      </Text>
                    </View>
                    <View style={styles.tableColSpan({ width: "50%" })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                        Tanggal
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableCol({ width: "15%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>Merek</Text>
                </View>
                <View style={styles.tableCol({ width: "10%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                    Golongan
                  </Text>
                </View>
                <View style={styles.tableCol({ width: "8%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                    Kadar (%)
                  </Text>
                </View>

                <View style={styles.tableCol({ width: "24%" })}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "100%", borderBottomWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                        Kemasan
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "33.3333%", borderRightWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                        Jenis
                      </Text>
                    </View>
                    <View style={styles.tableColSpan({ width: "33.3333%", borderRightWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                        Isi (ml)
                      </Text>
                    </View>
                    <View style={styles.tableColSpan({ width: "33.3333%" })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                        Jumlah
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableCol({ width: "8%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                    Jumlah Liter
                  </Text>
                </View>
                <View style={styles.tableCol({ width: "8%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>
                    Kemasan Dilekati Pita
                  </Text>
                </View>
              </View>

              {details?.map((detail, index) => (
                <View style={styles.tableRow} key={`row-${index}`}>
                  <View style={styles.tableCol({ width: "4%" })}>
                    <Text style={styles.tableCell({ textAlign: "left", fontSize: 7 })}>
                      {index + 1}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "11.5%" })}>
                    <Text style={styles.tableCell({ textAlign: "left", fontSize: 7 })}>
                      {detail?.nomorDokumenProduksi}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "11.5%" })}>
                    <Text style={styles.tableCell({ fontSize: 7 })}>
                      {moment(detail?.tanggalDokumenProduksi).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "15%" })}>
                    <Text style={styles.tableCell({ textAlign: "left", fontSize: 7 })}>
                      {detail?.namaMerkMmea}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "10%" })}>
                    <Text style={styles.tableCell({ fontSize: 7 })}>{detail?.golongan}</Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 7 })}>
                      {detail?.kadar !== null && new Intl.NumberFormat().format(detail?.kadar)}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ fontSize: 7 })}>{detail?.bahanKemasan}</Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 7 })}>
                      {detail?.isiPerKemasan !== null &&
                        new Intl.NumberFormat().format(detail?.isiPerKemasan)}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 7 })}>
                      {detail?.jumlahKemasan !== null &&
                        new Intl.NumberFormat().format(detail?.jumlahKemasan)}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 7 })}>
                      {detail?.jumlahLiter !== null &&
                        new Intl.NumberFormat().format(detail?.jumlahLiter)}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 7 })}>
                      {detail?.kemasanDilekatiPita !== null &&
                        new Intl.NumberFormat().format(detail?.kemasanDilekatiPita)}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.tableRow}>
                <View style={styles.tableCol({ width: "76%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 7 })}>Jumlah</Text>
                </View>
                <View style={styles.tableCol({ width: "8%" })}>
                  <Text style={styles.tableCell({ textAlign: "right", fontSize: 7 })}>
                    {jumlahKemasan !== null && new Intl.NumberFormat().format(jumlahKemasan)}
                  </Text>
                </View>
                <View style={styles.tableCol({ width: "8%" })}>
                  <Text style={styles.tableCell({ textAlign: "right", fontSize: 7 })}>
                    {jumlahProduksiLiter !== null &&
                      new Intl.NumberFormat().format(jumlahProduksiLiter)}
                  </Text>
                </View>
                <View style={styles.tableCol({ width: "8%" })}>
                  <Text style={styles.tableCell({ textAlign: "right", fontSize: 7 })}>
                    {jumlahKemasanDilekatiPita !== null &&
                      new Intl.NumberFormat().format(jumlahKemasanDilekatiPita)}
                  </Text>
                </View>
              </View>
            </View>
          ) : jenisBkc === "HT" ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol({ width: "4%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>No</Text>
                </View>

                <View style={styles.tableCol({ width: "23%" })}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "100%", borderBottomWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                        Dokumen Produksi
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "50%", borderRightWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                        Nomor
                      </Text>
                    </View>
                    <View style={styles.tableColSpan({ width: "50%" })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                        Tanggal
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableCol({ width: "8%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>Jenis</Text>
                </View>
                <View style={styles.tableCol({ width: "14%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>Merek</Text>
                </View>
                <View style={styles.tableCol({ width: "7%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>HJE(Rp)</Text>
                </View>

                <View style={styles.tableCol({ width: "30%" })}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "100%", borderBottomWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                        Kemasan
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColSpan({ width: "26.6666%", borderRightWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                        Bahan
                      </Text>
                    </View>
                    <View style={styles.tableColSpan({ width: "23.3333%", borderRightWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>Isi</Text>
                    </View>
                    <View style={styles.tableColSpan({ width: "26.6666%", borderRightWidth: 2 })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                        Satuan
                      </Text>
                    </View>
                    <View style={styles.tableColSpan({ width: "23.3333%" })}>
                      <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                        Jumlah
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableCol({ width: "7%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                    Jumlah Isi
                  </Text>
                </View>
                <View style={styles.tableCol({ width: "7%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>
                    Kemasan Dilekati Pita
                  </Text>
                </View>
              </View>

              {details?.map((detail, index) => (
                <View style={styles.tableRow} key={`row-${index}`}>
                  <View style={styles.tableCol({ width: "4%" })}>
                    <Text style={styles.tableCell({ textAlign: "left", fontSize: 5 })}>
                      {index + 1}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "11.5%" })}>
                    <Text style={styles.tableCell({ textAlign: "left", fontSize: 5 })}>
                      {detail?.nomorDokumenProduksi}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "11.5%" })}>
                    <Text style={styles.tableCell({ fontSize: 5 })}>
                      {moment(detail?.tanggalDokumenProduksi).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ textAlign: "left", fontSize: 5 })}>
                      {detail?.jenisHt}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "14%" })}>
                    <Text style={styles.tableCell({ textAlign: "left", fontSize: 5 })}>
                      {detail?.namaMerkHt}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "7%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 5 })}>
                      {detail?.hje !== null && new Intl.NumberFormat().format(detail?.hje)}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ fontSize: 5 })}>{detail?.bahanKemasan}</Text>
                  </View>
                  <View style={styles.tableCol({ width: "7%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 5 })}>
                      {detail?.isiPerKemasan !== null &&
                        new Intl.NumberFormat().format(detail?.isiPerKemasan)}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "8%" })}>
                    <Text style={styles.tableCell({ fontSize: 5 })}>{detail?.kodeSatuan}</Text>
                  </View>
                  <View style={styles.tableCol({ width: "7%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 5 })}>
                      {detail?.jumlahKemasan !== null &&
                        new Intl.NumberFormat().format(detail?.jumlahKemasan)}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "7%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 5 })}>
                      {detail?.jumlahIsi !== null &&
                        new Intl.NumberFormat().format(detail?.jumlahIsi)}
                    </Text>
                  </View>
                  <View style={styles.tableCol({ width: "7%" })}>
                    <Text style={styles.tableCell({ textAlign: "right", fontSize: 5 })}>
                      {detail?.kemasanDilekatiPita !== null &&
                        new Intl.NumberFormat().format(detail?.kemasanDilekatiPita)}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.tableRow}>
                <View style={styles.tableCol({ width: "79%" })}>
                  <Text style={styles.tableCell({ fontWeight: "bold", fontSize: 5 })}>Jumlah</Text>
                </View>
                <View style={styles.tableCol({ width: "7%" })}>
                  <Text style={styles.tableCell({ textAlign: "right", fontSize: 5 })}>
                    {jumlahKemasan !== null && new Intl.NumberFormat().format(jumlahKemasan)}
                  </Text>
                </View>
                <View style={styles.tableCol({ width: "7%" })}>
                  <Text style={styles.tableCell({ textAlign: "right", fontSize: 5 })}>
                    {jumlahProduksiLiter !== null &&
                      jumlahProduksiBtg !== null &&
                      jumlahProduksiGram !== null &&
                      new Intl.NumberFormat().format(
                        jumlahProduksiLiter + jumlahProduksiBtg + jumlahProduksiGram
                      )}
                  </Text>
                </View>
                <View style={styles.tableCol({ width: "7%" })}>
                  <Text style={styles.tableCell({ textAlign: "right", fontSize: 5 })}>
                    {jumlahKemasanDilekatiPita !== null &&
                      new Intl.NumberFormat().format(jumlahKemasanDilekatiPita)}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <View style={styles.viewSignContainer({ marginLeft: "55%" })}>
            <View style={styles.viewSign({ textAlign: "center", marginTop: 20 })}>
              <Text style={styles.textSign}>
                {kota}, tanggal {moment(new Date()).format("DD MMMM YYYY")}
              </Text>
              <Text style={styles.textSign}>Pengusaha</Text>
              <View style={styles.signGap} />
              <Text style={styles.textSign}>{namaPengusaha}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
