import { Button, Icon, Input, Modal, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarJenisPita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarJenisPitaLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        jenis_produksi_code: null,
        hje: null,
        isi: null,
        awal_berlaku: null,
        tarif: null,
        warna: null,
        tahun_pita: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi_code",
          key: "jenis_produksi_code",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_produksi_code"),
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
          dataIndex: "awal_berlaku",
          key: "awal_berlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("awal_berlaku"),
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
          dataIndex: "tahun_pita",
          key: "tahun_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tahun_pita"),
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
    const { jenis_produksi_code, hje, isi, awal_berlaku, tarif, warna, tahun_pita } =
      this.state.table;

    const payload = { page: this.state.page };

    if (idJenisBkc) payload.idJenisBkc = idJenisBkc;

    if (jenis_produksi_code) payload.kodeJenisProduksi = jenis_produksi_code;
    if (hje) payload.hje = hje;
    if (isi) payload.isiKemasan = isi;
    if (awal_berlaku) payload.awalBerlaku = awal_berlaku;
    if (tarif) payload.tarif = tarif;
    if (warna) payload.warna = warna;
    if (tahun_pita) payload.tahunPita = tahun_pita;

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: "/pita/browse-jenis",
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarJenisPitaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `daftar-jenis-pita-${index}`,
        jenis_pita_id: item.idJenisPita,
        jenis_produksi_id: item.idJenisProduksi,
        jenis_produksi_code: item.kodeJenisProduksi,
        golongan_id: item.idGolongan,
        golongan_name: item.namaGolongan,
        hje: item.hje,
        isi: item.isiKemasan,
        awal_berlaku: item.awalBerlaku,
        tarif: item.tarif,
        warna: item.warna,
        tahun_pita: item.tahunPita,
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
