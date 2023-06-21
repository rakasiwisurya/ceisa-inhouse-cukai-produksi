import { Button, Card, Col, DatePicker, Input, InputNumber, Row, Select, Table } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";

export default class CK4EAMMEAPerbaikan extends Component {
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

      nama_nppbkc: "",
      nppbkc: "",
      alamat_nppbkc: "",

      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",
      jenis_barang_kena_cukai: "",

      tanggal_jam_produksi_awal: "",
      tanggal_jam_produksi_akhir: "",
      jumlah_produksi: "",

      nomor_dokumen_produksi: "",
      tanggal_dokumen_produksi: "",

      jumlah_kemasan: "",
      jumlah_isi: "",

      jenis_mmea: "",
      jenis_kemasan: "",
      merk_mmea: "",
      isi: "",
      golongan: "",
      kadar: "",

      tanggal_diterima: "",
      penyampaian_ck4: "",
      tempat_dibuat: "",
      nama_pengusaha: "",

      nomor_surat: "",
      tanggal_surat: "",
      penjabat_bc_nip: "",
      penjabat_bc_nama: "",
      asal_kesalahan: "",
      keterangan: "",

      list_jenis_barang_kena_cukai: [
        {
          jenis_barang_kena_cukai_code: "EA",
          jenis_barang_kena_cukai_name: "EA",
        },
        {
          jenis_barang_kena_cukai_code: "MMEA",
          jenis_barang_kena_cukai_name: "MMEA",
        },
        {
          jenis_barang_kena_cukai_code: "HT",
          jenis_barang_kena_cukai_name: "HT",
        },
      ],
      list_merk_mmea: [
        {
          merk_mmea_code: "A",
          merk_mmea_name: "A",
        },
        {
          merk_mmea_code: "B",
          merk_mmea_name: "B",
        },
      ],
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
      list_penyampaian_ck4: [
        {
          penyampaian_ck4_code: "TEPAT_WAKTU",
          penyampaian_ck4_name: "Tepat Waktu",
        },
      ],
      list_asal_kesalahan: [
        {
          asal_kesalahan_code: "X",
          asal_kesalahan_name: "Factor X",
        },
        {
          asal_kesalahan_code: "Y",
          asal_kesalahan_name: "Factor Y",
        },
      ],

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
          title: "MMEA",
          children: [
            {
              title: "Jenis",
              dataIndex: "jenis_mmea",
              key: "jenis_mmea",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Merk",
              dataIndex: "merk_mmea",
              key: "merk_mmea",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Golongan",
              dataIndex: "golongan_mmea",
              key: "golongan_mmea",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Kadar",
              dataIndex: "kadar_mmea",
              key: "kadar_mmea",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "MMEA",
          children: [
            {
              title: "Jenis",
              dataIndex: "jenis_mmea",
              key: "jenis_mmea",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Merk",
              dataIndex: "merk_mmea",
              key: "merk_mmea",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Golongan",
              dataIndex: "golongan_mmea",
              key: "golongan_mmea",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Kadar",
              dataIndex: "kadar_mmea",
              key: "kadar_mmea",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "Kemasan",
          children: [
            {
              title: "Jenis",
              dataIndex: "jenis_kemasan",
              key: "jenis_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Isi (ml)",
              dataIndex: "isi_kemasan_ml",
              key: "isi_kemasan_ml",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              title: "Jumlah",
              dataIndex: "jumlah_kemasan",
              key: "jumlah_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "Jumlah",
          children: [
            {
              title: "(liter)",
              dataIndex: "jumlah_lt",
              key: "jumlah_lt",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
      ],
      dataSource: [
        {
          key: "1",
          nomor_dokumen_produksi: "nomor_dokumen_produksi",
          tanggal_dokumen_produksi: "tanggal_dokumen_produksi",
          jenis_mmea: "jenis_mmea",
          merk_mmea: "merk_mmea",
          golongan_mmea: "golongan_mmea",
          kadar_mmea: "kadar_mmea",
          jenis_kemasan: "jenis_kemasan",
          isi_kemasan_ml: "isi_kemasan_ml",
          jumlah_kemasan: "jumlah_kemasan",
          jumlah_lt: "jumlah_lt",
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
        <Container
          menuName="Laporan Produksi BKC CK4"
          contentName="EA dan MMEA Perbaikan"
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
                <Card title="Data NPPBKC">
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama</FormLabel>
                    </div>
                    <Input
                      id="nama_nppbkc"
                      onChange={this.handleInputChange}
                      value={this.state.nama_nppbkc}
                    />
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
                <Card title="Data Pemberitahuan">
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
                    <Select
                      id="jenis_barang_kena_cukai"
                      onChange={(value) =>
                        this.handleSelectChange("jenis_barang_kena_cukai", value)
                      }
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_barang_kena_cukai.length > 0 &&
                        this.state.list_jenis_barang_kena_cukai.map((item, index) => (
                          <Select.Option
                            key={`nama-nppbkc-${index}`}
                            value={item.jenis_barang_kena_cukai_code}
                          >
                            {item.jenis_barang_kena_cukai_name}
                          </Select.Option>
                        ))}
                    </Select>
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
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card title="Data Produksi">
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
                    <Card title="Jumlah MMEA">
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Kemasan</FormLabel>
                        </div>
                        <InputNumber
                          id="jumlah_kemasan"
                          onChange={(value) =>
                            this.handleInputNumberChange("jumlah_kemasan", value)
                          }
                          value={this.state.jumlah_kemasan}
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Isi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlah_isi"
                            onChange={(value) => this.handleInputNumberChange("jumlah_isi", value)}
                            value={this.state.jumlah_isi}
                            style={{ flex: 1 }}
                          />
                          <div>Liter</div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Card title="MMEA Yang Dikemas">
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis MMEA</FormLabel>
                    </div>
                    <Input
                      id="jenis_mmea"
                      onChange={this.handleInputChange}
                      value={this.state.jenis_mmea}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Kemasan</FormLabel>
                    </div>
                    <Input
                      id="jenis_kemasan"
                      onChange={this.handleInputChange}
                      value={this.state.jenis_kemasan}
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
                        style={{ flex: 1 }}
                      />
                      <div>mililiter</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Select
                      id="golongan"
                      onChange={(value) => this.handleSelectChange("golongan", value)}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_golongan.length > 0 &&
                        this.state.list_golongan.map((item, index) => (
                          <Select.Option key={`merk-mmea-${index}`} value={item.golongan_code}>
                            {item.golongan_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="kadar"
                        onChange={(value) => this.handleInputNumberChange("kadar", value)}
                        value={this.state.kadar}
                        style={{ flex: 1 }}
                      />
                      <div>%</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8} offset={16}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Button type="primary" block>
                      Batal
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button type="primary" block>
                      Simpan Rincian
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div style={{ marginTop: 30 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>

          <Header>{this.state.subtitle4}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Diterima</FormLabel>
                </div>
                <DatePicker
                  id="tangal_diterima"
                  onChange={(date) => this.handleDatepickerChange("tangal_diterima", date)}
                  style={{ width: "100%" }}
                  value={this.state.tanggal_diterima}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Penyampaian CK-4</FormLabel>
                </div>
                <Select
                  id="penyampaian_ck4"
                  onChange={(value) => this.handleSelectChange("penyampaian_ck4", value)}
                  style={{ width: "100%" }}
                  value={this.state.penyampaian_ck4}
                >
                  {this.state.list_penyampaian_ck4.length > 0 &&
                    this.state.list_penyampaian_ck4.map((item, index) => (
                      <Select.Option
                        key={`penyampaian-ck4-${index}`}
                        value={item.penyampaian_ck4_code}
                      >
                        {item.penyampaian_ck4_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Dibuat di Kota / Kabupaten</FormLabel>
                </div>
                <Input
                  id="tempat_dibuat"
                  onChange={this.handleInputChange}
                  value={this.state.tempat_dibuat}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nama Pengusaha</FormLabel>
                </div>
                <Input
                  id="nama_pengusaha"
                  onChange={this.handleInputChange}
                  value={this.state.nama_pengusaha}
                />
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle5}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
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

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Surat</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_surat"
                  onChange={(date) => this.handleDatepickerChange("tanggal_surat", date)}
                  style={{ width: "100%" }}
                  value={this.state.tanggal_surat}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Penjabat BC</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Input
                    id="penjabat_bc_nip"
                    onChange={this.handleInputChange}
                    value={this.state.penjabat_bc_nip}
                    style={{ flex: 1 }}
                  />
                  <Button type="primary">Cari</Button>
                  <Input
                    id="penjabat_bc_nama"
                    onChange={this.handleInputChange}
                    value={this.state.penjabat_bc_nama}
                    style={{ flex: 2 }}
                    disabled
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Asal Kesalahan</FormLabel>
                </div>
                <Select
                  id="asal_kesalahan"
                  onChange={(value) => this.handleSelectChange("asal_kesalahan", value)}
                  style={{ width: "100%" }}
                  value={this.state.asal_kesalahan}
                >
                  {this.state.list_asal_kesalahan.length > 0 &&
                    this.state.list_asal_kesalahan.map((item, index) => (
                      <Select.Option
                        key={`penyampaian-ck4-${index}`}
                        value={item.asal_kesalahan_code}
                      >
                        {item.asal_kesalahan_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Keterangan</FormLabel>
                </div>
                <Input.TextArea
                  id="keterangan"
                  onChange={this.handleInputChange}
                  value={this.state.keterangan}
                />
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
              <Col span={4} offset={20}>
                <Button type="primary" onClick={this.handleSimpanPerbaikan} block>
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
