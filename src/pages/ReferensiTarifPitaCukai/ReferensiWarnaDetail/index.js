import { Button, Card, Col, DatePicker, Icon, Input, Row, Select, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ReferensiWarnaDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",

      isDetailWarnaLoading: true,
      isJenisBkcLoading: true,

      nomorSkep: null,
      tanggalSkep: null,
      tanggalAwalBerlaku: null,

      idJenisBkc: null,
      namaJenisBkc: null,
      kodeWarna: null,
      warna: null,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idJenisProduksiBkc: null,
      kodeJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisUsaha: null,
      namaJenisUsaha: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getDetailWarna();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idJenisBkc !== this.state.idJenisBkc) {
      if (this.state.idJenisBkc === 3) {
        this.setState({
          columns: [
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
              dataIndex: "kodeWarna",
              key: "kodeWarna",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kodeWarna"),
            },
            {
              title: "Warna",
              dataIndex: "warna",
              key: "warna",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("warna"),
            },
            {
              title: "Golongan",
              dataIndex: "namaGolonganBkc",
              key: "namaGolonganBkc",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("namaGolonganBkc"),
            },
            {
              title: "Jenis Produksi",
              dataIndex: "namaJenisProduksiBkc",
              key: "namaJenisProduksiBkc",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("namaJenisProduksiBkc"),
            },
          ],
        });
      }

      if (this.state.idJenisBkc === 2) {
        this.setState({
          columns: [
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
              dataIndex: "kodeWarna",
              key: "kodeWarna",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("kodeWarna"),
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
              dataIndex: "namaGolonganBkc",
              key: "namaGolonganBkc",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaGolonganBkc"),
            },
            {
              title: "Jenis Produksi",
              dataIndex: "namaJenisProduksiBkc",
              key: "namaJenisProduksiBkc",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaJenisProduksiBkc"),
            },
            {
              title: "Jenis Usaha",
              dataIndex: "namaJenisUsaha",
              key: "namaJenisUsaha",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaJenisUsaha"),
            },
          ],
        });
      }
    }
  }

  getDetailWarna = async () => {
    const payload = { idSkepHeader: this.props.match.params.id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-detail-warna",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailWarnaLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nomorSkep: data.nomorSkep,
        tanggalSkep: moment(data.tanggalSkep),
        idJenisBkc: data.idJenisBkc,
        namaJenisBkc: data.namaJenisBkc,
        tanggalAwalBerlaku: moment(data.tanggalAwalBerlaku),
        dataSource: data.details.map((detail, index) => ({
          key: `referensi-${index}`,
          idWarnaBkcDetail: detail.idWarnaBkcDetail,
          idJenisBkc: detail.idJenisBkc,
          namaJenisBkc: detail.namaJenisBkc,
          kodeWarna: detail.kodeWarna,
          warna: detail.warna,
          idGolonganBkc: detail.idGolonganBkc,
          namaGolonganBkc: detail.namaGolonganBkc,
          idJenisProduksiBkc: detail.idJenisProduksiBkc,
          kodeJenisProduksiBkc: detail.kodeJenisProduksiBkc,
          namaJenisProduksiBkc: `(${detail.kodeJenisProduksiBkc}) - ${detail.namaJenisProduksiBkc}`,
          idJenisUsaha: detail.idJenisUsaha,
          namaJenisUsaha: detail.namaJenisUsaha,
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
    if (this.state.isDetailWarnaLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Refrensi Tarif dan Pita Cukai" contentName="Referensi Warna Detail">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
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
                  style={{ width: "100%" }}
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
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
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

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Kode Warna</FormLabel>
                </div>
                <Input id="kodeWarna" value={this.state.kodeWarna} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Warna</FormLabel>
                </div>
                <Input id="warna" value={this.state.warna} disabled />
              </Col>

              {this.state.idJenisBkc && (
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
              )}

              {this.state.idJenisBkc && (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Produksi</FormLabel>
                  </div>
                  <Select
                    id="jenisProduksiBkc"
                    value={this.state.idJenisProduksiBkc}
                    style={{ width: "100%" }}
                    disabled
                  >
                    <Select.Option value={this.state.idJenisProduksiBkc}>
                      {this.state.kodeJenisProduksiBkc || this.state.namaJenisProduksiBkc
                        ? `${
                            this.state.kodeJenisProduksiBkc &&
                            `(${this.state.kodeJenisProduksiBkc}) - `
                          }${this.state.namaJenisProduksiBkc}`
                        : null}
                    </Select.Option>
                  </Select>
                </Col>
              )}

              <Col span={12}>
                {this.state.idJenisBkc === 2 && (
                  <>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Usaha</FormLabel>
                    </div>
                    <Select
                      id="jenisUsaha"
                      value={this.state.idJenisUsaha}
                      style={{ width: "100%" }}
                      disabled
                    >
                      <Select.Option value={this.state.idJenisUsaha}>
                        {this.state.namaJenisUsaha}
                      </Select.Option>
                    </Select>
                  </>
                )}
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
