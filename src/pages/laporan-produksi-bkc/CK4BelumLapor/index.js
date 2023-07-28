import { Button, Icon, Input, Table } from "antd";
import Container from "components/Container";
import Header from "components/Header";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class CK4BelumLapor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pencarian CK4 Belum Lapor",

      page: 1,
      totalData: 0,

      searchText: "",
      searchedColumn: "",

      columns: [
        {
          title: "NPPBKC",
          dataIndex: "nppbkc",
          key: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          key: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          title: "Periode",
          dataIndex: "periode",
          key: "periode",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("periode"),
        },
        {
          title: "Bulan",
          dataIndex: "bulan",
          key: "bulan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("bulan"),
        },
        {
          title: "Tahun",
          dataIndex: "tahun",
          key: "tahun",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tahun"),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("status"),
        },
      ],
      dataSource: [
        {
          key: "1",
          nppbkc: "nppbkc1",
          nama_perusahaan: "nama_perusahaan1",
          periode: "periode1",
          bulan: "bulan1",
          tahun: "tahun1",
          status: "status1",
        },
        {
          key: "2",
          nppbkc: "nppbkc2",
          nama_perusahaan: "nama_perusahaan2",
          periode: "periode2",
          bulan: "bulan2",
          tahun: "tahun2",
          status: "status2",
        },
        {
          key: "3",
          nppbkc: "nppbkc3",
          nama_perusahaan: "nama_perusahaan3",
          periode: "periode3",
          bulan: "bulan3",
          tahun: "tahun3",
          status: "status3",
        },
        {
          key: "4",
          nppbkc: "nppbkc4",
          nama_perusahaan: "nama_perusahaan4",
          periode: "periode4",
          bulan: "bulan4",
          tahun: "tahun4",
          status: "status4",
        },
        {
          key: "5",
          nppbkc: "nppbkc5",
          nama_perusahaan: "nama_perusahaan5",
          periode: "periode5",
          bulan: "bulan5",
          tahun: "tahun5",
          status: "status5",
        },
        {
          key: "6",
          nppbkc: "nppbkc6",
          nama_perusahaan: "nama_perusahaan6",
          periode: "periode6",
          bulan: "bulan6",
          tahun: "tahun6",
          status: "status6",
        },
        {
          key: "7",
          nppbkc: "nppbkc7",
          nama_perusahaan: "nama_perusahaan7",
          periode: "periode7",
          bulan: "bulan7",
          tahun: "tahun7",
          status: "status7",
        },
        {
          key: "8",
          nppbkc: "nppbkc8",
          nama_perusahaan: "nama_perusahaan8",
          periode: "periode8",
          bulan: "bulan8",
          tahun: "tahun8",
          status: "status8",
        },
        {
          key: "9",
          nppbkc: "nppbkc9",
          nama_perusahaan: "nama_perusahaan9",
          periode: "periode9",
          bulan: "bulan9",
          tahun: "tahun9",
          status: "status9",
        },
        {
          key: "10",
          nppbkc: "nppbkc10",
          nama_perusahaan: "nama_perusahaan10",
          periode: "periode10",
          bulan: "bulan10",
          tahun: "tahun10",
          status: "status10",
        },
      ],
    };
  }

  componentDidMount() {
    this.getBelumLaporCk4();
  }

  getBelumLaporCk4 = async () => {
    const payload = { idCk4: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/browse-belum-lapor",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;
      console.log(data)
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

  render() {
    return (
      <Container menuName="Laporan Produksi BKC" contentName="CK4 Belum Lapor" hideContentHeader>
        <Header>{this.state.subtitle1}</Header>
        <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
          <div>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </Container>
    );
  }
}
