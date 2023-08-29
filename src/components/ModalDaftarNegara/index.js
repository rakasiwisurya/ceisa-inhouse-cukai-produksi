import { Modal, Table } from "antd";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

const limit = 10;

export default class ModalDaftarNegara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarNegaraLoading: true,
      isMouseEnter: false,

      searchText: "",
      searchedColumn: "",
      page: 1,
      totalData: 0,

      table: {
        negara_id: "",
        negara_name: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Kode Negara",
          dataIndex: "negara_id",
          key: "negara_id",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
        {
          title: "Nama Negara",
          dataIndex: "negara_name",
          key: "negara_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarNegara();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getDaftarNegara();
    }
  }

  getDaftarNegara = async () => {
    const payload = { page: this.state.page > 1 ? this.state.page * 10 - 10 : 0, size: limit };

    const response = await requestApi({
      service: "referensi_beacukai",
      method: "get",
      endpoint: "Referensi/v1/negara",
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarNegaraLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item, index) => ({
        key: `negara-${index}`,
        negara_id: item.kodeNegara,
        negara_name: item.namaNegara,
      }));

      this.setState({ dataSource: newData, totalData: response.data.total });
    }
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Negara" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarNegaraLoading}
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
