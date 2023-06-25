import {
  Button,
  Card,
  Col,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import React, { Component } from "react";
import { months, years } from "utils/times";

export default class CK4HTPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Keterangan Lain",
      subtitle5: "Dasar Perbaikan",

      nama_pemrakarsa: "SENDI BENI SUSANDI",
      jabatan_pemrakarsa: "PEGAWAI PADA DIREKTORAT INFORMASI KEPABEANAN DAN CUKAI",
      id_process_pemrakarsa: "7784508",
      nip_pemrakarsa: "199210122014021001",

      nama_nppbkc: "PR Pelangi",
      nppbkc: "0506.1.3.5043",
      alamat_nppbkc:
        "Lingkungan Jelat Rt. 001/Rw. 004, Kel. Pataruman, Kec. Pataruman, Kota Banjar",

      nomor_pemberitahuan: "06/PL/V/2023",
      tanggal_pemberitahuan: moment("2023-06-05"),
      jenis_barang_kena_cukai: "HASIL TEMBAKAU (HT)",
      periode_bulan: "Mei",
      periode_tahun: "2023",
      tanggal_produksi_awal: moment("2023-05-01"),
      tanggal_produksi_akhir: moment("2023-05-31"),
      jumlah_kemasan: 6.32,
      jumlah_kemasan_dilekati_pita_kemasan: 6.32,
      jumlah_produksi_ht_btg: 0,
      jumlah_produksi_ht_gr: 301.2,
      jumlah_produksi_ht_ml: 0,

      merk_ht: "",
      jenis_hasil_tembakau: "",
      hje: "",
      bahan_kemasan: "",
      isi_per_kemasan: "",

      nomor_dokumen_produksi: "",
      tanggal_dokumen_produksi: "",

      jumlah_kemasan_produksi: "",
      jumlah_produksi_per_merk: "",

      jumlah_kemasan_dilekati_pita: "",

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
      // list_periode_bulan: months(),
      // list_periode_tahun: years(),

      columns: [
        {
          title: "Dokumen Produksi",
          children: [
            {
              title: "Nomor",
              dataIndex: "nomor_dokumen_produksi",
              key: "nomor_dokumen_produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Tanggal",
              dataIndex: "tanggal_dokumen_produksi",
              key: "tanggal_dokumen_produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "Jenis HT",
          dataIndex: "jenis_ht",
          key: "jenis_ht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
        {
          title: "Merk",
          dataIndex: "merk",
          key: "merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
        {
          title: "HJE",
          dataIndex: "hje",
          key: "hje",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
        {
          title: "Kemasan",
          children: [
            {
              title: "Bahan",
              dataIndex: "bahan",
              key: "bahan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Isi",
              dataIndex: "isi",
              key: "isi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Satuan",
              dataIndex: "satuan",
              key: "satuan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Jumlah",
              dataIndex: "jumlah",
              key: "jumlah",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "Jumlah Isi",
          dataIndex: "jumlah_isi",
          key: "jumlah_isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
        {
          title: "Jumlah Kemasan Dilekati Pita",
          dataIndex: "jumlah_kemasan_dilekati_pita",
          key: "jumlah_kemasan_dilekati_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
      ],
      dataSource: [],
    };
  }

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };

  handleSimpan = () => {
    console.log("simpan");
  };
  handleBatal = () => {
    this.props.history.goBack();
  };
  handleSimpanPerbaikan = () => {
    console.log("simpan perbaikan...");
  };

  render() {
    console.log("this.props.match.params.id", this.props.match.params.id);
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="HT Perbaikan" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nama Pemrakarsa</FormLabel>
                </div>
                <Input id="nama_pemrakarsa" value={this.state.nama_pemrakarsa} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>ID Proses</FormLabel>
                </div>
                <Input
                  id="id_process_pemrakarsa"
                  value={this.state.id_process_pemrakarsa}
                  disabled
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jabatan</FormLabel>
                </div>
                <Input id="jabatan_pemrakarsa" value={this.state.jabatan_pemrakarsa} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NIP</FormLabel>
                </div>
                <Input id="nip_pemrakarsa" value={this.state.nip_pemrakarsa} disabled />
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
                <Card title="Data Produksi">
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Periode</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Select
                        id="periode_bulan"
                        onChange={(value) => this.handleSelectChange("periode_bulan", value)}
                        style={{ width: "100%" }}
                        value={this.state.periode_bulan}
                      >
                        {months.map((item, index) => (
                          <Select.Option key={`periode-bulan-${index}`} value={item.month_code}>
                            {item.month_name}
                          </Select.Option>
                        ))}
                      </Select>

                      <Select
                        id="periode_tahun"
                        onChange={(value) => this.handleSelectChange("periode_tahun", value)}
                        style={{ width: "100%" }}
                        value={this.state.periode_tahun}
                      >
                        {years.map((item, index) => (
                          <Select.Option key={`periode-tahun-${index}`} value={item.year_code}>
                            {item.year_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DatePicker
                        id="tanggal_produksi_awal"
                        onChange={(date) =>
                          this.handleDatepickerChange("tanggal_produksi_awal", date)
                        }
                        style={{ width: "100%" }}
                        value={this.state.tanggal_produksi_awal}
                      />
                      <div>s/d</div>
                      <DatePicker
                        id="tanggal_produksi_akhir"
                        onChange={(date) =>
                          this.handleDatepickerChange("tanggal_produksi_akhir", date)
                        }
                        style={{ width: "100%" }}
                        value={this.state.tanggal_produksi_akhir}
                      />
                    </div>
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
                        id="jumlah_kemasan_dilekati_pita_kemasan"
                        onChange={(value) =>
                          this.handleInputNumberChange(
                            "jumlah_kemasan_dilekati_pita_kemasan",
                            value
                          )
                        }
                        value={this.state.jumlah_kemasan_dilekati_pita_kemasan}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Kemasan</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (btg)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_produksi_ht_btg"
                        onChange={(value) =>
                          this.handleInputNumberChange("jumlah_produksi_ht_btg", value)
                        }
                        value={this.state.jumlah_produksi_ht_btg}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Batang</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (gr)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_produksi_ht_gr"
                        onChange={(value) =>
                          this.handleInputNumberChange("jumlah_produksi_ht_gr", value)
                        }
                        value={this.state.jumlah_produksi_ht_gr}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Gram</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (ml)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_produksi_ht_gr"
                        onChange={(value) =>
                          this.handleInputNumberChange("jumlah_produksi_ht_gr", value)
                        }
                        value={this.state.jumlah_produksi_ht_gr}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>mililiter</div>
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
                      <FormLabel>Jenis Hasil Tembakau</FormLabel>
                    </div>
                    <Input
                      id="jenis_hasil_tembakau"
                      onChange={(value) => this.handleInputChange("jenis_hasil_tembakau", value)}
                      value={this.state.jenis_hasil_tembakau}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk HT</FormLabel>
                    </div>
                    <Input
                      id="merk_ht"
                      onChange={(value) => this.handleInputChange("merk_ht", value)}
                      value={this.state.merk_ht}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="hje"
                        onChange={(value) => this.handleInputNumberChange("hje", value)}
                        value={this.state.hje}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Rupiah</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Bahan Kemasan</FormLabel>
                    </div>
                    <Input
                      id="bahan_kemasan"
                      onChange={(value) => this.handleInputChange("bahan_kemasan", value)}
                      value={this.state.bahan_kemasan}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi per Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="isi_per_kemasan"
                        onChange={(value) => this.handleInputNumberChange("isi_per_kemasan", value)}
                        value={this.state.isi_per_kemasan}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Batang/gram/ml</div>
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
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggal_dokumen_produksi", date)
                          }
                          style={{ width: "100%" }}
                          value={this.state.tanggal_dokumen_produksi}
                        />
                      </div>
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Card title="Jumlah Produksi dan Kemasan">
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
                          <div>Kemasan</div>
                        </div>
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Produksi per Merk</FormLabel>
                        </div>
                        <InputNumber
                          id="jumlah_produksi_per_merk"
                          onChange={(value) =>
                            this.handleInputNumberChange("jumlah_produksi_per_merk", value)
                          }
                          value={this.state.jumlah_produksi_per_merk}
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
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlah_kemasan_dilekati_pita"
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlah_kemasan_dilekati_pita", value)
                            }
                            value={this.state.jumlah_kemasan_dilekati_pita}
                            style={{ flex: 1 }}
                          />
                          <div>Kemasan</div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
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

            <div style={{ marginTop: 20, marginBottom: 30 }}>
              <Table
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                scroll={{ x: "max-content" }}
                footer={(currentPageData) => {
                  return (
                    <Table
                      style={{ margin: -16 }}
                      showHeader={false}
                      pagination={false}
                      columns={[
                        {
                          key: "title",
                          title: "Title",
                          dataIndex: "title",
                          render: (text, record, index) => (
                            <div style={{ textAlign: "right" }}>{text}</div>
                          ),
                        },
                        {
                          key: "data",
                          title: "Data",
                          dataIndex: "data",
                          width: 80,
                          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                        },
                      ]}
                      dataSource={[
                        {
                          key: "1",
                          title: "Jumlah Kemasan",
                          data: "0",
                        },
                        {
                          key: "2",
                          title: "Jumlah Kemasan Dilekati Pita",
                          data: "0",
                        },
                        {
                          key: "3",
                          title: "Jumlah Batang",
                          data: "0",
                        },
                        {
                          key: "4",
                          title: "Jumlah Gram",
                          data: "0",
                        },
                        {
                          key: "5",
                          title: "Jumlah Militer",
                          data: "0",
                        },
                      ]}
                    />
                  );
                }}
              />
            </div>

            <Row>
              <Col span={4} offset={20}>
                <Button type="primary" block onClick={this.handleSimpanPerbaikan}>
                  Simpan Perbaikan
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}
