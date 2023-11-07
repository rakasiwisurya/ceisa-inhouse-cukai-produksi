import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class BRCK2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBrck2Loading: true,

      filter: {
        kppbc: null,
        namaPerusahaan: null,
        merk: null,
        tarif: null,
        isi: null,
        tanggalAwal: null,
        tanggalAkhir: null,
        saldoAwalLiter: null,
        saldoAwalKemasan: null,
        saldoPenutupanLiter: null,
        saldoPenutupanKemasan: null,
        selisihLiter: null,
        selisihKemasan: null,
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
                  onClick={() => this.handleEdit(record.idBrck2)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail(record.idBrck2)}
                />
              </>
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
          title: "Merk",
          dataIndex: "merk",
          key: "merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("merk"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Isi",
          dataIndex: "isi",
          key: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          title: "Periode Penutupan BRCK",
          children: [
            {
              title: "Tgl Awal",
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
              title: "Tgl Akhir",
              dataIndex: "tanggalAkhir",
              key: "tanggalAkhir",
              render: (text) => (
                <div style={{ textAlign: "center" }}>
                  {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
                </div>
              ),
              ...this.getColumnSearchProps("tanggalAkhir"),
            },
          ],
        },
        {
          title: "Saldo Awal",
          children: [
            {
              title: "Liter",
              dataIndex: "saldoAwalLiter",
              key: "saldoAwalLiter",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("saldoAwalLiter"),
            },
            {
              title: "Kemasan",
              dataIndex: "saldoAwalKemasan",
              key: "saldoAwalKemasan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("saldoAwalKemasan"),
            },
          ],
        },
        {
          title: "Saldo Penutupan BRCK",
          children: [
            {
              title: "Liter",
              dataIndex: "saldoPenutupanLiter",
              key: "saldoPenutupanLiter",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("saldoPenutupanLiter"),
            },
            {
              title: "Kemasan",
              dataIndex: "saldoPenutupanKemasan",
              key: "saldoPenutupanKemasan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("saldoPenutupanKemasan"),
            },
          ],
        },
        {
          title: "Selisih",
          children: [
            {
              title: "Liter",
              dataIndex: "selisihLiter",
              key: "selisihLiter",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("selisihLiter"),
            },
            {
              title: "Kemasan",
              dataIndex: "selisihKemasan",
              key: "selisihKemasan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps("selisihKemasan"),
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.getBrck2();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getBrck2();
    }
  }

  getBrck2 = async () => {
    const {
      kppbc,
      namaPerusahaan,
      merk,
      jenis,
      tarif,
      isi,
      kadar,
      tanggalAwal,
      tanggalAkhir,
      saldoAwalLiter,
      saldoAwalKemasan,
      saldoPenutupanLiter,
      saldoPenutupanKemasan,
      selisihLiter,
      selisihKemasan,
    } = this.state.filter;

    const payload = { page: this.state.page };

    if (kppbc) payload.kppbc = kppbc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (merk) payload.merk = merk;
    if (jenis) payload.jenis = jenis;
    if (tarif) payload.tarif = tarif;
    if (isi) payload.isi = isi;
    if (kadar) payload.kadar = kadar;
    if (tanggalAwal) payload.tanggalAwal = moment(tanggalAwal, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (tanggalAkhir)
      payload.tanggalAkhir = moment(tanggalAkhir, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (saldoAwalLiter) payload.saldoAwalLiter = saldoAwalLiter;
    if (saldoAwalKemasan) payload.saldoAwalKemasan = saldoAwalKemasan;
    if (saldoPenutupanLiter) payload.saldoPenutupanLiter = saldoPenutupanLiter;
    if (saldoPenutupanKemasan) payload.saldoPenutupanKemasan = saldoPenutupanKemasan;
    if (selisihLiter) payload.selisihLiter = selisihLiter;
    if (selisihKemasan) payload.selisihKemasan = selisihKemasan;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/brck2/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isBrck2Loading: bool }),
    });

    if (response) {
      const { listData, currentPage, totalData } = response.data.data;

      const newData = listData.map((item, index) => ({
        key: `brkc2-${index}`,
        idBrck2: item.idBrck2,
        kppbc: item.kppbc,
        namaPerusahaan: item.namaPerusahaan,
        merk: item.merk,
        jenis: item.jenis,
        tarif: item.tarif,
        isi: item.isi,
        kadar: item.kadar,
        tanggalAwal: item.tanggalAwal,
        tanggalAkhir: item.tanggalAkhir,
        saldoAwalLiter: item.saldoAwalLiter,
        saldoAwalKemasan: item.saldoAwalKemasan,
        saldoPenutupanLiter: item.saldoPenutupanLiter,
        saldoPenutupanKemasan: item.saldoPenutupanKemasan,
        selisihLiter: item.selisihLiter,
        selisihKemasan: item.selisihKemasan,
      }));

      this.setState({ dataSource: newData, page: currentPage, totalData: totalData });
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
            this.setState({ filter: { ...this.state.filter, [dataIndex]: e.target.value } })
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
    this.setState({ page: 1 }, this.getBrck2);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState({ filter: { ...this.state.filter, [dataIndex]: null }, page: 1 }, this.getBrck2);
  };

  handleDetail = (id) => {
    this.props.history.push(`${pathName}/brck-2/detail/${id}`);
  };
  handleEdit = (id) => {
    this.props.history.push(`${pathName}/brck-2/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-2">
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

          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isBrck2Loading}
            pagination={{ current: this.state.page, total: this.state.totalData }}
            onChange={(page) => this.setState({ page: page.current })}
            scroll={{ x: "max-content" }}
            style={{ marginTop: 30 }}
          />
        </Container>
      </>
    );
  }
}
