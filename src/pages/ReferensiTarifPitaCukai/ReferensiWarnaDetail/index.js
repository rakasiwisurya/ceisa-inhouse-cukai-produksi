import { Button, Col, DatePicker, Icon, Input, Row, Select, Table } from "antd";
import React, { Component } from "react";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ButtonCustom from "components/Button/ButtonCustom";

export default class ReferensiWarnaDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isDetailWarnaLoading: true,
      isJenisBkcLoading: true,

      nomor_surat: null,
      tanggal_surat: null,
      tanggal_awal_berlaku: null,

      jenis_bkc_id: null,
      jenis_bkc_name: null,
      kode_warna: null,
      warna: null,
      golongan_id: null,
      golongan_name: null,
      jenis_produksi_id: null,
      jenis_produksi_code: null,
      jenis_produksi_name: null,
      jenis_usaha_id: null,
      jenis_usaha_name: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getDetailWarna();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_bkc_id !== this.state.jenis_bkc_id) {
      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          columns: [
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

      if (this.state.jenis_bkc_id === 2) {
        this.setState({
          columns: [
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
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("kode_warna"),
            },
            {
              title: "Warna",
              dataIndex: "warna",
              key: "warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("warna"),
            },
            {
              title: "Golongan",
              dataIndex: "golongan_name",
              key: "golongan_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              title: "Jenis Produksi",
              dataIndex: "jenis_produksi_name",
              key: "jenis_produksi_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
            {
              title: "Jenis Usaha",
              dataIndex: "jenis_usaha_name",
              key: "jenis_usaha_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_usaha_name"),
            },
          ],
        });
      }
    }
  }

  getDetailWarna = async () => {
    const payload = { idSkepHeader: this.props.match.params.id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-detail-warna",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailWarnaLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nomor_surat: data.nomorSkep,
        tanggal_surat: moment(data.tanggalSkep),
        jenis_bkc_id: data.idJenisBkc,
        jenis_bkc_name: data.namaJenisBkc,
        tanggal_awal_berlaku: moment(data.tanggalAwalBerlaku),
        dataSource: data.details.map((detail, index) => ({
          key: `referensi-${index}`,
          warna_detail_id: detail.idWarnaBkcDetail,
          jenis_bkc_id: detail.idJenisBkc,
          jenis_bkc_name: detail.namaJenisBkc,
          kode_warna: detail.kodeWarna,
          warna: detail.warna,
          golongan_id: detail.idGolonganBkc,
          golongan_name: detail.namaGolonganBkc,
          jenis_produksi_id: detail.idJenisProduksiBkc,
          jenis_produksi_code: detail.kodeJenisProduksiBkc,
          jenis_produksi_name: `(${detail.kodeJenisProduksiBkc}) - ${detail.namaJenisProduksiBkc}`,
          jenis_usaha_id: detail.idJenisUsaha,
          jenis_usaha_name: detail.namaJenisUsaha,
        })),
      });
    }
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
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
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
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
    this.setState({ page: page.current });
  };

  render() {
    return (
      <>
        <Container
          menuName="Refrensi Tarif dan Pita Cukai"
          contentName="Referensi Warna Detail"
          hideContentHeader
        >
          {this.state.isDetailWarnaLoading ? (
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
                    <DatePicker
                      id="tanggal_surat"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_surat}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_awal_berlaku"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_awal_berlaku}
                      style={{ width: "100%" }}
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
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kode Warna</FormLabel>
                    </div>
                    <Input id="kode_warna" value={this.state.kode_warna} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Warna</FormLabel>
                    </div>
                    <Input id="warna" value={this.state.warna} disabled />
                  </Col>

                  {this.state.jenis_bkc_id && (
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
                  )}

                  {this.state.jenis_bkc_id && (
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
                          {this.state.jenis_produksi_code || this.state.jenis_produksi_name
                            ? `${
                                this.state.jenis_produksi_code &&
                                `(${this.state.jenis_produksi_code}) - `
                              }${this.state.jenis_produksi_name}`
                            : null}
                        </Select.Option>
                      </Select>
                    </Col>
                  )}

                  <Col span={12}>
                    {this.state.jenis_bkc_id === 2 && (
                      <>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Usaha</FormLabel>
                        </div>
                        <Select
                          id="jenis_usaha"
                          value={this.state.jenis_usaha_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.jenis_usaha_id}>
                            {this.state.jenis_usaha_name}
                          </Select.Option>
                        </Select>
                      </>
                    )}
                  </Col>
                </Row>

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={this.handleTableChange}
                    pagination={{ current: this.state.page }}
                  />
                </div>

                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                  <Col span={4}>
                    <ButtonCustom
                      variant="secondary"
                      onClick={() => this.props.history.goBack()}
                      block
                    >
                      Kembali
                    </ButtonCustom>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
