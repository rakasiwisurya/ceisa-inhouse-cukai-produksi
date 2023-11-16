import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import ModalBACKMMEADetail89 from "../ModalBACKMMEADetail89";

export default class BACKMMEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: "BACK MMEA 8 & 9",

      isBackMmeaLoading: true,
      isModalBackMmea89DetailVisible: false,

      detail89Id: null,

      page: 1,
      totalData: 0,

      filter: {
        kppbc: null,
        namaPerusahaan: null,
        jenisBack: null,
        nomorBack: null,
        tanggalBack: null,
        merk: null,
        golongan: null,
        kadar: null,
        tarif: null,
        isi: null,
        kemasan: null,
        jumlahKemasan: null,
        jumlahLt: null,
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
                  onClick={() => this.handleEdit(record.idBackMmeaHeader)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail(record.idBackMmeaHeader)}
                />
              </>
            </div>
          ),
        },
        {
          key: "kppbc",
          title: "KPPBC",
          dataIndex: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          key: "namaPerusahaan",
          title: "Nama Perusahaan",
          dataIndex: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaPerusahaan"),
        },
        {
          key: "jenisBack",
          title: "Jenis BACK",
          dataIndex: "jenisBack",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenisBack"),
        },
        {
          key: "nomorBack",
          title: "Nomor BACK",
          dataIndex: "nomorBack",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomorBack"),
        },
        {
          key: "tanggalBack",
          title: "Tanggal BACK",
          dataIndex: "tanggalBack",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalBack"),
        },
        {
          key: "merk",
          title: "Merk",
          dataIndex: "merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("merk"),
        },
        {
          key: "golongan",
          title: "Golongan",
          dataIndex: "golongan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("golongan"),
        },
        {
          key: "kadar",
          title: "Kadar",
          dataIndex: "kadar",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("kadar"),
        },
        {
          key: "tarif",
          title: "Tarif",
          dataIndex: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          key: "isi",
          title: "Isi",
          dataIndex: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          key: "kemasan",
          title: "Kemasan",
          dataIndex: "kemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("kemasan"),
        },
        {
          key: "jumlahKemasan",
          title: "Jumlah Kemasan",
          dataIndex: "jumlahKemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlahKemasan"),
        },
        {
          key: "jumlahLt",
          title: "Jumlah Liter",
          dataIndex: "jumlahLt",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlahLt"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getBackMmea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getBackMmea();
    }
  }

  getBackMmea = async () => {
    const {
      kppbc,
      namaPerusahaan,
      jenisBack,
      nomorBack,
      tanggalBack,
      merk,
      golongan,
      kadar,
      tarif,
      isi,
      kemasan,
      jumlahKemasan,
      jumlahLt,
    } = this.state.filter;

    const payload = { page: this.state.page };

    if (kppbc) payload.namaKantor = kppbc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (jenisBack) payload.jenisBackMmea = jenisBack;
    if (nomorBack) payload.nomorBackMmea = nomorBack;
    if (tanggalBack)
      payload.tanggalBackMmea = moment(tanggalBack, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (merk) payload.namaMerk = merk;
    if (golongan) payload.namaGolongan = golongan;
    if (kadar) payload.kadarEa = kadar;
    if (tarif) payload.tarifSpesifik = tarif;
    if (isi) payload.isiPerkemasan = isi;
    if (kemasan) payload.namaJenisKemasan = kemasan;
    if (jumlahKemasan) payload.jumlahKemasan = jumlahKemasan;
    if (jumlahLt) payload.jumlah = jumlahLt;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.backMmeaBrowse,
      params: payload,
      setLoading: (bool) => this.setState({ isBackMmeaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `back-mmea-${index}`,
        idBackMmeaHeader: item.idBackMmeaHeader,
        kppbc: item.namaKantor,
        namaPerusahaan: item.namaPerusahaan,
        jenisBack: item.jenisBackMmea,
        nomorBack: item.nomorBackMmea,
        tanggalBack: item.tanggalBackMmea,
        merk: item.namaMerk,
        golongan: item.namaGolongan,
        kadar: item.kadarEa,
        tarif: item.tarifSpesifik,
        isi: item.isiPerkemasan,
        kemasan: item.namaJenisKemasan,
        jumlahKemasan: item.jumlahKemasan,
        jumlahLt: item.jumlah,
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
    this.setState({ page: 1 }, this.getBackMmea);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { filter: { ...this.state.filter, [dataIndex]: null }, page: 1 },
      this.getBackMmea
    );
  };

  handleEdit = (id) => {
    this.props.history.push(`${pathName}/back-mmea/perbaikan-8-9/${id}`);
  };
  handleDetail = (id) => {
    this.setState({ detail89Id: id, isModalBackMmea89DetailVisible: true });
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BACK MMEA">
          <Row>
            <Col span={6}>
              <ButtonCustom
                variant="info"
                onClick={() => this.props.history.push(`${pathName}/back-mmea/rekam-8-9`)}
                block
              >
                + Perekaman BACK 8 & 9
              </ButtonCustom>
            </Col>
          </Row>

          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isBackMmeaLoading}
            pagination={{ current: this.state.page, total: this.state.totalData }}
            onChange={(page) => this.setState({ page: page.current })}
            scroll={{ x: "max-content" }}
            style={{ marginTop: 30 }}
          />
        </Container>

        <ModalBACKMMEADetail89
          id={this.state.detail89Id}
          isVisible={this.state.isModalBackMmea89DetailVisible}
          onCancel={() =>
            this.setState({
              detail89Id: null,
              isModalBackMmea89DetailVisible: false,
            })
          }
        />
      </>
    );
  }
}
