import { Button, Icon, Input, Table, Tabs } from "antd";
import Container from "components/Container";
import React, { Component } from "react";
import Header from "components/Header";

const pathName = "/citac";

export default class CK4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "CK4",

      searchText: "",
      searchedColumn: "",

      columns: [
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button
                type="default"
                icon="eye"
                onClick={() => this.handleDetail(record.id, record.nppbkc)}
              />
              <Button
                type="primary"
                icon="form"
                onClick={() => this.handleEdit(record.id, record.nppbkc)}
              />
            </div>
          ),
        },
        {
          title: "KPPBC",
          dataIndex: "kppbc",
          key: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
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
          title: "Tanggal Pemberitahuan",
          dataIndex: "tanggal_pemberitahuan",
          key: "tanggal_pemberitahuan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_pemberitahuan"),
        },
        {
          title: "Tanggal Produksi Awal",
          dataIndex: "tanggal_produksi_awal",
          key: "tanggal_produksi_awal",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_produksi_awal"),
        },
        {
          title: "Tanggal Produksi Akhir",
          dataIndex: "tanggal_produksi_akhir",
          key: "tanggal_produksi_akhir",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_produksi_akhir"),
        },
        {
          title: "Jumlah Produksi (lt)",
          dataIndex: "jumlah_produksi_lt",
          key: "jumlah_produksi_lt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_produksi_lt"),
        },
        {
          title: "Jumlah Produksi (btg)",
          dataIndex: "jumlah_produksi_btg",
          key: "jumlah_produksi_btg",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_produksi_btg"),
        },
        {
          title: "Jumlah Produksi (gram)",
          dataIndex: "jumlah_produksi_gram",
          key: "jumlah_produksi_gram",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_produksi_gram"),
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
          id: 1,
          kppbc: "KPPBC",
          nppbkc: "EA",
          nama_perusahaan: "Nama Perusahaan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi_awal: "Tanggal Produksi Awal",
          tanggal_produksi_akhir: "Tanggal Produksi Akhir",
          jumlah_produksi_lt: "Jumlah Produksi Lt",
          jumlah_produksi_btg: "Jumlah Produksi Batang",
          jumlah_produksi_gram: "Jumlah Produksi Gram",
          status: "status",
        },
        {
          key: "2",
          id: 2,
          kppbc: "KPPBC",
          nppbkc: "MMEA",
          nama_perusahaan: "Nama Perusahaan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi_awal: "Tanggal Produksi Awal",
          tanggal_produksi_akhir: "Tanggal Produksi Akhir",
          jumlah_produksi_lt: "Jumlah Produksi Lt",
          jumlah_produksi_btg: "Jumlah Produksi Batang",
          jumlah_produksi_gram: "Jumlah Produksi Gram",
          status: "status",
        },
        {
          key: "3",
          id: 3,
          kppbc: "KPPBC",
          nppbkc: "HT",
          nama_perusahaan: "Nama Perusahaan",
          tanggal_pemberitahuan: "Tanggal Pemberitahuan",
          tanggal_produksi_awal: "Tanggal Produksi Awal",
          tanggal_produksi_akhir: "Tanggal Produksi Akhir",
          jumlah_produksi_lt: "Jumlah Produksi Lt",
          jumlah_produksi_btg: "Jumlah Produksi Batang",
          jumlah_produksi_gram: "Jumlah Produksi Gram",
          status: "status",
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

  handleDetail = (id, nppbkc) => {
    switch (true) {
      case nppbkc === "EA":
        this.props.history.push(`${pathName}/ck4-ea-detail/${id}`);
        break;
      case nppbkc === "MMEA":
        this.props.history.push(`${pathName}/ck4-mmea-detail/${id}`);
        break;
      case nppbkc === "HT":
        this.props.history.push(`${pathName}/ck4-ht-detail/${id}`);
        break;
      default:
        break;
    }
  };
  handleEdit = (id, nppbkc) => {
    switch (true) {
      case nppbkc === "EA":
        this.props.history.push(`${pathName}/ck4-ea-edit/${id}`);
        break;
      case nppbkc === "MMEA":
        this.props.history.push(`${pathName}/ck4-mmea-edit/${id}`);
        break;
      case nppbkc === "HT":
        this.props.history.push(`${pathName}/ck4-ht-edit/${id}`);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC" contentName="CK4" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
              <Button type="default" onClick={() => this.props.history.push(`${pathName}/ck4-ea`)}>
                CK4A Rekam
              </Button>
              <Button
                type="default"
                onClick={() => this.props.history.push(`${pathName}/ck4-mmea`)}
              >
                CK4B Rekam
              </Button>
              <Button type="default" onClick={() => this.props.history.push(`${pathName}/ck4-ht`)}>
                CK4C Rekam
              </Button>
            </div>

            <div style={{ marginTop: 20 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}
