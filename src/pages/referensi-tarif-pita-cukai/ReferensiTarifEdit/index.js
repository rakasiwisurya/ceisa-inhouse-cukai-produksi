import React, { Component } from "react";
import { Row, Col, Input, Button, DatePicker, Select } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";

export default class ReferensiTarifEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      nomor_surat: "A",
      tanggal_surat: moment(new Date()),
      tanggal_awal_berlaku: moment(new Date()),
      nomor_peraturan: "B",
      tanggal_peraturan: moment(new Date()),
      golongan: "I",
      jenis_bkc: "HT",

      jenis_produksi: "HTL",
      jenis_hptl_rel: "A",
      tarif: 0,
      batas_produksi1: "A",
      batas_produksi2: "B",
      hje1: "C",
      hje2: "E",
      layer: "F",
      satuan: "[Satuan]",

      kadar_atas: 0,
      kadar_bawah: 0,
      tarif_cukai_dalam_negeri: 0,
      tarif_cukai_impor: 0,

      list_jenis_bkc: [
        {
          jenis_bkc_code: "HT",
          jenis_bkc_name: "Hasil Tembakau (HT)",
        },
        {
          jenis_bkc_code: "MMEA",
          jenis_bkc_name: "Minuman Mengandung Etil Alkohol (MMEA)",
        },
      ],
      list_golongan: [],
      list_jenis_produksi: [],
      list_jenis_hptl_rel: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_bkc !== this.state.jenis_bkc) {
      if (this.state.jenis_bkc === "HT") {
        this.setState({
          ...this.state,
          list_golongan: [
            {
              golongan_code: "1",
              golongan_name: "I",
            },
            {
              golongan_code: "2",
              golongan_name: "II",
            },
            {
              golongan_code: "3",
              golongan_name: "III",
            },
            {
              golongan_code: "4",
              golongan_name: "III/A",
            },
            {
              golongan_code: "5",
              golongan_name: "III/B",
            },
            {
              golongan_code: "6",
              golongan_name: "IMPORTIR HT",
            },
            {
              golongan_code: "7",
              golongan_name: "TANPA GOLONGAN",
            },
          ],
          list_jenis_produksi: [
            {
              jenis_produksi_code: "SKM",
              jenis_produksi_name: "SIGARET KRETEK MESIN",
            },
            {
              jenis_produksi_code: "CRT",
              jenis_produksi_name: "CERUTU",
            },
            {
              jenis_produksi_code: "HTL",
              jenis_produksi_name: "HASIL TEMBAKAU LAINNYA",
            },
            {
              jenis_produksi_code: "STF",
              jenis_produksi_name: "SIGARET KRETEK TANGAN FILTER",
            },
            {
              jenis_produksi_code: "SPT",
              jenis_produksi_name: "SIGARET PUTIH TANGAN",
            },
            {
              jenis_produksi_code: "SPM",
              jenis_produksi_name: "SIGARET PUTIH MESIN",
            },
            {
              jenis_produksi_code: "TIS",
              jenis_produksi_name: "TEMBAKAU IRIS",
            },
            {
              jenis_produksi_code: "KLM",
              jenis_produksi_name: "KELEMBAK MENYAN",
            },
            {
              jenis_produksi_code: "KLB",
              jenis_produksi_name: "KLOBOT",
            },
            {
              jenis_produksi_code: "SKT",
              jenis_produksi_name: "SIGARET KRETEK TANGAN",
            },
            {
              jenis_produksi_code: "SPF",
              jenis_produksi_name: "SIGARET PUTIH TANGAN FILTER",
            },
            {
              jenis_produksi_code: "REL",
              jenis_produksi_name: "ROKOK ELEKTRIK",
            },
          ],
          list_jenis_hptl_rel: [
            {
              jenis_hptl_rel_code: "HT",
              jenis_hptl_rel_name: "Hasil Tembakau (HT)",
            },
            {
              jenis_hptl_rel_code: "MMEA",
              jenis_hptl_rel_name: "Minuman Mengandung Etil Alkohol (MMEA)",
            },
          ],
        });
      }

      if (this.state.jenis_bkc === "MMEA") {
        this.setState({
          ...this.state,
          list_golongan: [
            {
              golongan_code: "A",
              golongan_name: "A",
            },
            {
              golongan_code: "B",
              golongan_name: "B",
            },
            {
              golongan_code: "C",
              golongan_name: "C",
            },
          ],
        });
      }
    }
  }

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
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
  handleUbah = () => {
    console.log("ubah...");
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
                  onChange={(value) => this.handleDatepickerChange("tanggal_awal_berlaku", value)}
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
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis BKC</FormLabel>
                </div>
                <Select
                  id="jenis_bkc"
                  onChange={(value) => this.handleSelectChange("jenis_bkc", value)}
                  value={this.state.jenis_bkc}
                  style={{ width: "100%" }}
                >
                  {this.state.list_jenis_bkc.length > 0 &&
                    this.state.list_jenis_bkc.map((item, index) => (
                      <Select.Option key={`jenis-bkc-${index}`} value={item.jenis_bkc_code}>
                        {item.jenis_bkc_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              {this.state.jenis_bkc && (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Golongan</FormLabel>
                  </div>
                  <Select
                    id="golongan"
                    value={this.state.golongan}
                    onChange={(value) => this.handleSelectChange("golongan", value)}
                    style={{ width: "100%" }}
                  >
                    {this.state.list_golongan.length > 0 &&
                      this.state.list_golongan.map((item, index) => (
                        <Select.Option key={`golongan-${index}`} value={item.golongan_code}>
                          {item.golongan_name}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
              )}

              {this.state.jenis_bkc === "HT" && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <Select
                      id="jenis_produksi"
                      onChange={(value) => this.handleSelectChange("jenis_produksi", value)}
                      value={this.state.jenis_produksi}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_produksi.length > 0 &&
                        this.state.list_jenis_produksi.map((item, index) => (
                          <Select.Option
                            key={`jenis-produksi-${index}`}
                            value={item.jenis_produksi_code}
                          >
                            {item.jenis_produksi_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis HPTL/REL</FormLabel>
                    </div>
                    <Select
                      id="jenis_hptl_rel"
                      value={this.state.jenis_hptl_rel}
                      onChange={(value) => this.handleSelectChange("jenis_hptl_rel", value)}
                      style={{ width: "100%" }}
                      disabled={
                        !(
                          this.state.jenis_produksi === "HTL" || this.state.jenis_produksi === "REL"
                        )
                      }
                    >
                      {this.state.list_jenis_hptl_rel.length > 0 &&
                        this.state.list_jenis_hptl_rel.map((item, index) => (
                          <Select.Option
                            key={`jenis_hptl_rel-${index}`}
                            value={item.jenis_hptl_rel_code}
                          >
                            {item.jenis_hptl_rel_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="tarif"
                        onChange={this.handleInputChange}
                        value={this.state.tarif}
                      />
                      <div>/</div>
                      <div>{this.state.satuan}</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Batas Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="batas_produksi1"
                        onChange={this.handleInputChange}
                        value={this.state.batas_produksi1}
                      />
                      <div>s.d</div>
                      <Input
                        id="batas_produksi2"
                        onChange={this.handleInputChange}
                        value={this.state.batas_produksi2}
                      />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div>
                        <Input
                          id="hje1"
                          onChange={this.handleInputChange}
                          value={this.state.hje1}
                        />
                      </div>
                      <div>s.d</div>
                      <div>
                        <Input
                          id="hje2"
                          onChange={this.handleInputChange}
                          value={this.state.hje2}
                        />
                      </div>
                      <div>/</div>
                      <div>{this.state.satuan}</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Layer</FormLabel>
                    </div>
                    <Input id="layer" onChange={this.handleInputChange} value={this.state.layer} />
                  </Col>
                </>
              )}

              {this.state.jenis_bkc === "MMEA" && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar Atas</FormLabel>
                    </div>
                    <Input
                      id="kadar_atas"
                      onChange={this.handleInputChange}
                      value={this.state.kadar_atas}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar Bawah</FormLabel>
                    </div>
                    <Input
                      id="kadar_bawah"
                      onChange={this.handleInputChange}
                      value={this.state.kadar_bawah}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Dalam Negeri</FormLabel>
                    </div>
                    <Input
                      id="tarif_cukai_dalam_negeri"
                      onChange={this.handleInputChange}
                      value={this.state.tarif_cukai_dalam_negeri}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Impor</FormLabel>
                    </div>
                    <Input
                      id="tarif_cukai_impor"
                      onChange={this.handleInputChange}
                      value={this.state.tarif_cukai_impor}
                    />
                  </Col>
                </>
              )}
            </Row>

            <Row>
              <Col span={8} offset={8}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Button type="primary" block onClick={this.handleUbah}>
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
        </Container>
      </>
    );
  }
}
