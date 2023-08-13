import { Button, Icon, Input, Modal, Table, message } from "antd";
import React, { Component } from "react";
import { api } from "configs/api";

export default class ModalDaftarNPPBKCMMEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitBrckPage: 100,
      currentBrckPage: 0,
      page: 1,
      totalData: 0,
      idNppbkc: "fe3c9198-10b5-05e6-e054-0021f60abd54",
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
          title: "PKP",
          dataIndex: "pkp",
          key: "pkp",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("pkp"),
        },
      ],
      dataSource: [
        {
          key: "1",
          nppbkc: "123",
          namaPerusahaan: "nama_perusahaan1",
          alamat: "alamat1",
          npwp: "npwp1",
          pkp: "pkp1",
        },
        {
          key: "2",
          nppbkc: "456",
          namaPerusahaan: "nama_perusahaan2",
          alamat: "alamat2",
          npwp: "npwp2",
          pkp: "pkp2",
        },
      ],
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
      const response = await api.produksi.json.get("/brck/daftar-nppbkc-brck2", {
        params: {
          idNppbkc: this.state.idNppbkc,
          page: this.state.page,
        },
      });
      this.setState({ dataSource: response.data.data.listData });
      const page = response.data.data.currentPage;
      const totalData = response.data.data.totalData;
      this.setState({ page, totalData });
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
        title="Daftar NPPBKC MMEA BRCK-2"
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
            pagination={{ current: this.state.page, total: this.state.totalData }}
            scroll={{ x: "max-content" }}
            onRow={onRow}
          />
        </div>
      </Modal>
    );
  }
}
