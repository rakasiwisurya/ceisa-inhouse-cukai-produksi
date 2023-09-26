import { Button, Icon, Input, Modal, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarMerkBrck2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarMerkBrck2Loading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        merk_mmea_name: null,
        golongan: null,
        tarif: null,
        isi: null,
        kemasan: null,
        no_skep: null,
        tanggal_penutupan_brck2: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Merk MMEA",
          dataIndex: "merk_mmea_name",
          key: "merk_mmea_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("merk_mmea_name"),
        },
        {
          title: "Golongan",
          dataIndex: "golongan",
          key: "golongan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("golongan"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Isi",
          dataIndex: "isi",
          key: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          title: "Kemasan",
          dataIndex: "kemasan",
          key: "kemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kemasan"),
        },
        {
          title: "No. SKEP",
          dataIndex: "no_skep",
          key: "no_skep",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("no_skep"),
        },
        {
          title: "Tanggal Penutupan BRCK-2",
          dataIndex: "tanggal_penutupan_brck2",
          key: "tanggal_penutupan_brck2",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_penutupan_brck2"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarMerkBrck2();
  }

  getDaftarMerkBrck2 = async () => {
    const { merk_mmea_name, golongan, tarif, isi, kemasan, no_skep, tanggal_penutupan_brck2 } =
      this.state.table;

    const payload = { page: this.state.page };

    if (merk_mmea_name) payload.namaMerk = merk_mmea_name;
    if (golongan) payload.namaGolongan = golongan;
    if (tarif) payload.tarifSpesifik = tarif;
    if (isi) payload.isiPerKemasan = isi;
    if (kemasan) payload.namaJenisKemasan = kemasan;
    if (no_skep) payload.nomorSkep = no_skep;
    if (tanggal_penutupan_brck2)
      payload.terakhirPenutupan = moment(tanggal_penutupan_brck2, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/brck/daftar-merk-brck2",
      params: payload,
      setLoading: (bool) => this.setState({ isDaftarMerkBrck2Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `merk-brck2-${index}`,
        merk_mmea_id: item.idMerk,
        merk_mmea_name: item.namaMerk,
        golongan: item.namaGolongan,
        tarif: item.tarifSpesifik,
        isi: item.isiPerKemasan,
        kemasan: item.namaJenisKemasan,
        no_skep: item.nomorSkep,
        tanggal_penutupan_brck2: item.terakhirPenutupan,
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
    this.getDaftarMerkBrck2();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarMerkBrck2();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar Merk Brck 2" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarMerkBrck2Loading}
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
