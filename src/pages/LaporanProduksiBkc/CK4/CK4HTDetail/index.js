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
} from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { endpoints } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";

export default class CK4HTDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Pemberitahu",

      isDetailLoading: true,

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

      idMerkHt: null,
      namaMerkHt: null,
      jenisHt: null,
      hjeHht: null,
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

      searchText: null,
      searchedColumn: null,
      page: 1,

      idKota: null,
      namaKota: null,
      namaPengusaha: null,

      dataSource: [],
      columns: [
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
          dataIndex: "hjeHht",
          key: "hjeHht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("hjeHht"),
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
      endpoint: endpoints.ck4HtDetail,
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
          hjeHht: detail.hje,
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

  render() {
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="CK4 HT Detail">
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
                    <Input id="nomorPemberitahuan" value={this.state.nomorPemberitahuan} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pemberitahuan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalPemberitahuan"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalPemberitahuan}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                    </div>
                    <Input value={this.state.jenisBarangKenaCukai} disabled />
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
                        value={this.state.periodeBulan}
                        style={{ width: "100%" }}
                        disabled
                      >
                        {months.map((item, index) => (
                          <Select.Option key={`periodeBulan-${index}`} value={item.monthCode}>
                            {item.monthName}
                          </Select.Option>
                        ))}
                      </Select>

                      <Select
                        id="periodeTahun"
                        value={this.state.periodeTahun}
                        style={{ width: "100%" }}
                        disabled
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

          <Card title={this.state.subtitle3}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Kep Tarif" style={{ height: 705 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk HT</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="namaMerkHt" value={this.state.namaMerkHt} disabled />
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
                      <Input id="hjeHht" value={this.state.hjeHht} disabled />
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
                        <Input id="nomorProduksi" value={this.state.nomorProduksi} disabled />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Produksi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggalProduksi"
                          format="DD-MM-YYYY"
                          value={this.state.tanggalProduksi}
                          style={{ width: "100%" }}
                          disabled
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
                            value={this.state.jumlahKemasan}
                            style={{ flex: 1 }}
                            disabled
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
                          value={this.state.jumlahProduksi}
                          style={{ width: "100%" }}
                          disabled
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
                            value={this.state.jumlahKemasanDilekatiPita}
                            style={{ flex: 1 }}
                            disabled
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
                      disabled
                    >
                      <Button disabled>
                        <Icon type="upload" /> Upload
                      </Button>
                    </Upload>

                    <Button
                      type="primary"
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
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Dibuat di Kota/Kabupaten</FormLabel>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Input id="namaKota" value={this.state.namaKota} disabled />
                  </div>
                </div>

                <div>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Nama Pengusaha</FormLabel>
                  </div>
                  <Input id="namaPengusaha" value={this.state.namaPengusaha} disabled />
                </div>
              </Col>
            </Row>
          </Card>

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
