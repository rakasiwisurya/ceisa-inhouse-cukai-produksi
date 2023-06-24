import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import React, { Component } from "react";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { api } from "configs/api";
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
    // const payload = {idReferensiSkep: this.props.match.params.id}

    //  const response = await api.referensi.json.get("/referensi/browse-detail-warna", payload);
    // console.log("response.data", response.data);

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/browse-detail-warna",
    //   payload,
    //   setLoading: (bool) => this.setState({ isEditWarnaLoading: bool }),
    // });
    // if (response) {
    //   console.log("response.data", response.data);
    // }

    this.setState({ isEditWarnaLoading: true });
    setTimeout(() => {
      this.setState({
        nomor_surat: "A",
        tanggal_surat: moment(new Date()),
        tanggal_awal_berlaku: moment(new Date()),
        jenis_bkc_id: 3,
        jenis_bkc_name: "HT",
        kode_warna: "HIJAU",
        warna: "Hijau",
        golongan_id: 1,
        golongan_name: "I",
        jenis_produksi_id: 1,
        jenis_produksi_code: "SKM",
        jenis_produksi_name: "SIGARET KRETEK MESIN",
        jenis_usaha_id: null,
        jenis_usaha_name: null,
      });
      this.setState({ isEditWarnaLoading: false });
    }, 2000);
  };
  getJenisBkc = async () => {
    // const response = await api.referensi.json.get("/referensi/jenis-bkc")
    // console.log('response.data', response.data)

    //  const response = await requestApi({
    //     service: "referensi",
    //     method: "get",
    //     endpoint: "/referensi/jenis-bkc",
    //     setLoading: (bool) => this.setState({ isJenisBkcLoading: bool }),
    //   });
    //   if(response) {
    //     console.log('response.data', response.data)
    //   }

    this.setState({ isJenisBkcLoading: true });
    setTimeout(() => {
      this.setState({
        list_jenis_bkc: [
          {
            idJenisBkc: 3,
            namaJenisBkc: "HT",
          },
          {
            idJenisBkc: 2,
            namaJenisBkc: "MMEA",
          },
        ],
      });
      this.setState({ isJenisBkcLoading: false });
    }, 2000);
  };
  getListGolongan = async () => {
    // const payload = { idJenisBkc: this.state.jenis_bkc_id };
    // const response = await api.referensi.json.get("/referensi/golongan", payload);
    // console.log("response.data", response.data);

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/golongan",
    //   payload,
    //   setLoading: (bool) => this.setState({ isGolonganLoading: bool }),
    // });
    // if (response) {
    //   console.log("response.data", response.data);
    // }

    this.setState({ isGolonganLoading: true });
    setTimeout(() => {
      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          list_golongan: [
            {
              idGolongan: 1,
              namaGolongan: "I",
            },
            {
              idGolongan: 2,
              namaGolongan: "II",
            },
            {
              idGolongan: 3,
              namaGolongan: "III",
            },
            {
              idGolongan: 4,
              namaGolongan: "III/A",
            },
            {
              idGolongan: 5,
              namaGolongan: "III/B",
            },
            {
              idGolongan: 6,
              namaGolongan: "IMPORTIR HT",
            },
            {
              idGolongan: 7,
              namaGolongan: "TANPA GOLONGAN",
            },
          ],
        });
      } else {
        this.setState({
          list_golongan: [
            {
              idGolongan: 1,
              namaGolongan: "A",
            },
            {
              idGolongan: 2,
              namaGolongan: "B",
            },
            {
              idGolongan: 3,
              namaGolongan: "C",
            },
          ],
        });
      }
      this.setState({ isGolonganLoading: false });
    }, 2000);
  };
  getListJenisProduksi = async () => {
    // const payload = {idJenisBkc: this.state.jenis_bkc_id}
    // const response = await api.referensi.json.get("/referensi/jenis-produksi", payload)
    // console.log('response.data', response.data)

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/jenis-produksi",
    //   payload,
    //   setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    // });
    // if(response) {
    //   console.log('response.data', response.data)
    // }

    this.setState({ isJenisProduksiLoading: true });
    setTimeout(() => {
      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          list_jenis_produksi: [
            {
              idJenisProduksi: 1,
              kodeJenisProduksi: "SKM",
              namaJenisProduksi: "SIGARET KRETEK MESIN",
            },
            {
              idJenisProduksi: 2,
              kodeJenisProduksi: "CRT",
              namaJenisProduksi: "CERUTU",
            },
            {
              idJenisProduksi: 3,
              kodeJenisProduksi: "HTL",
              namaJenisProduksi: "HASIL TEMBAKAU LAINNYA",
            },
            {
              idJenisProduksi: 4,
              kodeJenisProduksi: "STF",
              namaJenisProduksi: "SIGARET KRETEK TANGAN FILTER",
            },
            {
              idJenisProduksi: 5,
              kodeJenisProduksi: "SPT",
              namaJenisProduksi: "SIGARET PUTIH TANGAN",
            },
            {
              idJenisProduksi: 6,
              kodeJenisProduksi: "SPM",
              namaJenisProduksi: "SIGARET PUTIH MESIN",
            },
            {
              idJenisProduksi: 7,
              kodeJenisProduksi: "TIS",
              namaJenisProduksi: "TEMBAKAU IRIS",
            },
            {
              idJenisProduksi: 8,
              kodeJenisProduksi: "KLM",
              namaJenisProduksi: "KELEMBAK MENYAN",
            },
            {
              idJenisProduksi: 9,
              kodeJenisProduksi: "KLB",
              namaJenisProduksi: "KLOBOT",
            },
            {
              idJenisProduksi: 10,
              kodeJenisProduksi: "SKT",
              namaJenisProduksi: "SIGARET KRETEK TANGAN",
            },
            {
              idJenisProduksi: 11,
              kodeJenisProduksi: "SPF",
              namaJenisProduksi: "SIGARET PUTIH TANGAN FILTER",
            },
            {
              idJenisProduksi: 12,
              kodeJenisProduksi: "REL",
              namaJenisProduksi: "ROKOK ELEKTRIK",
            },
          ],
        });
      } else {
        this.setState({
          list_jenis_produksi: [
            {
              idJenisProduksi: 1,
              kodeJenisProduksi: "MMEA1",
              namaJenisProduksi: "Nama MMEA1",
            },
            {
              idJenisProduksi: 2,
              kodeJenisProduksi: "MMEA2",
              namaJenisProduksi: "Nama MMEA2",
            },
            {
              idJenisProduksi: 3,
              kodeJenisProduksi: "MMEA3",
              namaJenisProduksi: "Nama MMEA3",
            },
          ],
        });
      }

      this.setState({ isJenisProduksiLoading: false });
    }, 2000);
  };
  getListJenisUsaha = async () => {
    // const response = await api.referensi.json.get("/referensi/jenis-usaha");
    // console.log("response.data", response.data);

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/jenis-usaha",
    //   setLoading: (bool) => this.setState({ isJenisUsahaLoading: bool }),
    // });
    // if(response) {
    //   console.log('response.data', response.data)
    // }

    this.setState({ isJenisUsahaLoading: true });
    setTimeout(() => {
      this.setState({
        list_jenis_usaha: [
          {
            idJenisUsaha: 1,
            namaJenisUsaha: "Dalam Negeri",
          },
          {
            idJenisUsaha: 2,
            namaJenisUsaha: "Importir",
          },
        ],
      });
      this.setState({ isJenisUsahaLoading: false });
    }, 2000);
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

    //  const response = await api.referensi.json.post("/referensi/browse-update-warna", payload);
    //     console.log("response.data", response.data);

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "post",
    //   endpoint: "/referensi/browse-update-warna",
    //   payload,
    //   setLoading: (bool) => this.setState({ isUbahLoading: bool }),
    // });
    // if (response) {
    //   console.log("response.data", response.data);
    // }

    this.setState({ isUbahLoading: true });
    setTimeout(() => {
      console.log("payload", payload);
      this.setState({ isUbahLoading: false });
    }, 2000);
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
