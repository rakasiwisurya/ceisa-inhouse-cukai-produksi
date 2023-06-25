import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarKota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarKotaLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        kota_id: "",
        kota_name: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Id",
          dataIndex: "kota_id",
          key: "kota_id",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kota_id"),
        },
        {
          title: "Nama Kota / Kabupaten",
          dataIndex: "kota_name",
          key: "kota_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kota_name"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarKota();
  }

  getDaftarKota = async () => {
    // const { kota_id, kota_name } = this.state.table;

    // const payload = { page: this.state.page };

    // if (kota_id) payload.idKota = kota_id;
    // if (kota_name) payload.namaKota = kota_name;

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/ck4/daftar-kota",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDaftarKotaLoading: bool }),
    // });

    // if (response) {
    //   const newData = response.data.data.listData.map((item) => ({
    //     key: item.idKota,
    //     kota_id: item.idKota,
    //     kota_name: item.namaKota,
    //   }));
    //   const page = response.data.currentPage;
    //   const totalData = response.data.totalData;
    //   this.setState({ dataSource: newData, page, totalData });
    // }

    this.setState({ isDaftarKotaLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        page: 1,
        totalData: 10,
        dataSource: [
          {
            key: "489",
            kota_id: "489",
            kota_name: "Kabupaten Kaimana",
          },
          {
            key: "490",
            kota_id: "490",
            kota_name: "Kabupaten Manokwari",
          },
          {
            key: "491",
            kota_id: "491",
            kota_name: "Kabupaten Maybrat",
          },
        ],
      });
      this.setState({ isDaftarKotaLoading: false });
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
    this.getDaftarKota();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarKota();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Kota / Kabupaten" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarKotaLoading}
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
