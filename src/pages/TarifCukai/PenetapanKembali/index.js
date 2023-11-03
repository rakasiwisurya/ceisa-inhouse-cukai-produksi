import { Button, Col, DatePicker, Icon, Input, Row, Select, Table, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import ModalDaftarKota from "components/ModalDaftarKota";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import moment from "moment";
import React, { Component } from "react";
import { capitalize } from "utils/formatter";
import { requestApi } from "utils/requestApi";

export default class PenetapanKembali extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pabrik / Importir",
      subtitle2: "Detail Merk",

      isPenetapanLoading: false,
      isJenisProduksiLoading: false,
      isDetailMerkLoading: true,
      isModalDaftarKotaVisible: false,
      isModalDaftarNppbkcVisible: false,

      idKota: null,
      namaKota: null,
      tanggalSkep: null,
      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,

      idJenisProduksi: null,
      namaJenisProduksi: null,

      listJenisProduksi: [],

      searchTextTop: null,
      searchedColumnTop: null,
      pageTop: 1,

      searchTextBottom: null,
      searchedColumnBottom: null,
      pageBottom: 1,

      dataSourceTop: [],
      dataSourceBottom: [],

      selectedRowKeysTop: [],
      dataRowsTop: [],
      selectedRowKeysBottom: [],
      dataRowsBottom: [],

      columnTop: [
        {
          title: "Nama",
          dataIndex: "namaMerk",
          key: "namaMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("namaMerk"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenisProduksiMerk",
          key: "jenisProduksiMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("jenisProduksiMerk"),
        },
        {
          title: "Isi Kemasan",
          dataIndex: "isiMerk",
          key: "isiMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("isiMerk"),
        },
        {
          title: "Volume",
          dataIndex: "volumeMerk",
          key: "volumeMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("volumeMerk"),
        },
        {
          title: "Nomor Kep",
          dataIndex: "nomorKepMerk",
          key: "nomorKepMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("nomorKepMerk"),
        },
        {
          title: "Tanggal Kep",
          dataIndex: "tanggalKepMerk",
          key: "tanggalKepMerk",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchPropsTop("tanggalKepMerk"),
        },
        {
          title: "Golongan Pabrik",
          dataIndex: "golonganMerk",
          key: "golonganMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("golonganMerk"),
        },
        {
          title: "HJE Lama",
          dataIndex: "hjeLamaMerk",
          key: "hjeLamaMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hjeLamaMerk"),
        },
        {
          title: "HJE Baru",
          dataIndex: "hjeBaruMerk",
          key: "hjeBaruMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hjeBaruMerk"),
        },
        {
          title: "HJE/Satuan Lama",
          dataIndex: "hjeSatuanLamaMerk",
          key: "hjeSatuanLamaMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hjeSatuanLamaMerk"),
        },
        {
          title: "HJE/Satuan Baru",
          dataIndex: "hjeSatuanBaruMerk",
          key: "hjeSatuanBaruMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hjeSatuanBaruMerk"),
        },
        {
          title: "Tarif Lama",
          dataIndex: "tarifLama",
          key: "tarifLama",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("tarifLama"),
        },
        {
          title: "Tarif Baru",
          dataIndex: "tarifBaru",
          key: "tarifBaru",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("tarifBaru"),
        },
        {
          title: "Seri Pita",
          dataIndex: "seriPita",
          key: "seriPita",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("seriPita"),
        },
        {
          title: "Warna Dasar",
          dataIndex: "warnaDasar",
          key: "warnaDasar",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("warnaDasar"),
        },
      ],
      columnBottom: [
        {
          title: "Nama",
          dataIndex: "namaMerk",
          key: "namaMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("namaMerk"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenisProduksiMerk",
          key: "jenisProduksiMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("jenisProduksiMerk"),
        },
        {
          title: "Isi Kemasan",
          dataIndex: "isiMerk",
          key: "isiMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("isiMerk"),
        },
        {
          title: "Volume",
          dataIndex: "volumeMerk",
          key: "volumeMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("volumeMerk"),
        },
        {
          title: "Nomor Kep",
          dataIndex: "nomorKepMerk",
          key: "nomorKepMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("nomorKepMerk"),
        },
        {
          title: "Tanggal Kep",
          dataIndex: "tanggalKepMerk",
          key: "tanggalKepMerk",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchPropsBottom("tanggalKepMerk"),
        },
        {
          title: "Golongan Pabrik",
          dataIndex: "golonganMerk",
          key: "golonganMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("golonganMerk"),
        },
        {
          title: "HJE Lama",
          dataIndex: "hjeLamaMerk",
          key: "hjeLamaMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hjeLamaMerk"),
        },
        {
          title: "HJE Baru",
          dataIndex: "hjeBaruMerk",
          key: "hjeBaruMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hjeBaruMerk"),
        },
        {
          title: "HJE/Satuan Lama",
          dataIndex: "hjeSatuanLamaMerk",
          key: "hjeSatuanLamaMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hjeSatuanLamaMerk"),
        },
        {
          title: "HJE/Satuan Baru",
          dataIndex: "hjeSatuanBaruMerk",
          key: "hjeSatuanBaruMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hjeSatuanBaruMerk"),
        },
        {
          title: "Tarif Lama",
          dataIndex: "tarifLama",
          key: "tarifLama",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("tarifLama"),
        },
        {
          title: "Tarif Baru",
          dataIndex: "tarifBaru",
          key: "tarifBaru",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("tarifBaru"),
        },
        {
          title: "Seri Pita",
          dataIndex: "seriPita",
          key: "seriPita",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("seriPita"),
        },
        {
          title: "Warna Dasar",
          dataIndex: "warnaDasar",
          key: "warnaDasar",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("warnaDasar"),
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idNppbkc !== this.state.idNppbkc) {
      this.getJenisProduksi();
    }

    if (
      prevState.idNppbkc !== this.state.idNppbkc ||
      prevState.idJenisProduksi !== this.state.idJenisProduksi
    ) {
      if (this.state.idNppbkc) {
        this.getDetailMerk();
      }
    }
  }

  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/nppbkc-produksi-bkc/browse-jenis-produksi",
      params: { idNppbkc: this.state.idNppbkc },
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response)
      this.setState({
        listJenisProduksi: [
          ...response.data.data,
          {
            idJenisProduksiBkc: null,
            kodeJenisProduksi: null,
            idGolonganBkc: null,
            namaGolonganBkc: null,
            kodeSatuan: null,
            satuan: null,
          },
        ],
      });
  };
  getDetailMerk = async () => {
    const payload = { idNppbkc: this.state.idNppbkc };

    if (this.state.idJenisProduksi) {
      const splitNamaJenisProduksi = this.state.namaJenisProduksi
        .split("-")
        .map((item) => item.trim());
      payload.jenisProduksi = splitNamaJenisProduksi[0];
    }

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/pita-cukai/detail-penetapan-kembali-tarif",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailMerkLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item, index) => ({
        key: `detail-merk-${index}`,
        idTarifMerkHeader: item.idTarifMerkHeader,
        idMerk: item.idMerk,
        namaMerk: item.namaMerk,
        kodeKantor: item.kodeKantor,
        idNppbkc: item.idNppbkc,
        jenisProduksiMerk: item.jenisProduksiBkc,
        jenisHtlRel: item.jenisHtlRel,
        idJenisHtlRel: item.idJenisHtlRel,
        isiMerk: item.isiPerkemasan,
        volumeMerk: item.beratVolume,
        nomorKepMerk: item.nomorSkep,
        tanggalKepMerk: item.tanggalSkep,
        idGolonganMerk: item.idGolonganBkc,
        golonganMerk: item.namaGolonganBkc,
        hjeLamaMerk: item.hjeLama,
        hjeBaruMerk: item.hjeBaru,
        hjeSatuanLamaMerk: item.hjeBtgLama,
        hjeSatuanBaruMerk: item.hjeBtgBaru,
        kodeSatuan: item.kodeSatuan,
        kodeSatuanRel: item.kodeSatuanRel,
        tarifLama: item.tarifSpesifik,
        tarifBaru: item.tarifBaru,
        seriPita: item.seriPita,
        warnaDasar: item.warnaDasar,
        tampakDepan: item.tampakDepan,
        tampakBelakang: item.tampakBelakang,
        tampakAtas: item.tampakAtas,
        tampakBawah: item.tampakBawah,
        tampakKkiri: item.tampakKiri,
        tampakKanan: item.tampakKanan,
        asalProduksi: item.asalProduksi,
        nomorLisensi: item.nomorLisensi,
        tanggalLisensi: item.tanggalLisensi,
        awalBerlaku: item.awalBerlaku,
        akhirBerlaku: item.akhirBerlaku,
        bahanKemasan: item.bahanKemasan,
        tujuanPemasaran: item.tujuanPemasaran,
        kodeFoto: item.kodeFoto,
      }));

      this.setState({ dataSourceTop: newData });
    }
  };

  getColumnSearchPropsTop = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleColumnSearchTop(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearchTop(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnResetTop(clearFilters)}
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
      }
    },
  });
  handleColumnSearchTop = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchTextTop: selectedKeys[0],
      searchedColumnTop: dataIndex,
    });
  };
  handleColumnResetTop = (clearFilters) => {
    clearFilters();
    this.setState({ searchTextTop: "" });
  };
  handleSelectRowTopChange = (selectedRowKeys) => {
    const dataRowsTop = this.state.dataSourceTop.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    this.setState({ selectedRowKeysTop: selectedRowKeys, dataRowsTop });
  };

  getColumnSearchPropsBottom = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleColumnSearchBottom(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearchBottom(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnResetBottom(clearFilters)}
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
      }
    },
  });
  handleColumnSearchBottom = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchTextBottom: selectedKeys[0],
      searchedColumnBottom: dataIndex,
    });
  };
  handleColumnResetBottom = (clearFilters) => {
    clearFilters();
    this.setState({ searchTextBottom: "" });
  };
  handleSelectRowBottomChange = (selectedRowKeys) => {
    const dataRowsBottom = this.state.dataSourceBottom.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    this.setState({ selectedRowKeysBottom: selectedRowKeys, dataRowsBottom });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      [`id${capitalize(field, false)}`]: value,
      [`nama${capitalize(field, false)}`]: option.props.children,
    });
  };
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataKota = (record) => {
    this.setState({
      idKota: record.idKota,
      namaKota: record.namaKota,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };
  handleDataNppbkc = (record) => {
    this.setState({
      idNppbkc: record.idNppbkc,
      nppbkc: record.nppbkc,
      namaNppbkc: record.namaNppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };

  handleToTableTop = () => {
    const resultDataSourceBottom = this.state.dataSourceBottom.filter(
      (itemBottom) =>
        !this.state.dataRowsBottom.some((rowBottom) => rowBottom.key === itemBottom.key)
    );
    const resultDataSourceTop = [...this.state.dataSourceTop, ...this.state.dataRowsBottom];
    this.setState({
      dataSourceTop: resultDataSourceTop,
      dataSourceBottom: resultDataSourceBottom,
      selectedRowKeysBottom: [],
      dataRowsBottom: [],
    });
  };
  handleToTableBottom = () => {
    const resultDataSourceTop = this.state.dataSourceTop.filter(
      (itemTop) => !this.state.dataRowsTop.some((rowTop) => rowTop.key === itemTop.key)
    );
    const resultDataSourceBottom = [...this.state.dataSourceBottom, ...this.state.dataRowsTop];
    this.setState({
      dataSourceBottom: resultDataSourceBottom,
      dataSourceTop: resultDataSourceTop,
      selectedRowKeysTop: [],
      dataRowsTop: [],
    });
  };

  handlePenetapan = async () => {
    if (this.state.dataSourceBottom.length <= 0) {
      return notification.info({
        message: "Info",
        description: "Data detail merk yang akan ditetapkan tidak boleh kosong",
      });
    }

    const details = this.state.dataSourceBottom.map((item) => ({
      kodeKantor: item.kodeKantor,
      idNppbkc: item.idNppbkc,
      idMerk: item.idMerk,
      namaMerk: item.namaMerk,
      bahanKemasan: item.bahanKemasan,
      kodeSatuan: item.kodeSatuan,
      tarifSpesifik: item.tarifLama,
      idGolonganBkc: item.idGolonganMerk,
      isiPerkemasan: item.isiMerk,
      beratVolume: item.volumeMerk,
      tujuanPemasaran: item.tujuanPemasaran,
      awalBerlaku: item.awalBerlaku,
      tanggalSkep: item.tanggalKepMerk,
      nomorSkep: item.nomorKepMerk,
      asalProduksi: item.asalProduksi,
      seriPita: item.seriPita,
      nomorLisensi: item.nomorLisensi,
      akhirBerlaku: item.akhirBerlaku,
      tanggalLisensi: item.tanggalLisensi,
      tampakAtas: item.tampakAtas,
      tampakBelakang: item.tampakBelakang,
      tampakBawah: item.tampakBawah,
      idJenisHtlRel: item.idJenisHtlRel,
      jenisHtlRel: item.jenisHtlRel,
      tampakDepan: item.tampakDepan,
      tampakKiri: item.tampakKkiri,
      kodeFoto: item.kodeFoto,
      tampakKanan: item.tampakKanan,
      kodeSatuanRel: item.kodeSatuanRel,
      idTarifMerkHeader: item.idTarifMerkHeader,
      jenisProduksiBkc: item.jenisProduksiMerk,
      hje: item.hjeBaruMerk,
      tarif: item.tarifBaru,
      hjeBtg: item.hjeSatuanBaruMerk,
      warnaDasar: item.warnaDasar,
    }));

    const payload = {
      lokasiPenetapanKembali: this.state.namaKota,
      tanggalSkep: moment(this.state.tanggalSkep, "DD-MM-YYYY").format("YYYY-MM-DD"),
      details,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/pita-cukai/penetapan-kembali-tarif",
      body: payload,
      setLoading: (bool) => this.setState({ isPenetapanLoading: bool }),
    });

    if (response) notification.success({ message: "Success", description: response.data.message });
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Penetapan Kembali" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Lokasi Penetapan</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="namaKota" value={this.state.namaKota} disabled />
                  <Button
                    type="default"
                    icon="menu"
                    onClick={() => this.handleModalShow("isModalDaftarKotaVisible")}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tanggal SKEP</FormLabel>
                  </div>
                  <DatePicker
                    id="tanggalSkep"
                    format="DD-MM-YYYY"
                    value={this.state.tanggalSkep}
                    onChange={(date) => this.handleDatepickerChange("tanggalSkep", date)}
                    style={{ width: "100%" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPPBKC</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                  >
                    Cari
                  </Button>
                  <Input id="namaPerusahaan" value={this.state.namaNppbkc} disabled />
                </div>
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle2}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Produksi</FormLabel>
                  </div>
                  <Select
                    id="jenisProduksi"
                    value={this.state.idJenisProduksi}
                    loading={this.state.isJenisProduksiLoading}
                    onChange={(value, option) => {
                      this.handleSelectCustomChange("jenisProduksi", value, option);
                    }}
                    style={{ width: "100%" }}
                    disabled={!this.state.idNppbkc}
                  >
                    {this.state.listJenisProduksi.length > 0 &&
                      this.state.listJenisProduksi.map((item, index) => (
                        <Select.Option
                          key={`jenisProduksi-${index}`}
                          value={
                            item.idJenisProduksiBkc && item.idGolonganBkc
                              ? `${item.idJenisProduksiBkc}-${item.idGolonganBkc}`
                              : null
                          }
                        >
                          {item.kodeJenisProduksi && item.namaGolonganBkc
                            ? `${item.kodeJenisProduksi} - ${item.namaGolonganBkc}`
                            : "ALL"}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </Col>
            </Row>

            {this.state.idNppbkc && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSourceTop}
                    columns={this.state.columnTop}
                    scroll={{ x: "max-content" }}
                    loading={this.state.isDetailMerkLoading}
                    onChange={(page) => this.setState({ pageTop: page.current })}
                    pagination={{ current: this.state.pageTop }}
                    rowSelection={{
                      selectedRowKeys: this.state.selectedRowKeysTop,
                      onChange: this.handleSelectRowTopChange,
                    }}
                  />
                </div>

                <Row gutter={[16, 16]}>
                  <Col span={4} offset={10}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <ButtonCustom
                          variant="danger"
                          onClick={this.handleToTableTop}
                          icon="arrow-up"
                          block
                          disabled={
                            !this.state.dataSourceBottom.length > 0 ||
                            !this.state.selectedRowKeysBottom.length > 0
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <ButtonCustom
                          variant="success"
                          onClick={this.handleToTableBottom}
                          icon="arrow-down"
                          block
                          disabled={
                            !this.state.dataSourceTop.length > 0 ||
                            !this.state.selectedRowKeysTop.length > 0
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSourceBottom}
                    columns={this.state.columnBottom}
                    scroll={{ x: "max-content" }}
                    onChange={(page) => this.setState({ pageBottom: page.current })}
                    pagination={{ current: this.state.pageBottom }}
                    rowSelection={{
                      selectedRowKeys: this.state.selectedRowKeysBottom,
                      onChange: this.handleSelectRowBottomChange,
                    }}
                  />
                </div>
              </>
            )}

            <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
              <Col span={4}>
                <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                  Kembali
                </ButtonCustom>
              </Col>

              <Col span={5}>
                <Button
                  type="primary"
                  loading={this.state.isPenetapanLoading}
                  onClick={this.handlePenetapan}
                  block
                >
                  Simpan Penetapan
                </Button>
              </Col>
            </Row>
          </div>
        </Container>

        <ModalDaftarKota
          isVisible={this.state.isModalDaftarKotaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarKotaVisible")}
          onDataDoubleClick={this.handleDataKota}
        />

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />
      </>
    );
  }
}
