import { Button, Icon, Input, Modal, Table } from "antd";
import { endpoints } from "configs/constants";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarMerkMMEACK4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarMerkMmeaLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        namaMerkMmea: null,
        golonganMmea: null,
        tarifMmea: null,
        isiMmea: null,
        jenisKemasanMmea: null,
        negaraAsalMmea: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Merk MMEA",
          dataIndex: "namaMerkMmea",
          key: "namaMerkMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaMerkMmea"),
        },
        {
          title: "Golongan",
          dataIndex: "golonganMmea",
          key: "golonganMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("golonganMmea"),
        },
        {
          title: "Tarif (%)",
          dataIndex: "tarifMmea",
          key: "tarifMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarifMmea"),
        },
        {
          title: "Isi (ml)",
          dataIndex: "isiMmea",
          key: "isiMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isiMmea"),
        },
        {
          title: "Kemasan",
          dataIndex: "jenisKemasanMmea",
          key: "jenisKemasanMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenisKemasanMmea"),
        },
        {
          title: "Negara Asal",
          dataIndex: "negaraAsalMmea",
          key: "negaraAsalMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("negaraAsalMmea"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarMerkMmea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getDaftarMerkMmea();
    }
  }

  getDaftarMerkMmea = async () => {
    const { namaMerkMmea, golonganMmea, tarifMmea, isiMmea, jenisKemasanMmea, negaraAsalMmea } =
      this.state.table;

    const payload = { page: this.state.page };

    if (namaMerkMmea) payload.namaMerkMmea = namaMerkMmea;
    if (golonganMmea) payload.golonganMmea = golonganMmea;
    if (tarifMmea) payload.tarifMmea = tarifMmea;
    if (isiMmea) payload.isiMmea = isiMmea;
    if (jenisKemasanMmea) payload.jenisKemasanMmea = jenisKemasanMmea;
    if (negaraAsalMmea) payload.negaraAsalMmea = negaraAsalMmea;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.ck4DaftarMerkMmea,
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarMerkMmeaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `merk-mmea-${index}`,
        idMerkDetail: item.idMerkDetail,
        idMerkMmea: item.idMerkMmea,
        namaMerkMmea: item.namaMerkMmea,
        golonganMmea: item.golonganMmea,
        tarifMmea: item.tarifMmea,
        isiMmea: item.isiMmea,
        jenisKemasanMmea: item.jenisKemasanMmea,
        negaraAsalMmea: item.negaraAsalMmea,
      }));
      const page = response.data.data.currentPage;
      const totalData = response.data.data.totalData;
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
    this.setState({ page: 1 }, this.getDaftarMerkMmea);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { table: { ...this.state.table, [dataIndex]: null }, page: 1 },
      this.getDaftarMerkMmea
    );
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Merk MMEA" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarMerkMmeaLoading}
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
