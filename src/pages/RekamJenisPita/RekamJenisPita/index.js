import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class RekamJenisPita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRekamJenisPitaLoading: true,

      page: 1,
      totalData: 0,

      filter: {
        kodeKantor: null,
        namaKantor: null,
        nppbkc: null,
        namaPerusahaan: null,
        kodeJenisProduksi: null,
        hje: null,
        isiKemasan: null,
        awalBerlaku: null,
        tarif: null,
        warna: null,
        tahunPita: null,
      },

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
                  onClick={() => this.handlePerbaikan(record.idJenisPita)}
                />
              </>
            </div>
          ),
        },
        {
          key: "namaKantor",
          title: "Nama Kantor",
          dataIndex: "namaKantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaKantor"),
        },
        {
          key: "nppbkc",
          title: "NPPBKC",
          dataIndex: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          key: "namaPerusahaan",
          title: "Nama Perusahaan",
          dataIndex: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaPerusahaan"),
        },
        {
          key: "kodeJenisProduksi",
          title: "Jenis Produksi",
          dataIndex: "kodeJenisProduksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("kodeJenisProduksi"),
        },
        {
          key: "hje",
          title: "HJE",
          dataIndex: "hje",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje"),
        },
        {
          key: "isiKemasan",
          title: "Isi Kemasan",
          dataIndex: "isiKemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("isiKemasan"),
        },
        {
          key: "awalBerlaku",
          title: "Awal Berlaku",
          dataIndex: "awalBerlaku",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("awalBerlaku"),
        },
        {
          key: "tarif",
          title: "Tarif",
          dataIndex: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          key: "warna",
          title: "Warna",
          dataIndex: "warna",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("warna"),
        },
        {
          key: "tahunPita",
          title: "Tahun Pita",
          dataIndex: "tahunPita",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("tahunPita"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getRekamJenisPita();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getRekamJenisPita();
    }
  }

  getRekamJenisPita = async () => {
    const {
      kodeKantor,
      namaKantor,
      nppbkc,
      namaPerusahaan,
      kodeJenisProduksi,
      hje,
      isiKemasan,
      awalBerlaku,
      tarif,
      warna,
      tahunPita,
    } = this.state.filter;

    const payload = { page: this.state.page };

    if (kodeKantor) payload.kodeKantor = kodeKantor;
    if (namaKantor) payload.namaKantor = namaKantor;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (kodeJenisProduksi) payload.kodeJenisProduksi = kodeJenisProduksi;
    if (hje) payload.hje = hje;
    if (isiKemasan) payload.isiKemasan = isiKemasan;
    if (awalBerlaku) payload.awalBerlaku = moment(awalBerlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (tarif) payload.tarif = tarif;
    if (warna) payload.warna = warna;
    if (tahunPita) payload.tahunPita = tahunPita;

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: "pita/browse-jenis",
      params: payload,
      setLoading: (bool) => this.setState({ isRekamJenisPitaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        ...item,
        key: `jenis-pita-${index}`,
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
    this.setState({ page: 1 }, this.getRekamJenisPita);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { filter: { ...this.state.filter, [dataIndex]: null }, page: 1 },
      this.getRekamJenisPita
    );
  };

  handlePerbaikan = (id) => {
    this.props.history.push(`${pathName}/rekam-jenis-pita/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Jenis Pita" contentName="Jenis Pita">
          <Row gutter={[16, 16]}>
            <Col span={5}>
              <ButtonCustom
                variant="info"
                onClick={() => this.props.history.push(`${pathName}/rekam-jenis-pita/rekam`)}
                block
              >
                + Rekam Jenis Pita
              </ButtonCustom>
            </Col>
          </Row>

          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isRekamJenisPitaLoading}
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
