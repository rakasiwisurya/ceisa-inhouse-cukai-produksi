import { Button, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import ButtonCustom from "components/Button/ButtonCustom";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import ModalDaftarHtlRel from "../ModalDaftarHtlRel";
import ModalDaftarJenisPita from "../ModalDaftarJenisPita";
import ModalDaftarKota from "../ModalDaftarKota";
import ModalDaftarNegara from "../ModalDaftarNegara";
import ModalDaftarNPPBKC from "../ModalDaftarNppbkc";

export default class PermohonanTarifRekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Header",
      subtitle2: "Pabrik/Importir",
      subtitle3: "Rincian",
      subtitle4: "Tampilan Kemasan",

      isRekamLoading: false,
      isJenisBkcLoading: true,
      isJenisMmeaLoading: true,
      isJenisKemasanMmeaLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarJenisPitaVisible: false,
      isModalDaftarHtlRelVisible: false,
      isModalDaftarKotaVisible: false,
      isModalDaftarNegaraAsalVisible: false,

      jenis_bkc_id: null,
      jenis_bkc_name: null,
      nomor_permohonan: null,
      tanggal_permohonan: null,
      lokasi_perekaman_id: null,
      lokasi_perekaman_name: null,
      tanggal_kep: null,
      awal_berlaku: null,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      npwp_nppbkc: null,
      alamat_nppbkc: null,
      jenis_produksi_mmea_id: null,
      jenis_produksi_mmea_name: null,

      jenis_pita_id: null,

      merk_ht_id: null,
      merk_ht: null,
      jenis_produksi_ht_id: null,
      jenis_produksi_ht_code: null,
      golongan_id: null,
      golongan_name: null,
      jenis_htl_rel_ht_id: null,
      jenis_htl_rel_ht_name: null,
      jenis_htl_rel_ht_satuan: null,
      isi_ht: null,
      berat_ht: null,
      hje_perkemasan_ht: null,
      hje_persatuan_ht: null,
      tarif_ht: null,
      bahan_kemasan_ht: null,
      asal_produk_ht_id: null,
      asal_produk_ht_name: null,
      tujuan_pemasaran_ht: null,

      jenis_mmea_id: null,
      jenis_mmea_name: null,
      merk_mmea_id: null,
      merk_mmea: null,
      negara_asal_mmea_id: null,
      negara_asal_mmea_name: null,
      jenis_kemasan_mmea_id: null,
      jenis_kemasan_mmea_name: null,
      isi_mmea: null,
      kadar_mmea: null,
      tarif_cukai_per_liter: null,
      tarif_cukai_per_kemasan: null,
      personal: null,
      seri_pita: null,

      nomor_surat_lisensi: null,
      tanggal_surat_lisensi: null,

      sisi_depan: null,
      sisi_belakang: null,
      sisi_kiri: null,
      sisi_kanan: null,
      sisi_atas: null,
      sisi_bawah: null,
      file_gambar_etiket: null,
      preview_gambar_etiket: null,

      list_jenis_bkc: [],
      list_jenis_produksi_mmea: [
        {
          jenis_produksi_mmea_id: "DALAM NEGERI",
          jenis_produksi_mmea_name: "Dalam Negeri",
        },
        {
          jenis_produksi_mmea_id: "IMPOR",
          jenis_produksi_mmea_name: "Luar Negeri / Impor",
        },
      ],
      list_jenis_mmea: [],
      list_jenis_kemasan_mmea: [],
      list_bahan_kemasan: [
        {
          bahan_kemasan_id: "KERTAS DAN SEJENISNYA",
          bahan_kemasan_name: "Kertas dan Sejenisnya",
          seri_pita: "III DP",
        },
        {
          bahan_kemasan_id: "BOTOL DAN SEJENISNYA",
          bahan_kemasan_name: "Botol dan Sejenisnya",
          seri_pita: "III TP",
        },
        {
          bahan_kemasan_id: "LAINNYA",
          bahan_kemasan_name: "Lainnya",
          seri_pita: "III DP",
        },
      ],
      list_asal_produk_ht: [
        {
          asal_produk_ht_id: "DN",
          asal_produk_ht_name: "Impor",
        },
        {
          asal_produk_ht_id: "",
          asal_produk_ht_name: "Non Impor",
        },
      ],
      list_tujuan_pemasaran: [
        {
          tujuan_pemasaran_id: "DALAM NEGERI",
          tujuan_pemasaran_name: "Dalam Negeri",
        },
        {
          tujuan_pemasaran_id: "EKSPOR",
          tujuan_pemasaran_name: "Ekspor",
        },
        {
          tujuan_pemasaran_id: "BAHAN BAKU",
          tujuan_pemasaran_name: "Bahan Baku",
        },
        {
          tujuan_pemasaran_id: "LABORATORIUM",
          tujuan_pemasaran_name: "Laboratorium",
        },
      ],
    };
  }

  componentDidMount() {
    this.getJenisBkc();
    this.getJenisMmea();
    this.getJenisKemasanMmea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_produksi_ht_id !== this.state.jenis_produksi_ht_id) {
      this.setState({ hje_persatuan_ht: this.state.hje_perkemasan_ht / this.state.isi_ht });
    }
  }

  getJenisBkc = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-bkc",
      setLoading: (bool) => this.setState({ isJenisBkcLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item) => item);
      newData.splice(0, 1);
      this.setState({ list_jenis_bkc: newData });
    }
  };
  getJenisMmea = () => {
    this.setState({ isJenisMmeaLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        list_jenis_mmea: [
          {
            jenis_mmea_id: "jenis_mmea_id_1",
            jenis_mmea_name: "jenis_mmea_name_1",
          },
          {
            jenis_mmea_id: "jenis_mmea_id_2",
            jenis_mmea_name: "jenis_mmea_name_2",
          },
        ],
      });
      this.setState({ isJenisMmeaLoading: false });
      clearTimeout(timeout);
    }, 2000);
  };
  getJenisKemasanMmea = () => {
    this.setState({ isJenisKemasanMmeaLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        list_jenis_kemasan_mmea: [
          {
            jenis_kemasan_mmea_id: "jenis_kemasan_mmea_id_1",
            jenis_kemasan_mmea_name: "jenis_kemasan_mmea_name_1",
          },
          {
            jenis_kemasan_mmea_id: "jenis_kemasan_mmea_id_2",
            jenis_kemasan_mmea_name: "jenis_kemasan_mmea_name_2",
          },
        ],
      });
      this.setState({ isJenisKemasanMmeaLoading: false });
      clearTimeout(timeout);
    }, 2000);
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleUploadFile = (e) => {
    this.setState({
      file_gambar_etiket: e.target.files[0],
      preview_gambar_etiket: URL.createObjectURL(e.target.files[0]),
    });
  };
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      [`${field}_id`]: value,
      [`${field}_name`]: option.props.children,
    });
  };
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataKota = (record) => {
    this.setState({
      lokasi_perekaman_id: record.kota_id,
      lokasi_perekaman_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };
  handleDataNppbkc = (record) => {
    this.setState({
      nppbkc_id: record.nppbkc_id,
      nppbkc: record.nppbkc,
      nama_nppbkc: record.nama_nppbkc,
      npwp_nppbkc: record.npwp_nppbkc,
      alamat_nppbkc: record.alamat_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataJenisPita = (record) => {
    if (this.state.jenis_bkc_id === 3) {
      this.setState({
        jenis_pita_id: record.jenis_pita_id,
        personal: record.personal,
        jenis_produksi_ht_id: record.jenis_produksi_id,
        jenis_produksi_ht_code: record.jenis_produksi_code,
        golongan_id: record.golongan_id,
        golongan_name: record.golongan_name,
        isi_ht: record.isi,
        berat_ht: record.isi_ht,
        hje_perkemasan_ht: record.hje,
        tarif_ht: record.tarif,
      });
    } else {
      this.setState({
        isi_mmea: record.isi,
        tarif_cukai_per_liter: record.tarif,
        tarif_cukai_per_kemasan: record.tarif / record.isi,
      });
    }

    this.handleModalClose("isModalDaftarJenisPitaVisible");
  };
  handleDataHtlRel = (record) => {
    this.setState({
      jenis_htl_rel_ht_id: record.jenis_htl_rel_id,
      jenis_htl_rel_ht_name: record.jenis_htl_rel_name,
      jenis_htl_rel_ht_satuan: record.jenis_htl_rel_satuan,
    });
    this.handleModalClose("isModalDaftarHtlRelVisible");
  };
  handleDataNegaraAsal = (record) => {
    this.setState({
      negara_asal_mmea_id: record.negara_id,
      negara_asal_mmea_name: record.negara_name,
    });
    this.handleModalClose("isModalDaftarNegaraAsalVisible");
  };

  validationForm = () => {
    return true;
  };

  handleRekam = async () => {
    const {
      jenis_bkc_id,
      nomor_permohonan,
      tanggal_permohonan,
      lokasi_perekaman_name,
      tanggal_kep,
      awal_berlaku,

      nppbkc_id,
      nppbkc,
      nama_nppbkc,
      npwp_nppbkc,
      alamat_nppbkc,
      jenis_produksi_mmea_id,

      // jenis_pita_id,

      merk_ht_id,
      merk_ht,
      jenis_produksi_ht_id,
      golongan_id,
      jenis_htl_rel_ht_id,
      isi_ht,
      berat_ht,
      hje_perkemasan_ht,
      hje_persatuan_ht,
      tarif_ht,
      bahan_kemasan_ht,
      asal_produk_ht_id,
      asal_produk_ht_name,
      tujuan_pemasaran_ht,

      // jenis_mmea_id,
      merk_mmea_id,
      merk_mmea,
      negara_asal_mmea_name,
      jenis_kemasan_mmea_id,
      isi_mmea,
      kadar_mmea,
      tarif_cukai_per_liter,
      tarif_cukai_per_kemasan,
      personal,
      seri_pita,

      nomor_surat_lisensi,
      tanggal_surat_lisensi,

      sisi_depan,
      sisi_belakang,
      sisi_kiri,
      sisi_kanan,
      sisi_atas,
      sisi_bawah,
      file_gambar_etiket,
    } = this.state;

    // const payload = {
    //   idJenisBkc: jenis_bkc_id,
    //   nomorPermohonan: nomor_permohonan,
    //   tanggalPermohonan: moment(tanggal_permohonan, "DD-MM-YYYY").format("YYYY-MM-DD"),
    //   kotaPermohonan: lokasi_perekaman_name,
    //   tanggalSkep: moment(tanggal_kep, "DD-MM-YYYY").format("YYYY-MM-DD"),
    //   awalBerlaku: moment(awal_berlaku).format("YYYY-MM-DD"),

    //   idNppbkc: nppbkc_id,
    //   nppbkc: nppbkc,
    //   namaPerusahaan: nama_nppbkc,
    //   npwp: npwp_nppbkc,
    //   alamatPerusahaan: alamat_nppbkc,
    // };

    // if (jenis_bkc_id === 3) {
    //   payload.idJenisPitaCukai = `${[
    //     personal,
    //     isi_ht,
    //     hje_perkemasan_ht,
    //     asal_produk_ht_id,
    //     seri_pita,
    //     tarif_ht,
    //   ]
    //     .filter((str) => Boolean(str) === true)
    //     .join(";")}`;
    //   payload.seriPita = seri_pita;
    //   payload.idMerk = merk_ht_id;
    //   payload.namaMerk = merk_ht;
    //   payload.idJenisProduksiBkc = jenis_produksi_ht_id;
    //   payload.idGolongan = golongan_id;
    //   payload.isiPerKemasan = isi_ht;
    //   payload.beratVolume = berat_ht;
    //   payload.hjePerKemasan = hje_perkemasan_ht;
    //   payload.hjePerBatang = hje_persatuan_ht;
    //   payload.tarifSpesifik = tarif_ht;
    //   payload.bahanKemasan = bahan_kemasan_ht;
    //   payload.asalProduksi = asal_produk_ht_name;
    //   payload.tujuanPemasaran = tujuan_pemasaran_ht;

    //   if (asal_produk_ht_id === "DN") {
    //     payload.nomorLisensi = nomor_surat_lisensi;
    //     payload.tanggalLisensi = moment(tanggal_surat_lisensi, "DD-MM-YYYY").format("YYYY-MM-DD");
    //   }

    //   if (jenis_bkc_id === 3 && !(jenis_produksi_ht_id === 2 || jenis_produksi_ht_id === 5)) {
    //     payload.idJenisHtlRel = jenis_htl_rel_ht_id;
    //     payload.sisiDepan = sisi_depan;
    //     payload.sisiBelakang = sisi_belakang;
    //     payload.sisiKiri = sisi_kiri;
    //     payload.sisiKanan = sisi_kanan;
    //     payload.sisiAtas = sisi_atas;
    //     payload.sisiBawah = sisi_bawah;
    //   }
    // }

    // if (jenis_bkc_id === 2) {
    //   payload.idJenisPitaCukai = null;
    //   payload.idJenisProduksiBkc = jenis_produksi_mmea_id;
    //   // payload.idJenisMmea = jenis_mmea_id;
    //   payload.idMerk = merk_mmea_id;
    //   payload.namaMerk = merk_mmea;
    //   payload.negaraAsal = negara_asal_mmea_name;
    //   payload.idJenisKemasan = jenis_kemasan_mmea_id;
    //   payload.isiPerKemasan = isi_mmea;
    //   payload.kadarEa = kadar_mmea;
    //   payload.tarifSpesifik = tarif_cukai_per_liter || tarif_cukai_per_kemasan;
    // }

    const formData = new FormData();

    formData.set("idJenisBkc", jenis_bkc_id);
    formData.set("nomorPermohonan", nomor_permohonan);
    formData.set(
      "tanggalPermohonan",
      moment(tanggal_permohonan, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    formData.set("kotaPermohonan", lokasi_perekaman_name);
    formData.set("tanggalSkep", moment(tanggal_kep, "DD-MM-YYYY").format("YYYY-MM-DD"));
    formData.set("awalBerlaku", moment(awal_berlaku).format("YYYY-MM-DD"));

    formData.set("idNppbkc", nppbkc_id);
    formData.set("nppbkc", nppbkc);
    formData.set("namaPerusahaan", nama_nppbkc);
    formData.set("npwp", npwp_nppbkc);
    formData.set("alamatPerusahaan", alamat_nppbkc);

    if (jenis_bkc_id === 3) {
      formData.set(
        "idJenisPitaCukai",
        `${[personal, isi_ht, hje_perkemasan_ht, asal_produk_ht_id, seri_pita, tarif_ht]
          .filter((str) => Boolean(str) === true)
          .join(";")}`
      );

      formData.set("seriPita", seri_pita);
      formData.set("idMerk", merk_ht_id);
      formData.set("namaMerk", merk_ht);
      formData.set("idJenisProduksiBkc", jenis_produksi_ht_id);
      formData.set("idGolongan", golongan_id);
      formData.set("isiPerKemasan", isi_ht);
      formData.set("beratVolume", berat_ht);
      formData.set("hjePerKemasan", hje_perkemasan_ht);
      formData.set("hjePerBatang", hje_persatuan_ht);
      formData.set("tarifSpesifik", tarif_ht);
      formData.set("bahanKemasan", bahan_kemasan_ht);
      formData.set("asalProduksi", asal_produk_ht_name);
      formData.set("tujuanPemasaran", tujuan_pemasaran_ht);

      if (asal_produk_ht_id === "DN") {
        formData.set("nomorLisensi", nomor_surat_lisensi);
        formData.set(
          "tanggalLisensi",
          moment(tanggal_surat_lisensi, "DD-MM-YYYY").format("YYYY-MM-DD")
        );
      }

      if (jenis_bkc_id === 3 && !(jenis_produksi_ht_id === 2 || jenis_produksi_ht_id === 5)) {
        formData.set("idJenisHtlRel", jenis_htl_rel_ht_id);
        formData.set("sisiDepan", sisi_depan);
        formData.set("sisiBelakang", sisi_belakang);
        formData.set("sisiKiri", sisi_kiri);
        formData.set("sisiKanan", sisi_kanan);
        formData.set("sisiAtas", sisi_atas);
        formData.set("sisiBawah", sisi_bawah);
        formData.set("gambarEtiket", file_gambar_etiket);
      }
    }

    if (jenis_bkc_id === 2) {
      formData.set("idJenisPitaCukai ", null);
      formData.set("idJenisProduksiBkc", jenis_produksi_mmea_id);
      // formData.set("idJenisMmea", jenis_mmea_id);
      formData.set("idMerk", merk_mmea_id);
      formData.set("namaMerk", merk_mmea);
      formData.set("negaraAsal", negara_asal_mmea_name);
      formData.set("idJenisKemasan", jenis_kemasan_mmea_id);
      formData.set("isiPerKemasan", isi_mmea);
      formData.set("kadarEa", kadar_mmea);
      formData.set("tarifSpesifik", tarif_cukai_per_liter || tarif_cukai_per_kemasan);
    }

    const response = await requestApi({
      service: "produksi",
      contentType: "formData",
      method: "post",
      endpoint: "/pita-cukai/form-perekaman-tarif",
      body: formData,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/permohonan-tarif`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Permohonan Tarif Rekam" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis BKC</FormLabel>
                </div>
                <Select
                  id="jenis_bkc"
                  value={this.state.jenis_bkc_id}
                  onChange={(value, option) => {
                    this.handleSelectCustomChange("jenis_bkc", value, option);
                  }}
                  style={{ width: "100%" }}
                  loading={this.state.isJenisBkcLoading}
                >
                  {this.state.list_jenis_bkc.length > 0 &&
                    this.state.list_jenis_bkc.map((item, index) => (
                      <Select.Option key={`jenis-bkc-${index}`} value={item.idJenisBkc}>
                        {item.namaJenisBkc}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>No. Permohonan</FormLabel>
                </div>
                <Input
                  id="nomor_permohonan"
                  onChange={this.handleInputChange}
                  value={this.state.nomor_permohonan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Permohonan</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_permohonan"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("tanggal_permohonan", date)}
                  value={this.state.tanggal_permohonan}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Lokasi Perekaman</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="lokasi_perekaman" value={this.state.lokasi_perekaman_name} disabled />
                  <Button
                    type="default"
                    icon="menu"
                    onClick={() => this.handleModalShow("isModalDaftarKotaVisible")}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal KEP</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_kep"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("tanggal_kep", date)}
                  value={this.state.tanggal_kep}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="awal_berlaku"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("awal_berlaku", date)}
                  value={this.state.awal_berlaku}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle2}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPPBKC</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                  >
                    Cari
                  </Button>
                  <Input id="nama_perusahaan" value={this.state.nama_nppbkc} disabled />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPWP</FormLabel>
                </div>
                <Input id="npwp_nppbkc" value={this.state.npwp_nppbkc} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Alamat</FormLabel>
                </div>
                <Input id="alamat_nppbkc" value={this.state.alamat_nppbkc} disabled />
              </Col>

              {this.state.jenis_bkc_id === 2 && (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Produksi</FormLabel>
                  </div>
                  <Select
                    id="jenis_produksi_mmea"
                    value={this.state.jenis_produksi_mmea_id}
                    onChange={(value, option) => {
                      this.handleSelectCustomChange("jenis_produksi_mmea", value, option);
                    }}
                    style={{ width: "100%" }}
                  >
                    {this.state.list_jenis_produksi_mmea.length > 0 &&
                      this.state.list_jenis_produksi_mmea.map((item, index) => (
                        <Select.Option
                          key={`jenis-produksi-mmea-${index}`}
                          value={item.jenis_produksi_mmea_id}
                        >
                          {item.jenis_produksi_mmea_name}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
              )}
            </Row>
          </div>

          <Header>{this.state.subtitle3}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              {this.state.jenis_bkc_id && (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Pita</FormLabel>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Input
                      id="jenis_pita"
                      value={
                        this.state.jenis_bkc_id === 3
                          ? `${[
                              this.state.personal,
                              this.state.isi_ht,
                              this.state.hje_perkemasan_ht,
                              this.state.asal_produk_ht_id,
                              this.state.seri_pita,
                              this.state.tarif_ht,
                            ]
                              .filter((str) => Boolean(str) === true)
                              .join(";")}`
                          : null
                      }
                      disabled
                    />
                    <Button
                      type="primary"
                      onClick={() => this.handleModalShow("isModalDaftarJenisPitaVisible")}
                    >
                      Cari
                    </Button>
                  </div>
                </Col>
              )}

              {this.state.jenis_bkc_id === 3 && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk</FormLabel>
                    </div>
                    <Input
                      id="merk_ht"
                      onChange={this.handleInputChange}
                      value={this.state.merk_ht}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input
                        id="jenis_produksi_ht"
                        value={
                          this.state.jenis_produksi_ht_code && this.state.golongan_name
                            ? `${this.state.jenis_produksi_ht_code} - ${this.state.golongan_name}`
                            : this.state.jenis_produksi_ht_code
                        }
                        disabled
                      />
                      {(this.state.jenis_produksi_ht_id === 2 ||
                        this.state.jenis_produksi_ht_id === 5) && (
                        <>
                          <Button
                            type="primary"
                            onClick={() => this.handleModalShow("isModalDaftarHtlRelVisible")}
                          >
                            {this.state.jenis_produksi_ht_code}
                          </Button>
                          <Input
                            id="jenis_htl_rel_ht_name"
                            value={this.state.jenis_htl_rel_ht_name}
                            disabled
                          />
                        </>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi / kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="isi_ht"
                        value={this.state.isi_ht}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>{this.state.jenis_htl_rel_ht_satuan}</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Berat / Volume (per kemasan)</FormLabel>
                    </div>
                    <InputNumber
                      id="berat_ht"
                      value={this.state.berat_ht}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE per kemasan</FormLabel>
                    </div>
                    <InputNumber
                      id="hje_perkemasan_ht"
                      value={this.state.hje_perkemasan_ht}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE / satuan</FormLabel>
                    </div>
                    <InputNumber
                      id="hje_persatuan_ht"
                      value={this.state.hje_persatuan_ht}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Spesifik</FormLabel>
                    </div>
                    <InputNumber
                      id="tarif_ht"
                      value={this.state.tarif_ht}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Bahan Kemasan</FormLabel>
                    </div>
                    <Select
                      id="bahan_kemasan_ht"
                      onChange={(value) => {
                        const spiltValue = value.split("-");
                        this.handleSelectChange("bahan_kemasan_ht", spiltValue[0]);
                        this.handleSelectChange("seri_pita", spiltValue[1]);
                      }}
                      value={this.state.bahan_kemasan_ht}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_bahan_kemasan.length > 0 &&
                        this.state.list_bahan_kemasan.map((item, index) => (
                          <Select.Option
                            key={`bahan-kemasan-${index}`}
                            value={`${item.bahan_kemasan_id}-${item.seri_pita}`}
                          >
                            {item.bahan_kemasan_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Asal Produk</FormLabel>
                    </div>
                    <Select
                      id="asal_produk_ht"
                      onChange={(value, option) => {
                        this.handleSelectCustomChange("asal_produk_ht", value, option);
                      }}
                      value={this.state.asal_produk_ht_id}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_asal_produk_ht.length > 0 &&
                        this.state.list_asal_produk_ht.map((item, index) => (
                          <Select.Option
                            key={`asal-produk-ht-${index}`}
                            value={item.asal_produk_ht_id}
                          >
                            {item.asal_produk_ht_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tujuan Pemasaran</FormLabel>
                    </div>
                    <Select
                      id="tujuan_pemasaran_ht"
                      onChange={(value) => this.handleSelectChange("tujuan_pemasaran_ht", value)}
                      value={this.state.tujuan_pemasaran_ht}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_tujuan_pemasaran.length > 0 &&
                        this.state.list_tujuan_pemasaran.map((item, index) => (
                          <Select.Option
                            key={`tujuan-pemasaran-${index}`}
                            value={item.tujuan_pemasaran_id}
                          >
                            {item.tujuan_pemasaran_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  {this.state.asal_produk_ht_id === "DN" && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor Surat Lisensi Pemegang Merk</FormLabel>
                        </div>
                        <Input
                          id="nomor_surat_lisensi"
                          onChange={this.handleInputChange}
                          value={this.state.nomor_surat_lisensi}
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Surat Lisensi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_surat_lisensi"
                          format="DD-MM-YYYY"
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggal_surat_lisensi", date)
                          }
                          value={this.state.tanggal_surat_lisensi}
                          style={{ width: "100%" }}
                        />
                      </Col>
                    </>
                  )}
                </>
              )}

              {this.state.jenis_bkc_id === 2 && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis MMEA</FormLabel>
                    </div>
                    <Select
                      id="jenis_mmea"
                      value={this.state.jenis_mmea_id}
                      loading={this.state.isJenisMmeaLoading}
                      onChange={(value, option) => {
                        this.handleSelectCustomChange("jenis_mmea", value, option);
                      }}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_mmea.length > 0 &&
                        this.state.list_jenis_mmea.map((item, index) => (
                          <Select.Option key={`jenis-mmea-${index}`} value={item.jenis_mmea_id}>
                            {item.jenis_mmea_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk MMEA</FormLabel>
                    </div>
                    <Input
                      id="merk_mmea"
                      onChange={this.handleInputChange}
                      value={this.state.merk_mmea}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Negara Asal</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input
                        id="negara_asal_mmea_name"
                        value={this.state.negara_asal_mmea_name}
                        disabled
                      />
                      <Button
                        type="default"
                        icon="menu"
                        onClick={() => this.handleModalShow("isModalDaftarNegaraAsalVisible")}
                      />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Kemasan</FormLabel>
                    </div>
                    <Select
                      id="jenis_kemasan_mmea"
                      value={this.state.jenis_kemasan_mmea_id}
                      loading={this.state.isJenisKemasanMmeaLoading}
                      onChange={(value, option) => {
                        this.handleSelectCustomChange("jenis_kemasan_mmea", value, option);
                      }}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_kemasan_mmea.length > 0 &&
                        this.state.list_jenis_kemasan_mmea.map((item, index) => (
                          <Select.Option
                            key={`jenis-kemasan-mmea-${index}`}
                            value={item.jenis_kemasan_mmea_id}
                          >
                            {item.jenis_kemasan_mmea_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="isi_mmea"
                        value={this.state.isi_mmea}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>ml</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="kadar_mmea"
                        onChange={(value) => this.handleInputNumberChange("kadar_mmea", value)}
                        value={this.state.kadar_mmea}
                        style={{ width: "100%" }}
                      />
                      <div>%</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Per Liter</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="tarif_cukai_per_liter"
                        value={this.state.tarif_cukai_per_liter}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>(Rp)</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Per Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="tarif_cukai_per_kemasan"
                        value={this.state.tarif_cukai_per_kemasan}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>(Rp)</div>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </div>

          {this.state.jenis_bkc_id === 3 &&
          !(this.state.jenis_produksi_ht_id === 2 || this.state.jenis_produksi_ht_id === 5) ? (
            <>
              <Header>{this.state.subtitle4}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Depan</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisi_depan"
                          onChange={this.handleInputChange}
                          value={this.state.sisi_depan}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Belakang</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisi_belakang"
                          onChange={this.handleInputChange}
                          value={this.state.sisi_belakang}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Kiri</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisi_kiri"
                          onChange={this.handleInputChange}
                          value={this.state.sisi_kiri}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Kanan</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisi_kanan"
                          onChange={this.handleInputChange}
                          value={this.state.sisi_kanan}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Atas</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisi_atas"
                          onChange={this.handleInputChange}
                          value={this.state.sisi_atas}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Bawah</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisi_bawah"
                          onChange={this.handleInputChange}
                          value={this.state.sisi_bawah}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col span={12}>
                    <input type="file" onChange={this.handleUploadFile} />

                    {this.state.preview_gambar_etiket && (
                      <div style={{ marginTop: 20 }}>
                        <img
                          src={this.state.preview_gambar_etiket}
                          alt="Foto Etiket"
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    )}
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                  <Col span={4}>
                    <ButtonCustom
                      variant="secondary"
                      onClick={() => this.props.history.goBack()}
                      block
                    >
                      Kembali
                    </ButtonCustom>
                  </Col>

                  <Col span={4}>
                    <Button
                      type="primary"
                      loading={this.state.isRekamLoading}
                      onClick={this.handleRekam}
                      disabled={!this.validationForm()}
                      block
                    >
                      Rekam
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
              <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                <Col span={4}>
                  <ButtonCustom
                    variant="secondary"
                    onClick={() => this.props.history.goBack()}
                    block
                  >
                    Kembali
                  </ButtonCustom>
                </Col>

                <Col span={4}>
                  <Button
                    type="primary"
                    loading={this.state.isRekamLoading}
                    onClick={this.handleRekam}
                    disabled={!this.validationForm()}
                    block
                  >
                    Rekam
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Container>

        <ModalDaftarKota
          isVisible={this.state.isModalDaftarKotaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarKotaVisible")}
          onDataDoubleClick={this.handleDataKota}
        />

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />

        <ModalDaftarJenisPita
          isVisible={this.state.isModalDaftarJenisPitaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarJenisPitaVisible")}
          onDataDoubleClick={this.handleDataJenisPita}
        />

        <ModalDaftarHtlRel
          id={this.state.jenis_produksi_ht_id}
          isVisible={this.state.isModalDaftarHtlRelVisible}
          onCancel={() => this.handleModalClose("isModalDaftarHtlRelVisible")}
          onDataDoubleClick={this.handleDataHtlRel}
        />

        <ModalDaftarNegara
          isVisible={this.state.isModalDaftarNegaraAsalVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNegaraAsalVisible")}
          onDataDoubleClick={this.handleDataNegaraAsal}
        />
      </>
    );
  }
}
