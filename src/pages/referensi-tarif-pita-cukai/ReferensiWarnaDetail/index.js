import { Col, DatePicker, Input, Row, Select } from "antd";
import React, { Component } from "react";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";

export default class ReferensiWarnaDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isDetailWarnaLoading: true,

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
    };
  }

  componentDidMount() {
    this.getDetailWarna();
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

  render() {
    return (
      <>
        <Container
          menuName="Refrensi Tarif dan Pita Cukai"
          contentName="Referensi Warna Detail"
          hideContentHeader
        >
          {this.state.isDetailWarnaLoading ? (
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
                    <Input id="nomor_surat" value={this.state.nomor_surat} disabled />
                  </Col>

                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_surat"
                      value={this.state.tanggal_surat}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_awal_berlaku"
                      value={this.state.tanggal_awal_berlaku}
                      style={{ width: "100%" }}
                      disabled
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
                      style={{ width: "100%" }}
                      value={this.state.jenis_bkc_id}
                      disabled
                    >
                      <Select.Option value={this.state.jenis_bkc_id}>
                        {this.state.jenis_bkc_name}
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kode Warna</FormLabel>
                    </div>
                    <Input id="kode_warna" value={this.state.kode_warna} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Warna</FormLabel>
                    </div>
                    <Input id="warna" value={this.state.warna} disabled />
                  </Col>

                  {this.state.jenis_bkc_id && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Golongan</FormLabel>
                      </div>
                      <Select
                        id="golongan"
                        value={this.state.golongan_id}
                        style={{ width: "100%" }}
                        disabled
                      >
                        <Select.Option value={this.state.golongan_id}>
                          {this.state.golongan_name}
                        </Select.Option>
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
                        value={this.state.jenis_produksi_id}
                        style={{ width: "100%" }}
                        disabled
                      >
                        <Select.Option value={this.state.jenis_produksi_id}>
                          {`${this.state.jenis_produksi_code} - ${this.state.jenis_produksi_name}`}
                        </Select.Option>
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
                          value={this.state.jenis_usaha_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.jenis_usaha_id}>
                            {this.state.jenis_usaha_name}
                          </Select.Option>
                        </Select>
                      </>
                    )}
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
