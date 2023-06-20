import { Button, Card, Col, DatePicker, Icon, Input, InputNumber, Row, Select, Upload } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";

export default class CK4MMEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemberitahu",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",

      tempat_dibuat: "",
      nama_pengusaha: "",

      nama_nppbkc: "",
      nppbkc: "",
      alamat_nppbkc: "",
      jenis_laporan: "",
      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",
      jenis_barang_kena_cukai: "Minuman Mengandung Etil Alkohol (MMEA)",
      tanggal_jam_produksi_awal: "",
      tanggal_jam_produksi_akhir: "",
      jumlah_kemasan: "",
      jumlah_kemasan_dilekati_pita: "",
      jumlah_produksi: "",

      jenis_mmea: "",
      merk_mmea: "",
      isi: "",
      jenis_kemasan: "",
      golongan: "",
      kadar: "",
      nomor_dokumen_produksi: "",
      tanggal_dokumen_produksi: "",
      jumlah_kemasan_produksi: "",
      jumlah_produksi_produksi: "",
      jumlah_kemasan_dilekati_pita_pelekatan: "",

      uraian_rincian_file: [],

      list_tempat_dibuat: [
        {
          tempat_dibuat_code: "A",
          tempat_dibuat_name: "A",
        },
        {
          tempat_dibuat_code: "B",
          tempat_dibuat_name: "B",
        },
      ],
      list_nama_nppbkc: [
        {
          nama_nppbkc_code: "A",
          nama_nppbkc_name: "A",
        },
        {
          nama_nppbkc_code: "B",
          nama_nppbkc_name: "B",
        },
      ],
      list_jenis_laporan: [
        {
          jenis_laporan_code: "HARIAN",
          jenis_laporan_name: "Harian",
        },
        {
          jenis_laporan_code: "BULANAN",
          jenis_laporan_name: "Bulanan",
        },
      ],
      list_merk_mmea: [
        {
          merk_mmea_code: "HARIAN",
          merk_mmea_name: "Harian",
        },
        {
          merk_mmea_code: "BULANAN",
          merk_mmea_name: "Bulanan",
        },
      ],
    };
  }

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ ...this.state, [field]: value._d });
  };
  handleSelectChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleUploadFileChange = (field, file, fileList) => {
    this.setState({ ...this.state, [field]: [file] });
  };
  handleDummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => onSuccess("ok"), 0);
  };

  handleSimpan = () => {
    console.log("simpan");
  };
  handleBatal = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="MMEA Rekam" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Dibuat di Kota/Kabupaten</FormLabel>
                  </div>
                  <Select
                    id="tempat_dibuat"
                    onChange={(value) => this.handleSelectChange("tempat_dibuat", value)}
                    style={{ width: "100%" }}
                  >
                    {this.state.list_tempat_dibuat.length > 0 &&
                      this.state.list_tempat_dibuat.map((item, index) => (
                        <Select.Option
                          key={`tempat-dibuat-${index}`}
                          value={item.tempat_dibuat_code}
                        >
                          {item.tempat_dibuat_name}
                        </Select.Option>
                      ))}
                  </Select>
                </div>

                <div>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Nama Pengusaha</FormLabel>
                  </div>
                  <Input
                    id="nama_pengusaha"
                    onChange={this.handleInputChange}
                    value={this.state.nama_pengusaha}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle2}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Data NPPBKC" style={{ height: 437 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama</FormLabel>
                    </div>
                    <Select
                      id="nama_nppbkc"
                      onChange={(value) => this.handleSelectChange("nama_nppbkc", value)}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_nama_nppbkc.length > 0 &&
                        this.state.list_nama_nppbkc.map((item, index) => (
                          <Select.Option key={`nama-nppbkc-${index}`} value={item.nama_nppbkc_code}>
                            {item.nama_nppbkc_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <Input
                      id="nppbkc"
                      onChange={this.handleInputChange}
                      value={this.state.nppbkc}
                    />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea
                      id="alamat_nppbkc"
                      onChange={this.handleInputChange}
                      value={this.state.alamat_nppbkc}
                    />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Data Pemberitahuan" style={{ height: 437 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Laporan</FormLabel>
                    </div>
                    <Select
                      id="jenis_laporan"
                      onChange={(value) => this.handleSelectChange("jenis_laporan", value)}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_laporan.length > 0 &&
                        this.state.list_jenis_laporan.map((item, index) => (
                          <Select.Option
                            key={`jenis-laporan-${index}`}
                            value={item.jenis_laporan_code}
                          >
                            {item.jenis_laporan_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Pemberitahuan</FormLabel>
                    </div>
                    <Input
                      id="nomor_pemberitahuan"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_pemberitahuan}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pemberitahuan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_pemberitahuan"
                      value={this.state.tanggal_pemberitahuan}
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_pemberitahuan", date)
                      }
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                    </div>
                    <Input disabled value={this.state.jenis_barang_kena_cukai} />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}></Col>
              <Col span={12}>
                <Card title="Dokumen Produksi">
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Jam Produksi Awal</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_jam_produksi_awal"
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_jam_produksi_awal", date)
                      }
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Jam Produksi Akhir</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_jam_produksi_akhir"
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_jam_produksi_akhir", date)
                      }
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_kemasan"
                        onChange={(value) => this.handleInputNumberChange("jumlah_kemasan", value)}
                        value={this.state.jumlah_kemasan}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Kemasan</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Kemasan Dilekati Pita</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_kemasan_dilekati_pita"
                        onChange={(value) =>
                          this.handleInputNumberChange("jumlah_kemasan_dilekati_pita", value)
                        }
                        value={this.state.jumlah_kemasan_dilekati_pita}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Kemasan</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_produksi"
                        onChange={(value) => this.handleInputNumberChange("jumlah_produksi", value)}
                        value={this.state.jumlah_produksi}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Liter</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle3}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Kep Tarif" style={{ height: 705 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis MMEA</FormLabel>
                    </div>
                    <Input
                      id="jenis_mmea"
                      onChange={(value) => this.handleInputChange("jenis_mmea", value)}
                      value={this.state.jenis_mmea}
                      style={{ flex: 1 }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk MMEA</FormLabel>
                    </div>
                    <Select
                      id="merk_mmea"
                      onChange={(value) => this.handleSelectChange("merk_mmea", value)}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_merk_mmea.length > 0 &&
                        this.state.list_merk_mmea.map((item, index) => (
                          <Select.Option key={`merk-mmea-${index}`} value={item.merk_mmea_code}>
                            {item.merk_mmea_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="isi"
                        onChange={(value) => this.handleInputNumberChange("isi", value)}
                        value={this.state.isi}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Mililiter (ml)</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Kemasan</FormLabel>
                    </div>
                    <Input
                      id="jenis_kemasan"
                      onChange={(value) => this.handleInputChange("jenis_kemasan", value)}
                      value={this.state.jenis_kemasan}
                      style={{ flex: 1 }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Input
                      id="golongan"
                      onChange={(value) => this.handleInputChange("golongan", value)}
                      value={this.state.golongan}
                      style={{ flex: 1 }}
                    />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="kadar"
                        onChange={(value) => this.handleInputNumberChange("kadar", value)}
                        value={this.state.kadar}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>%</div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card title="Dokumen Produksi">
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor</FormLabel>
                        </div>
                        <Input
                          id="nomor_dokumen_produksi"
                          onChange={this.handleInputChange}
                          value={this.state.nomor_dokumen_produksi}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Produksi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_dokumen_produksi"
                          value={this.state.tanggal_dokumen_produksi}
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggal_dokumen_produksi", date)
                          }
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Card title="Jumlah Produksi">
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Kemasan</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlah_kemasan_produksi"
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlah_kemasan_produksi", value)
                            }
                            value={this.state.jumlah_kemasan_produksi}
                            style={{ flex: 1 }}
                          />
                          <div>Liter</div>
                        </div>
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Produksi</FormLabel>
                        </div>
                        <InputNumber
                          id="jumlah_produksi_produksi"
                          onChange={(value) =>
                            this.handleInputNumberChange("jumlah_produksi_produksi", value)
                          }
                          value={this.state.jumlah_produksi_produksi}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Card title="Pelekatan">
                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Kemasan Dilekati Pita</FormLabel>
                        </div>
                        <InputNumber
                          id="jumlah_kemasan_dilekati_pita_pelekatan"
                          onChange={(value) =>
                            this.handleInputNumberChange(
                              "jumlah_kemasan_dilekati_pita_pelekatan",
                              value
                            )
                          }
                          value={this.state.jumlah_kemasan_dilekati_pita_pelekatan}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Upload Uraian Rincian">
                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Uraian Rincian</FormLabel>
                    </div>
                    <Upload
                      id="uraian_rincian_file"
                      name="uraian_rincian_file"
                      customRequest={this.handleDummyRequest}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={({ file, fileList }) =>
                        this.handleUploadFileChange("uraian_rincian_file", file, fileList)
                      }
                      fileList={this.state.uraian_rincian_file}
                    >
                      <Button>
                        <Icon type="upload" /> Upload
                      </Button>
                    </Upload>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
              <Col span={8} offset={16}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Button type="primary" block onClick={this.handleSimpan}>
                      Simpan Rincian
                    </Button>
                  </Col>

                  <Col span={12}>
                    <Button type="danger" block onClick={this.handleBatal}>
                      Batal
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
