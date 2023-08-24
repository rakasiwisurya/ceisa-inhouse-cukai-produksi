import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import Header from "components/Header";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class BRCK2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Browse dan Perbaikan BRCK-2",

      isBrck2Loading: true,

      table: {
        kppbc: null,
        nama_perusahaan: null,
        merk: null,
        jenis: null,
        tarif: null,
        isi: null,
        kadar: null,
        tanggal_awal: null,
        tanggal_akhir: null,
        saldo_awal_liter: null,
        saldo_awal_kemasan: null,
        saldo_penutupan_liter: null,
        saldo_penutupan_kemasan: null,
        selisih_liter: null,
        selisih_kemasan: null,
      },

      page: 1,
      totalData: 0,

      dataSource: [],
      columns: [
        {
          key: "aksi",
          title: "Aksi",
          dataIndex: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <>
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
              </>
            </div>
          ),
        },
        {
          title: "KPPBC",
          dataIndex: "kppbc",
          key: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          title: "Perusahaan",
          dataIndex: "nama_perusahaan",
          key: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          title: "Merk",
          dataIndex: "merk",
          key: "merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("merk"),
        },
        {
          title: "Jenis",
          dataIndex: "jenis",
          key: "jenis",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis"),
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
          title: "Kadar",
          dataIndex: "kadar",
          key: "kadar",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kadar"),
        },
        {
          title: "Periode Penutupan BRCK",
          children: [
            {
              title: "Tgl Awal",
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
              title: "Tgl Akhir",
              dataIndex: "tanggal_akhir",
              key: "tanggal_akhir",
              render: (text) => (
                <div style={{ textAlign: "center" }}>
                  {text ? moment(text).format("DD-MM-YYYY") : "-"}
                </div>
              ),
              ...this.getColumnSearchProps("tanggal_akhir"),
            },
          ],
        },
        {
          title: "Saldo Awal",
          children: [
            {
              title: "Liter",
              dataIndex: "saldo_awal_liter",
              key: "saldo_awal_liter",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("saldo_awal_liter"),
            },
            {
              title: "Kemasan",
              dataIndex: "saldo_awal_kemasan",
              key: "saldo_awal_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("saldo_awal_kemasan"),
            },
          ],
        },
        {
          title: "Saldo Penutupan BRCK",
          children: [
            {
              title: "Liter",
              dataIndex: "saldo_penutupan_liter",
              key: "saldo_penutupan_liter",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("saldo_penutupan_liter"),
            },
            {
              title: "Kemasan",
              dataIndex: "saldo_penutupan_kemasan",
              key: "saldo_penutupan_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("saldo_penutupan_kemasan"),
            },
          ],
        },
        {
          title: "Selisih",
          children: [
            {
              title: "Liter",
              dataIndex: "selisih_liter",
              key: "selisih_liter",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("selisih_liter"),
            },
            {
              title: "Kemasan",
              dataIndex: "selisih_kemasan",
              key: "selisih_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("selisih_kemasan"),
            },
          ],
        },
      ],
    };
  }

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
    this.getBrck2();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getBrck2();
  };

  getBrck2 = async () => {
    const {
      kppbc,
      nama_perusahaan,
      merk,
      jenis,
      tarif,
      isi,
      kadar,
      tanggal_awal,
      tanggal_akhir,
      saldo_awal_liter,
      saldo_awal_kemasan,
      saldo_penutupan_liter,
      saldo_penutupan_kemasan,
      selisih_liter,
      selisih_kemasan,
    } = this.state.table;

    const payload = { page: this.state.page };

    if (kppbc) payload.kppbc = kppbc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (merk) payload.merk = merk;
    if (jenis) payload.jenis = jenis;
    if (tarif) payload.tarif = tarif;
    if (isi) payload.isi = isi;
    if (kadar) payload.kadar = kadar;
    if (tanggal_awal) payload.tanggalAwal = tanggal_awal;
    if (tanggal_akhir) payload.tanggalAkhir = tanggal_akhir;
    if (saldo_awal_liter) payload.saldoAwalLiter = saldo_awal_liter;
    if (saldo_awal_kemasan) payload.saldoAwalKemasan = saldo_awal_kemasan;
    if (saldo_penutupan_liter) payload.saldoPenutupanLiter = saldo_penutupan_liter;
    if (saldo_penutupan_kemasan) payload.saldoPenutupanKemasan = saldo_penutupan_kemasan;
    if (selisih_liter) payload.selisihLiter = selisih_liter;
    if (selisih_kemasan) payload.selisihKemasan = selisih_kemasan;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/brck2/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isBrck2Loading: bool }),
    });

    if (response) {
      const { data } = response.data;

      const newData = data.listData.map((item) => item);

      this.setState({ dataSource: newData, page: data.currentPage, totalData: data.totalData });
    }
  };

  componentDidMount() {
    this.getBrck2();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getBrck2();
    }
  }

  handleDetail = (id) => {
    this.props.history.push(`${pathName}/brck-2/detail/${id}`);
  };

  handleEdit = (id) => {
    this.props.history.push(`${pathName}/brck-2/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-2" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() => this.props.history.push(`${pathName}/brck-2/rekam`)}
                  block
                >
                  Rekam BRCK-2
                </Button>
              </Col>
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                loading={this.state.isBrck2Loading}
                pagination={{ current: this.state.page, total: this.state.totalData }}
                onChange={(page) => this.setState({ page: page.current })}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}
