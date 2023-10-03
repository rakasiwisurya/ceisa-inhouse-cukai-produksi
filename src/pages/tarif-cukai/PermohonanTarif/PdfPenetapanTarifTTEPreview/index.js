import React, { Component } from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 50,
  },
  viewIntroduction: {
    marginBottom: 10,
  },
  viewTerm: {
    marginBottom: 10,
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
  viewDetails: {
    width: "100%",
  },
  viewNppbkc: {
    marginBottom: 10,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  viewTable: {
    borderWidth: 2,
    padding: 0,
    margin: 0,
  },
  viewTh: {
    width: "100%",
    padding: 5,
    borderWidth: 2,
    margin: 0,
  },
  viewTdKey: {
    width: 300,
    padding: 5,
    borderWidth: 2,
    margin: 0,
  },
  viewTdColon: {
    padding: 5,
    borderWidth: 2,
    margin: 0,
  },
  viewTdValue: {
    width: "100%",
    padding: 5,
    borderWidth: 2,
    margin: 0,
  },
  viewTableGap: {
    padding: 5,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  textBoldTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginBottom: 3,
    textAlign: "center",
  },
  textTitle: {
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 3,
    textAlign: "center",
  },
  textSideTitle: {
    fontFamily: "Helvetica",
    fontSize: 12,
    width: 90,
  },
  textBoldSideTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    width: 90,
  },
  textSideContent: {
    fontFamily: "Helvetica",
    fontSize: 12,
    width: "100%",
    textAlign: "justify",
  },
  textSideContentBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    width: "100%",
  },
  textKey: {
    fontFamily: "Helvetica",
    fontSize: 12,
    width: 400,
  },
  textValue: {
    fontFamily: "Helvetica",
    fontSize: 12,
    width: "100%",
  },
  text: {
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  gap: {
    marginVertical: 10,
  },
  colon: {
    marginHorizontal: 8,
    fontSize: 12,
  },
  list: {
    marginRight: 8,
    fontSize: 12,
  },
});

export default class PdfPenetapanTarifTTEPreview extends Component {
  render() {
    const {
      nomor_kep,
      tanggal_kep,
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
      nama_kantor,
      nama_kantor_wilayah,
    } = this.props;

    return (
      <Document title={`Tanda Terima ${nama_perusahaan || ""}`}>
        <Page size="A4" style={styles.page}>
          <View style={styles.viewIntroduction}>
            <View>
              <Text style={styles.textTitle}>KEMENTRIAN KEUANGAN REPUBLIK INDONESIA</Text>
              <Text style={styles.textBoldTitle}>DIREKTORAT JENDERAL BEA DAN CUKAI</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>KEPUTUSAN KEPALA {nama_kantor?.toUpperCase()}</Text>
              <Text style={styles.textTitle}>NOMOR {nomor_kep}</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>TENTANG</Text>
            </View>
            <View style={styles.gap} />
            <View>
              <Text style={styles.textTitle}>
                PENETAPAN TARIF CUKAI HASIL TEMBAKAU UNTUK MEREK BARU
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
                  bahwa {nama_perusahaan} telah mengajukan Surat Permohonan Nomor {nomor_kep}{" "}
                  tanggal {tanggal_kep} untuk memperoleh penetapan tarif cukai hasil tembakau untuk
                  merek baru;
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
                  {nama_kota};
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
                  Peraturan Menteri Keuangan Nomor 191/PMK.010/2022 tentang Tarif Cukai Hasil
                  Tembakau Berupa Sigaret, Cerutu, Rokok Daun atau Klobot, dan Tembakau Iris;
                </Text>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.textSideTitle} />
                <Text style={styles.colon}> </Text>
                <Text style={styles.list}>3.</Text>
                <Text style={styles.textSideContent}>
                  Peraturan Direktur Jenderal Bea dan Cukai Nomor 16/BC/2022 tentang Tata Cara
                  Penetapan Tarif Cukai Hasil Tembakau;
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

          <View break />

          <View style={styles.viewStatement}>
            <View style={styles.viewRow}>
              <Text style={styles.textBoldSideTitle}>PERTAMA</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.textSideContent}>
                Memberikan Penetapan Tarif Cukai Hasil Tembakau kepada:
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
                    <Text style={styles.textKey}>Alamat Pengusaha Pabrik/Importir*)</Text>
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.textValue}>
                      {alamat_pengusaha ? alamat_pengusaha : "-"}
                    </Text>
                  </View>

                  <View style={styles.viewRow}>
                    <Text style={styles.textKey}>Nama Pabrik/Importir*)</Text>
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.textValue}>{nama_perusahaan ? nama_perusahaan : "-"}</Text>
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

                <View style={styles.viewTable}>
                  <View style={styles.viewTh}>
                    <Text style={styles.textBold}>1. Tarif Cukai {tarif_spesifik}</Text>
                  </View>
                  <View>
                    <View style={styles.viewRow}>
                      <View style={styles.viewTableGap} />
                      <View style={styles.viewTdKey}>
                        <Text style={styles.text}>Merek</Text>
                      </View>
                      <View style={styles.viewTdColon}>
                        <Text style={styles.colon}>:</Text>
                      </View>
                      <View style={styles.viewTdKey}>
                        <Text style={styles.text}>{nama_merk}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
