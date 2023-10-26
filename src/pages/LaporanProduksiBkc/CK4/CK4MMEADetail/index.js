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
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import React, { Component } from "react";
import { months, years } from "utils/times";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ButtonCustom from "components/Button/ButtonCustom";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class CK4MMEADetail extends Component {
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

      idJenisLaporan: null,
      namaJenisLaporan: null,
      nomorPemberitahuan: null,
      tanggalPemberitahuan: null,
      jenisBarangKenaCukai: "Minuman Mengandung Etil Alkohol (MMEA)",

      tanggalJamProduksiAwal: null,
      tanggalJamPproduksiAkhir: null,
      periodeBulan: null,
      periodeTahun: null,
      totalJumlahKemasan: 0,
      totalJumlahKemasanDilekatiPita: 0,
      totalJumlahProduksi: 0,

      idMerkMmea: null,
      namaMerkMmea: null,
      isiMmea: null,
      tarifMmea: null,
      jenisKemasanMmea: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,

      idKota: null,
      namaKota: null,
      namaPengusaha: null,

      uraianRincianFile: [],

      searchText: null,
      searchedColumn: null,
      page: 1,

      listJenisLaporan: [
        {
          idJenisLaporan: "HARIAN",
          namaJenisLaporan: "HARIAN",
        },
        {
          idJenisLaporan: "BULANAN",
          namaJenisLaporan: "BULANAN",
        },
      ],

      dataSource: [],
      columns: [
        {
          title: "Merk MMEA",
          dataIndex: "namaMerkMmea",
          key: "namaMerkMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaMerkMmea"),
        },
        {
          title: "Isi (ml)",
          dataIndex: "isiMmea",
          key: "isiMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isiMmea"),
        },
        {
          title: "Tarif (Rp)",
          dataIndex: "tarifMmea",
          key: "tarifMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarifMmea"),
        },
        {
          title: "Jenis Kemasan",
          dataIndex: "jenisKemasanMmea",
          key: "jenisKemasanMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenisKemasanMmea"),
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
          title: "Jumlah Kemasan",
          dataIndex: "jumlahKemasan",
          key: "jumlahKemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahKemasan"),
        },
        {
          title: "Jumlah Produksi",
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
    this.getDetailCk4Mmea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;
      this.setState({
        totalJumlahKemasan: sumArrayOfObject(dataSource, "jumlahKemasan"),
        totalJumlahKemasanDilekatiPita: sumArrayOfObject(dataSource, "jumlahKemasanDilekatiPita"),
        totalJumlahProduksi: sumArrayOfObject(dataSource, "jumlahProduksi"),
      });
    }
  }

  getDetailCk4Mmea = async () => {
    const payload = { idCk4: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/detail-mmea",
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
        namaNppbkc: data.namaNppbkc,
        nppbkc: data.nppbkc,
        alamatNppbkc: data.alamatNppbkc,
        npwpNppbkc: data.npwp,

        idJenisLaporan: data.jenisLaporan,
        nomorPemberitahuan: data.nomorPemberitahuan,
        tanggalPemberitahuan: moment(data.tanggalPemberitahuan),

        tanggalJamProduksiAwal: moment(data.tanggalJamProduksiAwal),
        tanggalJamPproduksiAkhir: moment(data.tanggalJamProduksiAkhir),
        periodeBulan: data.periodeBulan,
        periodeTahun: data.periodeTahun,

        idKota: data.idKota,
        namaKota: data.namaKota,
        namaPengusaha: data.namaPengusaha,
        dataSource: data.details.map((detail, index) => ({
          key: `ck4-${index}`,
          idCk4Detail: detail.idCk4Detail,
          idTarifMerkDetail: detail.idTarifMerkDetail,
          idMerkMmea: detail.idMerkMmea,
          namaMerkMmea: detail.namaMerkMmea,
          isiMmea: detail.isiMmea,
          tarifMmea: detail.tarifMmea,
          jenisKemasanMmea: detail.jenisKemasanMmea,
          negaraAsalMmea: detail.negaraAsal,

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
    this.setState({ searchText: "" });
  };
  handleTableChange = (page) => {
    this.setState({ page: page.current });
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="MMEA Detail" hideContentHeader>
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
                    <Input id="namaPemrakarsa" value={this.state.namaPemrakarsa} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>ID Proses</FormLabel>
                    </div>
                    <Input
                      id="idProcessPemrakarsa"
                      value={this.state.idProcessPemrakarsa}
                      disabled
                    />
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
                          <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>NPPBKC</FormLabel>
                        </div>
                        <Input
                          id="nppbkc"
                          onChange={this.handleInputChange}
                          value={this.state.nppbkc}
                          disabled
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Alamat</FormLabel>
                        </div>
                        <Input.TextArea
                          id="alamatNppbkc"
                          onChange={this.handleInputChange}
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
                          {this.state.listJenisLaporan.length > 0 &&
                            this.state.listJenisLaporan.map((item, index) => (
                              <Select.Option
                                key={`jenis-laporan-${index}`}
                                value={item.idJenisLaporan}
                              >
                                {item.namaJenisLaporan}
                              </Select.Option>
                            ))}
                        </Select>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor Pemberitahuan</FormLabel>
                        </div>
                        <Input
                          id="nomorPemberitahuan"
                          value={this.state.nomorPemberitahuan}
                          disabled
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Pemberitahuan</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggalPemberitahuan"
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
                      {this.state.idJenisLaporan === "HARIAN" && (
                        <>
                          <div style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Tanggal Jam Produksi Awal</FormLabel>
                            </div>
                            <DatePicker
                              id="tanggalJamProduksiAwal"
                              showTime={{ format: "HH:mm" }}
                              format="YYYY-MM-DD HH:mm"
                              value={this.state.tanggalJamProduksiAwal}
                              style={{ width: "100%" }}
                              disabled
                            />
                          </div>

                          <div style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Tanggal Jam Produksi Akhir</FormLabel>
                            </div>
                            <DatePicker
                              id="tanggalJamPproduksiAkhir"
                              showTime={{ format: "HH:mm" }}
                              format="YYYY-MM-DD HH:mm"
                              value={this.state.tanggalJamPproduksiAkhir}
                              style={{ width: "100%" }}
                              disabled
                            />
                          </div>
                        </>
                      )}

                      {this.state.idJenisLaporan === "BULANAN" && (
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
                                <Select.Option
                                  key={`periode-bulan-${index}`}
                                  value={item.month_code}
                                >
                                  {item.month_name}
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
                                <Select.Option
                                  key={`periode-tahun-${index}`}
                                  value={item.year_code}
                                >
                                  {item.year_name}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      )}

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
              </div>

              <Header>{this.state.subtitle3}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Kep Tarif" style={{ height: 705 }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Merk MMEA</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <Input id="namaMerkMmea" value={this.state.namaMerkMmea} disabled />
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Isi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Input id="isiMmea" value={this.state.isiMmea} disabled />
                          <div style={{ display: "flex", gap: 3 }}>
                            <div>Mililiter</div>
                            <div>(ml)</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Kemasan</FormLabel>
                        </div>
                        <Input id="jenisKemasanMmea" value={this.state.jenisKemasanMmea} disabled />
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
                              value={this.state.tanggalProduksi}
                              style={{ width: "100%" }}
                              disabled
                            />
                          </div>
                        </Card>
                      </Col>

                      <Col span={24}>
                        <Card title="Jumlah Produksi">
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
                              <div>Liter</div>
                            </div>
                          </div>

                          <div>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Jumlah Produksi</FormLabel>
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
                            <InputNumber
                              id="jumlahKemasanDilekatiPita"
                              value={this.state.jumlahKemasanDilekatiPita}
                              style={{ width: "100%" }}
                              disabled
                            />
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
                        <div style={{ position: "relative" }}>
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
                            onClick={this.handleInsertFileToTable}
                            style={{ marginTop: 10 }}
                            disabled={this.state.uraianRincianFile.length === 0}
                          >
                            Insert To Table
                          </Button>
                        </div>
                      </div>
                    </Card>
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
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
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
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
