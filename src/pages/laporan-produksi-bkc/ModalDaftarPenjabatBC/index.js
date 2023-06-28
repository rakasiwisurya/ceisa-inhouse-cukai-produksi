import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarPenjabatBc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarPenjabatBcLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        penjabat_bc_nip: "",
        penjabat_bc_name: "",
      },

      dataSource: [],
      columns: [
        {
          title: "NIP",
          dataIndex: "penjabat_bc_nip",
          key: "penjabat_bc_nip",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("penjabat_bc_nip"),
        },
        {
          title: "Nama Pegawai",
          dataIndex: "penjabat_bc_name",
          key: "penjabat_bc_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("penjabat_bc_name"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarPenjabatBc();
  }

  getDaftarPenjabatBc = async () => {
    // const { penjabat_bc_nip, penjabat_bc_name } = this.state.table;

    // const payload = { page: this.state.page };

    // if (penjabat_bc_nip) payload.nipPenjabatBc = penjabat_bc_nip;
    // if (penjabat_bc_name) payload.namaPenjabatBc = penjabat_bc_name;

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/ck4/daftar-penjabat-bc",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDaftarPenjabatBcLoading: bool }),
    // });

    // if (response) {
    //   const newData = response.data.data.listData.map((item) => ({
    //     key: item.nipPenjabatBc,
    //     penjabat_bc_nip: item.nipPenjabatBc,
    //     penjabat_bc_name: item.namaPenjabatBc,
    //   }));
    //   const page = response.data.currentPage;
    //   const totalData = response.data.totalData;
    //   this.setState({ dataSource: newData, page, totalData });
    // }

    this.setState({ isDaftarPenjabatBcLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        page: 1,
        totalData: 10,
        dataSource: [
          {
            key: "123",
            penjabat_bc_nip: "123",
            penjabat_bc_name: "Pegawai A",
          },
          {
            key: "456",
            penjabat_bc_nip: "456",
            penjabat_bc_name: "Pegawai B",
          },
          {
            key: "789",
            penjabat_bc_nip: "789",
            penjabat_bc_name: "Pegawai C",
          },
        ],
      });
      this.setState({ isDaftarPenjabatBcLoading: false });
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
    this.getDaftarPenjabatBc();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarPenjabatBc();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Pegawai" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarPenjabatBcLoading}
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
