import { Button, Col, Icon, Input, Row, Select, Table } from "antd";
import Container from "components/Container";
import Header from "components/Header";
import e from "cors";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

const date = new Date();

export default class CK4BelumLapor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pencarian CK4 Belum Lapor",

      isCk4BelumLaporLoading: true,

      jenis_laporan: "BULANAN",
      list_jenis_laporan: [
        {
          jenis_laporan_id: "BULANAN",
          jenis_laporan_name: "BULANAN",
        },
        {
          jenis_laporan_id: "HARIAN",
          jenis_laporan_name: "HARIAN",
        },
      ],

      page: 1,
      totalData: 0,

      table: {
        nomor_pemberitahuan: null,
        nppbkc: null,
        nama_perusahaan: null,
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
          title: "Nomor Pemberitahuan",
          dataIndex: "nomor_pemberitahuan",
          key: "nomor_pemberitahuan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_pemberitahuan"),
        },
        {
          title: "NPPBKC",
          dataIndex: "nppbkc",
          key: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          key: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          title: "Bulan",
          dataIndex: "bulan",
          key: "bulan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("bulan"),
        },
        {
          title: "Tahun",
          dataIndex: "tahun",
          key: "tahun",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tahun"),
        },
      ],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.jenis_laporan !== this.state.jenis_laporan
    ) {
      this.getBelumLaporCk4();
    }

    if (prevState.jenis_laporan !== this.state.jenis_laporan) {
      if (this.state.jenis_laporan === "BULANAN") {
        this.setState({
          columns: [
            {
              title: "Nomor Pemberitahuan",
              dataIndex: "nomor_pemberitahuan",
              key: "nomor_pemberitahuan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("nomor_pemberitahuan"),
            },
            {
              title: "NPPBKC",
              dataIndex: "nppbkc",
              key: "nppbkc",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("nppbkc"),
            },
            {
              title: "Nama Perusahaan",
              dataIndex: "nama_perusahaan",
              key: "nama_perusahaan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("nama_perusahaan"),
            },
            {
              title: "Bulan",
              dataIndex: "bulan",
              key: "bulan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("bulan"),
            },
            {
              title: "Tahun",
              dataIndex: "tahun",
              key: "tahun",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tahun"),
            },
          ],
        });
      } else {
        this.setState({
          columns: [
            {
              title: "Nomor Pemberitahuan",
              dataIndex: "nomor_pemberitahuan",
              key: "nomor_pemberitahuan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("nomor_pemberitahuan"),
            },
            {
              title: "NPPBKC",
              dataIndex: "nppbkc",
              key: "nppbkc",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("nppbkc"),
            },
            {
              title: "Nama Perusahaan",
              dataIndex: "nama_perusahaan",
              key: "nama_perusahaan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("nama_perusahaan"),
            },
            {
              title: "Tanggal",
              dataIndex: "tanggal",
              key: "tanggal",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tanggal"),
            },
            {
              title: "Bulan",
              dataIndex: "bulan",
              key: "bulan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("bulan"),
            },
            {
              title: "Tahun",
              dataIndex: "tahun",
              key: "tahun",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tahun"),
            },
          ],
        });
      }
    }
  }

  getBelumLaporCk4 = async () => {
    const { tanggal, bulan, tahun } = this.state.table;

    const payload = { page: this.state.page, bulan, tahun };

    if (this.state.nomor_pemberitahuan) payload.nomorPemberitahuan = this.state.nomor_pemberitahuan;
    if (this.state.nppbkc) payload.nppbkc = this.state.nppbkc;
    if (this.state.nama_perusahaan) payload.namaPerusahaan = this.state.nama_perusahaan;

    if (this.state.jenis_laporan === "BULANAN") {
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
          nppbkc_id: item.idNppbkc,
          nomor_pemberitahuan: item.nomorPemberitahuan,
          nppbkc: item.nppbkc,
          nama_perusahaan: item.namaPerusahaan,
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
        nppbkc_id: item.idNppbkc,
        nomor_pemberitahuan: item.nomorPemberitahuan,
        nppbkc: item.nppbkc,
        nama_perusahaan: item.namaPerusahaan,
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
          value={this.state.table[dataIndex]}
          onChange={(e) =>
            this.setState({ table: { ...this.state.table, [dataIndex]: e.target.value } })
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
    this.getBelumLaporCk4();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();

    if (dataIndex === "tanggal") {
      await this.setState({ table: { ...this.state.table, tanggal: date.getDate() } });
      return this.getBelumLaporCk4();
    }

    if (dataIndex === "bulan") {
      await this.setState({ table: { ...this.state.table, tanggal: date.getMonth() + 1 } });
      return this.getBelumLaporCk4();
    }

    if (dataIndex === "tahun") {
      await this.setState({ table: { ...this.state.table, tanggal: date.getFullYear() } });
      return this.getBelumLaporCk4();
    }

    await this.setState({ table: { ...this.state.table, [dataIndex]: null } });
    this.getBelumLaporCk4();
  };

  render() {
    return (
      <Container menuName="Laporan Produksi BKC" contentName="CK4 Belum Lapor" hideContentHeader>
        <Header>{this.state.subtitle1}</Header>
        <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Select
                id="jenis_laporan"
                value={this.state.jenis_laporan}
                onChange={(value) => this.setState({ jenis_laporan: value })}
                style={{ width: "100%" }}
              >
                {this.state.list_jenis_laporan.length > 0 &&
                  this.state.list_jenis_laporan.map((item, index) => (
                    <Select.Option key={`jenis-laporan-${index}`} value={item.jenis_laporan_id}>
                      {item.jenis_laporan_name}
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
