import { Button, Icon, Input, Modal, Table } from "antd";
import { endpoints } from "configs/constants";
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
        namaMerkHt: null,
        isiHt: null,
        hjeHt: null,
        tarifHt: null,
        bahanHt: null,
        jenisProduksiHt: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Merk ht",
          dataIndex: "namaMerkHt",
          key: "namaMerkHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaMerkHt"),
        },
        {
          title: "Isi",
          dataIndex: "isiHt",
          key: "isiHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isiHt"),
        },
        {
          title: "HJE",
          dataIndex: "hjeHt",
          key: "hjeHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("hjeHt"),
        },
        {
          title: "Tarif Spesifik",
          dataIndex: "tarifHt",
          key: "tarifHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarifHt"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenisProduksiHt",
          key: "jenisProduksiHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenisProduksiHt"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarMerkHt();
  }

  getDaftarMerkHt = async () => {
    const { namaMerkHt, isiHt, hjeHt, tarifHt, jenisProduksiHt } = this.state.table;

    const payload = { page: this.state.page };

    if (namaMerkHt) payload.namaMerkht = namaMerkHt;
    if (isiHt) payload.isiHt = isiHt;
    if (hjeHt) payload.hjeHt = hjeHt;
    if (tarifHt) payload.tarifHt = tarifHt;
    if (jenisProduksiHt) payload.jenisProduksiHt = jenisProduksiHt;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.ck4DaftarMerkHt,
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarMerkHtLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `merk-ht-${index}`,
        idMerkHt: item.idMerkHt,
        namaMerkHt: item.namaMerkHt,
        jenisHt: item.jenisHt,
        isiHt: item.isiHt,
        hjeHt: item.hjeHt,
        tarifHt: item.tarifHt,
        satuanHt: item.satuanHt,
        bahanHt: item.bahanHt,
        jenisProduksiHt: item.jenisProduksiHt,
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
    this.setState({ page: 1 }, this.getDaftarMerkHt);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { table: { ...this.state.table, [dataIndex]: null }, page: 1 },
      this.getDaftarMerkHt
    );
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
