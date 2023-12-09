import { Button, Card, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { capitalize } from "utils/formatter";
import { requestApi } from "utils/requestApi";

export default class RekamJenisPitaPembatalan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subtitle1: "Permohonan",
      subtitle2: "Dasar Pembatalan",

      isDetailLoading: true,
      isPembatalanLoading: false,
      isJenisProduksiLoading: true,
      isTarifLoading: false,
      isWarnaLoading: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarPenjabatBcVisible: false,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      idJenisBkc: null,
      personalNppbkc: null,

      idJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      hje: null,
      isiKemasan: null,
      tarif: null,
      awalBerlaku: null,
      warna: null,
      kodeWarna: null,
      idSeriPita: null,
      namaSeriPita: null,
      tahunPita: String(new Date().getFullYear()),

      nomorPembatalan: null,
      tanggalPembatalan: null,
      nipPenjabatBc: null,
      namaPenjabatBc: null,
      keterangan: null,
      filePembatalan: null,

      listJenisProduksiBkc: [],
      listSeriPita: [],
    };
  }

  componentDidMount() {
    this.getDetailRekamJenisPita();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idNppbkc !== this.state.idNppbkc) {
      this.getJenisProduksi();
    }

    if (prevState.idJenisBkc !== this.state.idJenisBkc) {
      this.getSeripita();

      if (this.state.idJenisBkc === 2) {
        this.setState({ hje: 0 });
      }
    }

    if (
      prevState.listSeriPita?.length !== this.state.listSeriPita?.length ||
      prevState.idJenisBkc !== this.state.idJenisBkc
    ) {
      if (this.state.idJenisBkc === 2 && this.state.listSeriPita?.length > 0)
        this.setState({
          idSeriPita: this.state.listSeriPita[0]?.idSeripita,
          namaSeriPita: this.state.listSeriPita[0]?.namaSeripita,
        });
    }

    if (
      prevState.idJenisProduksiBkc !== this.state.idJenisProduksiBkc ||
      prevState.hje !== this.state.hje
    ) {
      this.setState({ tarif: null, warna: null });
    }
  }

  getDetailRekamJenisPita = async () => {
    const payload = { idJenisPita: this.props.match.params.id };

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: endpoints.jenisPitaDetail,
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        idNppbkc: data.idNppbkc,
        nppbkc: data.nppbkc,
        namaNppbkc: data.namaPerusahaan,
        idJenisBkc: data.idJenisBkc,
        personalNppbkc: data.personalisasi,

        idJenisProduksiBkc: `${data.idJenisProduksiBkc}-${data.idGolonganBkc}-${data.kodeSatuan}`,
        namaJenisProduksiBkc: `${data.kodeJenisProduksiBkc} - ${data.namaGolonganBkc}`,
        hje: data.hje,
        isiKemasan: data.isiVolume,
        tarif: data.tarif,
        awalBerlaku: moment(data.awalBerlaku),
        warna: data.warna,
        kodeWarna: data.kodeWarna,
        tahunPita: data.tahunPita,
        idSeriPita: data.idSeripita,
        namaSeriPita: data.namaSeripita,
      });

      this.setState({ tarif: data.tarif, warna: data.warna, kodeWarna: data.kodeWarna });
    }
  };
  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisProduksiByNppbkc,
      params: { idNppbkc: this.state.idNppbkc },
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ listJenisProduksiBkc: response.data.data });
  };
  getTarifWarna = () => {
    this.getTarif();
    this.getWarna();
  };
  getTarif = async () => {
    const payload = {
      kodeJenisProduksiBkc: this.state.namaJenisProduksiBkc.split("-")[0].trim(),
      idGolonganBkc: this.state.idJenisProduksiBkc.split("-")[1],
    };

    if (this.state.idJenisBkc === 3) payload.hje = this.state.hje;

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listTarifByJenisProduksiGolonganHje,
      params: payload,
      setLoading: (bool) => this.setState({ isTarifLoading: bool }),
    });

    if (response) {
      this.setState({ tarif: response.data.data?.tarif });
    }
  };
  getWarna = async () => {
    const payload = {
      kodeJenisProduksiBkc: this.state.namaJenisProduksiBkc.split("-")[0].trim(),
      idGolonganBkc: this.state.idJenisProduksiBkc.split("-")[1],
    };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listWarnaByJenisProduksiGolongan,
      params: payload,
      setLoading: (bool) => this.setState({ isWarnaLoading: bool }),
    });

    if (response) {
      this.setState({ warna: response.data.data.warna, kodeWarna: response.data.data?.kodeWarna });
    }
  };
  getSeripita = async () => {
    const payload = { idJenisBkc: this.state.idJenisBkc };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listSeriPita,
      params: payload,
      setLoading: (bool) => this.setState({ isSeripitaLoading: bool }),
    });

    if (response) this.setState({ listSeriPita: response.data.data });
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

  handleDataNppbkc = (record) => {
    this.setState({
      idNppbkc: record.idNppbkc,
      nppbkc: record.nppbkc,
      namaNppbkc: record.namaNppbkc,
      idJenisBkc: record.idJenisBkc,
      personalNppbkc: record.personalNppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataPenjabatBc = (record) => {
    this.setState({
      nipPenjabatBc: record.nipPenjabatBc,
      namaPenjabatBc: record.namaPenjabatBc,
    });
    this.handleModalClose("isModalDaftarPenjabatBcVisible");
  };

  handleUploadFilePembatalan = (e) => {
    this.setState({ filePembatalan: e.target.files[0] });
  };

  handlePembatalan = async () => {
    const {
      nomorPembatalan,
      tanggalPembatalan,
      nipPenjabatBc,
      namaPenjabatBc,
      keterangan,
      filePembatalan,
    } = this.state;

    const formData = new FormData();
    formData.set("idJenisPitaCukai", this.props.match.params.id);
    formData.set("nomorPembatalan", nomorPembatalan);
    formData.set("tanggalPembatalan", moment(tanggalPembatalan).format("YYYY-MM-DD"));
    formData.set("nip", nipPenjabatBc);
    formData.set("namaPemeriksa", namaPenjabatBc);
    formData.set("keterangan", keterangan);
    if (filePembatalan) formData.set("filePembatalan", filePembatalan);

    const response = await requestApi({
      service: "pita_cukai",
      method: "post",
      endpoint: endpoints.jenisPitaPembatalan,
      body: formData,
      setLoading: (bool) => this.setState({ isPembatalanLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/rekam-jenis-pita`);
    }
  };

  render() {
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Jenis Pita" contentName="Jenis Pita Pembatalan">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPPBKC</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
                </div>
              </Col>
            </Row>

            {this.state.idNppbkc && (
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Produksi</FormLabel>
                  </div>
                  <Select
                    id="jenisProduksiBkc"
                    value={this.state.idJenisProduksiBkc}
                    loading={this.state.isJenisProduksiLoading}
                    onChange={(value, option) => {
                      this.handleSelectCustomChange("jenisProduksiBkc", value, option);
                    }}
                    style={{ width: "100%" }}
                    disabled
                  >
                    {this.state.listJenisProduksiBkc.length > 0 &&
                      this.state.listJenisProduksiBkc.map((item, index) => (
                        <Select.Option
                          key={`jenisProduksiBkc-${index}`}
                          value={`${item.idJenisProduksiBkc}-${item.idGolonganBkc}-${item.kodeSatuan}`}
                        >
                          {`${item.kodeJenisProduksi} - ${item.namaGolonganBkc}`}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>HJE</FormLabel>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <InputNumber
                      id="hje"
                      onChange={(value) => this.handleInputNumberChange("hje", value)}
                      value={this.state.hje}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Isi Per Kemasan</FormLabel>
                  </div>

                  <InputNumber
                    id="isiKemasan"
                    onChange={(value) => this.handleInputNumberChange("isiKemasan", value)}
                    value={this.state.isiKemasan}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>

                <Col span={12}>
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
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Awal Berlaku</FormLabel>
                  </div>
                  <DatePicker
                    id="awalBerlaku"
                    format="DD-MM-YYYY"
                    value={this.state.awalBerlaku}
                    onChange={(date) => this.handleDatepickerChange("awalBerlaku", date)}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Warna</FormLabel>
                  </div>
                  <Input id="warna" value={this.state.warna} style={{ width: "100%" }} disabled />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Seri Pita</FormLabel>
                  </div>
                  <Select
                    id="seriPita"
                    value={this.state.idSeriPita}
                    loading={this.state.isSeripitaLoading}
                    onChange={(value, option) => {
                      this.handleSelectCustomChange("seriPita", value, option);
                    }}
                    style={{ width: "100%" }}
                    disabled
                  >
                    {this.state.listSeriPita.length > 0 &&
                      this.state.listSeriPita.map((item, index) => (
                        <Select.Option key={`seriPita-${index}`} value={item.idSeripita}>
                          {item.namaSeripita}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tahun Pita</FormLabel>
                  </div>
                  <Input
                    id="tahunPita"
                    value={this.state.tahunPita}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>
              </Row>
            )}
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Pembatalan</FormLabel>
                </div>
                <Input
                  id="nomorPembatalan"
                  value={this.state.nomorPembatalan}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Pembatalan</FormLabel>
                </div>
                <DatePicker
                  id="tanggalPembatalan"
                  format="DD-MM-YYYY"
                  value={this.state.tanggalPembatalan}
                  onChange={(date) => this.handleDatepickerChange("tanggalPembatalan", date)}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Penjabat BC</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Input
                    id="nipPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.nipPenjabatBc}
                    style={{ flex: 1 }}
                    disabled
                  />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarPenjabatBcVisible")}
                  >
                    Cari
                  </Button>
                  <Input
                    id="namaPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.namaPenjabatBc}
                    style={{ flex: 2 }}
                    disabled
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Keterangan</FormLabel>
                </div>
                <Input.TextArea
                  id="keterangan"
                  onChange={this.handleInputChange}
                  value={this.state.keterangan}
                  rows={4}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Upload File</FormLabel>
                </div>

                <input type="file" onChange={this.handleUploadFilePembatalan} />
              </Col>
            </Row>
          </Card>

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>

            <Col span={4}>
              <Button
                type="danger"
                loading={this.state.isPembatalanLoading}
                onClick={this.handlePembatalan}
                block
              >
                Simpan Pembatalan
              </Button>
            </Col>
          </Row>
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />

        <ModalDaftarPenjabatBc
          isVisible={this.state.isModalDaftarPenjabatBcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarPenjabatBcVisible")}
          onDataDoubleClick={this.handleDataPenjabatBc}
        />
      </>
    );
  }
}
