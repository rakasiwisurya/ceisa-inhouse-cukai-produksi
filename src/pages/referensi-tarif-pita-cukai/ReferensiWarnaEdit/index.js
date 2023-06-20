import { Button, Col, DatePicker, Icon, Input, Row, Select } from "antd";
import React, { Component } from "react";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";

export default class ReferensiWarnaEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",
      nomor_surat: "A",
      tanggal_surat: moment(new Date()),
      tanggal_awal_berlaku: moment(new Date()),
      jenis_bkc: "HT",
      kode_warna: "HIJAU",
      warna: "Hijau",
      golongan: "I",
      jenis_produksi: "REL",
      jenis_usaha: "IMPORTIR",

      searchText: "",
      searchedColumn: "",

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
      list_jenis_usaha: [],
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
          list_jenis_usaha: [
            {
              jenis_usaha_code: "DALAM_NEGERI",
              jenis_usaha_name: "Dalam Negeri",
            },
            {
              jenis_usaha_code: "IMPORTIR",
              jenis_usaha_name: "Importir",
            },
          ],
        });
      }
    }
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
          menuName="Refrensi Tarif dan Pita Cukai"
          contentName="Referensi Warna Edit"
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
                  onChange={(date) => this.handleDatepickerChange("tanggal_surat", date)}
                  style={{ width: "100%" }}
                  value={this.state.tanggal_surat}
                />
              </Col>

              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_awal_berlaku"
                  onChange={(date) => this.handleDatepickerChange("tanggal_awal_berlaku", date)}
                  style={{ width: "100%" }}
                  value={this.state.tanggal_awal_berlaku}
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
                  onChange={(value) => this.handleSelectChange("jenis_bkc", value)}
                  style={{ width: "100%" }}
                  value={this.state.jenis_bkc}
                  disabled
                >
                  {this.state.list_jenis_bkc.length > 0 &&
                    this.state.list_jenis_bkc.map((item, index) => (
                      <Select.Option key={`jenis-bkc-${index}`} value={item.jenis_bkc_code}>
                        {item.jenis_bkc_name}
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

              <Col span={12}>
                {this.state.jenis_bkc && (
                  <>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Select
                      id="golongan"
                      onChange={(value) => this.handleSelectChange("golongan", value)}
                      value={this.state.golongan}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_golongan.length > 0 &&
                        this.state.list_golongan.map((item, index) => (
                          <Select.Option key={`golongan-${index}`} value={item.golongan_code}>
                            {item.golongan_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </>
                )}
              </Col>

              <Col span={12}>
                {this.state.jenis_bkc === "HT" && (
                  <>
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
                  </>
                )}

                {this.state.jenis_bkc === "MMEA" && (
                  <>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Usaha</FormLabel>
                    </div>
                    <Select
                      id="jenis_usaha"
                      onChange={(value) => this.handleSelectChange("jenis_usaha", value)}
                      style={{ width: "100%" }}
                      value={this.state.jenis_usaha}
                    >
                      {this.state.list_jenis_usaha.length > 0 &&
                        this.state.list_jenis_usaha.map((item, index) => (
                          <Select.Option key={`golongan-${index}`} value={item.jenis_usaha_code}>
                            {item.jenis_usaha_name}
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
