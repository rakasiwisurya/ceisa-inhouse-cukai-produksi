import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";
// import { requestApi } from "utils/requestApi";

export default class ModalDaftarHtlRel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarHtlRelLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        jenis_htl_rel: "",
        keterangan: "",
        satuan: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Jenis HTL/REL",
          dataIndex: "jenis_htl_rel",
          key: "jenis_htl_rel",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_htl_rel"),
        },
        {
          title: "Keterangan",
          dataIndex: "keterangan",
          key: "keterangan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("keterangan"),
        },
        {
          title: "Satuan",
          dataIndex: "satuan",
          key: "satuan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("satuan"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarHtlRel();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getDaftarHtlRel();
    }
  }

  getDaftarHtlRel = async () => {
    // const { id } = this.props;
    this.setState({ isDaftarHtlRelLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource: [
          {
            key: "1",
            jenis_htl_rel: "TMS",
            keterangan: "Tembakau Molases",
            satuan: "GR",
          },
        ],
      });
      this.setState({ isDaftarHtlRelLoading: false });
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
    this.getDaftarHtlRel();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarHtlRel();
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
