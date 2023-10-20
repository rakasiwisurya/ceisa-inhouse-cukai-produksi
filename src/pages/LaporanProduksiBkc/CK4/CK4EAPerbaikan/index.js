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
  notification,
} from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarKota from "components/ModalDaftarKota";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class CK4EAPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Keterangan Lain",
      subtitle5: "Dasar Perbaikan",

      isEditRincian: false,
      editIndexRincian: null,

      isSimpanPerbaikanLoading: false,
      isDetailLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarKotaVisible: false,
      isModalDaftarPenjabatBcVisible: false,

      jenis_bkc_id: 1,

      nama_pemrakarsa: null,
      id_process_pemrakarsa: null,
      jabatan_pemrakarsa: null,
      nip_pemrakarsa: null,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      alamat_nppbkc: null,
      npwp_nppbkc: null,

      jenis_laporan_id: "HARIAN",
      jenis_laporan_name: "HARIAN",
      nomor_pemberitahuan: null,
      tanggal_pemberitahuan: null,
      jenis_barang_kena_cukai: "Etil Alkohol (EA)",

      tanggal_jam_produksi_awal: null,
      tanggal_jam_produksi_akhir: null,
      total_jumlah_produksi: 0,

      ck4_detail_id: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_produksi: null,
      nomor_tangki: null,
      keterangan: null,

      kota_id: null,
      kota_name: null,
      nama_pengusaha: null,

      nomor_surat: null,
      tanggal_surat: null,
      penjabat_bc_nip: null,
      penjabat_bc_name: null,
      keterangan_perbaikan: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      dataSource: [],
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
              dataIndex: "nomor_produksi",
              key: "nomor_produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomor_produksi"),
            },
            {
              title: "Tanggal",
              dataIndex: "tanggal_produksi",
              key: "tanggal_produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggal_produksi"),
            },
          ],
        },
        {
          title: "Nomor / Identitas Tangki",
          dataIndex: "nomor_tangki",
          key: "nomor_tangki",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nomor_tangki"),
        },
        {
          title: "Jumlah (liter)",
          dataIndex: "jumlah_produksi",
          key: "jumlah_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_produksi"),
        },
        {
          title: "Keterangan",
          dataIndex: "keterangan",
          key: "keterangan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("keterangan"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailCk4Ea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;
      this.setState({ total_jumlah_produksi: sumArrayOfObject(dataSource, "jumlah_produksi") });
    }
  }

  getDetailCk4Ea = async () => {
    const payload = { idCk4: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/detail-ea",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nama_pemrakarsa: data.namaPemrakarsa,
        id_process_pemrakarsa: data.idProcessPemrakarsa,
        jabatan_pemrakarsa: data.jabatanPemrakarsa,
        nip_pemrakarsa: data.nipPemrakarsa,
        nppbkc_id: data.idNppbkc,
        nppbkc: data.nppbkc,
        nama_nppbkc: data.namaNppbkc,
        npwp_nppbkc: data.npwp,
        alamat_nppbkc: data.alamatNppbkc,
        jenis_laporan_id: data.jenisLaporan,
        nomor_pemberitahuan: data.nomorPemberitahuan,
        tanggal_pemberitahuan: moment(data.tanggalPemberitahuan),
        tanggal_jam_produksi_awal: moment(data.tanggalJamProduksiAwal),
        tanggal_jam_produksi_akhir: moment(data.tanggalJamProduksiAkhir),
        kota_id: data.idKota,
        kota_name: data.namaKota,
        nama_pengusaha: data.namaPengusaha,
        dataSource: data.details.map((detail, index) => ({
          key: `ck4-detail-${index}`,
          ck4_detail_id: detail.idCk4Detail,
          nomor_produksi: detail.nomorProduksi,
          tanggal_produksi: moment(detail.tanggalProduksi).format("DD-MM-YYYY"),
          jumlah_produksi: detail.jumlahProduksi,
          nomor_tangki: detail.nomorTangki,
          keterangan: detail.keterangan,
        })),
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
  handleTableChange = (page) => {
    this.setState({ page: page.current });
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
      alamat_nppbkc: record.alamat_nppbkc,
      npwp_nppbkc: record.npwp_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataKota = (record) => {
    this.setState({
      kota_id: record.kota_id,
      kota_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };
  handleDataPenjabatBc = (record) => {
    this.setState({
      penjabat_bc_nip: record.penjabat_bc_nip,
      penjabat_bc_name: record.penjabat_bc_name,
    });
    this.handleModalClose("isModalDaftarPenjabatBcVisible");
  };
  handleDeleteApi = async (record, id) => {
    const response = await requestApi({
      service: "produksi",
      method: "delete",
      endpoint: "/delete-detail-ea",
      params: { idCk4Detail: id },
      setLoading: (bool) => this.setState({ isTableLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.handleDeleteRincian(record);
    }
  };

  handleSimpanRincian = () => {
    const { nomor_produksi, tanggal_produksi, jumlah_produksi, nomor_tangki, keterangan } =
      this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          nomor_produksi,
          tanggal_produksi: moment(tanggal_produksi).format("DD-MM-YYYY"),
          jumlah_produksi,
          nomor_tangki,
          keterangan,
        },
      ],
    });

    this.setState({
      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_produksi: null,
      nomor_tangki: null,
      keterangan: null,
    });
  };
  handleEditRincian = (record) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: record.key,
      ck4_detail_id: record.ck4_detail_id,
      nomor_produksi: record.nomor_produksi,
      tanggal_produksi: moment(record.tanggal_produksi, "DD-MM-YYYY"),
      jumlah_produksi: record.jumlah_produksi,
      nomor_tangki: record.nomor_tangki,
      keterangan: record.keterangan,
    });
  };
  handleUbahRincian = () => {
    const {
      ck4_detail_id,
      nomor_produksi,
      tanggal_produksi,
      jumlah_produksi,
      nomor_tangki,
      keterangan,
    } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      ck4_detail_id,
      nomor_produksi,
      tanggal_produksi: moment(tanggal_produksi).format("DD-MM-YYYY"),
      jumlah_produksi,
      nomor_tangki,
      keterangan,
    });

    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      ck4_detail_id: null,
      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_produksi: null,
      nomor_tangki: null,
      keterangan: null,
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
      ck4_detail_id: null,
      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_produksi: null,
      nomor_tangki: null,
      keterangan: null,
    });
  };
  handleReset = () => {
    this.setState({
      ck4_detail_id: null,
      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_produksi: null,
      nomor_tangki: null,
      keterangan: null,
    });
  };
  handleSimpanPerbaikan = async () => {
    const {
      nppbkc_id,
      nama_nppbkc,
      nppbkc,
      alamat_nppbkc,
      npwp_nppbkc,
      jenis_laporan_id,
      nomor_pemberitahuan,
      tanggal_pemberitahuan,
      tanggal_jam_produksi_awal,
      tanggal_jam_produksi_akhir,
      total_jumlah_produksi,

      kota_name,
      nama_pengusaha,
      nomor_surat,
      tanggal_surat,
      penjabat_bc_nip,
      penjabat_bc_name,
      keterangan_perbaikan,
      dataSource,
    } = this.state;

    const details = dataSource.map((item) => ({
      idCk4Detail: item.ck4_detail_id,
      nomorProduksi: item.nomor_produksi,
      tanggalProduksi: moment(item.tanggal_produksi, "DD-MM-YYYY").format("YYYY-MM-DD"),
      jumlahProduksi: item.jumlah_produksi,
      nomorTangki: item.nomor_tangki,
      keterangan: item.keterangan,
    }));

    const payload = {
      details,
      alamatPerusahaan: alamat_nppbkc,
      idCk4: this.props.match.params.id,
      idNppbkc: nppbkc_id,
      jenisLaporan: jenis_laporan_id,
      keteranganPerbaikan: keterangan_perbaikan,
      namaKota: kota_name,
      namaPejabat: penjabat_bc_name,
      namaPengusaha: nama_pengusaha,
      namaPerusahaan: nama_nppbkc,
      nipPenjabatBc: penjabat_bc_nip,
      nomorPemberitahuan: nomor_pemberitahuan,
      nomorSurat: nomor_surat,
      nppbkc: nppbkc,
      npwp: npwp_nppbkc,

      tanggalJamProduksiAkhir: moment(tanggal_jam_produksi_akhir).toDate(),
      tanggalJamProduksiAwal: moment(tanggal_jam_produksi_awal).toDate(),
      tanggalPemberitahuan: moment(tanggal_pemberitahuan).format("YYYY-MM-DD"),
      tanggalSurat: moment(tanggal_surat).format("YYYY-MM-DD"),
      totalJumlahProduksi: total_jumlah_produksi,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/ck4/perbaikan-ea",
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanPerbaikanLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/laporan-ck4`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="EA Perbaikan" hideContentHeader>
          {this.state.isDetailLoading ? (
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
                      <FormLabel>Nama Pemrakarsa</FormLabel>
                    </div>
                    <Input id="nama_pemrakarsa" value={this.state.nama_pemrakarsa} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>ID Proses</FormLabel>
                    </div>
                    <Input
                      id="id_process_pemrakarsa"
                      value={this.state.id_process_pemrakarsa}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jabatan</FormLabel>
                    </div>
                    <Input id="jabatan_pemrakarsa" value={this.state.jabatan_pemrakarsa} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NIP</FormLabel>
                    </div>
                    <Input id="nip_pemrakarsa" value={this.state.nip_pemrakarsa} disabled />
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle2}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Data NPPBKC" style={{ height: 437 }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nama</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <Input id="nama_nppbkc" value={this.state.nama_nppbkc} disabled />
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
                        <Input.TextArea
                          id="alamat_nppbkc"
                          value={this.state.alamat_nppbkc}
                          rows={4}
                          disabled
                        />
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
                          id="jenis_laporan"
                          value={this.state.jenis_laporan_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.jenis_laporan_id}>
                            {this.state.jenis_laporan_name}
                          </Select.Option>
                        </Select>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor Pemberitahuan</FormLabel>
                        </div>
                        <Input
                          id="nomor_pemberitahuan"
                          onChange={this.handleInputChange}
                          value={this.state.nomor_pemberitahuan}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Pemberitahuan</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_pemberitahuan"
                          format="DD-MM-YYYY"
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggal_pemberitahuan", date)
                          }
                          value={this.state.tanggal_pemberitahuan}
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                        </div>
                        <Input disabled value={this.state.jenis_barang_kena_cukai} />
                      </div>
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col span={12}></Col>
                  <Col span={12}>
                    <Card title="Dokumen Produksi">
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Jam Produksi Awal</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_jam_produksi_awal"
                          showTime={{ format: "HH:mm" }}
                          format="DD-MM-YYYY HH:mm"
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggal_jam_produksi_awal", date)
                          }
                          value={this.state.tanggal_jam_produksi_awal}
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Jam Produksi Akhir</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_jam_produksi_akhir"
                          showTime={{ format: "HH:mm" }}
                          format="DD-MM-YYYY HH:mm"
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggal_jam_produksi_akhir", date)
                          }
                          value={this.state.tanggal_jam_produksi_akhir}
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Produksi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Input
                            id="total_jumlah_produksi"
                            value={this.state.total_jumlah_produksi}
                            disabled
                          />
                          <div>Liter</div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle3}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Data Produksi" style={{ height: 334 }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor</FormLabel>
                        </div>
                        <Input
                          id="nomor_produksi"
                          onChange={this.handleInputChange}
                          value={this.state.nomor_produksi}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Produksi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_produksi"
                          format="DD-MM-YYYY"
                          onChange={(date) => this.handleDatepickerChange("tanggal_produksi", date)}
                          value={this.state.tanggal_produksi}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card title="Nomor Tangki - Jumlah Liter - Keterangan" style={{ height: 334 }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Isi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlah_produksi"
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlah_produksi", value)
                            }
                            value={this.state.jumlah_produksi}
                            style={{ flex: 1 }}
                          />
                          <div>Liter</div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor / Identitas Tangki</FormLabel>
                        </div>
                        <Input
                          id="nomor_tangki"
                          onChange={this.handleInputChange}
                          value={this.state.nomor_tangki}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Keterangan</FormLabel>
                        </div>
                        <Input
                          id="keterangan"
                          onChange={this.handleInputChange}
                          value={this.state.keterangan}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
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

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={this.handleTableChange}
                    pagination={{ current: this.state.page }}
                  />
                </div>
              </div>

              <Header>{this.state.subtitle4}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Dibuat di Kota/Kabupaten</FormLabel>
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
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Pengusaha</FormLabel>
                    </div>
                    <Input
                      id="nama_pengusaha"
                      onChange={this.handleInputChange}
                      value={this.state.nama_pengusaha}
                    />
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle5}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
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

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_surat"
                      format="DD-MM-YYYY"
                      onChange={(date) => this.handleDatepickerChange("tanggal_surat", date)}
                      style={{ width: "100%" }}
                      value={this.state.tanggal_surat}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Penjabat BC</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="penjabat_bc_nip"
                        onChange={this.handleInputChange}
                        value={this.state.penjabat_bc_nip}
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
                        id="penjabat_bc_name"
                        onChange={this.handleInputChange}
                        value={this.state.penjabat_bc_name}
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
                      id="keterangan_perbaikan"
                      onChange={this.handleInputChange}
                      value={this.state.keterangan_perbaikan}
                    />
                  </Col>
                </Row>

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