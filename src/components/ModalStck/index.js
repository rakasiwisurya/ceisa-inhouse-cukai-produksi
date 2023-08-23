import { Button, Icon, Input, Modal, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

const limit = 10;

export default class ModalStck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarStckLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        nomor_stck: "",
        tanggal_stck: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Nomor STCK",
          dataIndex: "nomor_stck",
          key: "nomor_stck",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_stck"),
        },
        {
          title: "Tanggal STCK",
          dataIndex: "tanggal_stck",
          key: "tanggal_stck",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_stck"),
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.npwp !== this.props.npwp && this.props.npwp) {
      this.getDaftarStck();
    }
  }

  getDaftarStck = async () => {
    const payload = { page: this.state.page * limit - limit, limit, npwp: this.props.npwp };

    const response = await requestApi({
      service: "perbendaharaan",
      method: "get",
      endpoint: "/perben/piutang/get-piutang-cukai",
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarStckLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.data.map((item, index) => ({
        key: `stck-${index}`,
        nomor_stck: item.nomorDokumen,
        tanggal_stck: moment(item.tanggalDokumen).format("DD-MM-YYYY"),
      }));

      this.setState({ dataSource: newData, totalData: response.data.data.totalData });
    }
  };

  getColumnSearchProps = (dataIndex, inputType) => ({
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
    this.getDaftarStck();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarStck();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar STCK" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarStckLoading}
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
