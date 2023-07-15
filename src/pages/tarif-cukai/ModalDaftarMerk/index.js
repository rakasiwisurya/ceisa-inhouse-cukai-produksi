import { Button, Icon, Input, Modal, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
// import { requestApi } from "utils/requestApi";

export default class ModalDaftarMerk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarMerkLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        nama_merk: "",
        jenis_produksi: "",
        isi: "",
        hje: "",
        tarif: "",
        awal_berlaku: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Merk",
          dataIndex: "nama_merk",
          key: "nama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nama_merk"),
        },
        {
          title: "Jenis",
          dataIndex: "jenis_produksi",
          key: "jenis_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_produksi"),
        },
        {
          title: "Isi",
          dataIndex: "isi",
          key: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          title: "HJE",
          dataIndex: "hje",
          key: "hje",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("hje"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Awal Berlaku",
          dataIndex: "awal_berlaku",
          key: "awal_berlaku",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("awal_berlaku"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarMerk();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getDaftarMerk();
    }
  }

  getDaftarMerk = async () => {
    this.setState({ isDaftarMerkLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource: [
          {
            key: "1",
            merk_id: "1",
            nama_merk: "Aristo 16 (Filter)",
            nomor_kep: "nomor kep/12/XI/2023",
            tanggal_kep: moment(new Date()).format("DD-MM-YYYY"),
            jenis_produksi: "SKM",
            seri_pita: "III TP",
            tarif: "669",
            hje: "20100",
            isi: "16",
            berat: "10000",
            awal_berlaku: moment(new Date()).format("DD-MM-YYYY"),
            tanggal_pesan_akhir: moment(new Date()).format("DD-MM-YYYY"),
          },
        ],
      });
      this.setState({ isDaftarMerkLoading: false });
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
    this.getDaftarMerk();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarMerk();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Merk" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarMerkLoading}
          onChange={(page) => this.setState({ page: page.current })}
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
