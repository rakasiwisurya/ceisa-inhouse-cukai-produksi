import { Button, Col, Icon, Input, Row, Table, notification } from "antd";
import Container from "components/Container";
import Header from "components/Header";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class PenelitianCK4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Penelitian CK4",

      isPenelitianCk4Loading: true,
      isSimpanLoading: false,

      page: 1,
      totalData: 0,

      filter: {
        nppbkc: null,
        namaPerusahaan: null,
        jenisBkc: null,
        nomorPemberitahuan: null,
        tanggalPemberitahuan: null,
        jumlahProduksi: null,
        status: null,
      },

      selectedRowKeys: [],
      dataRows: [],

      dataSource: [],
      columns: [
        {
          title: "NPPBKC",
          dataIndex: "nppbkc",
          key: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          title: "Nama Perusahaan",
          dataIndex: "namaPerusahaan",
          key: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaPerusahaan"),
        },
        {
          title: "Jenis BKC",
          dataIndex: "jenisBkc",
          key: "jenisBkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenisBkc"),
        },
        {
          title: "Nomor Pemberitahuan",
          dataIndex: "nomorPemberitahuan",
          key: "nomorPemberitahuan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomorPemberitahuan"),
        },
        {
          title: "Tanggal Pemberitahuan",
          dataIndex: "tanggalPemberitahuan",
          key: "tanggalPemberitahuan",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalPemberitahuan"),
        },
        {
          title: "Jumlah Produksi",
          dataIndex: "jumlahProduksi",
          key: "jumlahProduksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlahProduksi"),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("status"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getPenelitianCk4();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getPenelitianCk4();
    }
  }

  getPenelitianCk4 = async () => {
    const {
      nppbkc,
      namaPerusahaan,
      jenisBkc,
      nomorPemberitahuan,
      tanggalPemberitahuan,
      jumlahProduksi,
      status,
    } = this.state.filter;

    const payload = { page: this.state.page };

    if (nppbkc) payload.nppbkc = nppbkc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (jenisBkc) payload.jenisBkc = jenisBkc;
    if (nomorPemberitahuan) payload.nomorPemberitahuan = nomorPemberitahuan;
    if (tanggalPemberitahuan)
      payload.tanggalPemberitahuan = moment(tanggalPemberitahuan, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    if (jumlahProduksi) payload.jumlahProduksi = jumlahProduksi;
    if (status) payload.status = status;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/browse-penelitian-ck4",
      params: payload,
      setLoading: (bool) => this.setState({ isPenelitianCk4Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        idCk4: item.idCk4,
        key: `penelitianck4-${index}`,
        nppbkc: item.nppbkc,
        namaPerusahaan: item.namaPerusahaan,
        jenisBkc: item.jenisBkc,
        nomorPemberitahuan: item.nomorPemberitahuan,
        tanggalPemberitahuan: item.tanggalPemberitahuan,
        jumlahProduksi: item.jumlahProduksi,
        status: item.status,
      }));

      const page = response.data.data.currentPage;
      const totalData = response.data.data.totalData;
      this.setState({ dataSource: newData, page, totalData });
    }
  };

  handleSimpan = async () => {
    const payload = this.state.dataRows;

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/ck4/penelitian-ck4",
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.getPenelitianCk4();
      this.setState({ selectedRowKeys: [], dataRows: [] });
    }
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={this.state.filter[dataIndex]}
          onChange={(e) =>
            this.setState({
              filter: { ...this.state.filter, [dataIndex]: e.target.value },
            })
          }
          onPressEnter={() => this.handleColumnSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset(clearFilters, dataIndex)}
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
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
      }
    },
  });
  handleColumnSearch = (confirm) => {
    confirm();
    this.setState({ page: 1 }, this.getPenelitianCk4);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { filter: { ...this.state.filter, [dataIndex]: null }, page: 1 },
      this.getPenelitianCk4
    );
  };

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
      dataRows: selectedRows?.map((selectedRow) => ({ idCk4Header: selectedRow.idCk4 })),
    });
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC" contentName="Penelitian CK4" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div style={{ marginTop: 10 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                loading={this.state.isPenelitianCk4Loading}
                onChange={(page) => this.setState({ page: page.current })}
                pagination={{ current: this.state.page, total: this.state.totalData }}
                scroll={{ x: "max-content" }}
                rowSelection={{
                  selectedRowKeys: this.state.selectedRowKeys,
                  onChange: this.handleRowSelectChange,
                }}
              />
            </div>

            <Row gutter={[16, 16]}>
              <Col span={12} offset={18}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Button
                      type="primary"
                      loading={this.state.isSimpanLoading}
                      onClick={this.handleSimpan}
                      disabled={!this.state.dataRows.length > 0}
                      block
                    >
                      Simpan Penelitian
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
