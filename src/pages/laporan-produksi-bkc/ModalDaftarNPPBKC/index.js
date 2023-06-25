import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarNPPBKC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarNppbkcLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        nppbkc_id: "",
        nama_nppbkc: "",
        nppbkc: "",
        alamat_nppbkc: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Nama",
          dataIndex: "nama_nppbkc",
          key: "nama_nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nama_nppbkc"),
        },
        {
          title: "NPPBKC",
          dataIndex: "nppbkc",
          key: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          title: "Alamat",
          dataIndex: "alamat_nppbkc",
          key: "alamat_nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("alamat_nppbkc"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarNppbkc();
  }

  getDaftarNppbkc = async () => {
    // const { nppbkc_id, nama_nppbkc, nppbkc, alamat_nppbkc } = this.state.table;

    // const payload = { page: this.state.page };

    // if (nppbkc_id) payload.idNppbkc = nppbkc_id;
    // if (nama_nppbkc) payload.namaNppbkc = nama_nppbkc;
    // if (nppbkc) payload.nppbkc = nppbkc;
    // if (alamat_nppbkc) payload.alamatNppbkc = alamat_nppbkc;

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/ck4/daftar-nppbkc",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDaftarNppbkcLoading: bool }),
    // });

    // if (response) {
    //   const newData = response.data.data.listData.map((item) => ({
    //     key: item.idNppbkc,
    //     nppbkc_id: item.idNppbkc,
    //     nama_nppbkc: item.namaNppbkc,
    //     nppbkc: item.nppbkc,
    //     alamat_nppbkc: item.alamatNppbkc,
    //   }));
    //   const page = response.data.currentPage;
    //   const totalData = response.data.totalData;
    //   this.setState({ dataSource: newData, page, totalData });
    // }

    this.setState({ isDaftarNppbkcLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        page: 1,
        totalData: 10,
        dataSource: [
          {
            key: 1,
            nppbkc_id: 1,
            nama_nppbkc: "Test 1 MOLINDO RAYA INDUSTRIAL, PT.",
            nppbkc: "0706.1.1.1001",
            alamat_nppbkc:
              "Test 1  Jl. SUMBER WARAS NO.255 RT.01 RW.08, KEL. KALIREJO, KEC. LAWANG, KAB. MALANG",
          },
          {
            key: 2,
            nppbkc_id: 2,
            nama_nppbkc: "Test 2 MOLINDO RAYA INDUSTRIAL, PT.",
            nppbkc: "0706.1.1.1001",
            alamat_nppbkc:
              "Test 2 Jl. SUMBER WARAS NO.255 RT.01 RW.08, KEL. KALIREJO, KEC. LAWANG, KAB. MALANG",
          },
          {
            key: 3,
            nppbkc_id: 3,
            nama_nppbkc: "Test 3 MOLINDO RAYA INDUSTRIAL, PT.",
            nppbkc: "0706.1.1.1001",
            alamat_nppbkc:
              "Test 3 Jl. SUMBER WARAS NO.255 RT.01 RW.08, KEL. KALIREJO, KEC. LAWANG, KAB. MALANG",
          },
        ],
      });
      this.setState({ isDaftarNppbkcLoading: false });
      clearTimeout(timeout);
    }, 2000);
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
    this.getDaftarNppbkc();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarNppbkc();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar NPPBKC" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarNppbkcLoading}
          pagination={{ current: this.state.page, total: this.state.totalData }}
          onRow={(record, rowIndex) => ({
            onDoubleClick: (event) => onDataDoubleClick(record),
            onMouseEnter: (event) => this.setState({ isMouseEnter: true }),
            onMouseLeave: (event) => this.setState({ isMouseEnter: false }),
          })}
          scroll={{ x: "max-content" }}
          style={{ cursor: this.state.isMouseEnter ? "pointer" : "auto" }}
        />
      </Modal>
    );
  }
}
