import React, { Component } from "react";
import { Row, Col, Input, DatePicker, Select, InputNumber } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";

export default class ReferensiTarifDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isDetailTarifLoading: true,

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
    };
  }

  componentDidMount() {
    this.getDetailTarif();
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
                    <Input id="nomor_surat" value={this.state.nomor_surat} disabled />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker id="tanggal_surat" value={this.state.tanggal_surat} disabled />
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

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Peraturan</FormLabel>
                    </div>
                    <Input id="nomor_peraturan" value={this.state.nomor_peraturan} disabled />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Peraturan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_peraturan"
                      style={{ width: "100%" }}
                      value={this.state.tanggal_peraturan}
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
                  {this.state.jenis_bkc_id && (
                    <>
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

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Personal</FormLabel>
                        </div>
                        <Select
                          id="personal"
                          value={this.state.personal_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.personal_id}>
                            {this.state.personal_name}
                          </Select.Option>
                        </Select>
                      </Col>

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
                            {`(${this.state.jenis_produksi_code}) - ${this.state.jenis_produksi_name}`}
                          </Select.Option>
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
                          value={this.state.jenis_htl_rel_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.jenis_htl_rel_id}>
                            {this.state.jenis_htl_rel_name}
                          </Select.Option>
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="tarif"
                            value={this.state.tarif}
                            style={{ flex: 1 }}
                            min={0}
                            disabled
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
                            value={this.state.batas_produksi1}
                            style={{ flex: 1 }}
                            min={0}
                            disabled
                          />
                          <div>s.d</div>
                          <InputNumber
                            id="batas_produksi2"
                            value={this.state.batas_produksi2}
                            style={{ flex: 1 }}
                            min={0}
                            disabled
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
                              value={this.state.hje1}
                              style={{ width: "100%" }}
                              min={0}
                              disabled
                            />
                          </div>
                          <div>s.d</div>
                          <div>
                            <InputNumber
                              id="hje2"
                              value={this.state.hje2}
                              style={{ width: "100%" }}
                              min={0}
                              disabled
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
                        <Input id="layer" value={this.state.layer} disabled />
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
                              value={this.state.kadar_atas}
                              style={{ width: "100%" }}
                              min={0}
                              disabled
                            />
                          </Col>

                          <Col span={12}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Kadar Bawah</FormLabel>
                            </div>
                            <InputNumber
                              id="kadar_bawah"
                              value={this.state.kadar_bawah}
                              style={{ width: "100%" }}
                              min={0}
                              disabled
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
                          value={this.state.tarif_cukai_dalam_negeri}
                          style={{ width: "100%" }}
                          min={0}
                          disabled
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Cukai Impor</FormLabel>
                        </div>
                        <InputNumber
                          id="tarif_cukai_impor"
                          value={this.state.tarif_cukai_impor}
                          style={{ width: "100%" }}
                          min={0}
                          disabled
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
