import { Button, Card, Col, DatePicker, Form, Icon, Input, Row, Select, Table } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";

export default class ReferensiTanggal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",
      isEdit: false,
      searchText: "",
      searchedColumn: "",

      isCK4AShow: false,
      isCK4BShow: false,
      isCK4CShow: false,

      nomor_skep: "",
      tanggal_skep: "",
      awal_berlaku_skep: "",
      akhir_berlaku_skep: "",
      jenis_bkc: "",
      jenis_periode: "",
      jenis_usaha: "",
      jenis_penanggalan: "",
      bulan_awal_periode: "",
      bulan_akhir_periode: "",
      tahun_periode: "",
      batas_awal_p3c: "",
      batas_akhir_p3c: "",
      aktif: "",

      list_jenis_bkc: [
        {
          jenis_bkc_code: "HT",
          jenis_bkc_name: "HT",
        },
        {
          jenis_bkc_code: "MMEA",
          jenis_bkc_name: "MMEA",
        },
      ],
      list_jenis_periode: [
        {
          jenis_periode_code: "P3C_AWAL",
          jenis_periode_name: "P3C Awal",
        },
        {
          jenis_periode_code: "P3C_TAMBAHAN",
          jenis_periode_name: "P3C Tambahan",
        },
        {
          jenis_periode_code: "P3C_TAMBAHAN_IKK",
          jenis_periode_name: "P3C Tambahan IKK",
        },
      ],
      list_jenis_usaha: [
        {
          jenis_usaha_code: "PABRIK",
          jenis_usaha_name: "Pabrik",
        },
        {
          jenis_usaha_code: "IMPORTIR",
          jenis_usaha_name: "Importir",
        },
      ],
      list_jenis_penanggalan: [
        {
          jenis_penanggalan_code: "PERIODE",
          jenis_penanggalan_name: "Periode",
        },
        {
          jenis_penanggalan_code: "TANGGAL",
          jenis_penanggalan_name: "Tanggal",
        },
      ],
      list_bulan_periode: [
        {
          bulan_periode_code: "1",
          bulan_periode_name: "Januari",
        },
        {
          bulan_periode_code: "2",
          bulan_periode_name: "Februari",
        },
        {
          bulan_periode_code: "3",
          bulan_periode_name: "Maret",
        },
        {
          bulan_periode_code: "4",
          bulan_periode_name: "April",
        },
        {
          bulan_periode_code: "5",
          bulan_periode_name: "Mei",
        },
        {
          bulan_periode_code: "6",
          bulan_periode_name: "Juni",
        },
        {
          bulan_periode_code: "7",
          bulan_periode_name: "Juli",
        },
        {
          bulan_periode_code: "8",
          bulan_periode_name: "Agustus",
        },
        {
          bulan_periode_code: "9",
          bulan_periode_name: "September",
        },
        {
          bulan_periode_code: "10",
          bulan_periode_name: "Oktober",
        },
        {
          bulan_periode_code: "11",
          bulan_periode_name: "November",
        },
        {
          bulan_periode_code: "12",
          bulan_periode_name: "Desember",
        },
      ],
      list_tahun_periode: [
        {
          tahun_periode_code: "2022",
          tahun_periode_name: "2022",
        },
        {
          tahun_periode_code: "2023",
          tahun_periode_name: "2023",
        },
        {
          tahun_periode_code: "2024",
          tahun_periode_name: "2024",
        },
      ],
      list_aktif: [
        {
          aktif_code: true,
          aktif_name: "Ya",
        },
        {
          aktif_code: false,
          aktif_name: "Tidak",
        },
      ],

      columns: [
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          fixed: "left",
          render: () => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button type="primary" icon="form" onClick={this.handleEdit} />
              <Button type="danger" icon="close" onClick={this.handleReset} />
            </div>
          ),
        },
        {
          title: "Jenis BKC",
          dataIndex: "jenis_bkc",
          key: "jenis_bkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_bkc"),
        },
        {
          title: "Jenis Usaha",
          dataIndex: "jenis_usaha",
          key: "jenis_usaha",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_usaha"),
        },

        {
          title: "Jenis Penanggalan",
          dataIndex: "jenis_penanggalan",
          key: "jenis_penanggalan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_penanggalan"),
        },
        {
          title: "Jenis Periode",
          dataIndex: "jenis_periode",
          key: "jenis_periode",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_periode"),
        },
        {
          title: "Bulan Awal Periode",
          dataIndex: "bulan_awal_periode",
          key: "bulan_awal_periode",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("bulan_awal_periode"),
        },
        {
          title: "Bulan Akhir Periode",
          dataIndex: "bulan_akhir_periode",
          key: "bulan_akhir_periode",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("bulan_akhir_periode"),
        },
        {
          title: "Tahun Periode",
          dataIndex: "tahun_periode",
          key: "tahun_periode",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tahun_periode"),
        },
        {
          title: "Batas Awal P3C",
          dataIndex: "batas_awal_p3c",
          key: "batas_awal_p3c",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("batas_awal_p3c"),
        },
        {
          title: "Batas Akhir P3C",
          dataIndex: "batas_akhir_p3c",
          key: "batas_akhir_p3c",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("batas_akhir_p3c"),
        },
        {
          title: "Aktif",
          dataIndex: "aktif",
          key: "aktif",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("aktif"),
        },
      ],
      dataSource: [
        {
          key: "1",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "2",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "3",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "4",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "5",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "6",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "7",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "8",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "9",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
        {
          key: "10",
          jenis_bkc: "Jenis BKC",
          jenis_usaha: "Jenis Usaha",
          jenis_penanggalan: "Jenis Penanggalan",
          jenis_periode: "Jenis Periode",
          bulan_awal_periode: "Bulan Awal Periode",
          bulan_akhir_periode: "Bulan Akhir Periode",
          tahun_periode: "Tahun Periode",
          batas_awal_p3c: "Batas Awal P3C",
          batas_akhir_p3c: "Batas Akhir P3C",
          aktif: "Aktif",
        },
      ],
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
  handleTanggalSKEPChange = (date, dateString) => {
    this.setState({ ...this.state, tanggal_skep: dateString });
  };
  handleAwalBerlakuSKEPChange = (date, dateString) => {
    this.setState({ ...this.state, awal_berlaku_skep: dateString });
  };
  handleAkhirBerlakuSKEPChange = (date, dateString) => {
    this.setState({ ...this.state, akhir_berlaku_skep: dateString });
  };
  handleBatasAwalP3CChange = (date, dateString) => {
    this.setState({ ...this.state, batas_awal_p3c: dateString });
  };
  handleBatasAkhirP3CChange = (date, dateString) => {
    this.setState({ ...this.state, batas_akhir_p3c: dateString });
  };
  handleJenisBKCChange = (value) => {
    this.setState({ ...this.state, jenis_bkc: value });
  };
  handleJenisPeriodeChange = (value) => {
    this.setState({ ...this.state, jenis_periode: value });
  };
  handleJenisUsahaChange = (value) => {
    this.setState({ ...this.state, jenis_usaha: value });
  };
  handleJenisPenanggalanChange = (value) => {
    this.setState({ ...this.state, jenis_penanggalan: value });
  };
  handleBulanAwalPeriodeChange = (value) => {
    this.setState({ ...this.state, bulan_awal_periode: value });
  };
  handleBulanAkhirPeriodeChange = (value) => {
    this.setState({ ...this.state, bulan_akhir_periode: value });
  };
  handleTahunPeriodeChange = (value) => {
    this.setState({ ...this.state, tahun_periode: value });
  };
  handleAktifChange = (value) => {
    this.setState({ ...this.state, aktif: value });
  };

  handleEdit = () => {
    this.setState({ ...this.state, isEdit: true });
  };
  handleDelete = () => {
    console.log("deleting...");
  };
  handleReset = () => {
    console.log("reseting...");
  };
  handleUpdate = () => {
    this.setState({ ...this.state, isEdit: false });
    console.log("update...");
  };
  handleSave = () => {
    console.log("saving...");
  };
  handleRekam = () => {
    console.log("merekam...");
  };

  render() {
    return (
      <>
        <Container
          menuName="Refrensi Tarif dan Pita Cukai"
          contentName="Referensi Tanggal"
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
                  <FormLabel>Nomor SKEP</FormLabel>
                </div>
                <Input
                  id="nomor_skep"
                  onChange={this.handleInputChange}
                  value={this.state.nomor_skep}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal SKEP</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_skep"
                  onChange={this.handleTanggalSKEPChange}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Awal Berlaku SKEP</FormLabel>
                </div>
                <DatePicker
                  id="awal_berlaku_skep"
                  onChange={this.handleAwalBerlakuSKEPChange}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Akhir Berlaku SKEP</FormLabel>
                </div>
                <DatePicker
                  id="akhir_berlaku_skep"
                  onChange={this.handleAkhirBerlakuSKEPChange}
                  style={{ width: "100%" }}
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
                  onChange={this.handleJenisBKCChange}
                  style={{ width: "100%" }}
                >
                  {this.state.list_jenis_bkc.length > 0 &&
                    this.state.list_jenis_bkc.map((item) => (
                      <Select.Option value={item.jenis_bkc_code}>
                        {item.jenis_bkc_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis Periode</FormLabel>
                </div>
                <Select
                  id="jenis_periode"
                  onChange={this.handleJenisPeriodeChange}
                  style={{ width: "100%" }}
                >
                  {this.state.list_jenis_periode.length > 0 &&
                    this.state.list_jenis_periode.map((item) => (
                      <Select.Option value={item.jenis_periode_code}>
                        {item.jenis_periode_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis Usaha</FormLabel>
                </div>
                <Select
                  id="jenis_usaha"
                  onChange={this.handleJenisUsahaChange}
                  style={{ width: "100%" }}
                >
                  {this.state.list_jenis_usaha.length > 0 &&
                    this.state.list_jenis_usaha.map((item) => (
                      <Select.Option value={item.jenis_usaha_code}>
                        {item.jenis_usaha_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis Penanggalan</FormLabel>
                </div>
                <Select
                  id="jenis_penanggalan"
                  onChange={this.handleJenisPenanggalanChange}
                  style={{ width: "100%" }}
                >
                  {this.state.list_jenis_penanggalan.length > 0 &&
                    this.state.list_jenis_penanggalan.map((item) => (
                      <Select.Option value={item.jenis_penanggalan_code}>
                        {item.jenis_penanggalan_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Bulan Periode</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Select
                    id="bulan_awal_periode"
                    onChange={this.handleBulanAwalPeriodeChange}
                    style={{ width: "100%" }}
                  >
                    {this.state.list_bulan_periode.length > 0 &&
                      this.state.list_bulan_periode.map((item) => (
                        <Select.Option value={item.bulan_periode_code}>
                          {item.bulan_periode_name}
                        </Select.Option>
                      ))}
                  </Select>
                  <div>s/d</div>
                  <Select
                    id="bulan_akhir_periode"
                    onChange={this.handleBulanAkhirPeriodeChange}
                    style={{ width: "100%" }}
                  >
                    {this.state.list_bulan_periode.length > 0 &&
                      this.state.list_bulan_periode.map((item) => (
                        <Select.Option value={item.bulan_periode_code}>
                          {item.bulan_periode_name}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tahun Periode</FormLabel>
                </div>
                <Select
                  id="tahun_periode"
                  onChange={this.handleTahunPeriodeChange}
                  style={{ width: "100%" }}
                >
                  {this.state.list_tahun_periode.length > 0 &&
                    this.state.list_tahun_periode.map((item) => (
                      <Select.Option value={item.tahun_periode_code}>
                        {item.tahun_periode_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Batas Tanggal P3C</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <DatePicker
                    id="batas_awal_p3c"
                    onChange={this.handleBatasAwalP3CChange}
                    style={{ width: "100%" }}
                  />
                  <div>s/d</div>
                  <DatePicker
                    id="batas_akhir_p3c"
                    onChange={this.handleBatasAkhirP3CChange}
                    style={{ width: "100%" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Aktif</FormLabel>
                </div>
                <Select id="aktif" onChange={this.handleAktifChange} style={{ width: "100%" }}>
                  {this.state.list_aktif.length > 0 &&
                    this.state.list_aktif.map((item) => (
                      <Select.Option value={item.aktif_code}>{item.aktif_name}</Select.Option>
                    ))}
                </Select>
              </Col>
            </Row>

            <Row>
              <Col span={8} offset={8}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    {this.state.isEdit ? (
                      <Button type="primary" block onClick={this.handleUpdate}>
                        UBAH
                      </Button>
                    ) : (
                      <Button type="primary" block onClick={this.handleSave}>
                        SIMPAN
                      </Button>
                    )}
                  </Col>

                  <Col span={12}>
                    <Button type="danger" block onClick={this.handleReset}>
                      RESET
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                scroll={{ x: "max-content" }}
              />
            </div>

            <Row>
              <Col offset={20} span={4}>
                <Button type="primary" onClick={this.handleRekam} block>
                  Rekam
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}
