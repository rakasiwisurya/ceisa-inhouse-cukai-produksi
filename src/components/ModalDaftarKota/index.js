import { Button, Icon, Input, Modal, Table } from "antd";
import { endpoints } from "configs/constants";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarKota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarKotaLoading: true,
      isMouseEnter: false,

      searchText: null,
      searchedColumn: null,
      page: 1,

      table: {
        idKota: null,
        namaKota: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Id",
          dataIndex: "idKota",
          key: "idKota",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("idKota"),
        },
        {
          title: "Nama Kota / Kabupaten",
          dataIndex: "namaKota",
          key: "namaKota",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaKota"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarKota();
  }

  getDaftarKota = async () => {
    const response = await requestApi({
      service: "referensi_beacukai",
      method: "get",
      endpoint: endpoints.listKabupatenAll,
      setLoading: (bool) => this.setState({ isDaftarKotaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item, index) => ({
        key: `kota-${index}`,
        idKota: item.kodeKabupaten,
        namaKota: item.namaKabupaten,
      }));

      this.setState({ dataSource: newData });
    }
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
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
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
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
  handleColumnReset = async (clearFilters) => {
    clearFilters();
    this.setState({ searchText: null });
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Kota / Kabupaten" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarKotaLoading}
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
