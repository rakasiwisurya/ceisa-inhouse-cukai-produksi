import React, { Component } from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 50,
  },
  viewTitle: {
    marginBottom: 10,
  },
  viewPemberitahuan: {
    marginHorizontal: 20,
    display: "flex",
    alignItems: "flex-start",
  },
  viewBarangKenaCukai: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  viewNppbkc: {
    marginHorizontal: 20,
  },
  viewCatatan: {
    marginTop: 40,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  line: {
    borderBottomWidth: 2,
    marginTop: 10,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    fontSize: 15,
    margin: 5,
  },
  textPemberitahuanKey: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
    width: 110,
  },
  textPemberitahuanValue: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
    width: 300,
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
  text: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 10,
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginBottom: 10,
  },
  colon: {
    marginHorizontal: 8,
    fontSize: 12,
  },
});

export default class PdfPenetapanTarifTTEPreview extends Component {
  render() {
    const {
      nomor_pemberitahuan,
      tanggal_pemberitahuan,
      periode_pelaporan,
      nama_perusahaan,
      nppbkc,
      alamat_perusahaan,
      waktu_rekam,
    } = this.props;

    return (
      <Document title={`Tanda Terima ${nama_perusahaan || ""}`}>
        <Page size="A4" style={styles.page}>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>RESPON TANDA TERIMA</Text>
            <Text style={styles.title}>PEMBERITAHUAN BARANG KENA CUKAI YANG DIBUAT</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.viewBarangKenaCukai}>
            <Text style={styles.text}>Pemberitahuan barang kena cukai selesai dibuat</Text>
            <View style={styles.viewPemberitahuan}>
              <View style={styles.viewRow}>
                <Text style={styles.textPemberitahuanKey}>No. Pemberitahuan</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.textPemberitahuanValue}>{nomor_pemberitahuan}</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.textPemberitahuanKey}>Tgl. Pemberitahuan</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.textPemberitahuanValue}>{tanggal_pemberitahuan}</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.textPemberitahuanKey}>Periode Pelaporan</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.textPemberitahuanValue}>periode bulan {periode_pelaporan}</Text>
              </View>
            </View>
            <Text style={styles.text}>
              Disampaikan pada hari, tanggal/bulan/tahun, {waktu_rekam} waktu setempat oleh
              pengusaha pabrik:
            </Text>
          </View>

          <View style={styles.viewNppbkc}>
            <View style={styles.viewRow}>
              <Text style={styles.textNppbkcKey}>Nama</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.textNppbkcValue}>{nama_perusahaan}</Text>
            </View>
            <View style={styles.viewRow}>
              <Text style={styles.textNppbkcKey}>Alamat</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.textNppbkcValue}>{alamat_perusahaan}</Text>
            </View>
            <View style={styles.viewRow}>
              <Text style={styles.textNppbkcKey}>NPPBKC</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.textNppbkcValue}>{nppbkc}</Text>
            </View>

            <View style={styles.viewCatatan}>
              <Text style={styles.text}>Catatan: </Text>
              <Text style={styles.boldText}>
                FORMULIR INI DICETAK SECARA OTOMATIS OLEH SISTEM KOMPUTER DAN TIDAK MEMERLUKAN NAMA,
                TANDA TANGAN PEJABAT DAN CAP DINAS
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
