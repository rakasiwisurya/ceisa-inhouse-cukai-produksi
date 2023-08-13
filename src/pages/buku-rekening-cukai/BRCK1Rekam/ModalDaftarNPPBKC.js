import { Button, Icon, Input, Modal, Table, message } from "antd";
import React, { Component } from "react";
import { api } from "configs/api";

export default class ModalDaftarNPPBKC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitBrckPage: 100,
      currentBrckPage: 0,
      idNppbkc: "fe3c9197-df48-05e6-e054-0021f60abd54",
      page: 1,
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
          dataIndex: "namaPerusahaan",
          key: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaPerusahaan"),
        },
        {
          title: "Alamat",
          dataIndex: "alamat",
          key: "alamat",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("alamat"),
        },
        {
          title: "NPWP",
          dataIndex: "npwp",
          key: "npwp",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("npwp"),
        },
        {
          title: "Tanggal Penutupan BRCK",
          dataIndex: "tanggalPenutupanBrck",
          key: "tanggalPenutupanBrck",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggalPenutupanBrck"),
        },
      ],
      dataSource: [],
    };
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

  handleGetNppbkc = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await api.produksi.json.get("/brck/daftar-nppbkc-brck1", {
        params: {
          idNppbkc: this.state.idNppbkc,
          page: this.state.page,
        },
      });
      this.setState({ dataSource: response.data.data.listData });
      this.setState({ isLoading: false });
      return;
    } catch (error) {
      this.setState({ error: "An error occurred" });
      message.error("Tidak bisa memuat data");
      this.setState({ isLoading: false });
      return;
    }
  };

  componentDidMount() {
    this.handleGetNppbkc();
  }

  render() {
    const { isOpen, onCancel, onRow } = this.props;

    return (
      <Modal
        width={820}
        title="Daftar NPPBKC"
        visible={isOpen}
        onCancel={onCancel}
        footer={null}
        centered
      >
        <div>
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isLoading}
            scroll={{ x: "max-content" }}
            onRow={onRow}
          />
        </div>
      </Modal>
    );
  }
}
