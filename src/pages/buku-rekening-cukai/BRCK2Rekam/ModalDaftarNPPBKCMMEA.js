import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";

export default class ModalDaftarNPPBKCMMEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          nppbkc: "nppbkc1",
          nama_perusahaan: "nama_perusahaan1",
          alamat: "alamat1",
          npwp: "npwp1",
          pkp: "pkp1",
        },
        {
          key: "2",
          nppbkc: "nppbkc2",
          nama_perusahaan: "nama_perusahaan2",
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
            scroll={{ x: "max-content" }}
            onRow={onRow}
          />
        </div>
      </Modal>
    );
  }
}
