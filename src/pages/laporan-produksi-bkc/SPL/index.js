import { Button, Card, Col, DatePicker, Form, Icon, Input, Row, Select, Table } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";

export default class SPL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Rekam Surat Pernyataan Libur",
      card_title_1: "Data Pemohon",
      card_title_2: "Data Pabrik",
      card_title_3: "Pernyataan",

      searchText: "",
      searchedColumn: "",

      nomor_spl: "",
      tanggal_spl: "",
      nama_pengusaha: "",
      jabatan: "",
      alamat_pemohon: "",

      nama_perusahaan: "",
      nppbkc: "",
      alamat_perusahaan: "",

      tanggal_libur_awal: "",
      tanggal_libur_akhir: "",
      pernyataan_tanggal: "",
      pernyataan_tempat: "",

      list_nama_perusahaan: [],
      list_tempat: [],
    };
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });
  handleColumnSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleColumnReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleTanggalSPLChange = (date, dateString) => {
    this.setState({ ...this.state, tanggal_spl: dateString });
  };
  handleNamaPerusahaanChange = (value) => {
    this.setState({ ...this.state, nama_perusahaan: value });
  };
  handleTanggalLiburAwalChange = (value) => {
    this.setState({ ...this.state, tanggal_libur_awal: value });
  };
  handleTanggalLiburAkhirChange = (value) => {
    this.setState({ ...this.state, tanggal_libur_akhir: value });
  };
  handlePernyataanTanggalChange = (date, dateString) => {
    this.setState({ ...this.state, pernyataan_tanggal: dateString });
  };
  handlePernyataanTempatChange = (value) => {
    this.setState({ ...this.state, pernyataan_tempat: value });
  };
  handleSimpan = () => {
    console.log("simpan...");
  };
  handleBatal = () => {
    console.log("batal...");
  };

  render() {
    return (
      <Container menuName="Laporan Produksi BKC" contentName="CK4 Belum Lapor" hideContentHeader>
        <Header>{this.state.subtitle1}</Header>
        <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
          <Form>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Card title={this.state.card_title_1} style={{ height: 563 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor SPL</FormLabel>
                    </div>
                    <Input
                      id="nomor_spl"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_spl}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal SPL</FormLabel>
                    </div>
                    <DatePicker onChange={this.handleTanggalSPLChange} style={{ width: "100%" }} />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Pengusaha</FormLabel>
                    </div>
                    <Input
                      id="nama_pengusaha"
                      onChange={this.handleInputChange}
                      value={this.state.nama_pengusaha}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jabatan</FormLabel>
                    </div>
                    <Input
                      id="jabatan"
                      onChange={this.handleInputChange}
                      value={this.state.jabatan}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea
                      id="alamat_pemohon"
                      onChange={this.handleInputChange}
                      value={this.state.alamat_pemohon}
                    />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title={this.state.card_title_2} style={{ height: 563 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Perusahaan</FormLabel>
                    </div>
                    <Select onChange={this.handleNamaPerusahaanChange}>
                      {this.state.list_nama_perusahaan.length > 0 &&
                        this.state.list_nama_perusahaan.map((item, index) => (
                          <Select.Option
                            key={`nama-perusahaan-${index}`}
                            value={item.nama_perusahaan_code}
                          >
                            {item.nama_perusahaan_name}
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

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea
                      id="alamat_perusahaan"
                      onChange={this.handleInputChange}
                      value={this.state.alamat_perusahaan}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Card title={this.state.card_title_3}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Libur</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <DatePicker
                        onChange={this.handleTanggalLiburAwalChange}
                        style={{ width: "100%" }}
                      />
                      <div>s.d</div>
                      <DatePicker
                        onChange={this.handleTanggalLiburAkhirChange}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal, Tempat</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <DatePicker onChange={this.handlePernyataanTanggalChange} />
                      <div>,</div>
                      <Select onChange={this.handlePernyataanTempatChange}>
                        {this.state.list_tempat.length > 0 &&
                          this.state.list_tempat.map((item, index) => (
                            <Select.Option
                              key={`pernyataan-tempat-${index}`}
                              value={item.pernyataan_tempat_code}
                            >
                              {item.pernyataan_tempat_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                    <Button type="primary" onClick={this.handleSimpan}>
                      Simpan
                    </Button>
                    <Button type="danger" onClick={this.handleBatal}>
                      Batal
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    );
  }
}
