import { Button, Card, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarHtlRel from "components/ModalDaftarHtlRel";
import ModalDaftarJenisPita from "components/ModalDaftarJenisPita";
import ModalDaftarKota from "components/ModalDaftarKota";
import ModalDaftarNegara from "components/ModalDaftarNegara";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { download } from "utils/files";
import { capitalize } from "utils/formatter";
import { requestApi } from "utils/requestApi";

export default class PermohonanTarifPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Header",
      subtitle2: "Pabrik/Importir",
      subtitle3: "Rincian",
      subtitle4: "Tampilan Kemasan",

      isDetailLoading: true,
      isUpdateLoading: false,
      isDownloadLoading: false,
      isJenisBkcLoading: true,
      isJenisKemasanMmeaLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarJenisPitaVisible: false,
      isModalDaftarHtlRelVisible: false,
      isModalDaftarKotaVisible: false,
      isModalDaftarNegaraAsalVisible: false,

      idJenisBkc: null,
      namaJenisBkc: null,
      nomorPermohonan: null,
      tanggalPermohonan: null,
      idLokasiPerekaman: null,
      namaLokasiPerekaman: null,
      tanggalKep: null,
      awalBerlaku: null,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      npwpNppbkc: null,
      alamatNppbkc: null,

      idJenisPita: null,

      idMerkHt: null,
      merkHt: null,
      idJenisProduksiHt: null,
      kodeJenisProduksiHt: null,
      idGolongan: null,
      namaGolongan: null,
      idJenisHtlRelHt: null,
      namaJenisHtlRelHt: null,
      satuanJenisHtlRelHt: null,
      isiHt: null,
      beratHt: null,
      hjePerkemasanHt: null,
      hjePersatuanHt: null,
      tarifHt: null,
      bahanKemasanHt: null,
      idAsalProdukHt: null,
      namaAsalProdukHt: null,
      tujuanPemasaranHt: null,

      idMerkMmea: null,
      merkMmea: null,
      idNegaraAsalMmea: null,
      namaNegaraAsalMmea: null,
      isiMmea: null,
      tarifCukaiPerLiter: null,
      tarifCukaiPerKemasan: null,
      idAsalProdukMmea: null,
      namaAsalProdukMmea: null,

      personal: null,
      seriPita: null,

      nomorSuratLisensi: null,
      tanggalSuratLisensi: null,

      sisiDepan: null,
      sisiBelakang: null,
      sisiKiri: null,
      sisiKanan: null,
      sisiAtas: null,
      sisiBawah: null,
      kodeFoto: null,
      fileGambarEtiket: null,
      previewGambarEtiket: null,

      listJenisBkc: [],
      listBahanKemasan: [
        {
          idBahanKemasan: "KERTAS DAN SEJENISNYA",
          namaBahanKemasan: "KERTAS DAN SEJENISNYA",
          seriPita: "III DP",
        },
        {
          idBahanKemasan: "BOTOL DAN SEJENISNYA",
          namaBahanKemasan: "BOTOL DAN SEJENISNYA",
          seriPita: "III TP",
        },
        {
          idBahanKemasan: "LAINNYA",
          namaBahanKemasan: "LAINNYA",
          seriPita: "III DP",
        },
      ],
      listAsalProdukHt: [
        {
          idAsalProdukHt: "DN",
          namaAsalProdukHt: "IMPOR",
        },
        {
          idAsalProdukHt: "",
          namaAsalProdukHt: "NON IMPOR",
        },
      ],
      listAsalProdukMmea: [
        {
          idAsalProdukMmea: "DALAM_NEGERI",
          namaAsalProdukMmea: "DALAM NEGERI",
        },
        {
          idAsalProdukMmea: "LUAR_NEGERI",
          namaAsalProdukMmea: "LUAR NEGERI / IMPOR",
        },
      ],
      listTujuanPemasaran: [
        {
          idTujuanPemasaran: "DALAM NEGERI",
          namaTujuanPemasaran: "DALAM NEGERI",
        },
        {
          idTujuanPemasaran: "EKSPOR",
          namaTujuanPemasaran: "EKSPOR",
        },
        {
          idTujuanPemasaran: "BAHAN BAKU",
          namaTujuanPemasaran: "BAHAN BAKU",
        },
        {
          idTujuanPemasaran: "LABORATORIUM",
          namaTujuanPemasaran: "LABORATORIUM",
        },
      ],
    };
  }

  componentDidMount() {
    this.getJenisBkc();
    this.getPermohonanTarifDetail();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idJenisProduksiHt !== this.state.idJenisProduksiHt) {
      this.setState({ hjePersatuanHt: this.state.hjePerkemasanHt / this.state.isiHt });
    }
  }

  getPermohonanTarifDetail = async () => {
    const payload = { idTarifMerkHeader: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.permohonanTarifDetail,
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        idJenisBkc: data.idJenisBkc,
        namaJenisBkc: data.namaJenisBkc,
        nomorPermohonan: data.nomorPermohonan,
        tanggalPermohonan: moment(data.tanggalPermohonan),
        namaLokasiPerekaman: data.kotaPermohonan,
        tanggalKep: moment(data.tanggalSkep),
        awalBerlaku: moment(data.awalBerlaku),

        idNppbkc: data.idNppbkc,
        nppbkc: data.nppbkc,
        namaNppbkc: data.namaPerusahaan,
        npwpNppbkc: data.npwp,
        alamatNppbkc: data.alamatPerusahaan,

        idJenisPita: data.idJenisPitaCukai,

        idMerkHt: data.idJenisBkc === 3 ? data.idMerk : null,
        merkHt: data.idJenisBkc === 3 ? data.namaMerk : null,
        idJenisProduksiHt: data.idJenisProduksiBkc,
        kodeJenisProduksiHt: data.jenisProduksiBkc,
        idGolongan: data.idGolongan,
        namaGolongan: data.namaGolongan,
        idJenisHtlRelHt: data.idJenisHtlRel,
        namaJenisHtlRelHt: data.jenisHtlRel,
        satuanJenisHtlRelHt: data.kodeSatuanRel,
        isiHt: data.idJenisBkc === 3 ? data.isiPerkemasan : null,
        beratHt: data.beratVolume,
        hjePerkemasanHt: data.hjePerKemasan,
        hjePersatuanHt: data.hjePerBatang,
        tarifHt: data.idJenisBkc === 3 ? data.tarifSpesifik : null,
        bahanKemasanHt: data.bahanKemasan,
        idAsalProdukHt: data.idJenisBkc === 3 ? (data.asalProduksi === "IMPOR" ? "DN" : "") : null,
        namaAsalProdukHt: data.idJenisBkc === 3 ? data.asalProduksi : null,
        tujuanPemasaranHt: data.tujuanPemasaran,

        idMerkMmea: data.idJenisBkc === 3 ? data.idMerk : null,
        merkMmea: data.idJenisBkc === 2 ? data.namaMerk : null,
        namaNegaraAsalMmea: data.negaraAsal,
        isiMmea: data.idJenisBkc === 2 ? data.isiPerkemasan : null,
        tarifCukaiPerLiter: data.idJenisBkc === 2 ? data.tarifSpesifik : null,
        tarifCukaiPerKemasan: data.tarifPerKemasan,
        idAsalProdukMmea:
          data.idJenisBkc === 2
            ? data.asalProduksi === "DALAM NEGERI"
              ? "DALAM_NEGERI"
              : "LUAR_NEGERI"
            : null,
        namaAsalProdukMmea: data.idJenisBkc === 2 ? data.asalProduksi : null,

        personal: data.personalisasi,
        seriPita: data.seriPita,

        nomorSuratLisensi: data.nomorLisensi,
        tanggalSuratLisensi: moment(data.tanggalLisensi),

        sisiDepan: data.sisiDepan,
        sisiBelakang: data.sisiBelakang,
        sisiKiri: data.sisiKiri,
        sisiKanan: data.sisiKanan,
        sisiAtas: data.sisiAtas,
        sisiBawah: data.sisiBawah,
        kodeFoto: data.kodeFoto,
      });
    }
  };
  getJenisBkc = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisBkc,
      setLoading: (bool) => this.setState({ isJenisBkcLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item) => item);
      newData.splice(0, 1);
      this.setState({ listJenisBkc: newData });
    }
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
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
      fileGambarEtiket: e.target.files[0],
      previewGambarEtiket: URL.createObjectURL(e.target.files[0]),
    });
  };
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      [`id${capitalize(field, false)}`]: value,
      [`nama${capitalize(field, false)}`]: option.props.children,
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
      idLokasiPerekaman: record.idKota,
      namaLokasiPerekaman: record.namaKota,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };
  handleDataNppbkc = (record) => {
    this.setState({
      idNppbkc: record.idNppbkc,
      nppbkc: record.nppbkc,
      namaNppbkc: record.namaNppbkc,
      npwpNppbkc: record.npwpNppbkc,
      alamatNppbkc: record.alamatNppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataJenisPita = (record) => {
    if (this.state.idJenisBkc === 3) {
      this.setState({
        idJenisPita: record.idJenisPita,
        personal: record.personal,
        idJenisProduksiHt: record.idJenisProduksi,
        kodeJenisProduksiHt: record.kodeJenisProduksi,
        idGolongan: record.idGolongan,
        namaGolongan: record.namaGolongan,
        isiHt: record.isi,
        hjePerkemasanHt: record.hje,
        tarifHt: record.tarif,
      });
    } else {
      this.setState({
        idJenisPita: record.idJenisPita,
        personal: record.personal,
        isiMmea: record.isi,
        idGolongan: record.idGolongan,
        namaGolongan: record.namaGolongan,
        tarifCukaiPerLiter: record.tarif,
        tarifCukaiPerKemasan: record.tarif * record.isi,
        seriPita: "MMEA",
      });
    }

    this.handleModalClose("isModalDaftarJenisPitaVisible");
  };
  handleDataHtlRel = (record) => {
    this.setState({
      idJenisHtlRelHt: record.idJenisHtlRel,
      namaJenisHtlRelHt: record.namaJenisHtlRel,
      satuanJenisHtlRelHt: record.satuanJenisHtlRel,
    });
    this.handleModalClose("isModalDaftarHtlRelVisible");
  };
  handleDataNegaraAsal = (record) => {
    this.setState({
      idNegaraAsalMmea: record.idNegara,
      namaNegaraAsalMmea: record.namaNegara,
    });
    this.handleModalClose("isModalDaftarNegaraAsalVisible");
  };

  handleDownload = async () => {
    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: `${endpoints.s3Download}/${this.state.kodeFoto}`,
      setLoading: (bool) => this.setState({ isDownloadLoading: bool }),
      config: { responseType: "blob" },
    });

    if (response) download(response.data, "etiket");
  };

  handleUpdate = async () => {
    const {
      idJenisBkc,
      nomorPermohonan,
      tanggalPermohonan,
      namaLokasiPerekaman,
      tanggalKep,
      awalBerlaku,

      idNppbkc,
      nppbkc,
      namaNppbkc,
      npwpNppbkc,
      alamatNppbkc,

      idJenisPita,

      merkHt,
      idJenisProduksiHt,
      idGolongan,
      idJenisHtlRelHt,
      isiHt,
      beratHt,
      hjePerkemasanHt,
      hjePersatuanHt,
      tarifHt,
      bahanKemasanHt,
      idAsalProdukHt,
      namaAsalProdukHt,
      tujuanPemasaranHt,

      merkMmea,
      namaNegaraAsalMmea,
      isiMmea,
      tarifCukaiPerLiter,
      tarifCukaiPerKemasan,
      idAsalProdukMmea,
      namaAsalProdukMmea,
      personal,
      seriPita,

      nomorSuratLisensi,
      tanggalSuratLisensi,

      sisiDepan,
      sisiBelakang,
      sisiKiri,
      sisiKanan,
      sisiAtas,
      sisiBawah,
      fileGambarEtiket,
    } = this.state;

    const formData = new FormData();

    formData.set("idTarifMerkHeader", this.props.match.params.id);
    formData.set("idJenisBkc", idJenisBkc);
    formData.set("nomorPermohonan", nomorPermohonan);
    formData.set("tanggalPermohonan", moment(tanggalPermohonan, "DD-MM-YYYY").format("YYYY-MM-DD"));
    formData.set("kotaPermohonan", namaLokasiPerekaman);
    formData.set("tanggalSkep", moment(tanggalKep, "DD-MM-YYYY").format("YYYY-MM-DD"));
    formData.set("awalBerlaku", moment(awalBerlaku, "DD-MM-YYYY").format("YYYY-MM-DD"));

    formData.set("idNppbkc", idNppbkc);
    formData.set("nppbkc", nppbkc);
    formData.set("namaPerusahaan", namaNppbkc);
    formData.set("npwp", npwpNppbkc);
    formData.set("alamatPerusahaan", alamatNppbkc);

    formData.set("idJenisPitaCukai ", idJenisPita);

    if (idJenisBkc === 3) {
      if (idJenisProduksiHt === 2 || idJenisProduksiHt === 5) {
        formData.set(
          "namaMerk",
          `${[personal, isiHt, hjePerkemasanHt, idAsalProdukHt, seriPita, tarifHt]
            .filter((str) => str !== null)
            .join("_")}`
        );
      } else {
        formData.set("namaMerk", merkHt);
      }

      formData.set("idJenisPitaCukai", idJenisPita);
      formData.set("seriPita", seriPita);
      formData.set("idJenisProduksiBkc", idJenisProduksiHt);
      formData.set("idGolongan", idGolongan);
      formData.set("isiPerKemasan", isiHt);

      if (idJenisProduksiHt === 2 || idJenisProduksiHt === 5) {
        formData.set("idJenisHtlRel", idJenisHtlRelHt);

        if (idJenisHtlRelHt === 4 || idJenisHtlRelHt === 6) {
          formData.set("beratVolume", beratHt);
        }
      }

      formData.set("hjePerKemasan", hjePerkemasanHt);
      formData.set("hjePerBatang", hjePersatuanHt);
      formData.set("tarifSpesifik", tarifHt);
      formData.set("bahanKemasan", bahanKemasanHt);
      formData.set("asalProduksi", namaAsalProdukHt);
      formData.set("tujuanPemasaran", tujuanPemasaranHt);

      if (idAsalProdukHt === "DN") {
        formData.set("nomorLisensi", nomorSuratLisensi);
        formData.set(
          "tanggalLisensi",
          moment(tanggalSuratLisensi, "DD-MM-YYYY").format("YYYY-MM-DD")
        );
      }

      if (idJenisBkc === 3 && !(idJenisProduksiHt === 2 || idJenisProduksiHt === 5)) {
        formData.set("sisiDepan", sisiDepan);
        formData.set("sisiBelakang", sisiBelakang);
        formData.set("sisiKiri", sisiKiri);
        formData.set("sisiKanan", sisiKanan);
        formData.set("sisiAtas", sisiAtas);
        formData.set("sisiBawah", sisiBawah);
        if (fileGambarEtiket) formData.set("etiket", fileGambarEtiket);
      }
    }

    if (idJenisBkc === 2) {
      formData.set("namaMerk", merkMmea);
      formData.set("asalProduksi", namaAsalProdukMmea);

      if (idAsalProdukMmea === "LUAR_NEGERI") formData.set("negaraAsal", namaNegaraAsalMmea);

      formData.set("isiPerKemasan", isiMmea);
      formData.set("tarifSpesifik", tarifCukaiPerLiter);
      formData.set("tarifPerKemasan", tarifCukaiPerKemasan);
    }

    const response = await requestApi({
      service: "produksi",
      contentType: "formData",
      method: "post",
      endpoint: endpoints.permohonanTarifPerbaikan,
      body: formData,
      setLoading: (bool) => this.setState({ isUpdateLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/permohonan-tarif`);
    }
  };

  render() {
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Permohonan Tarif Perbaikan">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis BKC</FormLabel>
                </div>
                <Select
                  id="jenisBkc"
                  value={this.state.idJenisBkc}
                  onChange={(value, option) => {
                    this.handleSelectCustomChange("jenisBkc", value, option);
                    this.setState({
                      idJenisPita: null,

                      idMerkHt: null,
                      merkHt: null,
                      idJenisProduksiHt: null,
                      kodeJenisProduksiHt: null,
                      idGolongan: null,
                      namaGolongan: null,
                      idJenisHtlRelHt: null,
                      namaJenisHtlRelHt: null,
                      satuanJenisHtlRelHt: null,
                      isiHt: null,
                      beratHt: null,
                      hjePerkemasanHt: null,
                      hjePersatuanHt: null,
                      tarifHt: null,
                      bahanKemasanHt: null,
                      idAsalProdukHt: null,
                      namaAsalProdukHt: null,
                      tujuanPemasaranHt: null,

                      idMerkMmea: null,
                      merkMmea: null,
                      idNegaraAsalMmea: null,
                      namaNegaraAsalMmea: null,
                      isiMmea: null,
                      tarifCukaiPerLiter: null,
                      tarifCukaiPerKemasan: null,
                      idAsalProdukMmea: null,
                      namaAsalProdukMmea: null,

                      personal: null,
                      seriPita: null,

                      nomorSuratLisensi: null,
                      tanggalSuratLisensi: null,

                      sisiDepan: null,
                      sisiBelakang: null,
                      sisiKiri: null,
                      sisiKanan: null,
                      sisiAtas: null,
                      sisiBawah: null,
                      fileGambarEtiket: null,
                      previewGambarEtiket: null,
                    });
                  }}
                  style={{ width: "100%" }}
                  loading={this.state.isJenisBkcLoading}
                >
                  {this.state.listJenisBkc.length > 0 &&
                    this.state.listJenisBkc.map((item, index) => (
                      <Select.Option key={`jenisBkc-${index}`} value={item.idJenisBkc}>
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
                  id="nomorPermohonan"
                  onChange={this.handleInputChange}
                  value={this.state.nomorPermohonan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Permohonan</FormLabel>
                </div>
                <DatePicker
                  id="tanggalPermohonan"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("tanggalPermohonan", date)}
                  value={this.state.tanggalPermohonan}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Lokasi Perekaman</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="lokasiPerekaman" value={this.state.namaLokasiPerekaman} disabled />
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
                  id="tanggalKep"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("tanggalKep", date)}
                  value={this.state.tanggalKep}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="awalBerlaku"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("awalBerlaku", date)}
                  value={this.state.awalBerlaku}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
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
                    disabled={!this.state.idJenisBkc}
                  >
                    Cari
                  </Button>
                  <Input id="namaPerusahaan" value={this.state.namaNppbkc} disabled />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPWP</FormLabel>
                </div>
                <Input id="npwpNppbkc" value={this.state.npwpNppbkc} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Alamat</FormLabel>
                </div>
                <Input id="alamatNppbkc" value={this.state.alamatNppbkc} disabled />
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle3} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis Pita</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input
                    id="jenisPita"
                    value={`${[
                      this.state.personal,
                      this.state.isiHt || this.state.isiMmea,
                      this.state.seriPita,
                      this.state.tarifHt || this.state.tarifCukaiPerLiter,
                    ]
                      .filter((str) => str !== null)
                      .join("_")}`}
                    disabled
                  />

                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarJenisPitaVisible")}
                    disabled={!this.state.idJenisBkc}
                  >
                    Cari
                  </Button>
                </div>
              </Col>

              {this.state.idJenisBkc === 3 && (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Merk HT</FormLabel>
                  </div>
                  {this.state.idJenisProduksiHt === 2 || this.state.idJenisProduksiHt === 5 ? (
                    <Input
                      id="merkHt"
                      value={`${[
                        this.state.personal,
                        this.state.isiHt,
                        this.state.hjePerkemasanHt,
                        this.state.idAsalProdukHt,
                        this.state.seriPita,
                        this.state.tarifHt,
                      ]
                        .filter((str) => str !== null)
                        .join("_")}`}
                      disabled
                    />
                  ) : (
                    <Input
                      id="merkHt"
                      onChange={this.handleInputChange}
                      value={this.state.merkHt}
                      disabled={!this.state.idJenisProduksiHt}
                    />
                  )}
                </Col>
              )}

              {this.state.idJenisBkc === 3 && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input
                        id="jenisProduksiHt"
                        value={
                          this.state.kodeJenisProduksiHt && this.state.namaGolongan
                            ? `${this.state.kodeJenisProduksiHt} - ${this.state.namaGolongan}`
                            : this.state.kodeJenisProduksiHt
                        }
                        disabled
                      />
                      {(this.state.idJenisProduksiHt === 2 ||
                        this.state.idJenisProduksiHt === 5) && (
                        <>
                          <Button
                            type="primary"
                            onClick={() => this.handleModalShow("isModalDaftarHtlRelVisible")}
                          >
                            {this.state.kodeJenisProduksiHt}
                          </Button>
                          <Input
                            id="namaJenisHtlRelHt"
                            value={this.state.namaJenisHtlRelHt}
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
                        id="isiHt"
                        value={this.state.isiHt}
                        style={{ width: "100%" }}
                        disabled
                      />

                      {this.state.satuanJenisHtlRelHt && (
                        <div>{this.state.satuanJenisHtlRelHt}</div>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Berat / Volume (per kemasan)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="beratHt"
                        value={this.state.beratHt}
                        style={{ width: "100%" }}
                        disabled={
                          !(this.state.idJenisHtlRelHt === 4 || this.state.idJenisHtlRelHt === 6)
                        }
                      />

                      {(this.state.idJenisHtlRelHt === 4 || this.state.idJenisHtlRelHt === 6) && (
                        <div>{this.state.satuanJenisHtlRelHt}</div>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE per kemasan</FormLabel>
                    </div>
                    <InputNumber
                      id="hjePerkemasanHt"
                      value={this.state.hjePerkemasanHt}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE / satuan</FormLabel>
                    </div>
                    <InputNumber
                      id="hjePersatuanHt"
                      value={this.state.hjePersatuanHt}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Spesifik</FormLabel>
                    </div>
                    <InputNumber
                      id="tarifHt"
                      value={this.state.tarifHt}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Bahan Kemasan</FormLabel>
                    </div>
                    <Select
                      id="bahanKemasanHt"
                      onChange={(value) => {
                        const spiltValue = value.split("-");
                        this.handleSelectChange("bahanKemasanHt", spiltValue[0]);
                        this.handleSelectChange("seriPita", spiltValue[1]);
                      }}
                      value={this.state.bahanKemasanHt}
                      style={{ width: "100%" }}
                    >
                      {this.state.listBahanKemasan.length > 0 &&
                        this.state.listBahanKemasan.map((item, index) => (
                          <Select.Option
                            key={`bahanKemasan-${index}`}
                            value={`${item.idBahanKemasan}-${item.seriPita}`}
                          >
                            {item.namaBahanKemasan}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Asal Produk</FormLabel>
                    </div>
                    <Select
                      id="asalProdukHt"
                      onChange={(value, option) => {
                        this.handleSelectCustomChange("asalProdukHt", value, option);
                      }}
                      value={this.state.idAsalProdukHt}
                      style={{ width: "100%" }}
                    >
                      {this.state.listAsalProdukHt.length > 0 &&
                        this.state.listAsalProdukHt.map((item, index) => (
                          <Select.Option key={`asalProdukHt-${index}`} value={item.idAsalProdukHt}>
                            {item.namaAsalProdukHt}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tujuan Pemasaran</FormLabel>
                    </div>
                    <Select
                      id="tujuanPemasaranHt"
                      onChange={(value) => this.handleSelectChange("tujuanPemasaranHt", value)}
                      value={this.state.tujuanPemasaranHt}
                      style={{ width: "100%" }}
                    >
                      {this.state.listTujuanPemasaran.length > 0 &&
                        this.state.listTujuanPemasaran.map((item, index) => (
                          <Select.Option
                            key={`tujuan-pemasaran-${index}`}
                            value={item.idTujuanPemasaran}
                          >
                            {item.namaTujuanPemasaran}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  {this.state.idAsalProdukHt === "DN" && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor Surat Lisensi Pemegang Merk</FormLabel>
                        </div>
                        <Input
                          id="nomorSuratLisensi"
                          onChange={this.handleInputChange}
                          value={this.state.nomorSuratLisensi}
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Surat Lisensi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggalSuratLisensi"
                          format="DD-MM-YYYY"
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggalSuratLisensi", date)
                          }
                          value={this.state.tanggalSuratLisensi}
                          style={{ width: "100%" }}
                        />
                      </Col>
                    </>
                  )}
                </>
              )}

              {this.state.idJenisBkc === 2 && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk MMEA</FormLabel>
                    </div>
                    <Input
                      id="merkMmea"
                      onChange={this.handleInputChange}
                      value={this.state.merkMmea}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Asal Produk</FormLabel>
                    </div>
                    <Select
                      id="asalProdukMmea"
                      onChange={(value, option) => {
                        this.handleSelectCustomChange("asalProdukMmea", value, option);
                      }}
                      value={this.state.idAsalProdukMmea}
                      style={{ width: "100%" }}
                    >
                      {this.state.listAsalProdukMmea.length > 0 &&
                        this.state.listAsalProdukMmea.map((item, index) => (
                          <Select.Option
                            key={`asalProdukMmea-${index}`}
                            value={item.idAsalProdukMmea}
                          >
                            {item.namaAsalProdukMmea}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  {this.state.idAsalProdukMmea === "LUAR_NEGERI" && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Negara Asal</FormLabel>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Input
                          id="namaNegaraAsalMmea"
                          value={this.state.namaNegaraAsalMmea}
                          disabled
                        />
                        <Button
                          type="default"
                          icon="menu"
                          onClick={() => this.handleModalShow("isModalDaftarNegaraAsalVisible")}
                        />
                      </div>
                    </Col>
                  )}

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="isiMmea"
                        value={this.state.isiMmea}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>ml</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Input
                      id="namaGolongan"
                      onChange={this.handleInputChange}
                      value={this.state.namaGolongan}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Per Liter</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="tarifCukaiPerLiter"
                        value={this.state.tarifCukaiPerLiter}
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
                        id="tarifCukaiPerKemasan"
                        value={this.state.tarifCukaiPerKemasan}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>(Rp)</div>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </Card>

          {this.state.idJenisBkc === 3 &&
            !(this.state.idJenisProduksiHt === 2 || this.state.idJenisProduksiHt === 5) && (
              <Card title={this.state.subtitle4} style={{ marginBottom: 30 }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Depan</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisiDepan"
                          onChange={this.handleInputChange}
                          value={this.state.sisiDepan}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Belakang</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisiBelakang"
                          onChange={this.handleInputChange}
                          value={this.state.sisiBelakang}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Kiri</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisiKiri"
                          onChange={this.handleInputChange}
                          value={this.state.sisiKiri}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Kanan</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisiKanan"
                          onChange={this.handleInputChange}
                          value={this.state.sisiKanan}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Atas</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisiAtas"
                          onChange={this.handleInputChange}
                          value={this.state.sisiAtas}
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Bawah</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisiBawah"
                          onChange={this.handleInputChange}
                          value={this.state.sisiBawah}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Etiket</FormLabel>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <Button
                        type="primary"
                        loading={this.state.isDownloadLoading}
                        onClick={this.handleDownload}
                        disabled={!this.state.kodeFoto}
                      >
                        Download
                      </Button>
                    </div>

                    <input id="etiket" name="etiket" type="file" onChange={this.handleUploadFile} />

                    {this.state.previewGambarEtiket && (
                      <div style={{ marginTop: 20 }}>
                        <img
                          src={this.state.previewGambarEtiket}
                          alt="Foto Etiket"
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
              </Card>
            )}

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>

            <Col span={4}>
              <Button
                type="primary"
                loading={this.state.isUpdateLoading}
                onClick={this.handleUpdate}
                block
              >
                Update
              </Button>
            </Col>
          </Row>
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
          idJenisBkc={this.state.idJenisBkc}
        />

        <ModalDaftarJenisPita
          isVisible={this.state.isModalDaftarJenisPitaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarJenisPitaVisible")}
          onDataDoubleClick={this.handleDataJenisPita}
          idJenisBkc={this.state.idJenisBkc}
        />

        <ModalDaftarHtlRel
          id={this.state.idJenisProduksiHt}
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
