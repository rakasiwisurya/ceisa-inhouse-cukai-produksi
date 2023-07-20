import { Button, Icon, Input, Modal, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
// import { requestApi } from "utils/requestApi";

export default class ModalDaftarJenisPita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarJenisPitaLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        jenis_produksi_name: "",
        hje: "",
        isi: "",
        awal_berlaku: "",
        tarif: "",
        warna: "",
        tahun_pita: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi_name",
          key: "jenis_produksi_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_produksi_name"),
        },
        {
          title: "HJE",
          dataIndex: "hje",
          key: "hje",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("hje"),
        },
        {
          title: "Awal Berlaku",
          dataIndex: "awal_berlaku",
          key: "awal_berlaku",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("awal_berlaku"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Warna",
          dataIndex: "warna",
          key: "warna",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("warna"),
        },
        {
          title: "Tahun Pita",
          dataIndex: "tahun_pita",
          key: "tahun_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tahun_pita"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarJenisPita();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getDaftarJenisPita();
    }
  }

  getDaftarJenisPita = async () => {
    this.setState({ isDaftarJenisPitaLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource: [
          {
            key: "1",
            jenis_pita_id: "jenis_pita_1",
            jenis_produksi_id: 2,
            jenis_produksi_code: "HTL",
            jenis_produksi_name: "HASIL TEMBAKAU LAINNYA",
            golongan_id: 5,
            golongan_name: "TANPA GOLONGAN",
            hje: 100,
            isi: 2000,
            awal_berlaku: moment(new Date()).format("DD-MM-YYYY"),
            tarif: 3000,
            warna: "Merah",
            tahun_pita: "2001",
            personal: "personal1",
          },
          {
            key: "2",
            jenis_pita_id: "jenis_pita_2",
            jenis_produksi_id: 5,
            jenis_produksi_code: "REL",
            jenis_produksi_name: "ROKOK ELEKTRIK",
            golongan_id: 4,
            golongan_name: "IMPORTIR",
            hje: 3000,
            isi: 200,
            awal_berlaku: moment(new Date()).format("DD-MM-YYYY"),
            tarif: 3000,
            warna: "Merah",
            tahun_pita: "2001",
            personal: "personal2",
          },
          {
            key: "3",
            jenis_pita_id: "jenis_pita_3",
            jenis_produksi_id: 1,
            jenis_produksi_code: "CRT",
            jenis_produksi_name: "CERUTU",
            golongan_id: 4,
            golongan_name: "IMPORTIR",
            hje: 100,
            isi: 4000,
            awal_berlaku: moment(new Date()).format("DD-MM-YYYY"),
            tarif: 3000,
            warna: "Merah",
            tahun_pita: "2001",
            personal: "personal3",
          },
        ],
      });
      this.setState({ isDaftarJenisPitaLoading: false });
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
    this.getDaftarJenisPita();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarJenisPita();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Jenis Pita" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarJenisPitaLoading}
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
