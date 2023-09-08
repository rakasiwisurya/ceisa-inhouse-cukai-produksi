import {
  Button,
  Col,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  notification,
} from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarMerkBrck2 from "components/ModalDaftarMerkBrck2";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { idMenu } from "utils/idMenu";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class BRCK2Perbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Buku Rekening Barang Kena Cukai Etil Alkohol (BRCK-2)",

      isDetailLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkVisible: false,
      isSearchLoading: false,
      isUpdateLoading: false,
      isBrowseShow: false,

      jenis_bkc_id: 2,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      merk_mmea_id: null,
      merk_mmea_name: null,
      jenis_mmea: null,
      golongan: null,
      tarif: null,
      isi: null,
      periode_awal: null,
      periode_akhir: null,

      saldo_awal_kemasan: null,
      saldo_awal_lt: null,

      total_debet_kemasan: null,
      total_debet_lt: null,
      total_kredit_kemasan: null,
      total_kredit_lt: null,

      saldo_buku_kemasan: null,
      saldo_buku_lt: null,

      hasil_pencacahan_back5_kemasan: null,
      hasil_pencacahan_back5_lt: null,
      hasil_pencarian_back5_description: null,
      no_back5: null,
      tgl_back5: null,
      selisih_kemasan: null,
      selisih_lt: null,
      selisih_description: null,
      batas_kelonggaran_kemasan: null,
      batas_kelonggaran_description: null,
      notif: null,
      jenis_penutupan: null,

      list_jenis_penutupan: [
        {
          jenis_penutupan_code: "PENUTUPAN TRIWULAN",
          jenis_penutupan_name: "PENUTUPAN TRIWULAN",
        },
        {
          jenis_penutupan_code: "PERMOHONAN PENGUSAHA",
          jenis_penutupan_name: "PERMOHONAN PENGUSAHA",
        },
        {
          jenis_penutupan_code: "DUGAAN PELANGGARAN",
          jenis_penutupan_name: "DUGAAN PELANGGARAN",
        },
      ],

      searchText: null,
      searchedColumn: null,
      page: 1,

      dataSource: [],
      columns: [
        {
          title: "DOKUMEN",
          children: [
            {
              key: "jenis_dokumen",
              title: "JENIS",
              dataIndex: "jenis_dokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_dokumen"),
            },
            {
              key: "nomor_dokumen",
              title: "NOMOR",
              dataIndex: "nomor_dokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomor_dokumen"),
            },
            {
              key: "tanggal_dokumen",
              title: "TANGGAL",
              dataIndex: "tanggal_dokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggal_dokumen"),
            },
          ],
        },
        {
          key: "tanggal_transaksi",
          title: "TGL PEMASUKAN/ PEMBUATAN ATAU PENGELUARAN",
          dataIndex: "tanggal_transaksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_transaksi"),
        },
        {
          key: "uraian_kegiatan",
          title: "URAIAN KEGIATAN",
          dataIndex: "uraian_kegiatan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("uraian_kegiatan"),
        },
        {
          title: "DEBET",
          fixed: "right",
          children: [
            {
              key: "debet_kemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "debet_kemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "debet_lt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "debet_lt",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "KREDIT",
          fixed: "right",
          children: [
            {
              key: "kredit_kemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "kredit_kemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "kredit_lt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "kredit_lt",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "SALDO",
          fixed: "right",
          children: [
            {
              key: "saldo_kemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "saldo_kemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "saldo_lt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "saldo_lt",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          key: "keterangan",
          title: "KETERANGAN",
          dataIndex: "keterangan",
          width: 80,
          fixed: "right",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailBrck2();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.dataSource.length !== this.state.dataSource.length ||
      prevState.hasil_pencacahan_back5_kemasan !== this.state.hasil_pencacahan_back5_kemasan ||
      prevState.hasil_pencacahan_back5_lt !== this.state.hasil_pencacahan_back5_lt
    ) {
      this.setState({
        total_debet_kemasan: sumArrayOfObject(this.state.dataSource, "debet_kemasan"),
        total_debet_lt: sumArrayOfObject(this.state.dataSource, "debet_lt"),
        total_kredit_kemasan: sumArrayOfObject(this.state.dataSource, "kredit_kemasan"),
        total_kredit_lt: sumArrayOfObject(this.state.dataSource, "kredit_lt"),
        selisih_kemasan: this.state.hasil_pencacahan_back5_kemasan - this.state.saldo_buku_kemasan,
        selisih_lt: this.state.hasil_pencacahan_back5_lt - this.state.saldo_buku_lt,
      });
    }

    if (
      (prevState.selisih_kemasan !== this.state.selisih_kemasan ||
        prevState.selisih_lt !== this.state.selisih_lt) &&
      Math.sign(this.state.selisih_kemasan) !== 0
    ) {
      if (Math.sign(this.state.selisih_kemasan) === -1) {
        this.setState({ selisih_description: "Saldo - Hasil Pencacahan" });
      } else {
        this.setState({ selisih_description: "Hasil Pencacahan - Saldo" });
      }
    }

    if (
      (prevState.selisih_kemasan !== this.state.selisih_kemasan &&
        Math.sign(this.state.selisih_kemasan) === 1) ||
      (prevState.selisih_lt !== this.state.selisih_lt && Math.sign(this.state.selisih_lt) === 1)
    ) {
      this.setState({
        batas_kelonggaran_kemasan: (1 / 100) * this.state.saldo_buku_lt,
        batas_kelonggaran_description: `1% x ${this.state.saldo_buku_lt}`,
      });
    }

    if (
      (prevState.batas_kelonggaran_kemasan !== this.state.batas_kelonggaran_kemasan ||
        prevState.selisih_kemasan !== this.state.selisih_kemasan ||
        prevState.selisih_lt !== this.state.selisih_lt) &&
      Math.sign(this.state.selisih_kemasan) !== 0 &&
      Math.sign(this.state.selisih_lt) !== 0
    ) {
      switch (true) {
        case Math.sign(this.state.selisih_kemasan) === -1 ||
          Math.sign(this.state.selisih_lt) === -1:
          this.setState({
            notif: "Terdapat selisih dengan BACK-5 dan dikenai Sanksi Administrasi",
          });
          break;
        case (Math.sign(this.state.selisih_kemasan) === 1 ||
          Math.sign(this.state.selisih_lt) === 1) &&
          Math.abs(this.state.selisih_lt) > this.state.batas_kelonggaran_kemasan &&
          Math.abs(this.state.selisih_kemasan) > this.state.batas_kelonggaran_kemasan:
          this.setState({
            notif:
              "Jumlah kelebihan BKC lebih besar daripada Batas Kelonggaran, dikenal Sanksi Administrasi Denda",
          });
          break;
        case (Math.sign(this.state.selisih_kemasan) === 1 ||
          Math.sign(this.state.selisih_lt) === 1) &&
          Math.abs(this.state.selisih_lt) <= this.state.batas_kelonggaran_kemasan &&
          Math.abs(this.state.selisih_kemasan) <= this.state.batas_kelonggaran_kemasan:
          this.setState({
            notif:
              "Jumlah kelebihan BKC tidak lebih besar daripada Batas Kelonggaran tidak dikenai Sanksi Administrasi Denda",
          });
          break;
        default:
          this.setState({ notif: null });
          break;
      }
    }
  }

  getDetailBrck2 = async () => {
    // const payload = { idBrck2: this.props.match.params.id };

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/brck/detail-brck2",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    // });

    // if (response) {
    //   const { data } = response.data;

    //   await this.setState({
    //     nppbkc_id: data.idNppbkc,
    //     nppbkc: data.nppbkc,
    //     nama_nppbkc: data.namaNppbkc,
    //     merk_mmea_id: data.idMerk,
    //     merk_mmea_name: data.namaMerk,
    //     jenis_mmea: data.namaJenisUsaha,
    //     golongan: data.namaGolongan,
    //     tarif: data.tarifSpesifik,
    //     isi: data.isiPerKemasan,
    //     periode_awal: moment(data.periodeAwal),
    //     periode_akhir: moment(data.periodeAkhir),
    //     saldo_awal_lt: data.saldoAwalLt,
    //     saldo_awal_kemasan: data.saldoAwalKemasan,
    //     hasil_pencacahan_back5_lt: data.hasilCacahLt,
    //     hasil_pencacahan_back5_kemasan: data.hasilCacahKemasan,
    //     hasil_pencarian_back5_description: data.keteranganHasilCacah,
    //     no_back5: data.nomorBack5,
    //     tgl_back5: moment(data.tanggalBack5),
    //     jenis_penutupan: data.jenisPenutupan,
    //   });

    //   this.getBrck2();
    // }

    // delete data dummy below when API is ready to comsume
    this.setState({ isDetailLoading: true });
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        resolve();
        this.setState({
          nppbkc_id: "0499af9b-f53b-40c7-b1f8-9b16c9f89b76",
          nppbkc: "0014539407415000150312",
          nama_nppbkc: "PANJANG JIWO PT",
          merk_mmea_id: null,
          merk_mmea_name: "ICELAND VODKA MIX LONG ISLAND",
          jenis_mmea: "MMEA",
          golongan: "TANPA GOLONGAN",
          tarif: 100,
          isi: 10,
          periode_awal: moment("2020-06-12 00:00:00"),
          periode_akhir: moment("2024-07-13 00:00:00"),
          saldo_awal_lt: 500,
          saldo_awal_kemasan: 1000,
          hasil_pencacahan_back5_lt: 150,
          hasil_pencacahan_back5_kemasan: 200,
          hasil_pencarian_back5_description: "SESUAI",
          no_back5: "nomor_back5",
          tgl_back5: moment(new Date()),
          jenis_penutupan: "PENUTUPAN TRIWULAN",
        });
        this.setState({ isDetailLoading: false });
        clearTimeout(timeout);
      }, 2000);
    });

    this.getBrck2();
  };

  getBrck2 = async () => {
    const payload = {
      page: this.state.page,
      nppbkc: this.state.nppbkc,
      namaMerk: this.state.merk_mmea_name,
      awalTanggalPeriode: moment(this.state.periode_awal).format("YYYY-MM-DD"),
      akhirTanggalPeriode: moment(this.state.periode_akhir).format("YYYY-MM-DD"),
    };

    const response = await requestApi({
      service: "perdagangan",
      method: "get",
      endpoint: "/ck5/browse-brck2",
      params: payload,
      setLoading: (bool) => this.setState({ isSearchLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      let saldoKemasan = this.state.saldo_awal_kemasan || 0;
      let saldoLt = this.state.saldo_awal_lt || 0;

      if (data?.length > 0) {
        await this.setState({
          saldo_awal_kemasan: data[0].saldoKemasan,
          saldo_awal_lt: data[0].saldo,
        });

        const newData = data.map((item, index) => {
          if (item.jenisTransaksi === "K") {
            saldoKemasan -= +item.jumlahKemasan || 0;
            saldoLt -= +item.jumlah || 0;
          } else if (item.jenisTransaksi === "D") {
            saldoKemasan += +item.jumlahKemasan || 0;
            saldoLt += +item.jumlah || 0;
          }

          return {
            key: `brck-2-ck5-${index}`,
            jenis_dokumen: item.jenisDok,
            nomor_dokumen: item.nomorDok,
            tanggal_dokumen: moment(item.tanggalDok).format("DD-MM-YYYY"),
            tanggal_transaksi: moment(item.tanggalCio).format("DD-MM-YYYY"),
            uraian_kegiatan: item.uraianKegiatan,
            debet_kemasan: item.jenisTransaksi === "D" ? +item.jumlahKemasan : 0,
            debet_lt: item.jenisTransaksi === "D" ? +item.jumlah : 0,
            kredit_kemasan: item.jenisTransaksi === "K" ? +item.jumlahKemasan : 0,
            kredit_lt: item.jenisTransaksi === "K" ? +item.jumlah : 0,
            saldo_kemasan: saldoKemasan,
            saldo_lt: saldoLt,
          };
        });

        this.setState({ dataSource: newData });
      }

      this.setState({
        saldo_buku_kemasan: saldoKemasan,
        saldo_buku_lt: saldoLt,
        hasil_pencacahan_back5_kemasan: saldoKemasan,
        hasil_pencacahan_back5_lt: saldoLt,
        isBrowseShow: true,
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
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset(clearFilters)}
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
  handleColumnSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleColumnReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: null });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ [field]: typeof value === "number" ? value : 0 });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataNppbkc = (record) => {
    this.setState({
      nppbkc_id: record.nppbkc_id,
      nppbkc: record.nppbkc,
      nama_nppbkc: record.nama_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDaftarMerkBrck2 = (record) => {
    this.setState({
      merk_mmea_id: record.merk_mmea_id,
      merk_mmea_name: record.merk_mmea_name,
      jenis_mmea: record.jenis_mmea,
      tarif: record.tarif,
      isi: record.isi,
    });

    this.handleModalClose("isModalDaftarMerkVisible");
  };

  handleSearch = () => {
    if (
      !this.state.nppbkc_id ||
      !this.state.merk_mmea_id ||
      !this.state.periode_akhir ||
      !this.state.periode_akhir
    ) {
      return notification.info({ message: "Info", description: "Data tidak boleh kosong" });
    }

    this.getBrck2();
  };
  handleReset = () => {
    this.setState({
      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      merk_mmea_name: null,
      jenis_mmea: null,
      golongan: null,
      tarif: null,
      isi: null,
      periode_awal: null,
      periode_akhir: null,
    });
  };

  handleUpdate = async () => {
    const {
      nppbkc_id,
      merk_mmea_id,
      merk_mmea_name,
      periode_awal,
      periode_akhir,

      saldo_awal_lt,
      saldo_awal_kemasan,

      hasil_pencacahan_back5_lt,
      hasil_pencacahan_back5_kemasan,
      hasil_pencarian_back5_description,
      selisih_lt,
      selisih_kemasan,
      selisih_description,
      batas_kelonggaran_kemasan,
      no_back5,
      tgl_back5,
      jenis_penutupan,
    } = this.state;

    const payload = {
      idMenu: idMenu("brck2"),
      idNppbkc: nppbkc_id,
      idMerk: merk_mmea_id,
      namaMerk: merk_mmea_name,
      periodeAwal: periode_awal,
      periodeAkhir: periode_akhir,
      saldoAwalLt: saldo_awal_lt,
      saldoAwalKemasan: saldo_awal_kemasan,
      hasilCacahLt: hasil_pencacahan_back5_lt,
      hasilCacahKemasan: hasil_pencacahan_back5_kemasan,
      keteranganHasilCacah: hasil_pencarian_back5_description,
      selisihLt: Math.abs(selisih_lt),
      selisihKemasan: Math.abs(selisih_kemasan),
      keteranganSelisih: selisih_description,
      flagSelisih: Math.abs(selisih_lt) || Math.abs(selisih_kemasan) ? "Y" : "N",
      nomorBack5: no_back5,
      tanggalBack5: moment(tgl_back5, "DD-MM-YYYY").format("YYYY-MM-DD"),
      kekuranganLt: Math.sign(selisih_lt) === -1 ? Math.abs(selisih_lt) : null,
      kekuranganKemasan: Math.sign(selisih_kemasan) === -1 ? Math.abs(selisih_kemasan) : null,
      keteranganKekurangan:
        Math.sign(selisih_lt) === -1 || Math.sign(selisih_kemasan) === -1
          ? selisih_description
          : null,
      flagSanksi:
        Math.sign(selisih_kemasan) === -1 ||
        Math.sign(selisih_lt) === -1 ||
        ((Math.sign(selisih_kemasan) === 1 || Math.sign(selisih_lt) === 1) &&
          selisih_lt > batas_kelonggaran_kemasan &&
          selisih_kemasan > batas_kelonggaran_kemasan)
          ? "Y"
          : "N",
      jenisPenutupan: jenis_penutupan,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/brck/rekam-brck2",
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/brck-2`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-2 Perbaikan" hideContentHeader>
          {this.state.isDetailLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
              <Header>{this.state.subtitle1}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="nppbkc" value={this.state.nppbkc} disabled />
                      <Button
                        type="primary"
                        onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                        disabled
                      >
                        Cari
                      </Button>
                      <Input id="nama_nppbkc" value={this.state.nama_nppbkc} disabled />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="merk_mmea_name" value={this.state.merk_mmea_name} disabled />
                      <Button
                        type="primary"
                        onClick={() => this.handleModalShow("isModalDaftarMerkVisible")}
                        disabled
                      >
                        Cari
                      </Button>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis</FormLabel>
                    </div>
                    <Input id="jenis" value={this.state.jenis_mmea} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif</FormLabel>
                    </div>
                    <Input id="tarif" value={this.state.tarif} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi</FormLabel>
                    </div>
                    <Input id="isi" value={this.state.isi} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Periode</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DatePicker
                        id="periode_awal"
                        format="DD-MM-YYYY"
                        onChange={(date) => this.handleDatepickerChange("periode_awal", date)}
                        value={this.state.periode_awal}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>s.d</div>
                      <DatePicker
                        id="periode_akhir"
                        format="DD-MM-YYYY"
                        onChange={(date) => this.handleDatepickerChange("periode_akhir", date)}
                        value={this.state.periode_akhir}
                        style={{ width: "100%" }}
                        disabled
                      />
                    </div>
                  </Col>
                </Row>

                <Row style={{ marginTop: 30 }}>
                  <Col span={8} offset={16}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Button
                          type="primary"
                          onClick={this.handleSearch}
                          loading={this.state.isSearchLoading}
                          block
                          disabled
                        >
                          Tampilkan
                        </Button>
                      </Col>

                      <Col span={12}>
                        <Button type="danger" block onClick={this.handleReset} disabled>
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {this.state.isBrowseShow && (
                  <>
                    <div style={{ marginTop: 30, marginBottom: 20 }}>
                      <Row style={{ marginBottom: 20 }}>
                        <Col span={15} offset={9}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <div style={{ marginBottom: 10 }}>
                                <FormLabel>
                                  SALDO AWAL KEMASAN <br /> (Hasil penutupan periode sebelumnya)
                                </FormLabel>
                              </div>
                              <InputNumber
                                value={this.state.saldo_awal_kemasan}
                                onChange={this.handleSaldoAwalKemasanChange}
                                min={0}
                                style={{ width: "100%" }}
                              />
                            </Col>

                            <Col span={12}>
                              <div style={{ marginBottom: 10 }}>
                                <FormLabel>
                                  SALDO AWAL (lt) <br /> (Hasil penutupan periode sebelumnya)
                                </FormLabel>
                              </div>
                              <InputNumber
                                value={this.state.saldo_awal_lt}
                                onChange={this.handleSaldoAwalLtChange}
                                min={0}
                                style={{ width: "100%" }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Table
                        columns={this.state.columns}
                        dataSource={this.state.dataSource}
                        pagination={{ current: this.state.page }}
                        onChange={(page) => this.setState({ page: page.current })}
                        scroll={{ x: "max-content" }}
                        footer={() => {
                          return (
                            <Table
                              style={{ margin: -16 }}
                              showHeader={false}
                              pagination={false}
                              columns={[
                                {
                                  key: "title",
                                  title: "Title",
                                  dataIndex: "title",
                                  render: (text, record, index) => (
                                    <div style={{ textAlign: "center" }}>{text}</div>
                                  ),
                                },
                                {
                                  key: "total_debet_kemasan",
                                  title: "Debet Kemasan",
                                  dataIndex: "total_debet_kemasan",
                                  width: 80,
                                  fixed: "right",
                                  render: (text) => (
                                    <div style={{ textAlign: "center" }}>{text}</div>
                                  ),
                                },
                                {
                                  key: "total_debet_lt",
                                  title: "Debet (Lt)",
                                  dataIndex: "total_debet_lt",
                                  width: 80,
                                  fixed: "right",
                                  render: (text) => (
                                    <div style={{ textAlign: "center" }}>{text}</div>
                                  ),
                                },
                                {
                                  key: "total_kredit_kemasan",
                                  title: "Kredit Kemasan",
                                  dataIndex: "total_kredit_kemasan",
                                  width: 80,
                                  fixed: "right",
                                  render: (text) => (
                                    <div style={{ textAlign: "center" }}>{text}</div>
                                  ),
                                },
                                {
                                  key: "total_kredit_lt",
                                  title: "Kredit (Lt)",
                                  dataIndex: "total_kredit_lt",
                                  width: 80,
                                  fixed: "right",
                                  render: (text) => (
                                    <div style={{ textAlign: "center" }}>{text}</div>
                                  ),
                                },
                                {
                                  key: "total_saldo_kemasan",
                                  title: "Saldo Kemasan",
                                  dataIndex: "total_saldo_kemasan",
                                  width: 80,
                                  fixed: "right",
                                  render: (text) => (
                                    <div style={{ textAlign: "center" }}>{text}</div>
                                  ),
                                },
                                {
                                  key: "total_saldo_lt",
                                  title: "Saldo (Lt)",
                                  dataIndex: "total_saldo_lt",
                                  width: 80,
                                  fixed: "right",
                                  render: (text) => (
                                    <div style={{ textAlign: "center" }}>{text}</div>
                                  ),
                                },
                                {
                                  key: "total_keterangan",
                                  title: "Keterangan",
                                  dataIndex: "total_keterangan",
                                  width: 80,
                                  fixed: "right",
                                  render: (text) => (
                                    <div style={{ textAlign: "center" }}>{text}</div>
                                  ),
                                },
                              ]}
                              dataSource={[
                                {
                                  key: "1",
                                  title: "Jumlah",
                                  total_debet_kemasan: this.state.total_debet_kemasan,
                                  total_debet_lt: this.state.total_debet_lt,
                                  total_kredit_kemasan: this.state.total_kredit_kemasan,
                                  total_kredit_lt: this.state.total_kredit_lt,
                                  total_saldo_kemasan: this.state.saldo_buku_kemasan,
                                  total_saldo_lt: this.state.saldo_buku_lt,
                                  total_keterangan: `Size Data: ${this.state.dataSource.length}`,
                                },
                                {
                                  key: "2",
                                  title: "Saldo Buku",
                                  total_debet_kemasan: null,
                                  total_debet_lt: null,
                                  total_kredit_kemasan: null,
                                  total_kredit_lt: null,
                                  total_saldo_kemasan: this.state.saldo_buku_kemasan,
                                  total_saldo_lt: this.state.saldo_buku_lt,
                                  total_keterangan: null,
                                },
                                {
                                  key: "3",
                                  title: "Selisih",
                                  total_debet_kemasan: null,
                                  total_debet_lt: null,
                                  total_kredit_kemasan: null,
                                  total_kredit_lt: null,
                                  total_saldo_kemasan: Math.abs(this.state.selisih_kemasan),
                                  total_saldo_lt: Math.abs(this.state.selisih_lt),
                                  total_keterangan: null,
                                },
                                {
                                  key: "4",
                                  title: "Saldo Akhir",
                                  total_debet_kemasan: null,
                                  total_debet_lt: null,
                                  total_kredit_kemasan: null,
                                  total_kredit_lt: null,
                                  total_saldo_kemasan: this.state.hasil_pencacahan_back5_kemasan,
                                  total_saldo_lt: this.state.hasil_pencacahan_back5_lt,
                                  total_keterangan: null,
                                },
                              ]}
                            />
                          );
                        }}
                      />
                    </div>

                    <Row gutter={[10, 10]}>
                      <Col span={21} offset={3}>
                        <Row gutter={[10, 10]}>
                          <Col span={5} offset={8}>
                            Kemasan
                          </Col>
                          <Col span={5}>Liter</Col>
                          <Col span={6}>Keterangan</Col>
                        </Row>

                        <Row gutter={[10, 10]}>
                          <Col span={8}>
                            <div
                              style={{
                                height: 32,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              Hasil Pencacahan (BACK-5)
                            </div>
                          </Col>
                          <Col span={5}>
                            <InputNumber
                              id="hasil_pencacahan_back5_kemasan"
                              value={this.state.hasil_pencacahan_back5_kemasan}
                              onChange={(value) => {
                                this.handleInputNumberChange(
                                  "hasil_pencacahan_back5_kemasan",
                                  value
                                );
                                this.setState({
                                  hasil_pencacahan_back5_lt:
                                    (typeof value === "number" ? value : 0) * (this.state.isi || 1),
                                });
                              }}
                              style={{ width: "100%" }}
                            />
                          </Col>
                          <Col span={5}>
                            <InputNumber
                              id="hasil_pencacahan_back5_lt"
                              value={this.state.hasil_pencacahan_back5_lt}
                              onChange={(value) => {
                                this.handleInputNumberChange("hasil_pencacahan_back5_lt", value);

                                this.setState({
                                  hasil_pencacahan_back5_kemasan:
                                    (typeof value === "number" ? value : 0) / (this.state.isi || 1),
                                });
                              }}
                              style={{ width: "100%" }}
                            />
                          </Col>
                          <Col span={6}>
                            <Input.TextArea
                              id="hasil_pencarian_back5_description"
                              value={this.state.hasil_pencarian_back5_description}
                              onChange={this.handleInputChange}
                              autoSize
                            />
                          </Col>
                        </Row>

                        <Row gutter={[10, 10]}>
                          <Col span={8}>
                            <div
                              style={{
                                height: 32,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              No. BACK-5
                            </div>
                          </Col>
                          <Col span={5}>
                            <Input
                              id="no_back5"
                              onChange={this.handleInputChange}
                              value={this.state.no_back5}
                            />
                          </Col>
                        </Row>

                        <Row gutter={[10, 10]}>
                          <Col span={8}>
                            <div
                              style={{
                                height: 32,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              Tgl. BACK-5
                            </div>
                          </Col>
                          <Col span={5}>
                            <DatePicker
                              id="tgl_back5"
                              format="DD-MM-YYYY"
                              onChange={(date) => this.handleDatepickerChange("tgl_back5", date)}
                              value={this.state.tgl_back5}
                              style={{ width: "100%" }}
                            />
                          </Col>
                        </Row>

                        {Math.sign(this.state.selisih_kemasan) !== 0 && (
                          <Row gutter={[10, 10]}>
                            <Col span={8}>
                              <div
                                style={{
                                  height: 32,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "end",
                                }}
                              >
                                {Math.sign(this.state.selisih_kemasan) === -1
                                  ? "Selisih Kurang"
                                  : "Selisih Lebih"}
                              </div>
                            </Col>
                            <Col span={5}>
                              <InputNumber
                                id="selisih_kemasan"
                                value={Math.abs(this.state.selisih_kemasan)}
                                style={{ width: "100%" }}
                                disabled
                              />
                            </Col>
                            <Col span={5}>
                              <InputNumber
                                id="selisih_lt"
                                value={Math.abs(this.state.selisih_lt)}
                                style={{ width: "100%" }}
                                disabled
                              />
                            </Col>
                            <Col span={6}>
                              <Input.TextArea
                                id="selisih_description"
                                value={this.state.selisih_description}
                                autoSize
                                disabled
                              />
                            </Col>
                          </Row>
                        )}

                        {Math.sign(this.state.selisih_kemasan) === 1 && (
                          <Row gutter={[10, 10]}>
                            <Col span={8}>
                              <div
                                style={{
                                  height: 32,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "end",
                                }}
                              >
                                Batas Kelonggaran
                              </div>
                            </Col>

                            <Col span={5}>
                              <InputNumber
                                id="batas_kelonggaran_kemasan"
                                value={this.state.batas_kelonggaran_kemasan}
                                style={{ width: "100%" }}
                                disabled
                              />
                            </Col>

                            <Col span={6} offset={5}>
                              <Input.TextArea
                                id="batas_kelonggaran_description"
                                value={this.state.batas_kelonggaran_description}
                                autoSize
                                disabled
                              />
                            </Col>
                          </Row>
                        )}

                        {Math.sign(this.state.selisih_kemasan) !== 0 && (
                          <Row gutter={[10, 10]}>
                            <Col
                              span={11}
                              offset={13}
                              style={{
                                color:
                                  Math.sign(this.state.selisih_kemasan) === -1 ||
                                  Math.sign(this.state.selisih_lt) === -1 ||
                                  ((Math.sign(this.state.selisih_kemasan) === 1 ||
                                    Math.sign(this.state.selisih_lt) === 1) &&
                                    this.state.selisih_lt > this.state.batas_kelonggaran_kemasan &&
                                    this.state.selisih_kemasan >
                                      this.state.batas_kelonggaran_kemasan)
                                    ? "red"
                                    : "blue",
                              }}
                            >
                              {this.state.notif}
                            </Col>
                          </Row>
                        )}

                        <Row gutter={[10, 50]}>
                          <Col span={8} offset={9}>
                            <div
                              style={{
                                height: 32,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              Jenis Penutupan
                            </div>
                          </Col>
                          <Col span={7}>
                            <Select
                              id="jenis_penutupan"
                              value={this.state.jenis_penutupan}
                              onChange={(value) =>
                                this.handleSelectChange("jenis_penutupan", value)
                              }
                              style={{ width: "100%" }}
                            >
                              {this.state.list_jenis_penutupan.length > 0 &&
                                this.state.list_jenis_penutupan.map((item, index) => (
                                  <Select.Option
                                    key={`jenis-penutupan-${index}`}
                                    value={item.jenis_penutupan_code}
                                  >
                                    {item.jenis_penutupan_name}
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                )}

                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                  <Col span={4}>
                    <ButtonCustom
                      variant="secondary"
                      onClick={() => this.props.history.goBack()}
                      block
                    >
                      Kembali
                    </ButtonCustom>
                  </Col>

                  <Col span={4}>
                    <Button
                      type="primary"
                      loading={this.state.isUpdateLoading}
                      onClick={this.handleUpdate}
                      block
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
          idJenisBkc={this.state.jenis_bkc_id}
        />

        <ModalDaftarMerkBrck2
          isVisible={this.state.isModalDaftarMerkVisible}
          onCancel={() => this.handleModalClose("isModalDaftarMerkVisible")}
          onDataDoubleClick={this.handleDaftarMerkBrck2}
        />
      </>
    );
  }
}
