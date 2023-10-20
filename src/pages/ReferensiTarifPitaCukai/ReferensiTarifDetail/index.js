import { Button, Col, DatePicker, Icon, Input, InputNumber, Row, Select, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ReferensiTarifDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isDetailTarifLoading: true,

      nomorSkep: null,
      tanggalSkep: null,
      tanggalAwalBerlaku: null,
      nomorPeraturan: null,
      tanggalPeraturan: null,

      idJenisBkc: null,
      namaJenisBkc: null,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idPersonal: null,
      namaPersonal: null,
      satuan: null,

      idJenisProduksiBkc: null,
      kodeJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisHtlRel: null,
      kodeJenisHtlRel: null,
      namaJenisHtlRel: null,
      tarif: null,
      batasProduksi1: null,
      batasProduksi2: null,
      hje1: null,
      hje2: null,
      layer: null,

      kadarAtas: null,
      kadarBawah: null,
      tarifCukaiDalamNegeri: null,
      tarifCukaiImpor: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      listPersonal: [
        {
          idPersonal: "Y",
          namaPersonal: "YA",
        },
        {
          idPersonal: "N",
          namaPersonal: "TIDAK",
        },
      ],

      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getDetailTarif();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idJenisBkc !== this.state.idJenisBkc) {
      if (this.state.idJenisBkc === 3) {
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
              key: "namaGolonganBkc",
              dataIndex: "namaGolonganBkc",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaGolonganBkc"),
            },
            {
              key: "namaJenisProduksiBkc",
              dataIndex: "namaJenisProduksiBkc",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaJenisProduksiBkc"),
            },
            {
              key: "namaJenisHtlRel",
              dataIndex: "namaJenisHtlRel",
              title: "Jenis HPTL/REL",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaJenisHtlRel"),
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
              key: "batasProduksi1",
              title: "Batas I",
              dataIndex: "batasProduksi1",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("batasProduksi1"),
            },
            {
              key: "batasProduksi2",
              title: "Batas II",
              dataIndex: "batasProduksi2",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("batasProduksi2"),
            },
          ],
        });
      }

      if (this.state.idJenisBkc === 2) {
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
              key: "namaGolonganBkc",
              dataIndex: "namaGolonganBkc",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("namaGolonganBkc"),
            },
            {
              key: "namaJenisProduksiBkc",
              dataIndex: "namaJenisProduksiBkc",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("namaJenisProduksiBkc"),
            },
            {
              key: "kadarAtas",
              dataIndex: "kadarAtas",
              title: "Kadar Atas",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kadarAtas"),
            },
            {
              key: "kadarBawah",
              dataIndex: "kadarBawah",
              title: "Kadar Bawah",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kadarBawah"),
            },
            {
              key: "tarifCukaiDalamNegeri",
              dataIndex: "tarifCukaiDalamNegeri",
              title: "Tarif Cukai Dalam Negeri",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarifCukaiDalamNegeri"),
            },
            {
              key: "tarifCukaiImpor",
              dataIndex: "tarifCukaiImpor",
              title: "Tarif Cukai Impor",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarifCukaiImpor"),
            },
          ],
        });
      }
    }
  }

  getDetailTarif = async () => {
    const payload = { idSkepHeader: this.props.match.params.id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-detail-tarif",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailTarifLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nomorSkep: data.nomorSkep,
        tanggalSkep: moment(data.tanggalSkep),
        tanggalAwalBerlaku: moment(data.tanggalAwalBerlaku),
        nomorPeraturan: data.nomorPeraturan,
        tanggalPeraturan: moment(data.tanggalPeraturan),
        idJenisBkc: data.idJenisBkc,
        namaJenisBkc: data.namaJenisBkc,
        dataSource: data.details.map((detail, index) => ({
          key: `referensi-${index}`,
          idTarifBkcDetail: detail.idTarifBkcDetail,
          idJenisBkc: detail.idJenisBkc,
          namaJenisBkc: detail.namaJenisBkc,
          idGolonganBkc: detail.idGolonganBkc,
          namaGolonganBkc: detail.namaGolonganBkc,
          idPersonal: detail.flagPersonal,
          idJenisProduksiBkc:
            detail.idJenisProduksiBkc || detail.satuanJenisProduksiBkc
              ? `${detail.idJenisProduksiBkc} ${detail.satuanJenisProduksiBkc}`
              : null,
          kodeJenisProduksiBkc: detail.kodeJenisProduksiBkc,
          namaJenisProduksiBkc:
            detail.kodeJenisProduksiBkc || detail.namaJenisProduksiBkc
              ? `(${detail.kodeJenisProduksiBkc}) - ${detail.namaJenisProduksiBkc}`
              : null,
          satuanJenisProduksiBkc: detail.satuanJenisProduksiBkc,
          satuanJenisHtlRel: detail.satuanJenisHtlRel,

          idJenisHtlRel:
            detail.idJenisHtlRel || detail.satuanJenisHtlRel
              ? `${detail.idJenisHtlRel} ${detail.satuanJenisHtlRel}`
              : null,
          kodeJenisHtlRel: detail.kodeJenisHtlRel,
          namaJenisHtlRel:
            detail.kodeJenisHtlRel || detail.namaJenisHtlRel
              ? `(${detail.kodeJenisHtlRel}) - ${detail.namaJenisHtlRel}`
              : null,
          tarif: detail.idJenisBkc === 3 ? detail.tarif : null,
          batasProduksi1: detail.batasProduksi1,
          batasProduksi2: detail.batasProduksi2,
          hje1: detail.hje1,
          hje2: detail.hje2,
          layer: detail.layer,

          kadarAtas: detail.kadarAtas,
          kadarBawah: detail.kadarBawah,
          tarifCukaiDalamNegeri:
            detail.idJenisBkc === 2 && detail.idGolonganBkc === 5 ? detail.tarif : null,
          tarifCukaiImpor:
            detail.idJenisBkc === 2 && detail.idGolonganBkc === 4 ? detail.tarif : null,
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
                    <Input id="nomorSkep" value={this.state.nomorSkep} disabled />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalSkep"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalSkep}
                      disabled
                    />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalAwalBerlaku"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalAwalBerlaku}
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
                    <Input id="nomorPeraturan" value={this.state.nomorPeraturan} disabled />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Peraturan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalPeraturan"
                      format="DD-MM-YYYY"
                      style={{ width: "100%" }}
                      value={this.state.tanggalPeraturan}
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
                      id="jenisBkc"
                      style={{ width: "100%" }}
                      value={this.state.idJenisBkc}
                      disabled
                    >
                      <Select.Option value={this.state.idJenisBkc}>
                        {this.state.namaJenisBkc}
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                  {this.state.idJenisBkc && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Golongan</FormLabel>
                        </div>
                        <Select
                          id="golongan"
                          value={this.state.idGolonganBkc}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.idGolonganBkc}>
                            {this.state.namaGolonganBkc}
                          </Select.Option>
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Personal</FormLabel>
                        </div>
                        <Select
                          id="personal"
                          value={this.state.idPersonal}
                          style={{ width: "100%" }}
                          disabled
                        >
                          {this.state.listPersonal.length > 0 &&
                            this.state.listPersonal.map((item, index) => (
                              <Select.Option key={`personal-${index}`} value={item.idPersonal}>
                                {item.namaPersonal}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Produksi</FormLabel>
                        </div>
                        <Select
                          id="jenisProduksi"
                          value={this.state.idJenisProduksiBkc}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.idJenisProduksiBkc}>
                            {this.state.kodeJenisProduksiBkc &&
                              this.state.namaJenisProduksiBkc &&
                              `(${this.state.kodeJenisProduksiBkc}) - ${this.state.namaJenisProduksiBkc}`}
                          </Select.Option>
                        </Select>
                      </Col>
                    </>
                  )}

                  {this.state.idJenisBkc === 3 && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis HPTL/REL</FormLabel>
                        </div>
                        <Select
                          id="jenisHtlRel"
                          value={this.state.idJenisHtlRel}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.idJenisHtlRel}>
                            {this.state.namaJenisHtlRel}
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
                            id="batasProduksi1"
                            value={this.state.batasProduksi1}
                            style={{ flex: 1 }}
                            min={0}
                            disabled
                          />
                          <div>s.d</div>
                          <InputNumber
                            id="batasProduksi2"
                            value={this.state.batasProduksi2}
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

                  {this.state.idJenisBkc === 2 && (
                    <>
                      <Col span={12}>
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Kadar Atas</FormLabel>
                            </div>
                            <InputNumber
                              id="kadarAtas"
                              value={this.state.kadarAtas}
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
                              id="kadarBawah"
                              value={this.state.kadarBawah}
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
                          id="tarifCukaiDalamNegeri"
                          value={this.state.tarifCukaiDalamNegeri}
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
                          id="tarifCukaiImpor"
                          value={this.state.tarifCukaiImpor}
                          style={{ width: "100%" }}
                          min={0}
                          disabled
                        />
                      </Col>
                    </>
                  )}
                </Row>

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={(page) => this.setState({ page: page.current })}
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
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
