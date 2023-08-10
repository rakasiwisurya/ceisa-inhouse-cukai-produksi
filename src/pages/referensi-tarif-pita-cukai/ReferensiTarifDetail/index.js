import React, { Component } from "react";
import { Row, Col, Input, DatePicker, Select, InputNumber, Icon, Button, Table } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ButtonCustom from "components/Button/ButtonCustom";

export default class ReferensiTarifDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isDetailTarifLoading: true,

      nomor_surat: null,
      tanggal_surat: null,
      tanggal_awal_berlaku: null,
      nomor_peraturan: null,
      tanggal_peraturan: null,

      jenis_bkc_id: null,
      jenis_bkc_name: null,
      golongan_id: null,
      golongan_name: null,
      personal_id: null,
      personal_name: null,
      satuan: null,

      jenis_produksi_id: null,
      jenis_produksi_code: null,
      jenis_produksi_name: null,
      jenis_htl_rel_id: null,
      jenis_htl_rel_code: null,
      jenis_htl_rel_name: null,
      tarif: null,
      batas_produksi1: null,
      batas_produksi2: null,
      hje1: null,
      hje2: null,
      layer: null,

      kadar_atas: null,
      kadar_bawah: null,
      tarif_cukai_dalam_negeri: null,
      tarif_cukai_impor: null,

      searchText: null,
      searchedColumn: null,
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
        nomor_surat: data.nomorSkep,
        tanggal_surat: moment(data.tanggalSkep),
        tanggal_awal_berlaku: moment(data.tanggalAwalBerlaku),
        nomor_peraturan: data.nomorPeraturan,
        tanggal_peraturan: moment(data.tanggalPeraturan),
        jenis_bkc_id: data.idJenisBkc,
        jenis_bkc_name: data.namaJenisBkc,
        dataSource: data.details.map((detail, index) => ({
          key: `referensi-${index}`,
          tarif_detail_id: detail.idTarifBkcDetail,
          jenis_bkc_id: detail.idJenisBkc,
          jenis_bkc_name: detail.namaJenisBkc,
          golongan_id: detail.idGolonganBkc,
          golongan_name: detail.namaGolonganBkc,
          personal_id: detail.flagPersonal,
          jenis_produksi_id:
            detail.idJenisProduksiBkc && detail.satuanJenisProduksiBkc
              ? `${detail.idJenisProduksiBkc} ${detail.satuanJenisProduksiBkc}`
              : null,
          jenis_produksi_code: detail.kodeJenisProduksiBkc,
          jenis_produksi_name:
            detail.kodeJenisProduksiBkc && detail.namaJenisProduksiBkc
              ? `(${detail.kodeJenisProduksiBkc}) - ${detail.namaJenisProduksiBkc}`
              : null,
          jenis_produksi_bkc_satuan: detail.satuanJenisProduksiBkc,
          jenis_htl_rel_satuan: detail.satuanJenisHtlRel,

          jenis_htl_rel_id:
            detail.idJenisHtlRel && detail.satuanJenisHtlRel
              ? `${detail.idJenisHtlRel} ${detail.satuanJenisHtlRel}`
              : null,
          jenis_htl_rel_code: detail.kodeJenisHtlRel,
          jenis_htl_rel_name:
            detail.kodeJenisHtlRel && detail.namaJenisHtlRel
              ? `(${detail.kodeJenisHtlRel}) - ${detail.namaJenisHtlRel}`
              : null,
          tarif: detail.idJenisBkc === 3 ? detail.tarif : null,
          batas_produksi1: detail.batasProduksi1,
          batas_produksi2: detail.batasProduksi2,
          hje1: detail.hje1,
          hje2: detail.hje2,
          layer: detail.layer,

          kadar_atas: detail.kadarAtas,
          kadar_bawah: detail.kadarBawah,
          tarif_cukai_dalam_negeri:
            detail.idJenisBkc === 2 && detail.idGolonganBkc === 5 ? detail.tarif : null,
          tarif_cukai_impor:
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
                    <DatePicker
                      id="tanggal_surat"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_surat}
                      disabled
                    />
                  </Col>
                  <Col span={6}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_awal_berlaku"
                      format="DD-MM-YYYY"
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
                      format="DD-MM-YYYY"
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
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
