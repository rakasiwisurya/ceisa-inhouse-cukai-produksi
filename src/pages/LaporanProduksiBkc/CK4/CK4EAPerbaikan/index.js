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

      idJenisBkc: 1,

      namaPemrakarsa: null,
      idProcessPemrakarsa: null,
      jabatanPemrakarsa: null,
      nipPemrakarsa: null,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      alamatNppbkc: null,
      npwpNppbkc: null,

      idJenisLaporan: "HARIAN",
      namaJenisLaporan: "HARIAN",
      nomorPemberitahuan: null,
      tanggalPemberitahuan: null,
      jenisBarangKenaCukai: "Etil Alkohol (EA)",

      tanggalJamProduksiAwal: null,
      tanggalJamProduksiAkhir: null,
      totalJumlahProduksi: 0,

      idCk4Detail: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahProduksi: null,
      nomorTangki: null,
      keterangan: null,

      idKota: null,
      namaKota: null,
      namaPengusaha: null,

      nomorSurat: null,
      tanggalSurat: null,
      idPenjabatBc: null,
      namaPenjabatBc: null,
      keteranganPerbaikan: null,

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
          title: "Nomor / Identitas Tangki",
          dataIndex: "nomorTangki",
          key: "nomorTangki",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nomorTangki"),
        },
        {
          title: "Jumlah (liter)",
          dataIndex: "jumlahProduksi",
          key: "jumlahProduksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahProduksi"),
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
      this.setState({ totalJumlahProduksi: sumArrayOfObject(dataSource, "jumlahProduksi") });
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
        namaPemrakarsa: data.namaPemrakarsa,
        idProcessPemrakarsa: data.idProcessPemrakarsa,
        jabatanPemrakarsa: data.jabatanPemrakarsa,
        nipPemrakarsa: data.nipPemrakarsa,
        idNppbkc: data.idNppbkc,
        nppbkc: data.nppbkc,
        namaNppbkc: data.namaNppbkc,
        npwpNppbkc: data.npwp,
        alamatNppbkc: data.alamatNppbkc,
        idJenisLaporan: data.jenisLaporan,
        nomorPemberitahuan: data.nomorPemberitahuan,
        tanggalPemberitahuan: moment(data.tanggalPemberitahuan),
        tanggalJamProduksiAwal: moment(data.tanggalJamProduksiAwal),
        tanggalJamProduksiAkhir: moment(data.tanggalJamProduksiAkhir),
        idKota: data.idKota,
        namaKota: data.namaKota,
        namaPengusaha: data.namaPengusaha,
        dataSource: data.details.map((detail, index) => ({
          key: `ck4-detail-${index}`,
          idCk4Detail: detail.idCk4Detail,
          nomorProduksi: detail.nomorProduksi,
          tanggalProduksi: moment(detail.tanggalProduksi).format("DD-MM-YYYY"),
          jumlahProduksi: detail.jumlahProduksi,
          nomorTangki: detail.nomorTangki,
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
      idNppbkc: record.idNppbkc,
      nppbkc: record.nppbkc,
      namaNppbkc: record.namaNppbkc,
      alamatNppbkc: record.alamatNppbkc,
      npwpNppbkc: record.npwpNppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataKota = (record) => {
    this.setState({
      idKota: record.idKota,
      namaKota: record.namaKota,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };
  handleDataPenjabatBc = (record) => {
    this.setState({
      idPenjabatBc: record.idPenjabatBc,
      namaPenjabatBc: record.namaPenjabatBc,
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
    const { nomorProduksi, tanggalProduksi, jumlahProduksi, nomorTangki, keterangan } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          nomorProduksi,
          tanggalProduksi: moment(tanggalProduksi).format("DD-MM-YYYY"),
          jumlahProduksi,
          nomorTangki,
          keterangan,
        },
      ],
    });

    this.setState({
      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahProduksi: null,
      nomorTangki: null,
      keterangan: null,
    });
  };
  handleEditRincian = (record) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: record.key,
      idCk4Detail: record.idCk4Detail,
      nomorProduksi: record.nomorProduksi,
      tanggalProduksi: moment(record.tanggalProduksi, "DD-MM-YYYY"),
      jumlahProduksi: record.jumlahProduksi,
      nomorTangki: record.nomorTangki,
      keterangan: record.keterangan,
    });
  };
  handleUbahRincian = () => {
    const { idCk4Detail, nomorProduksi, tanggalProduksi, jumlahProduksi, nomorTangki, keterangan } =
      this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      idCk4Detail,
      nomorProduksi,
      tanggalProduksi: moment(tanggalProduksi).format("DD-MM-YYYY"),
      jumlahProduksi,
      nomorTangki,
      keterangan,
    });

    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      idCk4Detail: null,
      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahProduksi: null,
      nomorTangki: null,
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
      idCk4Detail: null,
      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahProduksi: null,
      nomorTangki: null,
      keterangan: null,
    });
  };
  handleReset = () => {
    this.setState({
      idCk4Detail: null,
      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahProduksi: null,
      nomorTangki: null,
      keterangan: null,
    });
  };
  handleSimpanPerbaikan = async () => {
    const {
      idNppbkc,
      namaNppbkc,
      nppbkc,
      alamatNppbkc,
      npwpNppbkc,
      idJenisLaporan,
      nomorPemberitahuan,
      tanggalPemberitahuan,
      tanggalJamProduksiAwal,
      tanggalJamProduksiAkhir,
      totalJumlahProduksi,

      namaKota,
      namaPengusaha,
      nomorSurat,
      tanggalSurat,
      idPenjabatBc,
      namaPenjabatBc,
      keteranganPerbaikan,
      dataSource,
    } = this.state;

    const details = dataSource.map((item) => ({
      idCk4Detail: item.idCk4Detail,
      nomorProduksi: item.nomorProduksi,
      tanggalProduksi: moment(item.tanggalProduksi, "DD-MM-YYYY").format("YYYY-MM-DD"),
      jumlahProduksi: item.jumlahProduksi,
      nomorTangki: item.nomorTangki,
      keterangan: item.keterangan,
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
      namaPerusahaan: namaNppbkc,
      nipPenjabatBc: idPenjabatBc,
      nomorPemberitahuan: nomorPemberitahuan,
      nomorSurat: nomorSurat,
      nppbkc: nppbkc,
      npwp: npwpNppbkc,

      tanggalJamProduksiAkhir: moment(tanggalJamProduksiAkhir).toDate(),
      tanggalJamProduksiAwal: moment(tanggalJamProduksiAwal).toDate(),
      tanggalPemberitahuan: moment(tanggalPemberitahuan).format("YYYY-MM-DD"),
      tanggalSurat: moment(tanggalSurat).format("YYYY-MM-DD"),
      totalJumlahProduksi: totalJumlahProduksi,
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
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="CK4 EA Perbaikan">
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
                    <Input.TextArea
                      id="alamatNppbkc"
                      value={this.state.alamatNppbkc}
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
                      onChange={(date) => this.handleDatepickerChange("tanggalPemberitahuan", date)}
                      value={this.state.tanggalPemberitahuan}
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
                <Card title="Dokumen Produksi">
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Jam Produksi Awal</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalJamProduksiAwal"
                      showTime={{ format: "HH:mm" }}
                      format="DD-MM-YYYY HH:mm"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggalJamProduksiAwal", date)
                      }
                      value={this.state.tanggalJamProduksiAwal}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Jam Produksi Akhir</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalJamProduksiAkhir"
                      showTime={{ format: "HH:mm" }}
                      format="DD-MM-YYYY HH:mm"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggalJamProduksiAkhir", date)
                      }
                      value={this.state.tanggalJamProduksiAkhir}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="totalJumlahProduksi"
                        value={this.state.totalJumlahProduksi}
                        disabled
                      />
                      <div>Liter</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle3} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Data Produksi" style={{ height: 334 }}>
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
                      onChange={(date) => this.handleDatepickerChange("tanggalProduksi", date)}
                      value={this.state.tanggalProduksi}
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
                        id="jumlahProduksi"
                        onChange={(value) => this.handleInputNumberChange("jumlahProduksi", value)}
                        value={this.state.jumlahProduksi}
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
                      id="nomorTangki"
                      onChange={this.handleInputChange}
                      value={this.state.nomorTangki}
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
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            scroll={{ x: "max-content" }}
            onChange={this.handleTableChange}
            pagination={{ current: this.state.page }}
            style={{ marginTop: 30, marginBottom: 30 }}
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
                    id="idPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.idPenjabatBc}
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
