import React, { Component } from "react";
import { Row, Col, Input, DatePicker, Select, InputNumber, Icon, Button, Table } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";

export default class ReferensiTarifDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isDetailTarifLoading: true,

      nomor_surat: "",
      tanggal_surat: "",
      tanggal_awal_berlaku: "",
      nomor_peraturan: "",
      tanggal_peraturan: "",

      jenis_bkc_id: "",
      jenis_bkc_name: "",
      golongan_id: "",
      golongan_name: "",
      personal_id: "",
      personal_name: "",
      satuan: "",

      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_htl_rel_id: "",
      jenis_htl_rel_name: "",
      tarif: "",
      batas_produksi1: "",
      batas_produksi2: "",
      hje1: "",
      hje2: "",
      layer: "",

      kadar_atas: "",
      kadar_bawah: "",
      tarif_cukai_dalam_negeri: "",
      tarif_cukai_impor: "",

      searchText: "",
      searchedColumn: "",
      page: 1,

      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getDetailTarif();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_bkc_id !== this.state.jenis_bkc_id) {
      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          columns: [
            {
              key: "nomor",
              dataIndex: "nomor",
              title: "Nomor",
              render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
              ),
            },
            {
              key: "golongan_name",
              dataIndex: "golongan_name",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              key: "jenis_produksi_name",
              dataIndex: "jenis_produksi_name",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
            {
              key: "jenis_htl_rel_name",
              dataIndex: "jenis_htl_rel_name",
              title: "Jenis HPTL/REL",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_htl_rel_name"),
            },
            {
              key: "hje1",
              dataIndex: "hje1",
              title: "HJE I",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("hje1"),
            },
            {
              key: "hje2",
              dataIndex: "hje2",
              title: "HJE II",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("hje2"),
            },
            {
              key: "layer",
              dataIndex: "layer",
              title: "Layer",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("layer"),
            },
            {
              key: "tarif",
              title: "Tarif",
              dataIndex: "tarif",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tarif"),
            },
            {
              key: "batas_produksi1",
              title: "Batas I",
              dataIndex: "batas_produksi1",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("batas_produksi1"),
            },
            {
              key: "batas_produksi2",
              title: "Batas II",
              dataIndex: "batas_produksi2",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("batas_produksi2"),
            },
          ],
        });
      }

      if (this.state.jenis_bkc_id === 2) {
        this.setState({
          columns: [
            {
              key: "nomor",
              dataIndex: "nomor",
              title: "Nomor",
              render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
              ),
              ...this.getColumnSearchProps("nomor"),
            },
            {
              key: "golongan_name",
              dataIndex: "golongan_name",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              key: "jenis_produksi_name",
              dataIndex: "jenis_produksi_name",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
            {
              key: "kadar_atas",
              dataIndex: "kadar_atas",
              title: "Kadar Atas",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kadar_atas"),
            },
            {
              key: "kadar_bawah",
              dataIndex: "kadar_bawah",
              title: "Kadar Bawah",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kadar_bawah"),
            },
            {
              key: "tarif_cukai_dalam_negeri",
              dataIndex: "tarif_cukai_dalam_negeri",
              title: "Tarif Cukai Dalam Negeri",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarif_cukai_dalam_negeri"),
            },
            {
              key: "tarif_cukai_impor",
              dataIndex: "tarif_cukai_impor",
              title: "Tarif Cukai Impor",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarif_cukai_impor"),
            },
          ],
        });
      }
    }
  }

  getDetailTarif = async () => {
    // const payload = { idReferensiSkep: this.props.match.params.id };

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/browse-detail-tarif",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDetailTarifLoading: bool }),
    // });

    // if (response) {
    //   const { data } = response.data;

    //   this.setState({
    //     nomor_surat: data.nomorSurat,
    //     tanggal_surat: moment(data.tanggalSurat),
    //     tanggal_awal_berlaku: moment(data.tanggalAwalBerlaku),
    //     nomor_peraturan: data.nomorPeraturan,
    //     tanggal_peraturan: moment(data.tanggalPeraturan),
    //     jenis_bkc_id: data.details[0].idJenisBkc,
    //     jenis_bkc_name: data.details[0].namaJenisBkc,
    //     dataSource: data.details.map((detail, index) => ({
    //       key: `referensi-${index}`,
    //       jenis_bkc_id: detail.idJenisBkc,
    //       jenis_bkc_name: detail.namaJenisBkc,
    //       golongan_id: detail.idGolonganBkc,
    //       golongan_name: detail.namaGolonganBkc,
    //       jenis_produksi_id: detail.idJenisProduksi,
    //       jenis_produksi_code: detail.kodeJenisProduksi,
    //       jenis_produksi_name: detail.namaJenisProduksi,
    //       personal: detail.personal_id,

    //       jenis_htl_rel_id: detail.idJenisHtlRel,
    //       jenis_htl_rel_name: detail.namaJenisHtlRel,
    //       tarif: detail.tarif,
    //       batas_produksi1: detail.batasProduksi1,
    //       batas_produksi2: detail.batasProduksi2,
    //       hje1: detail.hje1,
    //       hje2: detail.hje2,
    //       layer: detail.layer,
    //       satuan: detail.satuan,

    //       kadar_atas: detail.kadarAtas,
    //       kadar_bawah: detail.kadarBawah,
    //       tarif_cukai_dalam_negeri: detail.tarifCukaiDalamNegeri,
    //       tarif_cukai_impor: detail.tarifCukaiImpor,
    //     })),
    //   });
    // }

    this.setState({ isDetailTarifLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        nomor_surat: "Nomor Surat 1",
        tanggal_surat: moment(new Date()),
        tanggal_awal_berlaku: moment(new Date()),
        nomor_peraturan: "Nomor Peraturan 1",
        tanggal_peraturan: moment(new Date()),
        jenis_bkc_id: 3,
        jenis_bkc_name: "HT",
        dataSource: [
          {
            key: 1,
            jenis_bkc_id: 3,
            jenis_bkc_name: "HT",
            golongan_id: 1,
            golongan_name: "I",
            jenis_produksi_id: 1,
            jenis_produksi_code: "HTL",
            jenis_produksi_name: "HASIL TEMBAKAU LAINNYA",
            personal: "YA",

            jenis_htl_rel_id: 1,
            jenis_htl_rel_name: "B",
            tarif: 100,
            batas_produksi1: 200,
            batas_produksi2: 300,
            hje1: 400,
            hje2: 500,
            layer: "Layer 1",
            satuan: "GR",

            kadar_atas: 0,
            kadar_bawah: 0,
            tarif_cukai_dalam_negeri: 0,
            tarif_cukai_impor: 0,
          },
          {
            key: 2,
            jenis_bkc_id: 3,
            jenis_bkc_name: "HT",
            golongan_id: 1,
            golongan_name: "I",
            jenis_produksi_id: 1,
            jenis_produksi_code: "SKM",
            jenis_produksi_name: "SIGARET KRETEK MESIN",
            personal: "YA",

            jenis_htl_rel_id: 1,
            jenis_htl_rel_name: "B",
            tarif: 100,
            batas_produksi1: 200,
            batas_produksi2: 300,
            hje1: 400,
            hje2: 500,
            layer: "Layer 1",
            satuan: "GR",

            kadar_atas: 0,
            kadar_bawah: 0,
            tarif_cukai_dalam_negeri: 0,
            tarif_cukai_impor: 0,
          },
          {
            key: 3,
            jenis_bkc_id: 3,
            jenis_bkc_name: "HT",
            golongan_id: 1,
            golongan_name: "I",
            jenis_produksi_id: 1,
            jenis_produksi_code: "CRT",
            jenis_produksi_name: "CERUTU",
            personal: "YA",

            jenis_htl_rel_id: 1,
            jenis_htl_rel_name: "B",
            tarif: 100,
            batas_produksi1: 200,
            batas_produksi2: 300,
            hje1: 400,
            hje2: 500,
            layer: "Layer 1",
            satuan: "GR",

            kadar_atas: 0,
            kadar_bawah: 0,
            tarif_cukai_dalam_negeri: 0,
            tarif_cukai_impor: 0,
          },
        ],
      });
      this.setState({ isDetailTarifLoading: false });
      clearTimeout(timeout);
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

  render() {
    return (
      <>
        <Container
          menuName="Referensi Tarif dan Pita Cukai"
          contentName="Referensi Tarif Detail"
          hideContentHeader
        >
          {this.state.isDetailTarifLoading ? (
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
                    <Input id="nomor_surat" value={this.state.nomor_surat} disabled />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker id="tanggal_surat" value={this.state.tanggal_surat} disabled />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_awal_berlaku"
                      value={this.state.tanggal_awal_berlaku}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Peraturan</FormLabel>
                    </div>
                    <Input id="nomor_peraturan" value={this.state.nomor_peraturan} disabled />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Peraturan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_peraturan"
                      style={{ width: "100%" }}
                      value={this.state.tanggal_peraturan}
                      disabled
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
                      style={{ width: "100%" }}
                      value={this.state.jenis_bkc_id}
                      disabled
                    >
                      <Select.Option value={this.state.jenis_bkc_id}>
                        {this.state.jenis_bkc_name}
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                  {this.state.jenis_bkc_id && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Golongan</FormLabel>
                        </div>
                        <Select
                          id="golongan"
                          value={this.state.golongan_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.golongan_id}>
                            {this.state.golongan_name}
                          </Select.Option>
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Personal</FormLabel>
                        </div>
                        <Select
                          id="personal"
                          value={this.state.personal_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.personal_id}>
                            {this.state.personal_name}
                          </Select.Option>
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Produksi</FormLabel>
                        </div>
                        <Select
                          id="jenis_produksi"
                          value={this.state.jenis_produksi_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.jenis_produksi_id}>
                            {this.state.jenis_produksi_code &&
                              this.state.jenis_produksi_name &&
                              `(${this.state.jenis_produksi_code}) - ${this.state.jenis_produksi_name}`}
                          </Select.Option>
                        </Select>
                      </Col>
                    </>
                  )}

                  {this.state.jenis_bkc_id === 3 && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis HPTL/REL</FormLabel>
                        </div>
                        <Select
                          id="jenis_htl_rel"
                          value={this.state.jenis_htl_rel_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.jenis_htl_rel_id}>
                            {this.state.jenis_htl_rel_name}
                          </Select.Option>
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="tarif"
                            value={this.state.tarif}
                            style={{ flex: 1 }}
                            min={0}
                            disabled
                          />
                          {this.state.satuan && (
                            <>
                              <div>/</div>
                              <div>{this.state.satuan}</div>
                            </>
                          )}
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Batas Produksi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="batas_produksi1"
                            value={this.state.batas_produksi1}
                            style={{ flex: 1 }}
                            min={0}
                            disabled
                          />
                          <div>s.d</div>
                          <InputNumber
                            id="batas_produksi2"
                            value={this.state.batas_produksi2}
                            style={{ flex: 1 }}
                            min={0}
                            disabled
                          />
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>HJE</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div>
                            <InputNumber
                              id="hje1"
                              value={this.state.hje1}
                              style={{ width: "100%" }}
                              min={0}
                              disabled
                            />
                          </div>
                          <div>s.d</div>
                          <div>
                            <InputNumber
                              id="hje2"
                              value={this.state.hje2}
                              style={{ width: "100%" }}
                              min={0}
                              disabled
                            />
                          </div>
                          {this.state.satuan && (
                            <>
                              <div>/</div>
                              <div>{this.state.satuan}</div>
                            </>
                          )}
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Layer</FormLabel>
                        </div>
                        <Input id="layer" value={this.state.layer} disabled />
                      </Col>
                    </>
                  )}

                  {this.state.jenis_bkc_id === 2 && (
                    <>
                      <Col span={12}>
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Kadar Atas</FormLabel>
                            </div>
                            <InputNumber
                              id="kadar_atas"
                              value={this.state.kadar_atas}
                              style={{ width: "100%" }}
                              min={0}
                              disabled
                            />
                          </Col>

                          <Col span={12}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Kadar Bawah</FormLabel>
                            </div>
                            <InputNumber
                              id="kadar_bawah"
                              value={this.state.kadar_bawah}
                              style={{ width: "100%" }}
                              min={0}
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Cukai Dalam Negeri</FormLabel>
                        </div>
                        <InputNumber
                          id="tarif_cukai_dalam_negeri"
                          value={this.state.tarif_cukai_dalam_negeri}
                          style={{ width: "100%" }}
                          min={0}
                          disabled
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Cukai Impor</FormLabel>
                        </div>
                        <InputNumber
                          id="tarif_cukai_impor"
                          value={this.state.tarif_cukai_impor}
                          style={{ width: "100%" }}
                          min={0}
                          disabled
                        />
                      </Col>
                    </>
                  )}
                </Row>

                {this.state.jenis_bkc_id && (
                  <>
                    <div style={{ marginTop: 30, marginBottom: 20 }}>
                      <Table
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        scroll={{ x: "max-content" }}
                        onChange={this.handleTableChange}
                        pagination={{ current: this.state.page }}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
