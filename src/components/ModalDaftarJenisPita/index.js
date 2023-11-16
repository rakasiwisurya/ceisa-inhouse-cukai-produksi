import { Button, Icon, Input, Modal, Table } from "antd";
import { endpoints } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class qModalDaftarJenisPita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarJenisPitaLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        kodeJenisProduksi: null,
        hje: null,
        isi: null,
        awalBerlaku: null,
        tarif: null,
        warna: null,
        tahunPita: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Jenis Produksi",
          dataIndex: "kodeJenisProduksi",
          key: "kodeJenisProduksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kodeJenisProduksi"),
        },
        {
          title: "HJE",
          dataIndex: "hje",
          key: "hje",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje"),
        },
        {
          title: "Awal Berlaku",
          dataIndex: "awalBerlaku",
          key: "awalBerlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("awalBerlaku"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Warna",
          dataIndex: "warna",
          key: "warna",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("warna"),
        },
        {
          title: "Tahun Pita",
          dataIndex: "tahunPita",
          key: "tahunPita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tahunPita"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarJenisPita();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevProps.idJenisBkc !== this.props.idJenisBkc) {
      this.getDaftarJenisPita();
    }
  }

  getDaftarJenisPita = async () => {
    const { idJenisBkc } = this.props;
    const { kodeJenisProduksi, hje, isi, awalBerlaku, tarif, warna, tahunPita } = this.state.table;

    const payload = { page: this.state.page };

    if (idJenisBkc) payload.idJenisBkc = idJenisBkc;

    if (kodeJenisProduksi) payload.kodeJenisProduksi = kodeJenisProduksi;
    if (hje) payload.hje = hje;
    if (isi) payload.isiKemasan = isi;
    if (awalBerlaku) payload.awalBerlaku = awalBerlaku;
    if (tarif) payload.tarif = tarif;
    if (warna) payload.warna = warna;
    if (tahunPita) payload.tahunPita = tahunPita;

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: endpoints.jenisPitaBrowse,
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarJenisPitaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `daftar-jenis-pita-${index}`,
        idJenisPita: item.idJenisPita,
        idJenisProduksi: item.idJenisProduksi,
        kodeJenisProduksi: item.kodeJenisProduksi,
        idGolongan: item.idGolongan,
        namaGolongan: item.namaGolongan,
        hje: item.hje,
        isi: item.isiKemasan,
        awalBerlaku: item.awalBerlaku,
        tarif: item.tarif,
        warna: item.warna,
        tahunPita: item.tahunPita,
        personal: item.personal,
      }));

      this.setState({
        dataSource: newData,
        page: response.data.data.currentPage,
        totalData: response.data.data.totalData,
      });
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
    this.setState({ page: 1 }, this.getDaftarJenisPita);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { table: { ...this.state.table, [dataIndex]: null }, page: 1 },
      this.getDaftarJenisPita
    );
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Jenis Pita" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarJenisPitaLoading}
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
