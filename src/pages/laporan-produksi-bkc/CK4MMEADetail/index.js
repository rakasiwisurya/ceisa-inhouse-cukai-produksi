import { Button, Card, Col, DatePicker, Icon, Input, InputNumber, Row, Select, Upload } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import React, { Component } from "react";

export default class CK4MMEADetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemberitahu",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",

      tempat_dibuat: "tempat_dibuat",
      nama_pengusaha: "nama_pengusaha",

      nama_nppbkc: "nama_nppbkc",
      nppbkc: "nppbkc",
      alamat_nppbkc: "alamat_nppbkc",
      jenis_laporan: "jenis_laporan",
      nomor_pemberitahuan: "0",
      tanggal_pemberitahuan: moment(new Date()),
      jenis_barang_kena_cukai: "Minuman Mengandung Etil Alkohol (MMEA)",
      tanggal_jam_produksi_awal: moment(new Date()),
      tanggal_jam_produksi_akhir: moment(new Date()),
      jumlah_kemasan: "0",
      jumlah_kemasan_dilekati_pita: "0",
      jumlah_produksi: "0",

      jenis_mmea: "jenis_mmea",
      merk_mmea: "merk_mmea",
      isi: "isi",
      jenis_kemasan: "jenis_kemasan",
      golongan: "golongan",
      kadar: "kadar",
      nomor_dokumen_produksi: "nomor_dokumen_produksi",
      tanggal_dokumen_produksi: moment(new Date()),
      jumlah_kemasan_produksi: "0",
      jumlah_produksi: "0",
      jumlah_kemasan_dilekati_pita_pelekatan: "0",

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

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="MMEA Detail" hideContentHeader>
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
                    value={this.state.tempat_dibuat}
                    disabled
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
                    disabled
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
                      value={this.state.nama_nppbkc}
                      disabled
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
                      disabled
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
                      disabled
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
                      value={this.state.jenis_laporan}
                      disabled
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
                      disabled
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pemberitahuan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_pemberitahuan"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_pemberitahuan", date)
                      }
                      style={{ width: "100%" }}
                      value={this.state.tanggal_pemberitahuan}
                      disabled
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
                      value={this.state.tanggal_jam_produksi_awal}
                      disabled
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
                      value={this.state.tanggal_jam_produksi_akhir}
                      disabled
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
                        min={0}
                        style={{ flex: 1 }}
                        value={this.state.jumlah_kemasan}
                        disabled
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
                        id="jumlah_kemasan_dilekati_pita_kemasan"
                        onChange={(value) =>
                          this.handleInputNumberChange(
                            "jumlah_kemasan_dilekati_pita_kemasan",
                            value
                          )
                        }
                        min={0}
                        style={{ flex: 1 }}
                        value={this.state.jumlah_kemasan_dilekati_pita}
                        disabled
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
                        min={0}
                        style={{ flex: 1 }}
                        value={this.state.jumlah_produksi}
                        disabled
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
                      style={{ flex: 1 }}
                      value={this.state.jenis_mmea}
                      disabled
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
                      value={this.state.merk_mmea}
                      disabled
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
                        min={0}
                        style={{ flex: 1 }}
                        value={this.state.isi}
                        disabled
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
                      style={{ flex: 1 }}
                      value={this.state.jenis_kemasan}
                      disabled
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Input
                      id="golongan"
                      onChange={(value) => this.handleInputChange("golongan", value)}
                      style={{ flex: 1 }}
                      value={this.state.golongan}
                      disabled
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
                        min={0}
                        style={{ flex: 1 }}
                        value={this.state.kadar}
                        disabled
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
                          disabled
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Produksi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_dokumen_produksi"
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggal_dokumen_produksi", date)
                          }
                          style={{ width: "100%" }}
                          value={this.state.tanggal_dokumen_produksi}
                          disabled
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
                            style={{ flex: 1 }}
                            value={this.state.jumlah_kemasan_produksi}
                            disabled
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
                          style={{ width: "100%" }}
                          value={this.state.jumlah_produksi_produksi}
                          disabled
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
                          style={{ width: "100%" }}
                          value={this.state.jumlah_kemasan_dilekati_pita_pelekatan}
                          disabled
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
                      disabled
                    >
                      <Button disabled>
                        <Icon type="upload" /> Upload
                      </Button>
                    </Upload>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}
