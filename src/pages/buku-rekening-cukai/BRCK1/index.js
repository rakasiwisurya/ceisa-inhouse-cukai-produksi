import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import Header from "components/Header";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class BRCK1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Browse dan Perbaikan BRCK-1",

      isBrck1Loading: true,

      page: 1,
      totalData: 0,

      table: {
        kppbc: null,
        nama_perusahaan: null,
        warna: null,
        tanggal_awal: null,
        tanggal_akhir: null,
        saldo_awal: null,
        saldo_buku: null,
        saldo_penutupan_brck: null,
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
                onClick={() => this.handleEdit(record.back_mmea_id)}
              />
              <ButtonCustom
                icon="eye"
                variant="info"
                onClick={() => this.handleDetail(record.back_mmea_id)}
              />
            </div>
          ),
        },
        {
          title: "KPPBC",
          dataIndex: "kppbc",
          key: "kppbc",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          title: "Perusahaan",
          dataIndex: "nama_perusahaan",
          key: "nama_perusahaan",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          title: "Warna",
          dataIndex: "warna",
          key: "warna",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("warna"),
        },
        {
          title: "Tanggal Awal",
          dataIndex: "tanggal_awal",
          key: "tanggal_awal",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_awal"),
        },
        {
          title: "Tanggal Akhir",
          dataIndex: "tanggal_akhir",
          key: "tanggal_akhir",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_akhir"),
        },
        {
          title: "Saldo Awal",
          dataIndex: "saldo_awal",
          key: "saldo_awal",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("saldo_awal"),
        },
        {
          title: "Saldo Buku",
          dataIndex: "saldo_buku",
          key: "saldo_buku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("saldo_buku"),
        },
        {
          title: "Saldo Penutupan BRCK",
          dataIndex: "saldo_penutupan_brck",
          key: "saldo_penutupan_brck",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("saldo_penutupan_brck"),
        },
        {
          title: "Selisih",
          dataIndex: "selisih",
          key: "selisih",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("selisih"),
        },
        {
          title: "Potongan",
          dataIndex: "potongan",
          key: "potongan",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("potongan"),
        },
        {
          title: "Kekurangan",
          dataIndex: "kekurangan",
          key: "kekurangan",
          render: (text) => (
            <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>
          ),
          ...this.getColumnSearchProps("kekurangan"),
        },
      ],
    };
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={this.state.table[dataIndex]}
          onChange={(e) =>
            this.setState({
              table: { ...this.state.table, [dataIndex]: e.target.value },
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
    this.getBrck1();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getBrck1();
  };

  getBrck1 = async () => {
    const {
      kppbc,
      nama_perusahaan,
      warna,
      tanggal_awal,
      tanggal_akhir,
      saldo_awal,
      saldo_buku,
      saldo_penutupan_brck,
      selisih,
      potongan,
      kekurangan,
    } = this.state.table;

    const payload = { page: this.state.page };

    if (kppbc) payload.kppbc = kppbc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (warna) payload.warna = warna;
    if (tanggal_awal)
      payload.tanggalAwal = moment(tanggal_awal).format("YYYY-MM-DD");
    if (tanggal_akhir)
      payload.tanggalAkhir = moment(tanggal_akhir).format("YYYY-MM-DD");
    if (saldo_awal) payload.saldoAwal = saldo_awal;
    if (saldo_buku) payload.saldoBuku = saldo_buku;
    if (saldo_penutupan_brck) payload.saldoPenutupanBrck = saldo_penutupan_brck;
    if (selisih) payload.selisih = selisih;
    if (potongan) payload.potongan = potongan;
    if (kekurangan) payload.kekurangan = kekurangan;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/brck/browse-brck1",
      params: payload,
      setLoading: (bool) => this.setState({ isBrck1Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `brck1-${index}`,
        kppbc: item.kppbc,
        nama_perusahaan: item.namaPerusahaan,
        warna: item.warna,
        tanggal_awal: item.tanggalAwal,
        tanggal_akhir: item.tanggalAkhir,
        saldo_awal: item.saldoAwal,
        saldo_buku: item.saldoBuku,
        saldo_penutupan_brck: item.saldoPenutupanBrck,
        selisih: item.selisih,
        potongan: item.potongan,
        kekurangan: item.kekurangan,
      }));

      const page = response.data.data.currentPage;
      const totalData = response.data.data.totalData;
      this.setState({ dataSource: newData, page, totalData });
    }
  };

  componentDidMount() {
    this.getBrck1();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getBrck1();
    }
  }

  handleDetail = (id) => {
    this.props.history.push(`${pathName}/brck-1/detail/${id}`);
  };

  handleEdit = (id) => {
    this.props.history.push(`${pathName}/brck-1/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container
          menuName="Buku Rekening Cukai"
          contentName="BRCK-1"
          hideContentHeader
        >
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
          >
            <Row>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.history.push(`${pathName}/brck-1/rekam`)
                  }
                >
                  Rekam BRCK-1
                </Button>
              </Col>
            </Row>

            <div style={{ marginTop: 50, marginBottom: 50 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                loading={this.state.isBrck1Loading}
                onChange={(page) => this.setState({ page: page.current })}
                pagination={{
                  current: this.state.page,
                  total: this.state.totalData,
                }}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}
