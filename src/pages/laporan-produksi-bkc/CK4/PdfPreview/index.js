import React, { Component } from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 50,
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    margin: 10,
  },
  line: {
    borderBottomWidth: 2,
    marginTop: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
  },
  viewPemberitahuan: {
    marginLeft: 20,
    textAlign: "left",
  },
  viewBarangKenaCukai: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: "left",
  },
  viewCatatan: {
    marginLeft: 20,
    textAlign: "left",
  },
});

class PdfPreview extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    const {
      noPemberitahu,
      PeriodePelaporan,
      tanggalPemberitahuan,
      alamatPerusahaan,
      nppbkc,
      namaPerusahaan,
    } = this.props;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.boldText}>RESPON TANDA TERIMA</Text>
          <Text style={styles.boldText}>
            PEMBERITAHUAN BARANG KENA CUKAI YANG DIBUAT
          </Text>
          <View style={styles.line} />
          <View style={styles.viewBarangKenaCukai}>
            <Text style={styles.text}>
              Pemberitahuan barang kena cukai selesai dibuat
            </Text>
            <View style={styles.viewPemberitahuan}>
              <Text style={styles.text}>
                No. Pemberitahuan : {noPemberitahu}
              </Text>
              <Text style={styles.text}>
                Tgl. Pemberitahuan : {tanggalPemberitahuan}
              </Text>
              <Text style={styles.text}>
                Periode Pelaporan : {PeriodePelaporan}
              </Text>
            </View>
            <Text style={styles.text}>
              Disampaikan pada hari, tanggal/bulan/tahun, {tanggalPemberitahuan}{" "}
              waktu setempat oleh pengusaha pabrik:
            </Text>
          </View>
          <View style={styles.viewCatatan}>
            <Text style={styles.text}>Nama : {namaPerusahaan}</Text>
            <Text style={styles.text}>Alamat : {alamatPerusahaan}</Text>
            <Text style={styles.text}>NPPBKC : {nppbkc}</Text>
            <Text style={styles.text}>Catatan: </Text>
            <Text style={styles.text}>
              FORMULIR INI DICETAK SECARA OTOMATIS OLEH SISTEM KOMPUTER DAN
              TIDAK MEMERLUKAN NAMA, TANDA TANGAN PEJABAT DAN CAP DINAS
            </Text>
          </View>
        </Page>
      </Document>
    );
  }
}

export default PdfPreview;
