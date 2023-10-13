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

      table: {
        nppbkc: null,
        nama_perusahaan: null,
        jenis_bkc: null,
        nomor_pemberitahuan: null,
        tanggal_pemberitahuan: null,
        jumlah_produksi: null,
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
          dataIndex: "nama_perusahaan",
          key: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          title: "Jenis BKC",
          dataIndex: "jenis_bkc",
          key: "jenis_bkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_bkc"),
        },
        {
          title: "Nomor Pemberitahuan",
          dataIndex: "nomor_pemberitahuan",
          key: "nomor_pemberitahuan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_pemberitahuan"),
        },
        {
          title: "Tanggal Pemberitahuan",
          dataIndex: "tanggal_pemberitahuan",
          key: "tanggal_pemberitahuan",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_pemberitahuan"),
        },
        {
          title: "Jumlah Produksi",
          dataIndex: "jumlah_produksi",
          key: "jumlah_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlah_produksi"),
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
      nama_perusahaan,
      jenis_bkc,
      nomor_pemberitahuan,
      tanggal_pemberitahuan,
      jumlah_produksi,
      status,
    } = this.state.table;

    const payload = { page: this.state.page };

    if (nppbkc) payload.nppbkc = nppbkc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (jenis_bkc) payload.jenisBkc = jenis_bkc;
    if (nomor_pemberitahuan) payload.nomorPemberitahuan = nomor_pemberitahuan;
    if (tanggal_pemberitahuan)
      payload.tanggalPemberitahuan = moment(tanggal_pemberitahuan, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    if (jumlah_produksi) payload.jumlahProduksi = jumlah_produksi;
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
        nama_perusahaan: item.namaPerusahaan,
        jenis_bkc: item.jenisBkc,
        nomor_pemberitahuan: item.nomorPemberitahuan,
        tanggal_pemberitahuan: item.tanggalPemberitahuan,
        jumlah_produksi: item.jumlahProduksi,
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
          value={this.state.table[dataIndex]}
          onChange={(e) =>
            this.setState({
              table: { ...this.state.table, [dataIndex]: e.target.value },
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
      { table: { ...this.state.table, [dataIndex]: null }, page: 1 },
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
