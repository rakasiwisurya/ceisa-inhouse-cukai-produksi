import { Button, Col, DatePicker, Input, Row, Select, notification } from "antd";
import React, { Component } from "react";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { requestApi } from "utils/requestApi";

export default class ReferensiWarnaEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isEditWarnaLoading: true,
      isUbahLoading: false,
      isJenisBkcLoading: true,
      isJenisProduksiLoading: true,
      isJenisUsahaLoading: true,
      isGolonganLoading: true,
      isRekamLoading: false,

      nomor_surat: "",
      tanggal_surat: "",
      tanggal_awal_berlaku: "",

      jenis_bkc_id: "",
      jenis_bkc_name: "",
      kode_warna: "",
      warna: "",
      golongan_id: "",
      golongan_name: "",
      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_usaha_id: "",
      jenis_usaha_name: "",

      list_jenis_bkc: [],
      list_golongan: [],
      list_jenis_produksi: [],
      list_jenis_usaha: [],
    };
  }

  componentDidMount() {
    this.getDetailWarna();
    this.getJenisBkc();
    this.getListJenisUsaha();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_bkc_id !== this.state.jenis_bkc_id) {
      this.getListGolongan();
      this.getListJenisProduksi();
    }
  }

  getDetailWarna = async () => {
    const payload = { idReferensiSkep: this.props.match.params.id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-detail-warna",
      params: payload,
      setLoading: (bool) => this.setState({ isEditWarnaLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nomor_surat: data.nomorSurat,
        tanggal_surat: moment(data.tanggalSurat),
        tanggal_awal_berlaku: moment(data.tanggalAwalBerlaku),
        jenis_bkc_id: data.idJenisBkc,
        jenis_bkc_name: data.namaJenisBkc,
        kode_warna: data.kodeWarna,
        warna: data.warna,
        golongan_id: data.idGolongan,
        golongan_name: data.namaGolongan,
        jenis_produksi_id: data.idJenisProduksi,
        jenis_produksi_code: data.kodeJenisProduksi,
        jenis_usaha_id: data.idJenisUsaha,
        jenis_usaha_name: data.namaJenisUsaha,
      });
    }
  };
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
  getListGolongan = async () => {
    const payload = { idJenisBkc: this.state.jenis_bkc_id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/golongan",
      params: payload,
      setLoading: (bool) => this.setState({ isGolonganLoading: bool }),
    });

    if (response) this.setState({ list_golongan: response.data.data });
  };
  getListJenisProduksi = async () => {
    const payload = { idJenisBkc: this.state.jenis_bkc_id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-produksi",
      params: payload,
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ list_jenis_produksi: response.data.data });
  };
  getListJenisUsaha = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-usaha",
      setLoading: (bool) => this.setState({ isJenisUsahaLoading: bool }),
    });

    if (response) this.setState({ list_jenis_usaha: response.data.data });
  };

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleUbah = async () => {
    const {
      nomor_surat,
      tanggal_surat,
      tanggal_awal_berlaku,
      jenis_bkc_id,
      kode_warna,
      warna,
      golongan_id,
      jenis_produksi_id,
      jenis_usaha_id,
    } = this.state;

    const payload = {
      idReferensiSkep: this.props.match.params.id,
      nomorSurat: nomor_surat,
      tanggalSurat: moment(tanggal_surat).format("YYYY-MM-DD"),
      tanggalAwalBerlaku: moment(tanggal_awal_berlaku).format("YYYY-MM-DD"),
      idJenisBKC: jenis_bkc_id,
      kodeWarna: kode_warna,
      warna: warna,
      idGolongan: golongan_id,
      idJenisProduksi: jenis_produksi_id,
    };

    if (this.state.jenis_bkc_id === 2) payload.idJenisUsaha = jenis_usaha_id;

    const response = await requestApi({
      service: "referensi",
      method: "post",
      endpoint: "/referensi/browse-update-warna",
      body: payload,
      setLoading: (bool) => this.setState({ isUbahLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push("/cukai-produksi/referensi-tarif-warna");
    }
  };
  handleBatal = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <Container
          menuName="Refrensi Tarif dan Pita Cukai"
          contentName="Referensi Warna Edit"
          hideContentHeader
        >
          {this.state.isEditWarnaLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
              <Header>{this.state.subtitle1}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Surat</FormLabel>
                    </div>
                    <Input
                      id="nomor_surat"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_surat}
                    />
                  </Col>

                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_surat"
                      onChange={(date) => this.handleDatepickerChange("tanggal_surat", date)}
                      value={this.state.tanggal_surat}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_awal_berlaku"
                      onChange={(value) =>
                        this.handleDatepickerChange("tanggal_awal_berlaku", value)
                      }
                      value={this.state.tanggal_awal_berlaku}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle2}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis BKC</FormLabel>
                    </div>
                    <Select
                      id="jenis_bkc"
                      onChange={(value) => {
                        this.setState({
                          golongan_id: "",
                          golongan_name: "",
                          jenis_produksi_id: "",
                          jenis_produksi_name: "",
                          jenis_usaha_id: "",
                          jenis_usaha_name: "",
                          list_golongan: [],
                          list_jenis_produksi: [],
                        });
                        this.handleSelectChange("jenis_bkc", value);
                      }}
                      style={{ width: "100%" }}
                      value={this.state.jenis_bkc_id}
                      loading={this.state.isJenisBkcLoading}
                      disabled
                    >
                      {this.state.list_jenis_bkc.length > 0 &&
                        this.state.list_jenis_bkc.map((item, index) => (
                          <Select.Option key={`jenis-bkc-${index}`} value={item.idJenisBkc}>
                            {item.namaJenisBkc}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kode Warna</FormLabel>
                    </div>
                    <Input
                      id="kode_warna"
                      onChange={this.handleInputChange}
                      value={this.state.kode_warna}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Warna</FormLabel>
                    </div>
                    <Input id="warna" onChange={this.handleInputChange} value={this.state.warna} />
                  </Col>

                  {this.state.jenis_bkc_id && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Golongan</FormLabel>
                      </div>
                      <Select
                        id="golongan"
                        onChange={(value) => this.handleSelectChange("golongan", value)}
                        value={this.state.golongan_id}
                        loading={this.state.isGolonganLoading}
                        style={{ width: "100%" }}
                      >
                        {this.state.list_golongan.length > 0 &&
                          this.state.list_golongan.map((item, index) => (
                            <Select.Option key={`golongan-${index}`} value={item.idGolongan}>
                              {item.namaGolongan}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>
                  )}

                  {this.state.jenis_bkc_id && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Jenis Produksi</FormLabel>
                      </div>
                      <Select
                        id="jenis_produksi"
                        onChange={(value) => this.handleSelectChange("jenis_produksi", value)}
                        value={this.state.jenis_produksi_id}
                        loading={this.state.isJenisProduksiLoading}
                        style={{ width: "100%" }}
                      >
                        {this.state.list_jenis_produksi.length > 0 &&
                          this.state.list_jenis_produksi.map((item, index) => (
                            <Select.Option
                              key={`jenis-produksi-${index}`}
                              value={item.idJenisProduksi}
                            >
                              {`${item.kodeJenisProduksi} - ${item.namaJenisProduksi}`}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>
                  )}

                  <Col span={12}>
                    {this.state.jenis_bkc_id === 2 && (
                      <>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Usaha</FormLabel>
                        </div>
                        <Select
                          id="jenis_usaha"
                          onChange={(value) => this.handleSelectChange("jenis_usaha", value)}
                          value={this.state.jenis_usaha_id}
                          loading={this.state.isJenisUsahaLoading}
                          style={{ width: "100%" }}
                        >
                          {this.state.list_jenis_usaha.length > 0 &&
                            this.state.list_jenis_usaha.map((item, index) => (
                              <Select.Option key={`jenis-usaha-${index}`} value={item.idJenisUsaha}>
                                {item.namaJenisUsaha}
                              </Select.Option>
                            ))}
                        </Select>
                      </>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col span={8} offset={8}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Button
                          type="primary"
                          block
                          loading={this.state.isUbahLoading}
                          onClick={this.handleUbah}
                        >
                          UBAH
                        </Button>
                      </Col>

                      <Col span={12}>
                        <Button type="danger" block onClick={this.handleBatal}>
                          BATAL
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
