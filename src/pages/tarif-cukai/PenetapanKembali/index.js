import { Button, Col, DatePicker, Icon, Input, Row, Select, Table, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import ModalDaftarKota from "components/ModalDaftarKota";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import moment from "moment";
import React, { Component } from "react";
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

      kota_id: null,
      kota_name: null,
      tanggal_skep: null,
      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,

      jenis_produksi_id: null,
      jenis_produksi_name: null,

      list_kota: [],
      list_jenis_produksi: [],

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
          dataIndex: "nama_merk",
          key: "nama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("nama_merk"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi_merk",
          key: "jenis_produksi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("jenis_produksi_merk"),
        },
        {
          title: "Isi Kemasan",
          dataIndex: "isi_merk",
          key: "isi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("isi_merk"),
        },
        {
          title: "Volume",
          dataIndex: "volume_merk",
          key: "volume_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("volume_merk"),
        },
        {
          title: "Nomor Kep",
          dataIndex: "nomor_kep_merk",
          key: "nomor_kep_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("nomor_kep_merk"),
        },
        {
          title: "Tanggal Kep",
          dataIndex: "tanggal_kep_merk",
          key: "tanggal_kep_merk",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchPropsTop("tanggal_kep_merk"),
        },
        {
          title: "Golongan Pabrik",
          dataIndex: "golongan_merk",
          key: "golongan_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("golongan_merk"),
        },
        {
          title: "HJE Lama",
          dataIndex: "hje_lama_merk",
          key: "hje_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hje_lama_merk"),
        },
        {
          title: "HJE Baru",
          dataIndex: "hje_baru_merk",
          key: "hje_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hje_baru_merk"),
        },
        {
          title: "HJE/Satuan Lama",
          dataIndex: "hje_satuan_lama_merk",
          key: "hje_satuan_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hje_satuan_lama_merk"),
        },
        {
          title: "HJE/Satuan Baru",
          dataIndex: "hje_satuan_baru_merk",
          key: "hje_satuan_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hje_satuan_baru_merk"),
        },
        {
          title: "Tarif Lama",
          dataIndex: "tarif_lama",
          key: "tarif_lama",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("tarif_lama"),
        },
        {
          title: "Tarif Baru",
          dataIndex: "tarif_baru",
          key: "tarif_baru",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("tarif_baru"),
        },
        {
          title: "Seri Pita",
          dataIndex: "seri_pita",
          key: "seri_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("seri_pita"),
        },
        {
          title: "Warna Dasar",
          dataIndex: "warna_dasar",
          key: "warna_dasar",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("warna_dasar"),
        },
      ],
      columnBottom: [
        {
          title: "Nama",
          dataIndex: "nama_merk",
          key: "nama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("nama_merk"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi_merk",
          key: "jenis_produksi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("jenis_produksi_merk"),
        },
        {
          title: "Isi Kemasan",
          dataIndex: "isi_merk",
          key: "isi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("isi_merk"),
        },
        {
          title: "Volume",
          dataIndex: "volume_merk",
          key: "volume_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("volume_merk"),
        },
        {
          title: "Nomor Kep",
          dataIndex: "nomor_kep_merk",
          key: "nomor_kep_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("nomor_kep_merk"),
        },
        {
          title: "Tanggal Kep",
          dataIndex: "tanggal_kep_merk",
          key: "tanggal_kep_merk",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchPropsBottom("tanggal_kep_merk"),
        },
        {
          title: "Golongan Pabrik",
          dataIndex: "golongan_merk",
          key: "golongan_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("golongan_merk"),
        },
        {
          title: "HJE Lama",
          dataIndex: "hje_lama_merk",
          key: "hje_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hje_lama_merk"),
        },
        {
          title: "HJE Baru",
          dataIndex: "hje_baru_merk",
          key: "hje_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hje_baru_merk"),
        },
        {
          title: "HJE/Satuan Lama",
          dataIndex: "hje_satuan_lama_merk",
          key: "hje_satuan_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hje_satuan_lama_merk"),
        },
        {
          title: "HJE/Satuan Baru",
          dataIndex: "hje_satuan_baru_merk",
          key: "hje_satuan_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hje_satuan_baru_merk"),
        },
        {
          title: "Tarif Lama",
          dataIndex: "tarif_lama",
          key: "tarif_lama",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("tarif_lama"),
        },
        {
          title: "Tarif Baru",
          dataIndex: "tarif_baru",
          key: "tarif_baru",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("tarif_baru"),
        },
        {
          title: "Seri Pita",
          dataIndex: "seri_pita",
          key: "seri_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("seri_pita"),
        },
        {
          title: "Warna Dasar",
          dataIndex: "warna_dasar",
          key: "warna_dasar",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("warna_dasar"),
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nppbkc_id !== this.state.nppbkc_id) {
      this.getJenisProduksi();
    }

    if (
      prevState.tanggal_skep !== this.state.tanggal_skep ||
      prevState.nppbkc_id !== this.state.nppbkc_id ||
      prevState.jenis_produksi_id !== this.state.jenis_produksi_id
    ) {
      if (this.state.tanggal_skep && this.state.nppbkc_id) {
        this.getDetailMerk();
      }
    }
  }

  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/nppbkc-produksi-bkc/browse-jenis-produksi",
      params: { idNppbkc: this.state.nppbkc_id },
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response)
      this.setState({
        list_jenis_produksi: [
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
    const payload = {
      tanggalSkep: moment(this.state.tanggal_skep, "DD-MM-YYYY").format("YYYY-MM-DD"),
      idNppbkc: this.state.nppbkc_id,
    };

    if (this.state.jenis_produksi_id) {
      const splitNamaJenisProduksi = this.state.jenis_produksi_name
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
        tarif_merk_id: item.idTarifMerkHeader,
        merk_id: item.idMerk,
        nama_merk: item.namaMerk,
        kode_kantor: item.kodeKantor,
        nppbkc_id: item.idNppbkc,
        jenis_produksi_merk: item.jenisProduksiBkc,
        jenis_htl_rel: item.jenisHtlRel,
        jenis_htl_rel_id: item.idJenisHtlRel,
        isi_merk: item.isiPerkemasan,
        volume_merk: item.beratVolume,
        nomor_kep_merk: item.nomorSkep,
        tanggal_kep_merk: item.tanggalSkep,
        golongan_merk_id: item.idGolonganBkc,
        golongan_merk: item.namaGolonganBkc,
        hje_lama_merk: item.hjeLama,
        hje_baru_merk: item.hjeBaru,
        hje_satuan_lama_merk: item.hjeBtgLama,
        hje_satuan_baru_merk: item.hjeBtgBaru,
        kode_satuan: item.kodeSatuan,
        kode_satuan_rel: item.kodeSatuanRel,
        tarif_lama: item.tarifSpesifik,
        tarif_baru: item.tarifBaru,
        seri_pita: item.seriPita,
        warna_dasar: item.warnaDasar,
        tampak_depan: item.tampakDepan,
        tampak_belakang: item.tampakBelakang,
        tampak_atas: item.tampakAtas,
        tampak_bawah: item.tampakBawah,
        tampak_kiri: item.tampakKiri,
        tampak_kanan: item.tampakKanan,
        asal_produksi: item.asalProduksi,
        nomor_lisensi: item.nomorLisensi,
        tanggal_lisensi: item.tanggalLisensi,
        awal_berlaku: item.awalBerlaku,
        akhir_berlaku: item.akhirBerlaku,
        bahan_kemasan: item.bahanKemasan,
        tujuan_pemasaran: item.tujuanPemasaran,
        kode_foto: item.kodeFoto,
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
      [`${field}_id`]: value,
      [`${field}_name`]: option.props.children,
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
      kota_id: record.kota_id,
      kota_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };
  handleDataNppbkc = (record) => {
    this.setState({
      nppbkc_id: record.nppbkc_id,
      nppbkc: record.nppbkc,
      nama_nppbkc: record.nama_nppbkc,
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
      kodeKantor: item.kode_kantor,
      idNppbkc: item.nppbkc_id,
      idMerk: item.merk_id,
      namaMerk: item.nama_merk,
      bahanKemasan: item.bahan_kemasan,
      kodeSatuan: item.kode_satuan,
      tarifSpesifik: item.tarif_baru,
      idGolonganBkc: item.golongan_merk_id,
      isiPerkemasan: item.isi_merk,
      beratVolume: item.volume_merk,
      tujuanPemasaran: item.tujuan_pemasaran,
      awalBerlaku: item.awal_berlaku,
      tanggalSkep: item.tanggal_kep_merk,
      nomorSkep: item.nomor_kep_merk,
      asalProduksi: item.asal_produksi,
      seriPita: item.seri_pita,
      nomorLisensi: item.nomor_lisensi,
      akhirBerlaku: item.akhir_berlaku,
      tanggalLisensi: item.tanggal_lisensi,
      tampakAtas: item.tampak_atas,
      tampakBelakang: item.tampak_belakang,
      tampakBawah: item.tampak_bawah,
      idJenisHtlRel: item.jenis_htl_rel_id,
      jenisHtlRel: item.jenis_htl_rel,
      tampakDepan: item.tampak_atas,
      tampakKiri: item.tampak_kiri,
      kodeFoto: item.kode_foto,
      tampakKanan: item.tampak_kanan,
      kodeSatuanRel: item.kode_satuan_rel,
      idTarifMerkHeader: item.tarif_merk_id,
      jenisProduksiBkc: item.jenis_produksi_merk,
      hje: item.hje_baru_merk,
      tarif: item.tarif_baru,
      hjeBtg: item.hje_satuan_baru_merk,
      warnaDasar: item.warna_dasar,
    }));

    const payload = {
      lokasiPenetapanKembali: this.state.kota_name,
      tanggalSkep: moment(this.state.tanggal_skep, "DD-MM-YYYY").format("YYYY-MM-DD"),
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
                  <Input id="kota_name" value={this.state.kota_name} disabled />
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
                    id="tanggal_skep"
                    format="DD-MM-YYYY"
                    value={this.state.tanggal_skep}
                    onChange={(date) => this.handleDatepickerChange("tanggal_skep", date)}
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
                  <Input id="nama_perusahaan" value={this.state.nama_nppbkc} disabled />
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
                    id="jenis_produksi"
                    value={this.state.jenis_produksi_id}
                    loading={this.state.isJenisProduksiLoading}
                    onChange={(value, option) => {
                      this.handleSelectCustomChange("jenis_produksi", value, option);
                    }}
                    style={{ width: "100%" }}
                    disabled={!this.state.nppbkc_id}
                  >
                    {this.state.list_jenis_produksi.length > 0 &&
                      this.state.list_jenis_produksi.map((item, index) => (
                        <Select.Option
                          key={`jenis-produksi-${index}`}
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

            {this.state.nppbkc_id && this.state.tanggal_skep && (
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
