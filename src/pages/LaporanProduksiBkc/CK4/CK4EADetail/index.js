import { Button, Card, Col, DatePicker, Icon, Input, InputNumber, Row, Select, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class CK4EADetail extends Component {
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
      nppbkc: null,
      namaNppbkc: null,
      alamatNppbkc: null,

      idJenisLaporan: "HARIAN",
      namaJenisLaporan: "HARIAN",
      nomorPemberitahuan: null,
      tanggalPemberitahuan: null,
      jenisBarangKenaCukai: "Etil Alkohol (EA)",

      tanggalJamProduksiAwal: null,
      tanggalJamProduksiAkhir: null,
      totalJumlahProduksi: 0,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahProduksi: null,
      nomorTangki: null,
      keterangan: null,

      idKota: null,
      namaKota: null,
      namaPengusaha: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

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
          key: `ck4-${index}`,
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

  render() {
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="CK4 EA Detail">
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
                <Card title="Dokumen Produksi">
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Jam Produksi Awal</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalJamProduksiAwal"
                      showTime={{ format: "HH:mm" }}
                      format="DD-MM-YYYY HH:mm"
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
                      id="tanggalJamProduksiAkhir"
                      showTime={{ format: "HH:mm" }}
                      format="DD-MM-YYYY HH:mm"
                      value={this.state.tanggalJamProduksiAkhir}
                      style={{ width: "100%" }}
                      disabled
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

          <Card title={this.state.subtitle3}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Data Produksi" style={{ height: 334 }}>
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

              <Col span={12}>
                <Card title="Nomor Tangki - Jumlah Liter - Keterangan" style={{ height: 334 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Isi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlahProduksi"
                        value={this.state.jumlahProduksi}
                        style={{ flex: 1 }}
                        disabled
                      />
                      <div>Liter</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor / Identitas Tangki</FormLabel>
                    </div>
                    <Input id="nomorTangki" value={this.state.nomorTangki} disabled />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Keterangan</FormLabel>
                    </div>
                    <Input id="keterangan" value={this.state.keterangan} disabled />
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

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
