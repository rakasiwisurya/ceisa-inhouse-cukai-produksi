import { Button, Icon, Input, Modal, Table } from "antd";
import { endpoints } from "configs/constants";
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
        nipPenjabatBc: null,
        namaPenjabatBc: null,
      },

      dataSource: [],
      columns: [
        {
          title: "NIP",
          dataIndex: "nipPenjabatBc",
          key: "nipPenjabatBc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nipPenjabatBc"),
        },
        {
          title: "Nama Pegawai",
          dataIndex: "namaPenjabatBc",
          key: "namaPenjabatBc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaPenjabatBc"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarPenjabatBc();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getDaftarPenjabatBc();
    }
  }

  getDaftarPenjabatBc = async () => {
    const { nipPenjabatBc, namaPenjabatBc } = this.state.table;

    const payload = { page: this.state.page };

    if (nipPenjabatBc) payload.nipPenjabatBc = nipPenjabatBc;
    if (namaPenjabatBc) payload.namaPenjabatBc = namaPenjabatBc;

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.browsePenjabatBc,
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarPenjabatBcLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `penjabat-bc-${index}`,
        nipPenjabatBc: item.nipPegawai,
        namaPenjabatBc: item.namaPegawai,
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
    this.setState({ page: 1 }, this.getDaftarPenjabatBc);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { table: { ...this.state.table, [dataIndex]: null }, page: 1 },
      this.getDaftarPenjabatBc
    );
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
          onChange={(page) => this.setState({ page: page.current })}
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
