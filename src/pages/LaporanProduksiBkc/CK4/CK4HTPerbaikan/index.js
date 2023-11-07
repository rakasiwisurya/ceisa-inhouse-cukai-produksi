import {
  Button,
  Card,
  Col,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Upload,
  notification,
} from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarKota from "components/ModalDaftarKota";
import ModalDaftarHTCK4 from "components/ModalDaftarMerkHTCK4";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { convertArrayExcelToTable } from "utils/convertArrayExcelToTable";
import { download } from "utils/files";
import { formatDateFromExcelEpoch } from "utils/formatter";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";

export default class CK4HTPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Keterangan Lain",
      subtitle5: "Dasar Perbaikan",

      isSimpanPerbaikanLoading: false,
      isDetailLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkHtVisible: false,
      isModalDaftarKotaVisible: false,
      isModalDaftarPenjabatBcVisible: false,
      isDownloadTemplateLoading: false,

      idJenisBkc: 3,

      namaPemrakarsa: null,
      idProcessPemrakarsa: null,
      jabatanPemrakarsa: null,
      nipPemrakarsa: null,

      idNppbkc: null,
      namaNppbkc: null,
      nppbkc: null,
      alamatNppbkc: null,
      npwpNppbkc: null,

      idJenisLaporan: "BULANAN",
      namaJenisLaporan: "BULANAN",
      nomorPemberitahuan: null,
      tanggalPemberitahuan: null,
      jenisBarangKenaCukai: "Hasil Tembakau (HT)",

      periodeBulan: null,
      periodeTahun: null,
      tanggalProduksiAwal: null,
      tanggalProduksiAkhir: null,
      totalJumlahKemasan: 0,
      totalJumlahKemasanDilekatiPita: 0,
      totalJumlahProduksiHtBtg: 0,
      totalJumlahProduksiHtGr: 0,
      totalJumlahProduksiHtMl: 0,

      idCk4Detail: null,

      idMerkHt: null,
      namaMerkHt: null,
      jenisHt: null,
      hjeHt: null,
      isiHt: null,
      bahanHt: null,
      tarifHt: null,
      satuanHt: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,

      idKota: null,
      namaKota: null,
      namaPengusaha: null,

      nomorSurat: null,
      tanggalSurat: null,
      nipPenjabatBc: null,
      namaPenjabatBc: null,
      keteranganPerbaikan: null,

      uraianRincianFile: [],

      searchText: null,
      searchedColumn: null,
      page: 1,

      columns: [
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button type="primary" icon="form" onClick={() => this.handleEditRincian(record)} />
              {record.idCk4Detail ? (
                <Button
                  type="danger"
                  icon="delete"
                  onClick={() => this.handleDeleteApi(record, record.idCk4Detail)}
                />
              ) : (
                <Button
                  type="danger"
                  icon="close"
                  onClick={() => this.handleDeleteRincian(record)}
                />
              )}
            </div>
          ),
        },
        {
          title: "Dokumen Produksi",
          children: [
            {
              title: "Nomor",
              dataIndex: "nomorProduksi",
              key: "nomorProduksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomorProduksi"),
            },
            {
              title: "Tanggal",
              dataIndex: "tanggalProduksi",
              key: "tanggalProduksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggalProduksi"),
            },
          ],
        },
        {
          title: "Jenis HT",
          dataIndex: "jenisHt",
          key: "jenisHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenisHt"),
        },
        {
          title: "Merk",
          dataIndex: "namaMerkHt",
          key: "namaMerkHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaMerkHt"),
        },
        {
          title: "HJE",
          dataIndex: "hjeHt",
          key: "hjeHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("hjeHt"),
        },
        {
          title: "Tarif",
          dataIndex: "tarifHt",
          key: "tarifHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarifHt"),
        },
        {
          title: "Kemasan",
          children: [
            {
              title: "Bahan",
              dataIndex: "bahanHt",
              key: "bahanHt",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("bahanHt"),
            },
            {
              title: "Isi",
              dataIndex: "isiHt",
              key: "isiHt",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("isiHt"),
            },
            {
              title: "Satuan",
              dataIndex: "satuanHt",
              key: "satuanHt",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("satuanHt"),
            },
            {
              title: "Jumlah",
              dataIndex: "jumlahKemasan",
              key: "jumlahKemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jumlahKemasan"),
            },
          ],
        },
        {
          title: "Jumlah Isi",
          dataIndex: "jumlahProduksi",
          key: "jumlahProduksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahProduksi"),
        },
        {
          title: "Jumlah Kemasan Dilekati Pita",
          dataIndex: "jumlahKemasanDilekatiPita",
          key: "jumlahKemasanDilekatiPita",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahKemasanDilekatiPita"),
        },
      ],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getDetailCk4Ht();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.periodeBulan !== this.state.periodeBulan ||
      prevState.periodeTahun !== this.state.periodeTahun
    ) {
      if (this.state.periodeBulan && this.state.periodeTahun) {
        const firstDate = moment([+this.state.periodeTahun, +this.state.periodeBulan - 1]);
        const lastDate = moment(firstDate).endOf("month");

        this.setState({
          tanggalProduksiAwal: firstDate,
          tanggalProduksiAkhir: lastDate,
        });
      }
    }

    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;

      const jumlahProduksiBtg = dataSource.filter(
        (item) => item.satuanHt === "BTG" || item.satuanHt === "btg"
      );
      const jumlahProduksiGr = dataSource.filter(
        (item) => item.satuanHt === "GR" || item.satuanHt === "gr"
      );
      const jumlahProduksiMl = dataSource.filter(
        (item) => item.satuanHt === "ML" || item.satuanHt === "ml"
      );

      this.setState({
        totalJumlahKemasan: sumArrayOfObject(dataSource, "jumlahKemasan"),
        totalJumlahKemasanDilekatiPita: sumArrayOfObject(dataSource, "jumlahKemasanDilekatiPita"),
        totalJumlahProduksiHtBtg: sumArrayOfObject(jumlahProduksiBtg, "jumlahProduksi"),
        totalJumlahProduksiHtGr: sumArrayOfObject(jumlahProduksiGr, "jumlahProduksi"),
        totalJumlahProduksiHtMl: sumArrayOfObject(jumlahProduksiMl, "jumlahProduksi"),
      });
    }
  }

  getDetailCk4Ht = async () => {
    const payload = { idCk4: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/detail-ht",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        namaPemrakarsa: data.namaPemrakarsa,
        idProcessPemrakarsa: data.idProsesPemrakarsa,
        jabatanPemrakarsa: data.jabatanPemrakarsa,
        nipPemrakarsa: data.nipPemrakarsa,

        idNppbkc: data.idNppbkc,
        namaNppbkc: data.namaPerusahaan,
        nppbkc: data.nppbkc,
        alamatNppbkc: data.alamatPerusahaan,
        npwpNppbkc: data.npwp,

        idJenisLaporan: data.jenisLaporan,
        nomorPemberitahuan: data.nomorPemberitahuan,
        tanggalPemberitahuan: moment(data.tanggalPemberitahuan),

        periodeBulan: data.periodeBulan,
        periodeTahun: data.periodeTahun,
        tanggalProduksiAwal: moment(data.tanggalProduksiAwal),
        tanggalProduksiAkhir: moment(data.tanggalProduksiAkhir),

        idKota: data.idKota,
        namaKota: data.namaKota,
        namaPengusaha: data.namaPengusaha,

        dataSource: data.details.map((detail, index) => ({
          key: `ck4-${index}`,
          idCk4Detail: detail.idCk4Detail,
          idMerkHt: detail.idMerkHt,
          namaMerkHt: detail.namaMerkHt,
          jenisHt: detail.jenisProduksiHt,
          hjeHt: detail.hje,
          isiHt: detail.isiPerKemasan,
          bahanHt: detail.bahanKemasan,
          tarifHt: detail.tarif,
          satuanHt: detail.satuanHt,

          nomorProduksi: detail.nomorProduksi,
          tanggalProduksi: moment(detail.tanggalProduksi).format("DD-MM-YYYY"),
          jumlahKemasan: detail.jumlahKemasan,
          jumlahProduksi: detail.jumlahProduksi,
          jumlahKemasanDilekatiPita: detail.jumlahKemasanDilekatiPita,
        })),
      });
    }
  };

  handleDeleteApi = async (record, id) => {
    const payload = { idCk4Detail: id };
    const response = await requestApi({
      service: "produksi",
      method: "delete",
      endpoint: "/delete-detail-ht",
      params: payload,
      setLoading: (bool) => this.setState({ isTableLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.handleDeleteRincian(record);
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
  handleTableChange = (page) => {
    this.setState({ page: page.current });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleUploadFileChange = (field, file, fileList) => {
    this.setState({ ...this.state, [field]: [file] });
  };
  handleUploadFile = (field, { file, onSuccess }) => {
    const timeout = setTimeout(() => {
      onSuccess("done");
      this.setState({ [field]: [file] });
      clearTimeout(timeout);
    }, 0);
  };
  handleRemoveFile = (field) => {
    this.setState({ [field]: [] });
  };
  handleInsertFileToTable = () => {
    ExcelRenderer(this.state.uraianRincianFile[0], (err, res) => {
      if (err) return console.error(err);
      const data = convertArrayExcelToTable(res.rows);
      const newData = data?.map((item, index) => ({
        key: `ht-detail-${index}`,

        idMerkHt: item.id_merk_ht,
        namaMerkHt: item.nama_merk_ht,
        jenisHt: item.jenis_produksi_ht,
        hjeHt: item.hje,
        isiHt: item.isi_per_kemasan,
        bahanHt: item.bahan_kemasan,
        tarifHt: item.tarif_spesifik,
        satuanHt: item.kode_satuan,

        nomorProduksi: item.nomor_dok_produksi,
        tanggalProduksi: moment(formatDateFromExcelEpoch(item.tanggal_dok_produksi)).format(
          "DD-MM-YYYY"
        ),
        jumlahKemasan: item.jumlahKemasan,
        jumlahProduksi: item.jumlah_produksi_ht,
        jumlahKemasanDilekatiPita: item.jumlah_kemasan_berpita,
      }));

      this.setState({
        uraianRincianFile: [],
        dataSource: [...this.state.dataSource, ...newData],
      });
    });
  };
  handleDownloadTemplate = async (e) => {
    e.stopPropagation();

    const response = await requestApi({
      service: "s3",
      method: "get",
      endpoint: `/downloadFile/MpgBCAeAW6XX7VrEyFlfBw==/un8o8qvB9vnBl9rhg-Ofyw==/nAt-aE29fndOGQ4ca6mxZg59IY0F4ZwQLiDwRQEgsVsfInjqPNx2XshUgXILjEUL4KgaTnheY72GwTWMuz5ULw==`,
      config: { responseType: "blob" },
      setLoading: (bool) => this.setState({ isDownloadTemplateLoading: bool }),
    });

    if (response) download(response.data, "template_ck4_ht");
  };
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataNppbkc = (record) => {
    this.setState({
      idNppbkc: record.idNppbkc,
      nppbkc: record.nppbkc,
      namaNppbkc: record.namaNppbkc,
      alamatNppbkc: record.alamatNppbkc,
      npwpNppbkc: record.npwpNppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataMerkHt = (record) => {
    this.setState({
      idMerkHt: record.idMerkHt,
      namaMerkHt: record.namaMerkHt,
      jenisHt: record.jenisProduksiHt,
      hjeHt: record.hjeHt,
      isiHt: record.isiHt,
      bahanHt: record.bahanHt,
      tarifHt: record.tarifHt,
      satuanHt: record.satuanHt,
    });
    this.handleModalClose("isModalDaftarMerkHtVisible");
  };
  handleDataKota = (record) => {
    this.setState({
      idKota: record.idKota,
      namaKota: record.idKota,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };
  handleDataPenjabatBc = (record) => {
    this.setState({
      nipPenjabatBc: record.nipPenjabatBc,
      namaPenjabatBc: record.namaPenjabatBc,
    });
    this.handleModalClose("isModalDaftarPenjabatBcVisible");
  };

  handleSimpanRincian = () => {
    const {
      idMerkHt,
      namaMerkHt,
      jenisHt,
      hjeHt,
      isiHt,
      bahanHt,
      tarifHt,
      satuanHt,

      nomorProduksi,
      tanggalProduksi,
      jumlahKemasan,
      jumlahProduksi,
      jumlahKemasanDilekatiPita,
    } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          idMerkHt,
          namaMerkHt,
          jenisHt,
          hjeHt,
          isiHt,
          bahanHt,
          tarifHt,
          satuanHt,

          nomorProduksi,
          tanggalProduksi: moment(tanggalProduksi).format("DD-MM-YYYY"),
          jumlahKemasan,
          jumlahProduksi,
          jumlahKemasanDilekatiPita,
        },
      ],
    });

    this.setState({
      idMerkHt: null,
      namaMerkHt: null,
      jenisHt: null,
      hjeHt: null,
      isiHt: null,
      bahanHt: null,
      tarifHt: null,
      satuanHt: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,
    });
  };
  handleEditRincian = (record) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: record.key,
      idCk4Detail: record.idCk4Detail,

      idMerkHt: record.idMerkHt,
      namaMerkHt: record.namaMerkHt,
      jenisHt: record.jenisHt,
      hjeHt: record.hjeHt,
      isiHt: record.isiHt,
      bahanHt: record.bahanHt,
      tarifHt: record.tarifHt,
      satuanHt: record.satuanHt,

      nomorProduksi: record.nomorProduksi,
      tanggalProduksi: moment(record.tanggalProduksi, "DD-MM-YYYY"),
      jumlahKemasan: record.jumlahKemasan,
      jumlahProduksi: record.jumlahProduksi,
      jumlahKemasanDilekatiPita: record.jumlahKemasanDilekatiPita,
    });
  };
  handleUbahRincian = () => {
    const {
      idCk4Detail,

      idMerkHt,
      namaMerkHt,
      jenisHt,
      hjeHt,
      isiHt,
      bahanHt,
      tarifHt,
      satuanHt,

      nomorProduksi,
      tanggalProduksi,
      jumlahKemasan,
      jumlahProduksi,
      jumlahKemasanDilekatiPita,
    } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),

      idCk4Detail,

      idMerkHt,
      namaMerkHt,
      jenisHt,
      hjeHt,
      isiHt,
      bahanHt,
      tarifHt,
      satuanHt,

      nomorProduksi,
      tanggalProduksi: moment(tanggalProduksi).format("DD-MM-YYYY"),
      jumlahKemasan,
      jumlahProduksi,
      jumlahKemasanDilekatiPita,
    });
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      idCk4Detail: null,

      idMerkHt: null,
      namaMerkHt: null,
      jenisHt: null,
      hjeHt: null,
      isiHt: null,
      bahanHt: null,
      tarifHt: null,
      satuanHt: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,
      dataSource: newDataSource,
    });
  };
  handleDeleteRincian = (record) => {
    const updatedDataSource = this.state.dataSource.filter((item) => item.key !== record.key);
    this.setState({ dataSource: updatedDataSource });
  };
  handleBatalEditRincian = () => {
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      idCk4Detail: null,

      idMerkHt: null,
      namaMerkHt: null,
      jenisHt: null,
      hjeHt: null,
      isiHt: null,
      bahanHt: null,
      tarifHt: null,
      satuanHt: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,
    });
  };
  handleReset = () => {
    this.setState({
      idCk4Detail: null,

      idMerkHt: null,
      namaMerkHt: null,
      jenisHt: null,
      hjeHt: null,
      isiHt: null,
      bahanHt: null,
      tarifHt: null,
      satuanHt: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,

      uraianRincianFile: [],
    });
  };
  handleSimpanPerbaikan = async () => {
    const {
      idNppbkc,
      nppbkc,
      namaNppbkc,
      alamatNppbkc,
      npwpNppbkc,
      idJenisLaporan,
      nomorPemberitahuan,
      tanggalPemberitahuan,
      tanggalProduksiAwal,
      tanggalProduksiAkhir,
      periodeBulan,
      periodeTahun,
      totalJumlahKemasan,
      totalJumlahKemasanDilekatiPita,
      totalJumlahProduksiHtBtg,
      totalJumlahProduksiHtGr,
      totalJumlahProduksiHtMl,

      namaKota,
      namaPengusaha,
      nomorSurat,
      tanggalSurat,
      nipPenjabatBc,
      namaPenjabatBc,
      keteranganPerbaikan,
      dataSource,
    } = this.state;

    const details = dataSource.map((item) => ({
      idCk4Detail: item.idCk4Detail,
      idMerkHt: item.idMerkHt,
      namaMerkHt: item.namaMerkHt,
      bahanKemasan: item.bahanHt,
      hje: item.hjeHt,
      isiPerKemasan: item.isiHt,
      jenisProduksiHt: item.jenisHt,
      tarif: item.tarifHt,
      nomorProduksi: item.nomorProduksi,
      tanggalProduksi: moment(item.tanggalProduksi, "DD-MM-YYYY").format("YYYY-MM-DD"),
      jumlahKemasan: item.jumlahKemasan,
      jumlahProduksi: item.jumlahProduksi,
      jumlahKemasanDilekatiPita: item.jumlahKemasanDilekatiPita,
    }));

    const payload = {
      details,
      alamatPerusahaan: alamatNppbkc,
      idCk4: this.props.match.params.id,
      idNppbkc: idNppbkc,
      jenisLaporan: idJenisLaporan,
      keteranganPerbaikan: keteranganPerbaikan,
      namaKota: namaKota,
      namaPejabat: namaPenjabatBc,
      namaPengusaha: namaPengusaha,
      nipPenjabatBc: nipPenjabatBc,
      namaPerusahaan: namaNppbkc,
      nomorPemberitahuan: nomorPemberitahuan,
      nppbkc: nppbkc,
      npwp: npwpNppbkc,
      nomorSurat: nomorSurat,
      periodeBulan: periodeBulan,
      periodeTahun: periodeTahun,
      tanggalPemberitahuan: moment(tanggalPemberitahuan).format("YYYY-MM-DD"),
      tanggalProduksiAkhir: moment(tanggalProduksiAkhir).format("YYYY-MM-DD"),
      tanggalProduksiAwal: moment(tanggalProduksiAwal).format("YYYY-MM-DD"),
      tanggalSurat: moment(tanggalSurat).format("YYYY-MM-DD"),
      totalJumlahKemasan: totalJumlahKemasan,
      totalJumlahKemasanDilekatiPita: totalJumlahKemasanDilekatiPita,
      totalJumlahProduksiHtBtg: totalJumlahProduksiHtBtg,
      totalJumlahProduksiHtGr: totalJumlahProduksiHtGr,
      totalJumlahProduksiHtMl: totalJumlahProduksiHtMl,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/ck4/perbaikan-ht",
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanPerbaikanLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/laporan-ck4`);
    }
  };

  render() {
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="HT Perbaikan">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nama Pemrakarsa</FormLabel>
                </div>
                <Input id="namaPemrakarsa" value={this.state.namaPemrakarsa} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>ID Proses</FormLabel>
                </div>
                <Input id="idProcessPemrakarsa" value={this.state.idProcessPemrakarsa} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jabatan</FormLabel>
                </div>
                <Input id="jabatanPemrakarsa" value={this.state.jabatanPemrakarsa} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NIP</FormLabel>
                </div>
                <Input id="nipPemrakarsa" value={this.state.nipPemrakarsa} disabled />
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Data NPPBKC" style={{ height: 437 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
                      <Button
                        type="default"
                        icon="menu"
                        onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea id="alamatNppbkc" value={this.state.alamatNppbkc} disabled />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Data Pemberitahuan" style={{ height: 437 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Laporan</FormLabel>
                    </div>
                    <Select
                      id="jenisLaporan"
                      value={this.state.idJenisLaporan}
                      style={{ width: "100%" }}
                      disabled
                    >
                      <Select.Option value={this.state.idJenisLaporan}>
                        {this.state.namaJenisLaporan}
                      </Select.Option>
                    </Select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Pemberitahuan</FormLabel>
                    </div>
                    <Input
                      id="nomorPemberitahuan"
                      onChange={this.handleInputChange}
                      value={this.state.nomorPemberitahuan}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pemberitahuan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalPemberitahuan"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalPemberitahuan}
                      onChange={(date) => this.handleDatepickerChange("tanggalPemberitahuan", date)}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                    </div>
                    <Input disabled value={this.state.jenisBarangKenaCukai} />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}></Col>
              <Col span={12}>
                <Card title="Data Produksi">
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Periode</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Select
                        id="periodeBulan"
                        onChange={(value) => this.handleSelectChange("periodeBulan", value)}
                        value={this.state.periodeBulan}
                        style={{ width: "100%" }}
                      >
                        {months.map((item, index) => (
                          <Select.Option key={`periodeBulan-${index}`} value={item.monthCode}>
                            {item.monthName}
                          </Select.Option>
                        ))}
                      </Select>

                      <Select
                        id="periodeTahun"
                        onChange={(value) => this.handleSelectChange("periodeTahun", value)}
                        value={this.state.periodeTahun}
                        style={{ width: "100%" }}
                      >
                        {years.map((item, index) => (
                          <Select.Option key={`periodeTahun-${index}`} value={item.yearCode}>
                            {item.yearName}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DatePicker
                        id="tanggalProduksiAwal"
                        format="DD-MM-YYYY"
                        value={this.state.tanggalProduksiAwal}
                        disabled
                      />
                      <div>s/d</div>
                      <DatePicker
                        id="tanggalProduksiAkhir"
                        format="DD-MM-YYYY"
                        value={this.state.tanggalProduksiAkhir}
                        disabled
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="totalJumlahKemasan"
                        value={this.state.totalJumlahKemasan}
                        disabled
                      />
                      <div>Kemasan</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Kemasan Dilekati Pita</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="totalJumlahKemasanDilekatiPita"
                        value={this.state.totalJumlahKemasanDilekatiPita}
                        disabled
                      />
                      <div>Kemasan</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (btg)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="totalJumlahProduksiHtBtg"
                        value={this.state.totalJumlahProduksiHtBtg}
                        disabled
                      />
                      <div>Batang</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (gr)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="totalJumlahProduksiHtGr"
                        value={this.state.totalJumlahProduksiHtGr}
                        disabled
                      />
                      <div>Gram</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (ml)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="totalJumlahProduksiHtMl"
                        value={this.state.totalJumlahProduksiHtMl}
                        disabled
                      />
                      <div>mililiter</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle3} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Kep Tarif" style={{ height: 705 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk HT</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="namaMerkHt" value={this.state.namaMerkHt} disabled />
                      <Button
                        type="default"
                        icon="menu"
                        onClick={() => this.handleModalShow("isModalDaftarMerkHtVisible")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Hasil Tembakau</FormLabel>
                    </div>
                    <Input id="jenisHt" value={this.state.jenisHt} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="hjeHt" value={this.state.hjeHt} disabled />
                      <div>Rupiah</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Bahan Kemasan</FormLabel>
                    </div>
                    <Input id="bahanHt" value={this.state.bahanHt} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi per Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="isiHt" value={this.state.isiHt} disabled />
                      {this.state.satuanHt && <div>{this.state.satuanHt}</div>}
                    </div>
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card title="Dokumen Produksi">
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor</FormLabel>
                        </div>
                        <Input
                          id="nomorProduksi"
                          onChange={this.handleInputChange}
                          value={this.state.nomorProduksi}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Produksi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggalProduksi"
                          format="DD-MM-YYYY"
                          value={this.state.tanggalProduksi}
                          onChange={(date) => this.handleDatepickerChange("tanggalProduksi", date)}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Card title="Jumlah Produksi dan Kemasan">
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Kemasan</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlahKemasan"
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlahKemasan", value)
                            }
                            value={this.state.jumlahKemasan}
                            style={{ flex: 1 }}
                          />
                          <div>Kemasan</div>
                        </div>
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Produksi per Merk</FormLabel>
                        </div>
                        <InputNumber
                          id="jumlahProduksi"
                          onChange={(value) =>
                            this.handleInputNumberChange("jumlahProduksi", value)
                          }
                          value={this.state.jumlahProduksi}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Card title="Pelekatan">
                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Kemasan Dilekati Pita</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlahKemasanDilekatiPita"
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlahKemasanDilekatiPita", value)
                            }
                            value={this.state.jumlahKemasanDilekatiPita}
                            style={{ flex: 1 }}
                          />
                          <div>Kemasan</div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Upload Uraian Rincian">
                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Uraian Rincian</FormLabel>
                    </div>
                    <Upload
                      id="uraianRincianFile"
                      name="uraianRincianFile"
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      customRequest={(options) =>
                        this.handleUploadFile("uraianRincianFile", options)
                      }
                      onRemove={() => this.handleRemoveFile("uraianRincianFile")}
                      fileList={this.state.uraianRincianFile}
                    >
                      <div style={{ display: "flex", gap: 10 }}>
                        <Button>
                          <Icon type="upload" /> Upload
                        </Button>

                        <ButtonCustom
                          variant="info"
                          loading={this.state.isDownloadTemplateLoading}
                          onClick={this.handleDownloadTemplate}
                        >
                          Download Template
                        </ButtonCustom>
                      </div>
                    </Upload>

                    <Button
                      type="primary"
                      onClick={this.handleInsertFileToTable}
                      style={{ marginTop: 10 }}
                      disabled={this.state.uraianRincianFile.length === 0}
                    >
                      Insert To Table
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          <Row>
            <Col span={8} offset={16}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  {this.state.isEditRincian ? (
                    <Button type="primary" block onClick={this.handleUbahRincian}>
                      Ubah Rincian
                    </Button>
                  ) : (
                    <Button type="primary" block onClick={this.handleSimpanRincian}>
                      Simpan Rincian
                    </Button>
                  )}
                </Col>

                <Col span={12}>
                  {this.state.isEditRincian ? (
                    <Button type="danger" block onClick={this.handleBatalEditRincian}>
                      Batal
                    </Button>
                  ) : (
                    <Button type="danger" block onClick={this.handleReset}>
                      Reset
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          <Table
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            scroll={{ x: "max-content" }}
            onChange={this.handleTableChange}
            pagination={{ current: this.state.page }}
            style={{ marginTop: 30, marginBottom: 30 }}
            footer={(currentPageData) => {
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
                        <div style={{ textAlign: "right" }}>{text}</div>
                      ),
                    },
                    {
                      key: "data",
                      title: "Data",
                      dataIndex: "data",
                      width: 80,
                      render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                    },
                  ]}
                  dataSource={[
                    {
                      key: "1",
                      title: "Jumlah Kemasan",
                      data: this.state.totalJumlahKemasan,
                    },
                    {
                      key: "2",
                      title: "Jumlah Kemasan Dilekati Pita",
                      data: this.state.totalJumlahKemasanDilekatiPita,
                    },
                    {
                      key: "3",
                      title: "Jumlah Batang",
                      data: this.state.totalJumlahProduksiHtBtg,
                    },
                    {
                      key: "4",
                      title: "Jumlah Gram",
                      data: this.state.totalJumlahProduksiHtGr,
                    },
                    {
                      key: "5",
                      title: "Jumlah Militer",
                      data: this.state.totalJumlahProduksiHtMl,
                    },
                  ]}
                />
              );
            }}
          />

          <Card title={this.state.subtitle4} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Dibuat di Kota/Kabupaten</FormLabel>
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
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nama Pengusaha</FormLabel>
                </div>
                <Input
                  id="namaPengusaha"
                  onChange={this.handleInputChange}
                  value={this.state.namaPengusaha}
                />
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle5} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Surat</FormLabel>
                </div>
                <Input
                  id="nomorSurat"
                  onChange={this.handleInputChange}
                  value={this.state.nomorSurat}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Surat</FormLabel>
                </div>
                <DatePicker
                  id="tanggalSurat"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("tanggalSurat", date)}
                  style={{ width: "100%" }}
                  value={this.state.tanggalSurat}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Penjabat BC</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Input
                    id="nipPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.nipPenjabatBc}
                    style={{ flex: 1 }}
                    disabled
                  />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarPenjabatBcVisible")}
                  >
                    Cari
                  </Button>
                  <Input
                    id="namaPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.namaPenjabatBc}
                    style={{ flex: 2 }}
                    disabled
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Keterangan</FormLabel>
                </div>
                <Input.TextArea
                  id="keteranganPerbaikan"
                  onChange={this.handleInputChange}
                  value={this.state.keteranganPerbaikan}
                />
              </Col>
            </Row>
          </Card>

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>

            <Col span={5}>
              <Button
                type="primary"
                loading={this.state.isSimpanPerbaikanLoading}
                onClick={this.handleSimpanPerbaikan}
                block
              >
                Simpan Perbaikan
              </Button>
            </Col>
          </Row>
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
          idJenisBkc={this.state.idJenisBkc}
        />

        <ModalDaftarHTCK4
          isVisible={this.state.isModalDaftarMerkHtVisible}
          onCancel={() => this.handleModalClose("isModalDaftarMerkHtVisible")}
          onDataDoubleClick={this.handleDataMerkHt}
        />

        <ModalDaftarKota
          isVisible={this.state.isModalDaftarKotaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarKotaVisible")}
          onDataDoubleClick={this.handleDataKota}
        />

        <ModalDaftarPenjabatBc
          isVisible={this.state.isModalDaftarPenjabatBcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarPenjabatBcVisible")}
          onDataDoubleClick={this.handleDataPenjabatBc}
        />
      </>
    );
  }
}
