import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class BRCK1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBrck1Loading: true,

      page: 1,
      totalData: 0,

      filter: {
        kppbc: null,
        namaPerusahaan: null,
        warna: null,
        tanggalAwal: null,
        tanggalAkhir: null,
        saldoAwal: null,
        saldoBuku: null,
        saldoPenutupanBrck: null,
        selisih: null,
        potongan: null,
        kekurangan: null,
      },

      dataSource: [],
      columns: [
        {
          key: "aksi",
          title: "Aksi",
          fixed: "left",
          render: (_, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <ButtonCustom
                icon="form"
                variant="warning"
                onClick={() => this.handleEdit(record.idBrck1)}
              />
              <ButtonCustom
                icon="eye"
                variant="info"
                onClick={() => this.handleDetail(record.idBrck1)}
              />
            </div>
          ),
        },
        {
          title: "KPPBC",
          dataIndex: "kppbc",
          key: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          title: "Perusahaan",
          dataIndex: "namaPerusahaan",
          key: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaPerusahaan"),
        },
        {
          title: "Warna",
          dataIndex: "warna",
          key: "warna",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("warna"),
        },
        {
          title: "Tanggal Awal",
          dataIndex: "tanggalAwal",
          key: "tanggalAwal",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalAwal"),
        },
        {
          title: "Tanggal Akhir",
          dataIndex: "tanggalAkhir",
          key: "tanggalAkhir",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalAkhir"),
        },
        {
          title: "Saldo Awal",
          dataIndex: "saldoAwal",
          key: "saldoAwal",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text || text === 0 ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("saldoAwal"),
        },
        {
          title: "Saldo Buku",
          dataIndex: "saldoBuku",
          key: "saldoBuku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text || text === 0 ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("saldoBuku"),
        },
        {
          title: "Saldo Penutupan BRCK",
          dataIndex: "saldoPenutupanBrck",
          key: "saldoPenutupanBrck",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text || text === 0 ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("saldoPenutupanBrck"),
        },
        {
          title: "Selisih",
          dataIndex: "selisih",
          key: "selisih",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text || text === 0 ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("selisih"),
        },
        {
          title: "Potongan",
          dataIndex: "potongan",
          key: "potongan",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text || text === 0 ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("potongan"),
        },
        {
          title: "Kekurangan",
          dataIndex: "kekurangan",
          key: "kekurangan",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text || text === 0 ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("kekurangan"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getBrck1();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getBrck1();
    }
  }

  getBrck1 = async () => {
    const {
      kppbc,
      namaPerusahaan,
      warna,
      tanggalAwal,
      tanggalAkhir,
      saldoAwal,
      saldoBuku,
      saldoPenutupanBrck,
      selisih,
      potongan,
      kekurangan,
    } = this.state.filter;

    const payload = { page: this.state.page };

    if (kppbc) payload.kppbc = kppbc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (warna) payload.warna = warna;
    if (tanggalAwal) payload.tanggalAwal = moment(tanggalAwal, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (tanggalAkhir)
      payload.tanggalAkhir = moment(tanggalAkhir, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (saldoAwal) payload.saldoAwal = saldoAwal;
    if (saldoBuku) payload.saldoBuku = saldoBuku;
    if (saldoPenutupanBrck) payload.saldoPenutupanBrck = saldoPenutupanBrck;
    if (selisih) payload.selisih = selisih;
    if (potongan) payload.potongan = potongan;
    if (kekurangan) payload.kekurangan = kekurangan;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.brck1Browse,
      params: payload,
      setLoading: (bool) => this.setState({ isBrck1Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `brck1-${index}`,
        idBrck1: item.idBrck1,
        kppbc: item.kppbc,
        namaPerusahaan: item.namaPerusahaan,
        warna: item.warna,
        tanggalAwal: item.tanggalAwal,
        tanggalAkhir: item.tanggalAkhir,
        saldoAwal: item.saldoAwal,
        saldoBuku: item.saldoBuku,
        saldoPenutupanBrck: item.saldoPenutupanBrck,
        selisih: item.selisih,
        potongan: item.potongan,
        kekurangan: item.kekurangan,
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
          value={this.state.filter[dataIndex]}
          onChange={(e) =>
            this.setState({
              filter: { ...this.state.filter, [dataIndex]: e.target.value },
            })
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
    this.setState({ page: 1 }, this.getBrck1);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState({ filter: { ...this.state.filter, [dataIndex]: null }, page: 1 }, this.getBrck1);
  };

  handleDetail = (id) => {
    this.props.history.push(`${pathName}/brck-1/detail/${id}`);
  };
  handleEdit = (id) => {
    this.props.history.push(`${pathName}/brck-1/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-1">
          <Row>
            <Col span={4}>
              <Button
                type="primary"
                onClick={() => this.props.history.push(`${pathName}/brck-1/rekam`)}
                block
              >
                Rekam BRCK-1
              </Button>
            </Col>
          </Row>

          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isBrck1Loading}
            onChange={(page) => this.setState({ page: page.current })}
            pagination={{ current: this.state.page, total: this.state.totalData }}
            scroll={{ x: "max-content" }}
            style={{ marginTop: 30 }}
          />
        </Container>
      </>
    );
  }
}
