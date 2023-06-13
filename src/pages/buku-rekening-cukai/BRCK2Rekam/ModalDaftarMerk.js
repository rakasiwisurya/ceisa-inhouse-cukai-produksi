import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";

export default class ModalDaftarMerk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Merk MMEA",
          dataIndex: "merk_mmea",
          key: "merk_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("merk_mmea"),
        },
        {
          title: "Jenis MMEA",
          dataIndex: "jenis_mmea",
          key: "jenis_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_mmea"),
        },
        {
          title: "Golongan",
          dataIndex: "golongan",
          key: "golongan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("golongan"),
        },
        {
          title: "Kadar",
          dataIndex: "kadar",
          key: "kadar",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kadar"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Isi",
          dataIndex: "isi",
          key: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          title: "Kemasan",
          dataIndex: "kemasan",
          key: "kemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kemasan"),
        },
        {
          title: "No. SKEP",
          dataIndex: "no_skep",
          key: "no_skep",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("no_skep"),
        },
        {
          title: "Tanggal Penutupan BRCK-2",
          dataIndex: "tanggal_penutupan_brck2",
          key: "tanggal_penutupan_brck2",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_penutupan_brck2"),
        },
      ],
      dataSource: [
        {
          key: "1",
          merk_mmea: "merk_mmea1",
          jenis_mmea: "jenis_mmea1",
          golongan: "golongan1",
          kadar: "kadar1",
          tarif: "tarif1",
          isi: "isi1",
          kemasan: "kemasan1",
          no_skep: "no_skep1",
          tanggal_penutupan_brck2: "tanggal_penutupan_brck2_1",
        },
        {
          key: "2",
          merk_mmea: "merk_mmea2",
          jenis_mmea: "jenis_mmea2",
          golongan: "golongan2",
          kadar: "kadar2",
          tarif: "tarif2",
          isi: "isi2",
          kemasan: "kemasan2",
          no_skep: "no_skep2",
          tanggal_penutupan_brck2: "tanggal_penutupan_brck2_2",
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
        title="Daftar Merk"
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
