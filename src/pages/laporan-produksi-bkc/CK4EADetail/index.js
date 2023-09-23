import { Button, Card, Col, DatePicker, Icon, Input, InputNumber, Row, Select, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
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

      nama_pemrakarsa: null,
      id_process_pemrakarsa: null,
      jabatan_pemrakarsa: null,
      nip_pemrakarsa: null,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      alamat_nppbkc: null,

      jenis_laporan_id: "HARIAN",
      jenis_laporan_name: "HARIAN",
      nomor_pemberitahuan: null,
      tanggal_pemberitahuan: null,
      jenis_barang_kena_cukai: "Etil Alkohol (EA)",

      tanggal_jam_produksi_awal: null,
      tanggal_jam_produksi_akhir: null,
      total_jumlah_produksi: 0,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_produksi: null,
      nomor_tangki: null,
      keterangan: null,

      kota_id: null,
      kota_name: null,
      nama_pengusaha: null,

      uraian_rincian_file: [],

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
          key: `ck4-${index}`,
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

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="EA Detail" hideContentHeader>
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
                          value={this.state.nomor_pemberitahuan}
                          disabled
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Pemberitahuan</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_pemberitahuan"
                          format="DD-MM-YYYY"
                          value={this.state.tanggal_pemberitahuan}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                        </div>
                        <Input value={this.state.jenis_barang_kena_cukai} disabled />
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
                          value={this.state.tanggal_jam_produksi_awal}
                          style={{ width: "100%" }}
                          disabled
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
                          value={this.state.tanggal_jam_produksi_akhir}
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
                        <Input id="nomor_produksi" value={this.state.nomor_produksi} disabled />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Produksi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_produksi"
                          format="DD-MM-YYYY"
                          value={this.state.tanggal_produksi}
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
                            id="jumlah_produksi"
                            value={this.state.jumlah_produksi}
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
                        <Input id="nomor_tangki" value={this.state.nomor_tangki} disabled />
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
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Dibuat di Kota/Kabupaten</FormLabel>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Input id="kota_name" value={this.state.kota_name} disabled />
                      </div>
                    </div>

                    <div>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Nama Pengusaha</FormLabel>
                      </div>
                      <Input id="nama_pengusaha" value={this.state.nama_pengusaha} disabled />
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
