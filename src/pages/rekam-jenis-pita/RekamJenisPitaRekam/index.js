import { Button, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import ModalDaftarNPPBKC from "../ModalDaftarNppbkc";
import { pathName } from "configs/constants";

export default class RekamJenisPitaRekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Permohonan",

      isRekamLoading: false,
      isJenisProduksiLoading: true,
      isModalDaftarNppbkcVisible: false,

      nppbkc_id: "",
      nppbkc: "",
      nama_nppbkc: "",

      jenis_produksi_id: "",
      jenis_produksi_name: "",
      hje: "",
      isi: "",
      tarif: "",
      awal_berlaku: null,
      warna: "",
      tahun_pita: String(new Date().getFullYear()),

      list_jenis_produksi: [],
    };
  }

  componentDidMount() {
    this.getJenisProduksi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.jenis_produksi_id !== this.state.jenis_produksi_id ||
      prevState.hje !== this.state.hje ||
      prevState.isi !== this.state.isi ||
      prevState.tarif !== this.state.tarif ||
      prevState.warna !== this.state.warna
    ) {
      if (this.state.jenis_produksi_id && this.state.hje && this.state.isi) {
        this.getTarifWarna();
      } else {
        this.setState({ tarif: "", warna: "" });
      }
    }
  }

  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-produksi",
      params: { idJenisBkc: 3 },
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ list_jenis_produksi: response.data.data });
  };
  getTarifWarna = async () => {
    const timeout = setTimeout(() => {
      this.setState({
        tarif: 1000,
        warna: "Hijau",
      });
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
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };

  validationForm = () => {
    return true;
  };

  handleRekam = async () => {
    this.setState({ isRekamLoading: true });
    const timeout = setTimeout(() => {
      this.setState({ isRekamLoading: false });
      notification.success({ message: "Success", description: "Success" });
      this.props.history.push(`${pathName}/rekam-jenis-pita`);
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container menuName="Rekam Jenis Pita" contentName="Rekam" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
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
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Produksi</FormLabel>
                  </div>
                  <Select
                    id="jenis_produksi"
                    value={this.state.jenis_produksi_id}
                    loading={this.state.isJenisProduksiLoading}
                    onChange={(value, option) =>
                      this.handleSelectCustomChange("jenis_produksi", value, option)
                    }
                    style={{ width: "100%" }}
                  >
                    {this.state.list_jenis_produksi.length > 0 &&
                      this.state.list_jenis_produksi.map((item, index) => (
                        <Select.Option key={`jenis-produksi-${index}`} value={item.idJenisProduksi}>
                          {item.namaJenisProduksi}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>HJE</FormLabel>
                  </div>
                  <InputNumber
                    id="hje"
                    onChange={(value) => this.handleInputNumberChange("hje", value)}
                    value={this.state.hje}
                    style={{ width: "100%" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Isi Per Kemasan</FormLabel>
                  </div>
                  <InputNumber
                    id="isi"
                    onChange={(value) => this.handleInputNumberChange("isi", value)}
                    value={this.state.isi}
                    style={{ width: "100%" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tarif Cukai</FormLabel>
                  </div>
                  <InputNumber
                    id="tarif"
                    value={this.state.tarif}
                    onChange={(value) => this.handleInputNumberChange("tarif", value)}
                    style={{ width: "100%" }}
                    disabled
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Awal Berlaku</FormLabel>
                  </div>
                  <DatePicker
                    id="warna"
                    format="DD-MM-YYYY"
                    value={this.state.awal_berlaku}
                    onChange={(date) => this.handleDatepickerChange("awal_berlaku", date)}
                    style={{ width: "100%" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Warna</FormLabel>
                  </div>
                  <Input id="warna" value={this.state.warna} style={{ width: "100%" }} disabled />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tahun Pita</FormLabel>
                  </div>
                  <Input
                    id="tahun_pita"
                    value={this.state.tahun_pita}
                    style={{ width: "100%" }}
                    disabled
                  />
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
              <Col span={4}>
                <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
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
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />
      </>
    );
  }
}
