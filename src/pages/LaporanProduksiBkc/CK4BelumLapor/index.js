import { Button, Col, Icon, Input, Row, Select, Table } from "antd";
import Container from "components/Container";
import Header from "components/Header";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

const date = new Date();

export default class CK4BelumLapor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pencarian CK4 Belum Lapor",

      isCk4BelumLaporLoading: true,

      jenisLaporan: "BULANAN",
      listJenisLaporan: [
        {
          idJenisLaporan: "BULANAN",
          namaJenisLaporan: "BULANAN",
        },
        {
          idJenisLaporan: "HARIAN",
          namaJenisLaporan: "HARIAN",
        },
      ],

      page: 1,
      totalData: 0,

      filter: {
        nppbkc: null,
        namaPerusahaan: null,
        tanggal: date.getDate(),
        bulan: date.getMonth() + 1,
        tahun: date.getFullYear(),
      },

      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getBelumLaporCk4();

    this.setState({
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
          title: "Bulan",
          dataIndex: "bulan",
          key: "bulan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
        },
        {
          title: "Tahun",
          dataIndex: "tahun",
          key: "tahun",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
        },
      ],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.jenisLaporan !== this.state.jenisLaporan) {
      this.getBelumLaporCk4();
    }

    if (prevState.jenisLaporan !== this.state.jenisLaporan) {
      if (this.state.jenisLaporan === "BULANAN") {
        this.setState({
          columns: [
            {
              title: "NPPBKC",
              dataIndex: "nppbkc",
              key: "nppbkc",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("nppbkc"),
            },
            {
              title: "Nama Perusahaan",
              dataIndex: "namaPerusahaan",
              key: "namaPerusahaan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("namaPerusahaan"),
            },
            {
              title: "Bulan",
              dataIndex: "bulan",
              key: "bulan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("bulan"),
            },
            {
              title: "Tahun",
              dataIndex: "tahun",
              key: "tahun",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("tahun"),
            },
          ],
        });
      } else {
        this.setState({
          columns: [
            {
              title: "NPPBKC",
              dataIndex: "nppbkc",
              key: "nppbkc",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("nppbkc"),
            },
            {
              title: "Nama Perusahaan",
              dataIndex: "namaPerusahaan",
              key: "namaPerusahaan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("namaPerusahaan"),
            },
            {
              title: "Tanggal",
              dataIndex: "tanggal",
              key: "tanggal",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
            },
            {
              title: "Bulan",
              dataIndex: "bulan",
              key: "bulan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
            },
            {
              title: "Tahun",
              dataIndex: "tahun",
              key: "tahun",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
            },
          ],
        });
      }
    }
  }

  getBelumLaporCk4 = async () => {
    const { nppbkc, namaPerusahaan, tanggal, bulan, tahun } = this.state.filter;

    const payload = { page: this.state.page, bulan, tahun };

    if (nppbkc) payload.nppbkc = nppbkc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;

    if (this.state.jenisLaporan === "BULANAN") {
      const response = await requestApi({
        service: "produksi",
        method: "get",
        endpoint: "/ck4/browse-belum-lapor",
        params: payload,
        setLoading: (bool) => this.setState({ isCk4BelumLaporLoading: bool }),
      });

      if (response) {
        const newData = response.data.data.listData.map((item, index) => ({
          key: `ck4-belum-lapor-${index}`,
          idNppbkc: item.idNppbkc,
          nppbkc: item.nppbkc,
          namaPerusahaan: item.namaPerusahaan,
          bulan: item.bulan,
          tahun: item.tahun,
        }));
        const page = response.data.data.currentPage;
        const totalData = response.data.data.totalData;
        this.setState({ dataSource: newData, page, totalData });
      }
      return;
    }

    payload.tanggal = tanggal;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/browse-belum-lapor-harian",
      params: payload,
      setLoading: (bool) => this.setState({ isCk4BelumLaporLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `ck4-belum-lapor-${index}`,
        idNppbkc: item.idNppbkc,
        nppbkc: item.nppbkc,
        namaPerusahaan: item.namaPerusahaan,
        tanggal: item.tanggal,
        bulan: item.bulan,
        tahun: item.tahun,
      }));
      const page = response.data.data.currentPage;
      const totalData = response.data.data.totalData;
      this.setState({ dataSource: newData, page, totalData });
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
            this.setState({ filter: { ...this.state.filter, [dataIndex]: e.target.value } })
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleColumnSearch = (confirm) => {
    confirm();
    this.setState({ page: 1 }, this.getBelumLaporCk4);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { filter: { ...this.state.filter, [dataIndex]: null }, page: 1 },
      this.getBelumLaporCk4
    );
  };

  render() {
    return (
      <Container menuName="Laporan Produksi BKC" contentName="CK4 Belum Lapor" hideContentHeader>
        <Header>{this.state.subtitle1}</Header>
        <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Select
                id="jenisLaporan"
                value={this.state.jenisLaporan}
                onChange={(value) => this.setState({ jenisLaporan: value })}
                style={{ width: "100%" }}
              >
                {this.state.listJenisLaporan.length > 0 &&
                  this.state.listJenisLaporan.map((item, index) => (
                    <Select.Option key={`jenisLaporan-${index}`} value={item.idJenisLaporan}>
                      {item.namaJenisLaporan}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
          </Row>

          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              loading={this.state.isCk4BelumLaporLoading}
              onChange={(page) => this.setState({ page: page.current })}
              pagination={{ current: this.state.page, total: this.state.totalData }}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </Container>
    );
  }
}
