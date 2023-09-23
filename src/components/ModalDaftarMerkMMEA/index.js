import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarMerkMMEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarMerkMmeaLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        merk_name: null,
        golongan: null,
        kadar: null,
        tarif: null,
        isi: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Merk MMEA",
          dataIndex: "merk_name",
          key: "merk_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("merk_name"),
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
          render: (text) => <div>{text ? `${text} %` : text}</div>,
          ...this.getColumnSearchProps("kadar"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div>{text}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Isi",
          dataIndex: "isi",
          key: "isi",
          render: (text) => <div>{text ? `${text} ml` : text}</div>,
          ...this.getColumnSearchProps("isi"),
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
    const { merk_name, golongan, kadar, tarif, isi } = this.state.table;

    const payload = { page: this.state.page };

    if (merk_name) payload.namaMerk = merk_name;
    if (golongan) payload.namaGolongan = golongan;
    if (kadar) payload.kadarEa = kadar;
    if (tarif) payload.tarifSpesifik = tarif;
    if (isi) payload.isiPerKemasan = isi;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/back/daftar-merk-mmea",
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarMerkMmeaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `daftar-merk-mmea-${index}`,
        merk_id: item.idMerk,
        merk_name: item.namaMerk,
        golongan: item.namaGolongan,
        kadar: item.kadarEa,
        tarif: item.tarifSpesifik,
        isi: item.isiPerKemasan,
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
    this.getDaftarMerkMmea();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: null } });
    this.getDaftarMerkMmea();
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
