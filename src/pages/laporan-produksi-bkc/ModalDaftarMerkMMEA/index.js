import { Button, Icon, Input, Modal, Table } from "antd";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalDaftarMerkMMEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaftarMerkMmeaLoading: true,
      isMouseEnter: false,

      page: 1,
      totalData: 0,

      table: {
        merk_mmea_name: "",
        jenis_mmea: "",
        golongan_mmea: "",
        kadar_mmea: "",
        tarif_mmea: "",
        isi_mmea: "",
        jenis_kemasan_mmea: "",
        negara_asal_mmea: "",
      },

      dataSource: [],
      columns: [
        {
          title: "Merk MMEA",
          dataIndex: "merk_mmea_name",
          key: "merk_mmea_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("merk_mmea_name"),
        },
        {
          title: "Jenis MMEA",
          dataIndex: "jenis_mmea",
          key: "jenis_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_mmea"),
        },
        {
          title: "Golongan",
          dataIndex: "golongan_mmea",
          key: "golongan_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("golongan_mmea"),
        },
        {
          title: "Kadar (%)",
          dataIndex: "kadar_mmea",
          key: "kadar_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kadar_mmea"),
        },
        {
          title: "Tarif (%)",
          dataIndex: "tarif_mmea",
          key: "tarif_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarif_mmea"),
        },
        {
          title: "Isi (ml)",
          dataIndex: "isi_mmea",
          key: "isi_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isi_mmea"),
        },
        {
          title: "Kemasan",
          dataIndex: "jenis_kemasan_mmea",
          key: "jenis_kemasan_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_kemasan_mmea"),
        },
        {
          title: "Negara Asal",
          dataIndex: "negara_asal_mmea",
          key: "negara_asal_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("negara_asal_mmea"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDaftarMerkMmea();
  }

  getDaftarMerkMmea = async () => {
    // const {
    //   merk_mmea_name,
    //   jenis_mmea,
    //   golongan_mmea,
    //   kadar_mmea,
    //   tarif_mmea,
    //   isi_mmea,
    //   jenis_kemasan_mmea,
    //   negara_asal_mmea,
    // } = this.state.table;

    // const payload = { page: this.state.page };

    // if (merk_mmea_name) payload.namaMerkMmea = merk_mmea_name;
    // if (jenis_mmea) payload.jenisMmea = jenis_mmea;
    // if (golongan_mmea) payload.golonganMmea = golongan_mmea;
    // if (kadar_mmea) payload.kadarMmea = kadar_mmea;
    // if (tarif_mmea) payload.tarifMmea = tarif_mmea;
    // if (isi_mmea) payload.isiMmea = isi_mmea;
    // if (jenis_kemasan_mmea) payload.jenisKemasanMmea = jenis_kemasan_mmea;
    // if (negara_asal_mmea) payload.negaraAsalMmea = negara_asal_mmea;

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/ck4/daftar-jenis_mmea",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDaftarMerkMmeaLoading: bool }),
    // });

    // if (response) {
    //   const newData = response.data.data.listData.map((item) => ({
    //     key: item.idMerkMmea,
    //     merk_mmea_id: item.idMerkMmea,
    //     merk_mmea_name: item.namaMerkMmea,
    //     jenis_mmea: item.jenisMmea,
    //     golongan_mmea: item.golonganMmea,
    //     kadar_mmea: item.kadarMmea,
    //     tarif_mmea: item.tarifMmea,
    //     isi_mmea: item.isiMmea,
    //     jenis_kemasan_mmea: item.jenisKemasanMmea,
    //     negara_asal_mmea: item.negaraAsalMmeaMmea,
    //   }));
    //   const page = response.data.currentPage;
    //   const totalData = response.data.totalData;
    //   this.setState({ dataSource: newData, page, totalData });
    // }

    this.setState({ isDaftarMerkMmeaLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        page: 1,
        totalData: 10,
        dataSource: [
          {
            key: 1,
            merk_mmea_id: 1,
            merk_mmea_name: "merk_mmea_name_1",
            jenis_mmea: "jenis_mmea_1",
            golongan_mmea: "golongan_mmea_1",
            kadar_mmea: "kadar_mmea_1",
            tarif_mmea: "tarif_mmea_1",
            isi_mmea: "isi_mmea_1",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_1",
            negara_asal_mmea: "negara_asal_mmea_1",
          },
          {
            key: 2,
            merk_mmea_id: 2,
            merk_mmea_name: "merk_mmea_name_2",
            jenis_mmea: "jenis_mmea_2",
            golongan_mmea: "golongan_mmea_2",
            kadar_mmea: "kadar_mmea_2",
            tarif_mmea: "tarif_mmea_2",
            isi_mmea: "isi_mmea_2",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_2",
            negara_asal_mmea: "negara_asal_mmea_2",
          },
          {
            key: 3,
            merk_mmea_id: 3,
            merk_mmea_name: "merk_mmea_name_3",
            jenis_mmea: "jenis_mmea_3",
            golongan_mmea: "golongan_mmea_3",
            kadar_mmea: "kadar_mmea_3",
            tarif_mmea: "tarif_mmea_3",
            isi_mmea: "isi_mmea_3",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_3",
            negara_asal_mmea: "negara_asal_mmea_3",
          },
        ],
      });
      this.setState({ isDaftarMerkMmeaLoading: false });
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
    this.getDaftarMerkMmea();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getDaftarMerkMmea();
  };

  render() {
    const { isVisible, onCancel, onDataDoubleClick } = this.props;

    return (
      <Modal title="Daftar NPPBKC" visible={isVisible} onCancel={onCancel} footer={null}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isDaftarMerkMmeaLoading}
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
