import { Button, Icon, Input, Table } from "antd";
import Container from "components/Container";
import Header from "components/Header";
import React, { Component } from "react";

export default class CK4A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pencarian CK-4A",

      searchText: "",
      searchedColumn: "",

      columns: [
        {
          title: "Kode Kantor",
          dataIndex: "kode_kantor",
          key: "kode_kantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kode_kantor"),
        },
        {
          title: "KPPBC",
          dataIndex: "kppbc",
          key: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          title: "ID Proses",
          dataIndex: "id_proses",
          key: "id_proses",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("id_proses"),
        },
        {
          title: "NPPBKC",
          dataIndex: "nppbkc",
          key: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          title: "Nama Perushaaan",
          dataIndex: "nama_perusahaan",
          key: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          title: "Nomor Pemberitahuan",
          dataIndex: "nomor_pemberitahuan",
          key: "nomor_pemberitahuan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nomor_pemberitahuan"),
        },
        {
          title: "Tanggal Pemberitahuan",
          dataIndex: "tanggal_pemberitahuan",
          key: "tanggal_pemberitahuan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_pemberitahuan"),
        },
        {
          title: "Tanggal Produksi",
          dataIndex: "tanggal_produksi",
          key: "tanggal_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_produksi"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi",
          key: "jenis_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_produksi"),
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
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "2",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "3",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "4",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "5",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "6",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "7",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "8",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "9",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
        },
        {
          key: "10",
          kode_kantor: "Kode Kantor",
          kppbc: "KPPBC",
          id_proses: "ID Proses",
          nppbkc: "NPPBKC",
          nama_perusahaan: "Nama Perushaaan",
          nomor_pemberitahuan: "Nomor Pemberitahuan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi: "Tanggal Produksi",
          jenis_produksi: "Jenis Produksi",
          status: "Status",
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
    return (
      <Container menuName="Laporan Produksi BKC" contentName="CK4A" hideContentHeader>
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
