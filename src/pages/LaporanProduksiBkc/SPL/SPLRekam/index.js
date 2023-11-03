import { Button, Card, Col, DatePicker, Input, Row, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import ModalDaftarKota from "components/ModalDaftarKota";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class SPLRekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Pernyataan Libur",
      cardTitle1: "Data Pemohon",
      cardTitle2: "Data Pabrik",
      cardTitle3: "Pernyataan",

      isRekamLoading: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarKotaVisible: false,

      nomorSpl: null,
      tanggalSpl: null,
      namaPengusaha: null,
      jabatan: null,
      alamatPengusaha: null,

      idNppbkc: null,
      namaNppbkc: null,
      nppbkc: null,
      alamatNppbkc: null,

      awalLibur: null,
      akhirLibur: null,
      tanggalPernyataan: null,
      idKotaPernyataan: null,
      namaKotaPernyataan: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataNppbkc = (record) => {
    this.setState({
      idNppbkc: record.idNppbkc,
      nppbkc: record.nppbkc,
      namaNppbkc: record.namaNppbkc,
      alamatNppbkc: record.alamatNppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataKota = (record) => {
    this.setState({
      idKotaPernyataan: record.idKota,
      namaKotaPernyataan: record.namaKota,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };

  handleRekam = async () => {
    const {
      nomorSpl,
      tanggalSpl,
      namaPengusaha,
      jabatan,
      alamatPengusaha,

      idNppbkc,
      namaNppbkc,
      nppbkc,
      alamatNppbkc,

      awalLibur,
      akhirLibur,
      tanggalPernyataan,
      namaKotaPernyataan,
    } = this.state;

    const payload = {
      nomorSpl: nomorSpl,
      tanggalSpl: moment(tanggalSpl).format("YYYY-MM-DD HH:mm:ss.SSS"),
      namaPengusaha: namaPengusaha,
      jabatanPengusaha: jabatan,
      alamatPengusaha: alamatPengusaha,
      idNppbkc: idNppbkc,
      namaPerusahaan: namaNppbkc,
      nppbkc: nppbkc,
      alamatPerusahaan: alamatNppbkc,
      awalLibur: moment(awalLibur).format("YYYY-MM-DD HH:mm:ss.SSS"),
      akhirLibur: moment(akhirLibur).format("YYYY-MM-DD HH:mm:ss.SSS"),
      tanggalPernyataan: moment(tanggalPernyataan).format("YYYY-MM-DD HH:mm:ss.SSS"),
      tempatPernyataan: namaKotaPernyataan,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/spl/rekam",
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/spl`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC" contentName="SPL Rekam" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Card title={this.state.cardTitle1} style={{ height: 563 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor SPL</FormLabel>
                    </div>
                    <Input
                      id="nomorSpl"
                      onChange={this.handleInputChange}
                      value={this.state.nomorSpl}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal SPL</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalSpl"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalSpl}
                      onChange={(date) => this.handleDatepickerChange("tanggalSpl", date)}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Pengusaha</FormLabel>
                    </div>
                    <Input
                      id="namaPengusaha"
                      onChange={this.handleInputChange}
                      value={this.state.namaPengusaha}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jabatan</FormLabel>
                    </div>
                    <Input
                      id="jabatan"
                      onChange={this.handleInputChange}
                      value={this.state.jabatan}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea
                      id="alamatPengusaha"
                      onChange={this.handleInputChange}
                      value={this.state.alamatPengusaha}
                    />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title={this.state.cardTitle2} style={{ height: 563 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Perusahaan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
                      <Button
                        type="default"
                        icon="menu"
                        onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea id="alamatNppbkc" value={this.state.alamatNppbkc} disabled />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Card title={this.state.cardTitle3}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Libur</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DatePicker
                        id="awalLibur"
                        format="DD-MM-YYYY"
                        value={this.state.awalLibur}
                        onChange={(date) => this.handleDatepickerChange("awalLibur", date)}
                        style={{ width: "100%" }}
                      />
                      <div>s.d</div>
                      <DatePicker
                        id="akhirLibur"
                        format="DD-MM-YYYY"
                        value={this.state.akhirLibur}
                        onChange={(date) => this.handleDatepickerChange("akhirLibur", date)}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal, Tempat</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <DatePicker
                        id="tanggalPernyataan"
                        format="DD-MM-YYYY"
                        value={this.state.tanggalPernyataan}
                        onChange={(date) => this.handleDatepickerChange("tanggalPernyataan", date)}
                      />
                      <div>,</div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Input
                          id="namaKotaPernyataan"
                          value={this.state.namaKotaPernyataan}
                          disabled
                        />
                        <Button
                          type="default"
                          icon="menu"
                          onClick={() => this.handleModalShow("isModalDaftarKotaVisible")}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
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

        <ModalDaftarKota
          isVisible={this.state.isModalDaftarKotaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarKotaVisible")}
          onDataDoubleClick={this.handleDataKota}
        />
      </>
    );
  }
}
