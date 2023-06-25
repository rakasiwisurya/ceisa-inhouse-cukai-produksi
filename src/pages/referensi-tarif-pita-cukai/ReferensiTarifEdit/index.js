import React, { Component } from "react";
import { Row, Col, Input, Button, DatePicker, Select, InputNumber, notification } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { requestApi } from "utils/requestApi";
import { pathName } from "configs/constants";

export default class ReferensiTarifEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isDetailTarifLoading: true,
      isUbahLoading: false,
      isJenisBkcLoading: true,
      isGolonganLoading: true,
      isJenisProduksiLoading: true,
      isJenisHtlRelLoading: true,

      nomor_surat: "",
      tanggal_surat: "",
      tanggal_awal_berlaku: "",
      nomor_peraturan: "",
      tanggal_peraturan: "",

      jenis_bkc_id: "",
      jenis_bkc_name: "",
      golongan_id: "",
      golongan_name: "",
      personal_id: "",
      personal_name: "",
      satuan: "",

      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_htl_rel_id: "",
      jenis_htl_rel_name: "",
      tarif: "",
      batas_produksi1: "",
      batas_produksi2: "",
      hje1: "",
      hje2: "",
      layer: "",

      kadar_atas: "",
      kadar_bawah: "",
      tarif_cukai_dalam_negeri: "",
      tarif_cukai_impor: "",

      list_jenis_bkc: [],
      list_golongan: [],
      list_personal: [
        {
          personal_id: "YA",
          personal_name: "Ya",
        },
        {
          personal_id: "TIDAK",
          personal_name: "Tidak",
        },
      ],
      list_jenis_produksi: [],
      list_jenis_htl_rel: [],
    };
  }

  componentDidMount() {
    this.getJenisBkc();
    this.getDetailTarif();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_produksi_id !== this.state.jenis_produksi_id) {
      this.getJenisHtlRel();
    }

    if (prevState.jenis_bkc_id !== this.state.jenis_bkc_id) {
      this.getListGolongan();
      this.getListJenisProduksi();
    }
  }

  getDetailTarif = async () => {
    const payload = { idReferensiSkep: this.props.match.params.id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-detail-tarif",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailTarifLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nomor_surat: data.nomorSurat,
        tanggal_surat: moment(data.tanggalSurat),
        tanggal_awal_berlaku: moment(data.tanggalAwalBerlaku),
        nomor_peraturan: data.nomorPeraturan,
        tanggal_peraturan: moment(data.tanggalPeraturan),
        jenis_bkc_id: data.idJenisBkc,
        jenis_bkc_name: data.namaJenisBkc,
        golongan_id: data.idGolonganBkc,
        golongan_name: data.namaGolonganBkc,

        jenis_produksi_id: data.idJenisProduksi,
        jenis_produksi_code: data.kodeJenisProduksi,
        jenis_produksi_name: data.namaJenisProduksi,
        jenis_htl_rel_id: data.idJenisHtlRel,
        jenis_htl_rel_name: data.namaJenisHtlRel,
        tarif: data.tarif,
        batas_produksi1: data.batasProduksi1,
        batas_produksi2: data.batasProduksi2,
        hje1: data.hje1,
        hje2: data.hje2,
        layer: data.layer,
        satuan: data.satuan,

        kadar_atas: data.kadarAtas,
        kadar_bawah: data.kadarBawah,
        tarif_cukai_dalam_negeri: data.tarifCukaiDalamNegeri,
        tarif_cukai_impor: data.tarifCukaiImpor,
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
  getJenisHtlRel = async () => {
    const payload = { idJenisProduksi: this.state.jenis_produksi_id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-htl-rel",
      params: payload,
      setLoading: (bool) => this.setState({ isJenisHtlRel: bool }),
    });

    if (response) this.setState({ list_jenis_htl_rel: response.data.data });
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
  handleUbah = async () => {
    const {
      nomor_surat,
      tanggal_surat,
      tanggal_awal_berlaku,
      nomor_peraturan,
      tanggal_peraturan,

      jenis_bkc_id,
      golongan_id,

      jenis_produksi_id,
      jenis_htl_rel_id,
      tarif,
      batas_produksi1,
      batas_produksi2,
      hje1,
      hje2,
      layer,

      kadar_atas,
      kadar_bawah,
      tarif_cukai_dalam_negeri,
      tarif_cukai_impor,
    } = this.state;

    const payload = {
      idReferensiSkep: this.props.match.params.id,
      nomorSurat: nomor_surat,
      tanggalSurat: moment(tanggal_surat).format("YYYY-MM-DD"),
      tanggalAwalBerlaku: moment(tanggal_awal_berlaku).format("YYYY-MM-DD"),
      nomorPeraturan: nomor_peraturan,
      tanggalPeraturan: moment(tanggal_peraturan).format("YYYY-MM-DD"),
      idJenisBKC: jenis_bkc_id,
      idGolongan: golongan_id,
      idJenisProduksi: jenis_produksi_id,
    };

    if (jenis_bkc_id === 3) {
      jenis_htl_rel_id
        ? (payload.idJenisHtlRel = jenis_htl_rel_id)
        : (payload.idJenisHtlRel = null);
      payload.tarif = tarif;
      payload.batasProduksi1 = batas_produksi1;
      payload.batasProduksi2 = batas_produksi2;
      payload.hje1 = hje1;
      payload.hje2 = hje2;
      payload.layer = layer;
    }

    if (jenis_bkc_id === 2) {
      payload.kadarAtas = kadar_atas;
      payload.kadarBawah = kadar_bawah;
      payload.tarifCukaiDalamNegeri = tarif_cukai_dalam_negeri;
      payload.tarifCukaiImpor = tarif_cukai_impor;
    }

    const response = await requestApi({
      service: "referensi",
      method: "post",
      endpoint: "/referensi/browse-update-tarif",
      body: payload,
      setLoading: (bool) => this.setState({ isUbahLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/referensi-tarif-warna`);
    }
  };
  handleBatal = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <Container
          menuName="Referensi Tarif dan Pita Cukai"
          contentName="Referensi Tarif Detail"
          hideContentHeader
        >
          {this.state.isDetailTarifLoading ? (
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
                      onChange={(value) => this.handleDatepickerChange("tanggal_surat", value)}
                      value={this.state.tanggal_surat}
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

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Peraturan</FormLabel>
                    </div>
                    <Input
                      id="nomor_peraturan"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_peraturan}
                    />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Peraturan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_peraturan"
                      onChange={(value) => this.handleDatepickerChange("tanggal_peraturan", value)}
                      style={{ width: "100%" }}
                      value={this.state.tanggal_peraturan}
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
                          jenis_htl_rel_id: "",
                          jenis_htl_rel_name: "",
                          list_jenis_produksi: [],
                          list_golongan: [],
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
                  {this.state.jenis_bkc_id && (
                    <>
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

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Personal</FormLabel>
                        </div>
                        <Select
                          id="personal"
                          onChange={(value) => this.handleSelectChange("personal", value)}
                          value={this.state.personal_id}
                          style={{ width: "100%" }}
                        >
                          {this.state.list_personal.length > 0 &&
                            this.state.list_personal.map((item, index) => (
                              <Select.Option key={`personal-${index}`} value={item.personal_id}>
                                {item.personal_name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Produksi</FormLabel>
                        </div>
                        <Select
                          id="jenis_produksi"
                          onChange={(value, option) => {
                            this.setState({
                              jenis_htl_rel_id: "",
                              jenis_htl_rel_name: "",
                              list_jenis_htl_rel: [],
                              jenis_produksi_code: option.props.children
                                .split("-")[0]
                                .replace(/[()\s]/g, ""),
                            });
                            this.handleSelectChange("jenis_produksi", value);
                          }}
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
                                {`(${item.kodeJenisProduksi}) - ${item.namaJenisProduksi}`}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>
                    </>
                  )}

                  {this.state.jenis_bkc_id === 3 && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis HPTL/REL</FormLabel>
                        </div>
                        <Select
                          id="jenis_htl_rel"
                          onChange={(value) => this.handleSelectChange("jenis_htl_rel", value)}
                          value={this.state.jenis_htl_rel_id}
                          loading={this.state.isJenisHtlRelLoading}
                          style={{ width: "100%" }}
                          disabled={
                            !(
                              this.state.jenis_produksi_code === "HTL" ||
                              this.state.jenis_produksi_code === "REL"
                            )
                          }
                        >
                          {this.state.list_jenis_htl_rel.length > 0 &&
                            this.state.list_jenis_htl_rel.map((item, index) => (
                              <Select.Option
                                key={`jenis_htl_rel-${index}`}
                                value={item.idJenisHtlRel}
                              >
                                {item.namaJenisHtlRel}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="tarif"
                            onChange={(value) => this.handleInputNumberChange("tarif", value)}
                            value={this.state.tarif}
                            style={{ flex: 1 }}
                            min={0}
                          />
                          {this.state.satuan && (
                            <>
                              <div>/</div>
                              <div>{this.state.satuan}</div>
                            </>
                          )}
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Batas Produksi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="batas_produksi1"
                            onChange={(value) =>
                              this.handleInputNumberChange("batas_produksi1", value)
                            }
                            value={this.state.batas_produksi1}
                            style={{ flex: 1 }}
                            min={0}
                          />
                          <div>s.d</div>
                          <InputNumber
                            id="batas_produksi2"
                            onChange={(value) =>
                              this.handleInputNumberChange("batas_produksi2", value)
                            }
                            value={this.state.batas_produksi2}
                            style={{ flex: 1 }}
                            min={0}
                          />
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>HJE</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div>
                            <InputNumber
                              id="hje1"
                              onChange={(value) => this.handleInputNumberChange("hje1", value)}
                              value={this.state.hje1}
                              style={{ width: "100%" }}
                              min={0}
                            />
                          </div>
                          <div>s.d</div>
                          <div>
                            <InputNumber
                              id="hje2"
                              onChange={(value) => this.handleInputNumberChange("hje2", value)}
                              value={this.state.hje2}
                              style={{ width: "100%" }}
                              min={0}
                            />
                          </div>
                          {this.state.satuan && (
                            <>
                              <div>/</div>
                              <div>{this.state.satuan}</div>
                            </>
                          )}
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Layer</FormLabel>
                        </div>
                        <Input
                          id="layer"
                          onChange={this.handleInputChange}
                          value={this.state.layer}
                        />
                      </Col>
                    </>
                  )}

                  {this.state.jenis_bkc_id === 2 && (
                    <>
                      <Col span={12}>
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Kadar Atas</FormLabel>
                            </div>
                            <InputNumber
                              id="kadar_atas"
                              onChange={(value) =>
                                this.handleInputNumberChange("kadar_atas", value)
                              }
                              value={this.state.kadar_atas}
                              style={{ width: "100%" }}
                              min={0}
                            />
                          </Col>

                          <Col span={12}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Kadar Bawah</FormLabel>
                            </div>
                            <InputNumber
                              id="kadar_bawah"
                              onChange={(value) =>
                                this.handleInputNumberChange("kadar_bawah", value)
                              }
                              value={this.state.kadar_bawah}
                              style={{ width: "100%" }}
                              min={0}
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Cukai Dalam Negeri</FormLabel>
                        </div>
                        <InputNumber
                          id="tarif_cukai_dalam_negeri"
                          onChange={(value) =>
                            this.handleInputNumberChange("tarif_cukai_dalam_negeri", value)
                          }
                          value={this.state.tarif_cukai_dalam_negeri}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Cukai Impor</FormLabel>
                        </div>
                        <InputNumber
                          id="tarif_cukai_impor"
                          onChange={(value) =>
                            this.handleInputNumberChange("tarif_cukai_impor", value)
                          }
                          value={this.state.tarif_cukai_impor}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </Col>
                    </>
                  )}
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
