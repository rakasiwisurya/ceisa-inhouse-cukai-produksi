import { Button, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import ModalDaftarNPPBKC from "../ModalDaftarNppbkc";
import { pathName } from "configs/constants";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";

export default class RekamJenisPitaPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Permohonan",

      isDetailLoading: true,
      isUpdateLoading: false,
      isJenisProduksiLoading: true,
      isTarifLoading: false,
      isWarnaLoading: false,
      isModalDaftarNppbkcVisible: false,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      jenis_bkc_id_nppbkc: null,
      personal_nppbkc: null,

      jenis_produksi_id: null,
      jenis_produksi_name: null,
      hje: null,
      isi: null,
      tarif: null,
      awal_berlaku: null,
      warna: null,
      kode_warna: null,
      tahun_pita: String(new Date().getFullYear()),

      list_jenis_produksi: [],
    };
  }

  componentDidMount() {
    this.getDetailRekamJenisPita();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nppbkc_id !== this.state.nppbkc_id) {
      this.getJenisProduksi();
    }

    if (
      prevState.jenis_produksi_id !== this.state.jenis_produksi_id ||
      prevState.hje !== this.state.hje ||
      prevState.isi !== this.state.isi
    ) {
      this.setState({ tarif: null, warna: null });
    }
  }

  getDetailRekamJenisPita = async () => {
    const payload = { idJenisPita: this.props.match.params.id };

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: "/pita/browse-by-id",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nppbkc_id: data.idNppbkc,
        nppbkc: data.nppbkc,
        nama_nppbkc: data.namaPerusahaan,
        jenis_bkc_id_nppbkc: data.idJenisBkc,
        personal_nppbkc: data.personalisasi,

        jenis_produksi_id: `${data.idJenisProduksiBkc}-${data.idGolonganBkc}`,
        jenis_produksi_name: `${data.kodeJenisProduksiBkc} - ${data.namaGolonganBkc}`,
        hje: data.hje,
        isi: data.isiVolume,
        tarif: data.tarif,
        awal_berlaku: moment(data.awalBerlaku),
        warna: data.warna,
        kode_warna: data.kodeWarna,
        tahun_pita: data.tahunPita,
      });

      this.setState({ tarif: data.tarif, warna: data.warna, kode_warna: data.kodeWarna });
    }
  };
  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/nppbkc-produksi-bkc/browse-jenis-produksi",
      params: { idNppbkc: this.state.nppbkc_id },
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ list_jenis_produksi: response.data.data });
  };
  getTarifWarna = () => {
    this.getTarif();
    this.getWarna();
  };
  getTarif = async () => {
    const payload = {
      kodeJenisProduksiBkc: this.state.jenis_produksi_name.split("-")[0].trim(),
      idGolonganBkc: this.state.jenis_produksi_id.split("-")[1],
      hje: this.state.hje,
    };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-tarif",
      params: payload,
      setLoading: (bool) => this.setState({ isTarifLoading: bool }),
    });

    if (response) {
      this.setState({ tarif: response.data.data?.tarif });
    }
  };
  getWarna = async () => {
    const payload = {
      kodeJenisProduksiBkc: this.state.jenis_produksi_name.split("-")[0].trim(),
      idGolonganBkc: this.state.jenis_produksi_id.split("-")[1],
    };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-warna",
      params: payload,
      setLoading: (bool) => this.setState({ isWarnaLoading: bool }),
    });

    if (response) {
      this.setState({ warna: response.data.data.warna, kode_warna: response.data.data?.kodeWarna });
    }
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
      jenis_bkc_id_nppbkc: record.jenis_bkc_id_nppbkc,
      personal_nppbkc: record.personal_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };

  validationForm = () => {
    const {
      nppbkc_id,
      nppbkc,
      nama_nppbkc,
      jenis_bkc_id_nppbkc,
      personal_nppbkc,
      jenis_produksi_id,
      jenis_produksi_name,
      hje,
      isi,
      tarif,
      awal_berlaku,
      warna,
      kode_warna,
      tahun_pita,
    } = this.state;

    if (
      !nppbkc_id ||
      !nppbkc ||
      !nama_nppbkc ||
      !jenis_bkc_id_nppbkc ||
      !personal_nppbkc ||
      !jenis_produksi_id ||
      !jenis_produksi_name ||
      !hje ||
      !isi ||
      !tarif ||
      !awal_berlaku ||
      !warna ||
      !kode_warna ||
      !tahun_pita
    ) {
      return false;
    }

    return true;
  };

  handleUpdate = async () => {
    if (!this.validationForm()) return;

    const {
      nppbkc_id,
      nppbkc,
      nama_nppbkc,
      jenis_bkc_id_nppbkc,
      personal_nppbkc,
      jenis_produksi_id,
      jenis_produksi_name,
      hje,
      isi,
      tarif,
      awal_berlaku,
      warna,
      kode_warna,
      tahun_pita,
    } = this.state;

    const splitIdJenisProduksi = jenis_produksi_id.split("-");
    const splitNamaJenisProduksi = jenis_produksi_name.split("-").map((item) => item.trim());

    const payload = {
      idJenisPita: this.props.match.params.id,
      idJenisBkc: jenis_bkc_id_nppbkc,
      idJenisProduksiBkc: splitIdJenisProduksi[0],
      kodeJenisProduksiBkc: splitNamaJenisProduksi[0],
      isiKemasan: isi,
      awalBerlaku: moment(awal_berlaku, "DD-MM-YYYY").format("YYYY-MM-DD"),
      tarif: tarif,
      warna: warna,
      kodeWarna: kode_warna,
      tahunPita: tahun_pita,
      idNppbkc: nppbkc_id,
      nppbkc: nppbkc,
      namaPerusahaan: nama_nppbkc,
      hje: hje,
      personalisasi: personal_nppbkc,
      idGolonganBkc: splitIdJenisProduksi[1],
      namaGolonganBkc: splitNamaJenisProduksi[1],
    };

    const response = await requestApi({
      service: "pita_cukai",
      method: "post",
      endpoint: "/pita/perbaikan-jenis",
      body: payload,
      setLoading: (bool) => this.setState({ isUpdateLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: "Success" });
      this.props.history.push(`${pathName}/rekam-jenis-pita`);
    }
  };

  render() {
    console.log("this.state", this.state);
    return (
      <>
        <Container menuName="Rekam Jenis Pita" contentName="Perbaikan" hideContentHeader>
          {this.state.isDetailLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
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

                {this.state.nppbkc_id && (
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
                          onChange={(value, option) => {
                            this.handleSelectCustomChange("jenis_produksi", value, option);
                          }}
                          style={{ width: "100%" }}
                        >
                          {this.state.list_jenis_produksi.length > 0 &&
                            this.state.list_jenis_produksi.map((item, index) => (
                              <Select.Option
                                key={`jenis-produksi-${index}`}
                                value={`${item.idJenisProduksiBkc}-${item.idGolonganBkc}`}
                              >
                                {`${item.kodeJenisProduksi} - ${item.namaGolonganBkc}`}
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
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="isi"
                            onChange={(value) => this.handleInputNumberChange("isi", value)}
                            value={this.state.isi}
                            style={{ width: "100%" }}
                          />
                          <Button
                            type="primary"
                            icon="search"
                            loading={this.state.isTarifLoading || this.state.isWarnaLoading}
                            onClick={this.getTarifWarna}
                            disabled={
                              !this.state.jenis_produksi_id || !this.state.hje || !this.state.isi
                            }
                          />
                        </div>
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
                        <Input
                          id="warna"
                          value={this.state.warna}
                          style={{ width: "100%" }}
                          disabled
                        />
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
                )}

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
                      loading={this.state.isUpdateLoading}
                      onClick={this.handleUpdate}
                      disabled={!this.validationForm()}
                      block
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
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
