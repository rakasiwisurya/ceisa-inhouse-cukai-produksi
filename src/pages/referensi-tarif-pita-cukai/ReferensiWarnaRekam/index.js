import { Button, Col, DatePicker, Icon, Input, Row, Select, Table } from "antd";
import React, { Component } from "react";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import { Fragment } from "react";

export default class ReferensiWarnaRekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",
      isEdit: false,

      nomor_surat: "",
      tanggal_surat: "",
      tanggal_awal_berlaku: "",
      jenis_bkc_code: "",
      jenis_bkc_name: "",
      kode_warna: "",
      warna: "",
      golongan_code: "",
      golongan_name: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_usaha_code: "",
      jenis_usaha_name: "",

      searchText: "",
      searchedColumn: "",
      page: 1,

      list_jenis_bkc: [
        {
          jenis_bkc_code: 3,
          jenis_bkc_name: "Hasil Tembakau (HT)",
        },
        {
          jenis_bkc_code: 2,
          jenis_bkc_name: "Minuman Mengandung Etil Alkohol (MMEA)",
        },
      ],
      list_golongan: [],
      list_jenis_produksi: [],
      list_jenis_usaha: [],
      columns: [],
      dataSource: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_bkc_code !== this.state.jenis_bkc_code) {
      if (this.state.jenis_bkc_code === 3) {
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
          columns: [
            {
              title: "Aksi",
              dataIndex: "aksi",
              key: "aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <Button type="primary" icon="form" onClick={() => this.handleEdit(record)} />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(index)} />
                </div>
              ),
            },
            {
              title: "Nomor",
              dataIndex: "nomor",
              key: "nomor",
              render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
              ),
            },
            {
              title: "Kode Warna",
              dataIndex: "kode_warna",
              key: "kode_warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kode_warna"),
            },
            {
              title: "Warna",
              dataIndex: "warna",
              key: "warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("warna"),
            },
            {
              title: "Golongan",
              dataIndex: "golongan_name",
              key: "golongan_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              title: "Jenis Produksi",
              dataIndex: "jenis_produksi_name",
              key: "jenis_produksi_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
          ],
        });
      }

      if (this.state.jenis_bkc_code === 2) {
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
          columns: [
            {
              title: "Aksi",
              dataIndex: "aksi",
              key: "aksi",
              fixed: "left",
              render: (text, record) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <Button type="primary" icon="form" onClick={() => this.handleEdit(record)} />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(record)} />
                </div>
              ),
            },
            {
              title: "Nomor",
              dataIndex: "nomor",
              key: "nomor",
              render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
              ),
            },
            {
              title: "Kode Warna",
              dataIndex: "kode_warna",
              key: "kode_warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kode_warna"),
            },
            {
              title: "Warna",
              dataIndex: "warna",
              key: "warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("warna"),
            },
            {
              title: "Golongan",
              dataIndex: "golongan_name",
              key: "golongan_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              title: "Jenis Usaha",
              dataIndex: "jenis_usaha_name",
              key: "jenis_usaha_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_usaha_name"),
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
  handleTableChange = (page) => {
    this.setState({ ...this.state, page: page.current });
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
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      ...this.state,
      [`${field}_code`]: value,
      [`${field}_name`]: option.props.children,
    });
  };

  handleSimpan = () => {
    const {
      jenis_bkc_code,
      jenis_bkc_name,
      kode_warna,
      warna,
      golongan_code,
      golongan_name,
      jenis_produksi_code,
      jenis_produksi_name,
      jenis_usaha_code,
      jenis_usaha_name,
    } = this.state;

    this.setState({
      ...this.state,
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          jenis_bkc_code,
          jenis_bkc_name,
          kode_warna,
          warna,
          golongan_code,
          golongan_name,
          jenis_produksi_code,
          jenis_produksi_name,
          jenis_usaha_code,
          jenis_usaha_name,
        },
      ],
    });
  };
  handleReset = () => {
    this.setState({
      ...this.state,
      isEdit: false,
      jenis_bkc_code: "",
      jenis_bkc_name: "",
      kode_warna: "",
      warna: "",
      golongan_code: "",
      golongan_name: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_usaha_code: "",
      jenis_usaha_name: "",
      dataSource: [],
    });
  };
  handleUbah = () => {
    const {
      jenis_bkc_code,
      jenis_bkc_name,
      kode_warna,
      warna,
      golongan_code,
      golongan_name,
      jenis_produksi_code,
      jenis_produksi_name,
      jenis_usaha_code,
      jenis_usaha_name,
    } = this.state;

    this.setState({
      ...this.state,
      isEdit: false,
      jenis_bkc_code,
      jenis_bkc_name,
      kode_warna,
      warna,
      golongan_code,
      golongan_name,
      jenis_produksi_code,
      jenis_produksi_name,
      jenis_usaha_code,
      jenis_usaha_name,
    });
  };
  handleBatal = () => {
    this.setState({
      ...this.state,
      isEdit: false,
      kode_warna: "",
      warna: "",
      golongan_code: "",
      golongan_name: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_usaha_code: "",
      jenis_usaha_name: "",
    });
  };

  handleEdit = (record) => {
    this.setState({
      ...this.state,
      isEdit: true,
      jenis_bkc_code: record.jenis_bkc_code,
      jenis_bkc_name: record.jenis_bkc_name,
      kode_warna: record.kode_warna,
      warna: record.warna,
      golongan_code: record.golongan_code,
      golongan_name: record.golongan_name,
      jenis_produksi_code: record.jenis_produksi_code,
      jenis_produksi_name: record.jenis_produksi_name,
      jenis_usaha_code: record.jenis_usaha_code,
      jenis_usaha_name: record.jenis_usaha_name,
    });
  };
  handleDelete = (index) => {
    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(index, 1);
    this.setState({ ...this.state, dataSource: newDataSource });
  };

  handleRekam = async () => {
    console.log("merekam...");
  };

  render() {
    console.log("this.state", this.state);
    return (
      <>
        <Container
          menuName="Refrensi Tarif dan Pita Cukai"
          contentName="Referensi Warna Rekam"
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
                  value={this.state.tanggal_surat}
                  style={{ width: "100%" }}
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
                  onChange={(value, option) =>
                    this.handleSelectCustomChange("jenis_bkc", value, option)
                  }
                  style={{ width: "100%" }}
                  value={this.state.jenis_bkc_code}
                  disabled={this.state.dataSource.length > 0}
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
                {this.state.jenis_bkc_code && (
                  <>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Select
                      id="golongan"
                      onChange={(value, option) =>
                        this.handleSelectCustomChange("golongan", value, option)
                      }
                      value={this.state.golongan_code}
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
                {this.state.jenis_bkc_code === 3 && (
                  <>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <Select
                      id="jenis_produksi"
                      onChange={(value, option) =>
                        this.handleSelectCustomChange("jenis_produksi", value, option)
                      }
                      value={this.state.jenis_produksi_code}
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

                {this.state.jenis_bkc_code === 2 && (
                  <>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Usaha</FormLabel>
                    </div>
                    <Select
                      id="jenis_usaha"
                      onChange={(value, option) =>
                        this.handleSelectCustomChange("jenis_usaha", value, option)
                      }
                      value={this.state.jenis_usaha_code}
                      style={{ width: "100%" }}
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
                    {this.state.isEdit ? (
                      <Button type="primary" block onClick={this.handleUbah}>
                        UBAH
                      </Button>
                    ) : (
                      <Button type="primary" block onClick={this.handleSimpan}>
                        SIMPAN
                      </Button>
                    )}
                  </Col>

                  <Col span={12}>
                    {this.state.isEdit ? (
                      <Button type="danger" block onClick={this.handleBatal}>
                        BATAL
                      </Button>
                    ) : (
                      <Button type="danger" block onClick={this.handleReset}>
                        RESET
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            {this.state.jenis_bkc_code && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={this.handleTableChange}
                    pagination={{ current: this.state.page }}
                  />
                </div>

                <Row>
                  <Col span={4} offset={20}>
                    <Button type="primary" block onClick={this.handleRekam}>
                      Rekam
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Container>
      </>
    );
  }
}
