import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarHTCK4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarMerkHtLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        merk_ht_name: "",
        isi_ht: "",
        hje_ht: "",
        tarif_ht: "",
        bahan_ht: "",
        jenis_produksi_ht: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Merk ht",
          dataIndex: "merk_ht_name",
          key: "merk_ht_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("merk_ht_name"),
        },
        {
          title: "Isi",
          dataIndex: "isi_ht",
          key: "isi_ht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isi_ht"),
        },
        {
          title: "HJE",
          dataIndex: "hje_ht",
          key: "hje_ht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("hje_ht"),
        },
        {
          title: "Tarif Spesifik",
          dataIndex: "tarif_ht",
          key: "tarif_ht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarif_ht"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi_ht",
          key: "jenis_produksi_ht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_produksi_ht"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarMerkHt();
  }

  getDaftarMerkHt = async () => {
    const { merk_ht_name, isi_ht, hje_ht, tarif_ht, jenis_produksi_ht } = this.state.table;

    const payload = { page: this.state.page };

    if (merk_ht_name) payload.namaMerkht = merk_ht_name;
    if (isi_ht) payload.isiHt = isi_ht;
    if (hje_ht) payload.hjeHt = hje_ht;
    if (tarif_ht) payload.tarifHt = tarif_ht;
    if (jenis_produksi_ht) payload.jenisProduksiHt = jenis_produksi_ht;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/daftar-merk-ht",
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarMerkHtLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `merk-ht-${index}`,
        merk_ht_id: item.idMerkHt,
        merk_ht_name: item.namaMerkHt,
        jenis_ht: item.jenisHt,
        isi_ht: item.isiHt,
        hje_ht: item.hjeHt,
        tarif_ht: item.tarifHt,
        satuan_ht: item.satuanHt,
        bahan_ht: item.bahanHt,
        jenis_produksi_ht: item.jenisProduksiHt,
      }));
      const page = response.data.currentPage;
      const totalData = response.data.totalData;
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
    this.getDaftarMerkHt();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarMerkHt();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Merk HT" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarMerkHtLoading}
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
