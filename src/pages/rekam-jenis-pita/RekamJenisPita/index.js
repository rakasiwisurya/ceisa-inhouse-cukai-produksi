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

      table: {
        kode_kantor: "",
        nama_kantor: "",
        nppbkc: "",
        nama_perusahaan: "",
        jenis_produksi: "",
        hje: "",
        isi: "",
        awal_berlaku: "",
        tarif: "",
        warna: "",
        tahun_pita: "",
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
                  onClick={() => this.handlePerbaikan(record.id)}
                />
              </>
            </div>
          ),
        },
        {
          key: "nama_kantor",
          title: "Nama Kantor",
          dataIndex: "nama_kantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_kantor"),
        },
        {
          key: "nppbkc",
          title: "NPPBKC",
          dataIndex: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          key: "nama_perusahaan",
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          key: "jenis_produksi",
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_produksi"),
        },
        {
          key: "hje",
          title: "HJE",
          dataIndex: "hje",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje"),
        },
        {
          key: "isi",
          title: "Isi Kemasan",
          dataIndex: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          key: "awal_berlaku",
          title: "Awal Berlaku",
          dataIndex: "awal_berlaku",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("awal_berlaku"),
        },
        {
          key: "tarif",
          title: "Tarif",
          dataIndex: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          key: "warna",
          title: "Warna",
          dataIndex: "warna",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("warna"),
        },
        {
          key: "tahun_pita",
          title: "Tahun Pita",
          dataIndex: "tahun_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tahun_pita"),
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
      kode_kantor,
      nama_kantor,
      nppbkc,
      nama_perusahaan,
      jenis_produksi,
      hje,
      isi,
      awal_berlaku,
      tarif,
      warna,
      tahun_pita,
    } = this.state.table;

    const payload = { page: this.state.page };

    if (kode_kantor) payload.kodeKantor = kode_kantor;
    if (nama_kantor) payload.namaKantor = nama_kantor;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (jenis_produksi) payload.jenisProduksi = jenis_produksi;
    if (hje) payload.hje = hje;
    if (isi) payload.isiKemasan = isi;
    if (awal_berlaku) payload.awalBerlaku = moment(awal_berlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (tarif) payload.tarif = tarif;
    if (warna) payload.warna = warna;
    if (tahun_pita) payload.tahunPita = tahun_pita;

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: "pita/browse-jenis",
      params: payload,
      setLoading: (bool) => this.setState({ isRekamJenisPitaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `rekam-jenis-pita-${index}`,
        rekam_jenis_pita_id: null,
        kode_kantor: item.kodeKantor,
        nama_kantor: item.namaKantor,
        nppbkc: item.nppbkc,
        nama_perusahaan: item.namaPerusahaan,
        jenis_produksi: item.jenisProduksi,
        hje: item.hje,
        isi: item.isiKemasan,
        awal_berlaku: item.awalBerlaku,
        tarif: item.tarif,
        warna: item.warna,
        tahun_pita: item.tahunPita,
      }));

      this.setState({
        dataSource: newData,
        page: response.data.data.currentPage,
        totalData: response.data.data.totalData,
      });
    }
  };

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
    this.getRekamJenisPita();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getRekamJenisPita();
  };

  handlePerbaikan = (id) => {
    this.props.history.push(`${pathName}/rekam-jenis-pita/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Rekam Jenis Pita" contentName="Rekam Jenis Pita">
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

          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              loading={this.state.isRekamJenisPitaLoading}
              pagination={{ current: this.state.page, total: this.state.totalData }}
              onChange={(page) => this.setState({ page: page.current })}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Container>
      </>
    );
  }
}
