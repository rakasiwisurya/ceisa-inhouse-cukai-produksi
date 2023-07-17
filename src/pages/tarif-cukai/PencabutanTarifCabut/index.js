import { Button, Col, DatePicker, Input, Row, Select, notification } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import { pathName } from "configs/constants";
import React, { Component } from "react";
import ModalDaftarKota from "../ModalDaftarKota";
import ModalDaftarNPPBKC from "../ModalDaftarNppbkc";
import ModalDaftarMerk from "../ModalDaftarMerk";
import moment from "moment";
import ButtonCustom from "components/Button/ButtonCustom";

export default class PencabutanTarifCabut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pabrik / Importir",
      subtitle2: "Detail Merk",
      subtitle3: "Pencabutan",

      isCabutLoading: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkVisible: false,
      isModalDaftarKotaVisible: false,

      nppbkc_id: "",
      nppbkc: "",
      nama_nppbkc: "",
      alamat_nppbkc: "",

      nama_merk: "",
      nomor_kep: "",
      tanggal_kep: null,
      jenis_produksi: "",
      seri_pita: "",
      tarif: "",
      hje: "",
      isi: "",
      berat: "",
      awal_berlaku: null,
      tanggal_pesan_akhir: null,

      nomor_permohonan: "",
      tanggal_permohonan: null,
      kota_id: "",
      kota_name: "",
      tanggal_kep_pencabutan: null,
      akhir_berlaku: null,
      keterangan_pencabutan: "",
      asal_merk_id: "",
      asal_merk_name: "",

      list_kota: [],
      list_asal_merk: [
        {
          asal_merk_id: "PENETAPAN TARIF CUKAI HASIL TEMBAKAU UNTUK MERK BARU",
          asal_merk_name: "Penetapan Tarif Cukai Hasil Tembakau Untuk Merk Baru",
        },
        {
          asal_merk_id: "PENETAPAN PENYESUAIAN TARIF CUKAI HASIL TEMBAKAU",
          asal_merk_name: "Penetapan Penyesuaian Tarif Cukai Hasil Tembakau",
        },
      ],
    };
  }

  componentDidMount() {
    this.getJenisProduksi();
  }

  getJenisProduksi = async () => {
    console.log("jenis_produksi");
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

  handleDataNppbkc = (record) => {
    this.setState({
      nppbkc_id: record.nppbkc_id,
      nppbkc: record.nppbkc,
      nama_nppbkc: record.nama_nppbkc,
      alamat_nppbkc: record.alamat_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataMerk = (record) => {
    this.setState({
      nama_merk: record.nama_merk,
      nomor_kep: record.nomor_kep,
      tanggal_kep: moment(record.tanggal_kep, "DD-MM-YYYY"),
      jenis_produksi: record.jenis_produksi,
      seri_pita: record.seri_pita,
      tarif: record.tarif,
      hje: record.hje,
      isi: record.isi,
      berat: record.berat,
      awal_berlaku: moment(record.awal_berlaku, "DD-MM-YYYY"),
      tanggal_pesan_akhir: moment(record.tanggal_pesan_akhir, "DD-MM-YYYY"),
    });
    this.handleModalClose("isModalDaftarMerkVisible");
  };
  handleDataKota = (record) => {
    this.setState({
      kota_id: record.kota_id,
      kota_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };

  validationForm = () => {
    return true;
  };

  handleCabut = async () => {
    this.setState({ isCabutLoading: true });
    const timeout = setTimeout(() => {
      this.setState({ isCabutLoading: false });
      notification.success({ message: "Success", description: "Success" });
      this.props.history.push(`${pathName}/pencabutan-tarif`);
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Pencabutan Tarif" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
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
                <Input.TextArea id="alamat_nppbkc" value={this.state.alamat_nppbkc} disabled />
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
                  <FormLabel>Nama Merk</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="nama_merk" value={this.state.nama_merk} disabled />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarMerkVisible")}
                  >
                    Cari
                  </Button>
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor KEP</FormLabel>
                </div>
                <Input id="nomor_kep" value={this.state.nomor_kep} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal KEP</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_kep"
                  format="DD-MM-YYYY"
                  value={this.state.tanggal_kep}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis Produksi</FormLabel>
                </div>
                <Input id="jenis_produksi" value={this.state.jenis_produksi} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Seri Pita</FormLabel>
                </div>
                <Input id="seri_pita" value={this.state.seri_pita} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Seri Pita</FormLabel>
                </div>
                <Input id="tarif" value={this.state.tarif} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>HJE</FormLabel>
                </div>
                <Input id="hje" value={this.state.hje} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Isi Kemasan</FormLabel>
                </div>
                <Input id="isi" value={this.state.isi} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Berat / Volume</FormLabel>
                </div>
                <Input id="berat" value={this.state.berat} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="awal_berlaku"
                  format="DD-MM-YYYY"
                  value={this.state.awal_berlaku}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Pesan Akhir</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_pesan_akhir"
                  format="DD-MM-YYYY"
                  value={this.state.tanggal_pesan_akhir}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle3}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Permohonan</FormLabel>
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
                  value={this.state.tanggal_permohonan}
                  onChange={(date) => this.handleDatepickerChange("tanggal_permohonan", date)}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Lokasi Pencabutan</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="kota_name" value={this.state.kota_name} disabled />
                  <Button
                    type="default"
                    icon="menu"
                    onClick={() => this.handleModalShow("isModalDaftarKotaVisible")}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal KEP Pencabutan</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_kep_pencabutan"
                  format="DD-MM-YYYY"
                  value={this.state.tanggal_kep_pencabutan}
                  onChange={(date) => this.handleDatepickerChange("tanggal_kep_pencabutan", date)}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Akhir Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="akhir_berlaku"
                  format="DD-MM-YYYY"
                  value={this.state.akhir_berlaku}
                  onChange={(date) => this.handleDatepickerChange("akhir_berlaku", date)}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Keterangan Pencabutan</FormLabel>
                </div>
                <Input.TextArea
                  id="keterangan_pencabutan"
                  onChange={this.handleInputChange}
                  value={this.state.keterangan_pencabutan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Keterangan Pencabutan</FormLabel>
                </div>
                <Select
                  id="asal_merk"
                  value={this.state.asal_merk_id}
                  onChange={(value, option) => {
                    this.handleSelectCustomChange("asal_merk", value, option);
                  }}
                  style={{ width: "100%" }}
                >
                  {this.state.list_asal_merk.length > 0 &&
                    this.state.list_asal_merk.map((item, index) => (
                      <Select.Option key={`asal-merk-${index}`} value={item.asal_merk_id}>
                        {item.asal_merk_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
              <Col span={4}>
                <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                  Kembali
                </ButtonCustom>
              </Col>

              <Col span={5}>
                <Button
                  type="danger"
                  loading={this.state.isCabutLoading}
                  onClick={this.handleCabut}
                  disabled={!this.validationForm()}
                  block
                >
                  Simpan Pencabutan
                </Button>
              </Col>
            </Row>
          </div>
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />

        <ModalDaftarMerk
          isVisible={this.state.isModalDaftarMerkVisible}
          onCancel={() => this.handleModalClose("isModalDaftarMerkVisible")}
          onDataDoubleClick={this.handleDataMerk}
        />

        <ModalDaftarKota
          isVisible={this.state.isModalDaftarKotaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarKotaVisible")}
          onDataDoubleClick={this.handleDataKota}
        />
      </>
    );
  }
}
