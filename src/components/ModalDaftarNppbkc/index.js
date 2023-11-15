import { Button, Icon, Input, Modal, Table } from "antd";
import { endpoints } from "configs/constants";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarNPPBKC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarNppbkcLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        idNppbkc: null,
        namaNppbkc: null,
        nppbkc: null,
        npwpNppbkc: null,
        alamatNppbkc: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Nama",
          dataIndex: "namaNppbkc",
          key: "namaNppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaNppbkc"),
        },
        {
          title: "NPPBKC",
          dataIndex: "nppbkc",
          key: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          title: "NPWP",
          dataIndex: "npwpNppbkc",
          key: "npwpNppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("npwpNppbkc"),
        },
        {
          title: "Alamat",
          dataIndex: "alamatNppbkc",
          key: "alamatNppbkc",
          render: (text) => <div>{text}</div>,
          ...this.getColumnSearchProps("alamatNppbkc"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarNppbkc();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevProps.idJenisBkc !== this.props.idJenisBkc) {
      this.getDaftarNppbkc();
    }
  }

  getDaftarNppbkc = async () => {
    const { idJenisBkc, idJenisUsaha } = this.props;
    const { idNppbkc, namaNppbkc, nppbkc, npwpNppbkc, alamatNppbkc } = this.state.table;

    const payload = { page: this.state.page };

    if (idJenisBkc) payload.kodeJenisBkc = idJenisBkc;
    if (idJenisUsaha) payload.kodeJenisUsaha = idJenisUsaha;

    if (idNppbkc) payload.idNppbkc = idNppbkc;
    if (namaNppbkc) payload.namaNppbkc = namaNppbkc;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (npwpNppbkc) payload.npwp = npwpNppbkc;
    if (alamatNppbkc) payload.alamatNppbkc = alamatNppbkc;

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.browseNppbkc,
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarNppbkcLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `nppbkc-${index}`,
        idNppbkc: item.idNppbkc,
        namaNppbkc: item.namaNppbkc,
        nppbkc: item.nppbkc,
        npwpNppbkc: item.npwp,
        alamatNppbkc: item.alamatNppbkc,
        idJenisBkc: item.idJenisBkc,
        personalNppbkc: item.kodePerson,
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
    this.setState({ page: 1 }, this.getDaftarNppbkc);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { table: { ...this.state.table, [dataIndex]: null }, page: 1 },
      this.getDaftarNppbkc
    );
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar NPPBKC" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarNppbkcLoading}
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
