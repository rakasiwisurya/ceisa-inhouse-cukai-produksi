import { Button, Col, DatePicker, Icon, Input, Row, Select, Table, notification } from "antd";
import React, { Component } from "react";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { requestApi } from "utils/requestApi";
import { pathName } from "configs/constants";
import ButtonCustom from "components/Button/ButtonCustom";

export default class ReferensiWarnaEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",
      isEdit: false,
      editIndex: null,

      isDetailWarnaLoading: true,
      isSimpanPerubahanLoading: false,
      isJenisBkcLoading: true,
      isJenisProduksiLoading: true,
      isJenisUsahaLoading: true,
      isGolonganLoading: true,

      nomor_surat: "",
      tanggal_surat: "",
      tanggal_awal_berlaku: "",

      jenis_bkc_id: "",
      jenis_bkc_name: "",
      kode_warna: "",
      warna: "",
      golongan_id: "",
      golongan_name: "",
      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_usaha_id: "",
      jenis_usaha_name: "",

      searchText: "",
      searchedColumn: "",
      page: 1,

      list_jenis_bkc: [],
      list_golongan: [],
      list_jenis_produksi: [],
      list_jenis_usaha: [],

      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getDetailWarna();
    this.getJenisBkc();
    this.getListJenisUsaha();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_bkc_id !== this.state.jenis_bkc_id) {
      this.getListGolongan();
      this.getListJenisProduksi();

      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          columns: [
            {
              title: "Aksi",
              dataIndex: "aksi",
              key: "aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <ButtonCustom
                    variant="warning"
                    icon="form"
                    onClick={() => this.handleEdit(record, index)}
                  />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(index)} />
                </div>
              ),
            },
            {
              title: "Nomor",
              dataIndex: "nomor",
              key: "nomor",
              render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
              ),
            },
            {
              title: "Kode Warna",
              dataIndex: "kode_warna",
              key: "kode_warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("kode_warna"),
            },
            {
              title: "Warna",
              dataIndex: "warna",
              key: "warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("warna"),
            },
            {
              title: "Golongan",
              dataIndex: "golongan_name",
              key: "golongan_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              title: "Jenis Produksi",
              dataIndex: "jenis_produksi_name",
              key: "jenis_produksi_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
          ],
        });
      }

      if (this.state.jenis_bkc_id === 2) {
        this.setState({
          columns: [
            {
              title: "Aksi",
              dataIndex: "aksi",
              key: "aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <ButtonCustom
                    variant="warning"
                    icon="form"
                    onClick={() => this.handleEdit(record, index)}
                  />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(index)} />
                </div>
              ),
            },
            {
              title: "Nomor",
              dataIndex: "nomor",
              key: "nomor",
              render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
              ),
            },
            {
              title: "Kode Warna",
              dataIndex: "kode_warna",
              key: "kode_warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("kode_warna"),
            },
            {
              title: "Warna",
              dataIndex: "warna",
              key: "warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("warna"),
            },
            {
              title: "Golongan",
              dataIndex: "golongan_name",
              key: "golongan_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              title: "Jenis Produksi",
              dataIndex: "jenis_produksi_name",
              key: "jenis_produksi_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
            {
              title: "Jenis Usaha",
              dataIndex: "jenis_usaha_name",
              key: "jenis_usaha_name",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_usaha_name"),
            },
          ],
        });
      }
    }
  }

  getDetailWarna = async () => {
    // const payload = { idReferensiSkep: this.props.match.params.id };

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/browse-detail-warna",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDetailWarnaLoading: bool }),
    // });

    // if (response) {
    //   const { data } = response.data;

    //   this.setState({
    //     nomor_surat: data.nomorSurat,
    //     tanggal_surat: moment(data.tanggalSurat),
    //     jenis_bkc_id: data.details[0].jenis_bkc_id,
    //     jenis_bkc_name: data.details[0].jenis_bkc_id,
    //     tanggal_awal_berlaku: moment(data.tanggalAwalBerlaku),
    //     dataSource: data.details.map((detail, index) => ({
    //       key: `referensi-${index}`,
    //       jenis_bkc_id: detail.idJenisBkc,
    //       jenis_bkc_name: detail.namaJenisBkc,
    //       kode_warna: detail.kodeWarna,
    //       warna: detail.warna,
    //       golongan_id: detail.idGolongan,
    //       golongan_name: detail.namaGolongan,
    //       jenis_produksi_id: detail.idJenisProduksi,
    //       jenis_produksi_code: detail.kodeJenisProduksi,
    //       jenis_usaha_id: detail.idJenisUsaha,
    //       jenis_usaha_name: detail.namaJenisUsaha,
    //     })),
    //   });
    // }

    this.setState({ isDetailWarnaLoading: true });
    setTimeout(() => {
      this.setState({
        nomor_surat: "Nomor Surat 1",
        tanggal_surat: moment(new Date()),
        tanggal_awal_berlaku: moment(new Date()),
        jenis_bkc_id: 3,
        jenis_bkc_name: "HT",
        dataSource: [
          {
            key: 1,
            jenis_bkc_id: 3,
            jenis_bkc_name: "HT",
            kode_warna: "HIJAU",
            warna: "Hijau",
            golongan_id: 1,
            golongan_name: "I",
            jenis_produksi_id: 1,
            jenis_produksi_code: "REL",
            jenis_produksi_name: "ROKOK ELEKTRIK",
            jenis_usaha_id: 1,
            jenis_usaha_name: "Dalam Negeri",
          },
          {
            key: 2,
            jenis_bkc_id: 3,
            jenis_bkc_name: "HT",
            kode_warna: "BIRU",
            warna: "Biru",
            golongan_id: 1,
            golongan_name: "I",
            jenis_produksi_id: 1,
            jenis_produksi_code: "REL",
            jenis_produksi_name: "ROKOK ELEKTRIK",
            jenis_usaha_id: 1,
            jenis_usaha_name: "Dalam Negeri",
          },
          {
            key: 3,
            jenis_bkc_id: 3,
            jenis_bkc_name: "HT",
            kode_warna: "MERAH",
            warna: "Merah",
            golongan_id: 1,
            golongan_name: "I",
            jenis_produksi_id: 1,
            jenis_produksi_code: "REL",
            jenis_produksi_name: "ROKOK ELEKTRIK",
            jenis_usaha_id: 1,
            jenis_usaha_name: "Dalam Negeri",
          },
        ],
      });
      this.setState({ isDetailWarnaLoading: false });
    }, 2000);
  };
  getJenisBkc = async () => {
    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/jenis-bkc",
    //   setLoading: (bool) => this.setState({ isJenisBkcLoading: bool }),
    // });

    // if (response) {
    //   const newData = response.data.data.map((item) => item);
    //   newData.splice(0, 1);
    //   this.setState({ list_jenis_bkc: newData });
    // }

    this.setState({ isJenisBkcLoading: true });
    setTimeout(() => {
      this.setState({
        list_jenis_bkc: [
          {
            idJenisBkc: 3,
            namaJenisBkc: "HT",
          },
          {
            idJenisBkc: 2,
            namaJenisBkc: "MMEA",
          },
        ],
      });
      this.setState({ isJenisBkcLoading: false });
    }, 2000);
  };
  getListGolongan = async () => {
    // const payload = { idJenisBkc: this.state.jenis_bkc_id };

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/golongan",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isGolonganLoading: bool }),
    // });

    // if (response) this.setState({ list_golongan: response.data.data });

    this.setState({ isGolonganLoading: true });
    setTimeout(() => {
      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          list_golongan: [
            {
              idGolongan: 1,
              namaGolongan: "I",
            },
            {
              idGolongan: 2,
              namaGolongan: "II",
            },
            {
              idGolongan: 3,
              namaGolongan: "III",
            },
            {
              idGolongan: 4,
              namaGolongan: "III/A",
            },
            {
              idGolongan: 5,
              namaGolongan: "III/B",
            },
            {
              idGolongan: 6,
              namaGolongan: "IMPORTIR HT",
            },
            {
              idGolongan: 7,
              namaGolongan: "TANPA GOLONGAN",
            },
          ],
        });
      } else {
        this.setState({
          list_golongan: [
            {
              idGolongan: 1,
              namaGolongan: "A",
            },
            {
              idGolongan: 2,
              namaGolongan: "B",
            },
            {
              idGolongan: 3,
              namaGolongan: "C",
            },
          ],
        });
      }
      this.setState({ isGolonganLoading: false });
    }, 2000);
  };
  getListJenisProduksi = async () => {
    // const payload = { idJenisBkc: this.state.jenis_bkc_id };

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/jenis-produksi",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    // });

    // if (response) this.setState({ list_jenis_produksi: response.data.data });

    this.setState({ isJenisProduksiLoading: true });
    setTimeout(() => {
      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          list_jenis_produksi: [
            {
              idJenisProduksi: 1,
              kodeJenisProduksi: "SKM",
              namaJenisProduksi: "SIGARET KRETEK MESIN",
            },
            {
              idJenisProduksi: 2,
              kodeJenisProduksi: "CRT",
              namaJenisProduksi: "CERUTU",
            },
            {
              idJenisProduksi: 3,
              kodeJenisProduksi: "HTL",
              namaJenisProduksi: "HASIL TEMBAKAU LAINNYA",
            },
            {
              idJenisProduksi: 4,
              kodeJenisProduksi: "STF",
              namaJenisProduksi: "SIGARET KRETEK TANGAN FILTER",
            },
            {
              idJenisProduksi: 5,
              kodeJenisProduksi: "SPT",
              namaJenisProduksi: "SIGARET PUTIH TANGAN",
            },
            {
              idJenisProduksi: 6,
              kodeJenisProduksi: "SPM",
              namaJenisProduksi: "SIGARET PUTIH MESIN",
            },
            {
              idJenisProduksi: 7,
              kodeJenisProduksi: "TIS",
              namaJenisProduksi: "TEMBAKAU IRIS",
            },
            {
              idJenisProduksi: 8,
              kodeJenisProduksi: "KLM",
              namaJenisProduksi: "KELEMBAK MENYAN",
            },
            {
              idJenisProduksi: 9,
              kodeJenisProduksi: "KLB",
              namaJenisProduksi: "KLOBOT",
            },
            {
              idJenisProduksi: 10,
              kodeJenisProduksi: "SKT",
              namaJenisProduksi: "SIGARET KRETEK TANGAN",
            },
            {
              idJenisProduksi: 11,
              kodeJenisProduksi: "SPF",
              namaJenisProduksi: "SIGARET PUTIH TANGAN FILTER",
            },
            {
              idJenisProduksi: 12,
              kodeJenisProduksi: "REL",
              namaJenisProduksi: "ROKOK ELEKTRIK",
            },
          ],
        });
      } else {
        this.setState({
          list_jenis_produksi: [
            {
              idJenisProduksi: 1,
              kodeJenisProduksi: "MMEA1",
              namaJenisProduksi: "Nama MMEA1",
            },
            {
              idJenisProduksi: 2,
              kodeJenisProduksi: "MMEA2",
              namaJenisProduksi: "Nama MMEA2",
            },
            {
              idJenisProduksi: 3,
              kodeJenisProduksi: "MMEA3",
              namaJenisProduksi: "Nama MMEA3",
            },
          ],
        });
      }

      this.setState({ isJenisProduksiLoading: false });
    }, 2000);
  };
  getListJenisUsaha = async () => {
    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/jenis-usaha",
    //   setLoading: (bool) => this.setState({ isJenisUsahaLoading: bool }),
    // });

    // if (response) this.setState({ list_jenis_usaha: response.data.data });

    this.setState({ isJenisUsahaLoading: true });
    setTimeout(() => {
      this.setState({
        list_jenis_usaha: [
          {
            idJenisUsaha: 1,
            namaJenisUsaha: "Dalam Negeri",
          },
          {
            idJenisUsaha: 2,
            namaJenisUsaha: "Importir",
          },
        ],
      });
      this.setState({ isJenisUsahaLoading: false });
    }, 2000);
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
    this.setState({ searchText: "" });
  };
  handleTableChange = (page) => {
    this.setState({ page: page.current });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
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

  handleSimpan = () => {
    const {
      jenis_bkc_id,
      jenis_bkc_name,
      kode_warna,
      warna,
      golongan_id,
      golongan_name,
      jenis_produksi_id,
      jenis_produksi_name,
      jenis_usaha_id,
      jenis_usaha_name,
    } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          jenis_bkc_id,
          jenis_bkc_name,
          kode_warna,
          warna,
          golongan_id,
          golongan_name,
          jenis_produksi_id,
          jenis_produksi_name,
          jenis_usaha_id,
          jenis_usaha_name,
        },
      ],
    });

    this.setState({
      kode_warna: "",
      warna: "",
      golongan_id: "",
      golongan_name: "",
      jenis_produksi_id: "",
      jenis_produksi_name: "",
      jenis_usaha_id: "",
      jenis_usaha_name: "",
    });
  };
  handleReset = () => {
    this.setState({
      isEdit: false,
      jenis_bkc_id: "",
      jenis_bkc_name: "",
      kode_warna: "",
      warna: "",
      golongan_id: "",
      golongan_name: "",
      jenis_produksi_id: "",
      jenis_produksi_name: "",
      jenis_usaha_id: "",
      jenis_usaha_name: "",
      dataSource: [],
    });
  };
  handleUbah = () => {
    const {
      jenis_bkc_id,
      jenis_bkc_name,
      kode_warna,
      warna,
      golongan_id,
      golongan_name,
      jenis_produksi_id,
      jenis_produksi_name,
      jenis_usaha_id,
      jenis_usaha_name,
    } = this.state;

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(this.state.editIndex, 1, {
      key: new Date().getTime(),
      jenis_bkc_id,
      jenis_bkc_name,
      kode_warna,
      warna,
      golongan_id,
      golongan_name,
      jenis_produksi_id,
      jenis_produksi_name,
      jenis_usaha_id,
      jenis_usaha_name,
    });
    this.setState({
      isEdit: false,
      editIndex: null,
      kode_warna: "",
      warna: "",
      golongan_id: "",
      golongan_name: "",
      jenis_produksi_id: "",
      jenis_produksi_name: "",
      jenis_usaha_id: "",
      jenis_usaha_name: "",
      dataSource: newDataSource,
    });
  };
  handleBatal = () => {
    this.setState({
      isEdit: false,
      kode_warna: "",
      warna: "",
      golongan_id: "",
      golongan_name: "",
      jenis_produksi_id: "",
      jenis_produksi_name: "",
      jenis_usaha_id: "",
      jenis_usaha_name: "",
    });
  };

  handleEdit = (record, index) => {
    this.setState({
      isEdit: true,
      editIndex: index,
      jenis_bkc_id: record.jenis_bkc_id,
      jenis_bkc_name: record.jenis_bkc_name,
      kode_warna: record.kode_warna,
      warna: record.warna,
      golongan_id: record.golongan_id,
      golongan_name: record.golongan_name,
      jenis_produksi_id: record.jenis_produksi_id,
      jenis_produksi_name: record.jenis_produksi_name,
      jenis_usaha_id: record.jenis_usaha_id,
      jenis_usaha_name: record.jenis_usaha_name,
    });
  };
  handleDelete = (index) => {
    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(index, 1);
    this.setState({ dataSource: newDataSource });
  };

  handleSimpanPerubahan = async () => {
    // const details = this.state.dataSource.map((item) => {
    //   const data = {
    //     idJenisBkc: item.jenis_bkc_id,
    //     kodeWarna: item.kode_warna,
    //     warna: item.warna,
    //     idGolongan: item.golongan_id,
    //     idJenisProduksi: item.jenis_produksi_id,
    //   };

    //   if (this.state.jenis_bkc_id === 2) {
    //     data.idJenisUsaha = item.jenis_usaha_id;
    //     return data;
    //   }

    //   return data;
    // });

    // const payload = {
    //   idReferensiSkep: this.props.match.params.id,
    //   noSurat: this.state.nomor_surat,
    //   tanggalSurat: moment(this.state.tanggal_surat).format("YYYY-MM-DD"),
    //   tanggalAwalBerlaku: moment(this.state.tanggal_awal_berlaku).format("YYYY-MM-DD"),
    //   details,
    // };

    // if (this.state.jenis_bkc_id === 2) payload.idJenisUsaha = jenis_usaha_id;

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "post",
    //   endpoint: "/referensi/browse-update-warna",
    //   body: payload,
    //   setLoading: (bool) => this.setState({ isSimpanPerubahanLoading: bool }),
    // });

    // if (response) {
    //   notification.success({ message: "Success", description: response.data.message });
    //   this.props.history.push(`${pathName}/referensi-tarif-warna`);
    // }

    const timeout = setTimeout(() => {
      notification.success({ message: "Success", description: "Success" });
      this.props.history.push(`${pathName}/referensi-tarif-warna`);
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container
          menuName="Refrensi Tarif dan Pita Cukai"
          contentName="Referensi Warna Edit"
          hideContentHeader
        >
          {this.state.isDetailWarnaLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
              <Header>{this.state.subtitle1}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Surat</FormLabel>
                    </div>
                    <Input
                      id="nomor_surat"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_surat}
                    />
                  </Col>

                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_surat"
                      onChange={(date) => this.handleDatepickerChange("tanggal_surat", date)}
                      value={this.state.tanggal_surat}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_awal_berlaku"
                      onChange={(value) =>
                        this.handleDatepickerChange("tanggal_awal_berlaku", value)
                      }
                      value={this.state.tanggal_awal_berlaku}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle2}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis BKC</FormLabel>
                    </div>
                    <Select
                      id="jenis_bkc"
                      onChange={(value, option) => {
                        this.setState({
                          golongan_id: "",
                          golongan_name: "",
                          jenis_produksi_id: "",
                          jenis_produksi_name: "",
                          jenis_usaha_id: "",
                          jenis_usaha_name: "",
                          list_golongan: [],
                          list_jenis_produksi: [],
                        });
                        this.handleSelectCustomChange("jenis_bkc", value, option);
                      }}
                      style={{ width: "100%" }}
                      value={this.state.jenis_bkc_id}
                      loading={this.state.isJenisBkcLoading}
                      disabled={this.state.dataSource.length > 0}
                    >
                      {this.state.list_jenis_bkc.length > 0 &&
                        this.state.list_jenis_bkc.map((item, index) => (
                          <Select.Option key={`jenis-bkc-${index}`} value={item.idJenisBkc}>
                            {item.namaJenisBkc}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kode Warna</FormLabel>
                    </div>
                    <Input
                      id="kode_warna"
                      onChange={this.handleInputChange}
                      value={this.state.kode_warna}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Warna</FormLabel>
                    </div>
                    <Input id="warna" onChange={this.handleInputChange} value={this.state.warna} />
                  </Col>

                  {this.state.jenis_bkc_id && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Golongan</FormLabel>
                      </div>
                      <Select
                        id="golongan"
                        onChange={(value, option) =>
                          this.handleSelectCustomChange("golongan", value, option)
                        }
                        value={this.state.golongan_id}
                        loading={this.state.isGolonganLoading}
                        style={{ width: "100%" }}
                      >
                        {this.state.list_golongan.length > 0 &&
                          this.state.list_golongan.map((item, index) => (
                            <Select.Option key={`golongan-${index}`} value={item.idGolongan}>
                              {item.namaGolongan}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>
                  )}

                  {this.state.jenis_bkc_id && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Jenis Produksi</FormLabel>
                      </div>
                      <Select
                        id="jenis_produksi"
                        onChange={(value, option) =>
                          this.handleSelectCustomChange("jenis_produksi", value, option)
                        }
                        value={this.state.jenis_produksi_id}
                        loading={this.state.isJenisProduksiLoading}
                        style={{ width: "100%" }}
                      >
                        {this.state.list_jenis_produksi.length > 0 &&
                          this.state.list_jenis_produksi.map((item, index) => (
                            <Select.Option
                              key={`jenis-produksi-${index}`}
                              value={item.idJenisProduksi}
                            >
                              {`${item.kodeJenisProduksi} - ${item.namaJenisProduksi}`}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>
                  )}

                  <Col span={12}>
                    {this.state.jenis_bkc_id === 2 && (
                      <>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Usaha</FormLabel>
                        </div>
                        <Select
                          id="jenis_usaha"
                          onChange={(value, option) =>
                            this.handleSelectCustomChange("jenis_usaha", value, option)
                          }
                          value={this.state.jenis_usaha_id}
                          loading={this.state.isJenisUsahaLoading}
                          style={{ width: "100%" }}
                        >
                          {this.state.list_jenis_usaha.length > 0 &&
                            this.state.list_jenis_usaha.map((item, index) => (
                              <Select.Option key={`jenis-usaha-${index}`} value={item.idJenisUsaha}>
                                {item.namaJenisUsaha}
                              </Select.Option>
                            ))}
                        </Select>
                      </>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col span={8} offset={8}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        {this.state.isEdit ? (
                          <ButtonCustom variant="warning" block onClick={this.handleUbah}>
                            UBAH
                          </ButtonCustom>
                        ) : (
                          <Button type="primary" block onClick={this.handleSimpan}>
                            SIMPAN
                          </Button>
                        )}
                      </Col>

                      <Col span={12}>
                        {this.state.isEdit ? (
                          <Button type="danger" block onClick={this.handleBatal}>
                            BATAL
                          </Button>
                        ) : (
                          <Button type="danger" block onClick={this.handleReset}>
                            RESET
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={this.handleTableChange}
                    pagination={{ current: this.state.page }}
                  />
                </div>

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
                      loading={this.state.isSimpanPerubahanLoading}
                      onClick={this.handleSimpanPerubahan}
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
      </>
    );
  }
}
