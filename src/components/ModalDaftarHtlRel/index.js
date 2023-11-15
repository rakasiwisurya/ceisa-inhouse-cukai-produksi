import { Button, Icon, Input, Modal, Table } from "antd";
import { endpoints } from "configs/constants";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarHtlRel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarHtlRelLoading: true,
      isMouseEnter: false,

      searchText: null,
      searchedColumn: null,
      page: 1,
      totalData: 0,

      dataSource: [],
      columns: [
        {
          title: "Jenis HTL/REL",
          dataIndex: "kodeJenisHtlRel",
          key: "kodeJenisHtlRel",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kodeJenisHtlRel"),
        },
        {
          title: "Keterangan",
          dataIndex: "namaJenisHtlRel",
          key: "namaJenisHtlRel",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaJenisHtlRel"),
        },
        {
          title: "Satuan",
          dataIndex: "satuanJenisHtlRel",
          key: "satuanJenisHtlRel",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("satuanJenisHtlRel"),
        },
      ],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id && (this.props.id === 2 || this.props.id === 5)) {
      this.getDaftarHtlRel();
    }
  }

  getDaftarHtlRel = async () => {
    const payload = { idJenisProduksiBkc: this.props.id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisHtlRel,
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarHtlRelLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item, index) => ({
        key: `jenis-htl-rel-${index}`,
        kodeJenisProduksiBkc: item.kodeJenisProduksiBkc,
        idJenisHtlRel: item.idJenisHtlRel,
        kodeJenisHtlRel: item.kodeHtlRel,
        namaJenisHtlRel: item.namaJenisHtlRel,
        satuanJenisHtlRel: item.satuan,
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
  handleColumnReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: null });
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar HTL/REL" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarHtlRelLoading}
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
