import { Button, Card, Col, DatePicker, Icon, Input, Row, Select, Table, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { capitalize } from "utils/formatter";
import { requestApi } from "utils/requestApi";

export default class ReferensiWarnaRekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",
      isEdit: false,
      editIndex: null,

      isJenisBkcLoading: true,
      isJenisProduksiLoading: true,
      isJenisUsahaLoading: true,
      isGolonganLoading: true,
      isRekamLoading: false,

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
      namaJenisProduksiBkc: null,
      idJenisUsaha: null,
      namaJenisUsaha: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      listJenisBkc: [],
      listGolongan: [],
      listJenisProduksi: [],
      listJenisUsaha: [],
      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getJenisBkc();
    this.getListJenisUsaha();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idJenisBkc !== this.state.idJenisBkc) {
      if (this.state.idJenisBkc) {
        this.getListGolongan();
        this.getListJenisProduksi();
      }

      if (this.state.idJenisBkc === 3) {
        this.setState({
          columns: [
            {
              title: "Aksi",
              dataIndex: "aksi",
              key: "aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <ButtonCustom
                    variant="warning"
                    icon="form"
                    onClick={() => this.handleEdit(record)}
                  />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(record)} />
                </div>
              ),
            },
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
          ],
        });
      }

      if (this.state.idJenisBkc === 2) {
        this.setState({
          columns: [
            {
              title: "Aksi",
              dataIndex: "aksi",
              key: "aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <ButtonCustom
                    variant="warning"
                    icon="form"
                    onClick={() => this.handleEdit(record)}
                  />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(record)} />
                </div>
              ),
            },
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

  getJenisBkc = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisBkc,
      setLoading: (bool) => this.setState({ isJenisBkcLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item) => item);
      newData.splice(0, 1);
      this.setState({ listJenisBkc: newData });
    }
  };
  getListGolongan = async () => {
    const payload = { idJenisBkc: this.state.idJenisBkc };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listGolongan,
      params: payload,
      setLoading: (bool) => this.setState({ isGolonganLoading: bool }),
    });

    if (response) this.setState({ listGolongan: response.data.data });
  };
  getListJenisProduksi = async () => {
    const payload = { idJenisBkc: this.state.idJenisBkc };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisProduksiByJenisBkc,
      params: payload,
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ listJenisProduksi: response.data.data });
  };
  getListJenisUsaha = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisUsaha,
      setLoading: (bool) => this.setState({ isJenisUsahaLoading: bool }),
    });

    if (response) this.setState({ listJenisUsaha: response.data.data });
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

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      [`id${capitalize(field, false)}`]: value,
      [`nama${capitalize(field, false)}`]: option.props.children,
    });
  };

  handleSimpan = () => {
    const {
      idJenisBkc,
      namaJenisBkc,
      kodeWarna,
      warna,
      idGolonganBkc,
      namaGolonganBkc,
      idJenisProduksiBkc,
      namaJenisProduksiBkc,
      idJenisUsaha,
      namaJenisUsaha,
    } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          idJenisBkc,
          namaJenisBkc,
          kodeWarna,
          warna,
          idGolonganBkc,
          namaGolonganBkc,
          idJenisProduksiBkc,
          namaJenisProduksiBkc,
          idJenisUsaha,
          namaJenisUsaha,
        },
      ],
    });

    this.setState({
      kodeWarna: null,
      warna: null,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisUsaha: null,
      namaJenisUsaha: null,
    });
  };
  handleReset = () => {
    const resetData = {
      isEdit: false,

      kodeWarna: null,
      warna: null,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisUsaha: null,
      namaJenisUsaha: null,
    };

    if (this.state.dataSource.length === 0) {
      resetData.idJenisBkc = null;
      resetData.namaJenisBkc = null;
    }

    this.setState(resetData);
  };
  handleUbah = () => {
    const {
      idJenisBkc,
      namaJenisBkc,
      kodeWarna,
      warna,
      idGolonganBkc,
      namaGolonganBkc,
      idJenisProduksiBkc,
      namaJenisProduksiBkc,
      idJenisUsaha,
      namaJenisUsaha,
    } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndex);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      idJenisBkc,
      namaJenisBkc,
      kodeWarna,
      warna,
      idGolonganBkc,
      namaGolonganBkc,
      idJenisProduksiBkc,
      namaJenisProduksiBkc,
      idJenisUsaha,
      namaJenisUsaha,
    });
    this.setState({
      isEdit: false,
      editIndex: null,
      kodeWarna: null,
      warna: null,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisUsaha: null,
      namaJenisUsaha: null,
      dataSource: newDataSource,
    });
  };
  handleBatal = () => {
    this.setState({
      isEdit: false,
      kodeWarna: null,
      warna: null,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisUsaha: null,
      namaJenisUsaha: null,
    });
  };

  handleEdit = (record) => {
    this.setState({
      isEdit: true,
      editIndex: record.key,
      idJenisBkc: record.idJenisBkc,
      namaJenisBkc: record.namaJenisBkc,
      kodeWarna: record.kodeWarna,
      warna: record.warna,
      idGolonganBkc: record.idGolonganBkc,
      namaGolonganBkc: record.namaGolonganBkc,
      idJenisProduksiBkc: record.idJenisProduksiBkc,
      namaJenisProduksiBkc: record.namaJenisProduksiBkc,
      idJenisUsaha: record.idJenisUsaha,
      namaJenisUsaha: record.namaJenisUsaha,
    });
  };
  handleDelete = (record) => {
    const updatedDataSource = this.state.dataSource.filter((item) => item.key !== record.key);
    this.setState({ dataSource: updatedDataSource });
  };

  handleRekam = async () => {
    const details = this.state.dataSource.map((item) => {
      const data = {
        kodeWarna: item.kodeWarna,
        warna: item.warna,
        idGolonganBkc: item.idGolonganBkc,
        idJenisProduksiBkc: item.idJenisProduksiBkc,
      };

      if (this.state.idJenisBkc === 2) {
        data.idJenisUsaha = item.idJenisUsaha;
      }

      return data;
    });

    const payload = {
      nomorSkep: this.state.nomorSkep,
      tanggalSkep: moment(this.state.tanggalSkep).format("YYYY-MM-DD"),
      tanggalAwalBerlaku: moment(this.state.tanggalAwalBerlaku).format("YYYY-MM-DD"),
      idJenisBkc: this.state.idJenisBkc,
      details,
    };

    const response = await requestApi({
      service: "referensi",
      method: "post",
      endpoint: endpoints.referensiWarnaRekam,
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/referensi-tarif-warna`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Refrensi Tarif dan Pita Cukai" contentName="Referensi Warna Rekam">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Surat</FormLabel>
                </div>
                <Input
                  id="nomorSkep"
                  onChange={this.handleInputChange}
                  value={this.state.nomorSkep}
                />
              </Col>

              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Surat</FormLabel>
                </div>
                <DatePicker
                  id="tanggalSkep"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("tanggalSkep", date)}
                  value={this.state.tanggalSkep}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="tanggalAwalBerlaku"
                  format="DD-MM-YYYY"
                  onChange={(value) => this.handleDatepickerChange("tanggalAwalBerlaku", value)}
                  value={this.state.tanggalAwalBerlaku}
                  style={{ width: "100%" }}
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
                  onChange={(value, option) => {
                    this.setState({
                      idGolonganBkc: null,
                      namaGolonganBkc: null,
                      idJenisProduksiBkc: null,
                      namaJenisProduksiBkc: null,
                      idJenisUsaha: null,
                      namaJenisUsaha: null,
                      listGolongan: [],
                      listJenisProduksi: [],
                    });
                    this.handleSelectCustomChange("jenisBkc", value, option);
                  }}
                  style={{ width: "100%" }}
                  value={this.state.idJenisBkc}
                  loading={this.state.isJenisBkcLoading}
                  disabled={this.state.dataSource.length > 0}
                >
                  {this.state.listJenisBkc.length > 0 &&
                    this.state.listJenisBkc.map((item, index) => (
                      <Select.Option key={`jenisBkc-${index}`} value={item.idJenisBkc}>
                        {item.namaJenisBkc}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Kode Warna</FormLabel>
                </div>
                <Input
                  id="kodeWarna"
                  onChange={this.handleInputChange}
                  value={this.state.kodeWarna}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Warna</FormLabel>
                </div>
                <Input id="warna" onChange={this.handleInputChange} value={this.state.warna} />
              </Col>

              {this.state.idJenisBkc && (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Golongan</FormLabel>
                  </div>
                  <Select
                    id="golonganBkc"
                    onChange={(value, option) =>
                      this.handleSelectCustomChange("golonganBkc", value, option)
                    }
                    value={this.state.idGolonganBkc}
                    loading={this.state.isGolonganLoading}
                    style={{ width: "100%" }}
                  >
                    {this.state.listGolongan.length > 0 &&
                      this.state.listGolongan.map((item, index) => (
                        <Select.Option key={`golonganBkc-${index}`} value={item.idGolonganBkc}>
                          {item.namaGolonganBkc}
                        </Select.Option>
                      ))}
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
                    onChange={(value, option) =>
                      this.handleSelectCustomChange("jenisProduksiBkc", value, option)
                    }
                    value={this.state.idJenisProduksiBkc}
                    loading={this.state.isJenisProduksiLoading}
                    style={{ width: "100%" }}
                  >
                    {this.state.listJenisProduksi.length > 0 &&
                      this.state.listJenisProduksi.map((item, index) => (
                        <Select.Option
                          key={`jenisProduksiBkc-${index}`}
                          value={item.idJenisProduksi}
                        >
                          {`${item.kodeJenisProduksi} - ${item.namaJenisProduksi}`}
                        </Select.Option>
                      ))}
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
                      onChange={(value, option) =>
                        this.handleSelectCustomChange("jenisUsaha", value, option)
                      }
                      value={this.state.idJenisUsaha}
                      loading={this.state.isJenisUsahaLoading}
                      style={{ width: "100%" }}
                    >
                      {this.state.listJenisUsaha.length > 0 &&
                        this.state.listJenisUsaha.map((item, index) => (
                          <Select.Option key={`jenisUsaha-${index}`} value={item.idJenisUsaha}>
                            {item.namaJenisUsaha}
                          </Select.Option>
                        ))}
                    </Select>
                  </>
                )}
              </Col>
            </Row>
          </Card>

          <Row>
            <Col span={8} offset={8}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  {this.state.isEdit ? (
                    <ButtonCustom variant="warning" block onClick={this.handleUbah}>
                      UBAH
                    </ButtonCustom>
                  ) : (
                    <Button type="primary" block onClick={this.handleSimpan}>
                      SIMPAN
                    </Button>
                  )}
                </Col>

                <Col span={12}>
                  {this.state.isEdit ? (
                    <Button type="danger" block onClick={this.handleBatal}>
                      BATAL
                    </Button>
                  ) : (
                    <Button type="danger" block onClick={this.handleReset}>
                      RESET
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
            onChange={(page) => this.setState({ page: page.current })}
            pagination={{ current: this.state.page }}
            style={{ marginTop: 30, marginBottom: 30 }}
          />

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>

            <Col span={4}>
              <Button
                type="primary"
                loading={this.state.isRekamLoading}
                onClick={this.handleRekam}
                block
              >
                Rekam
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
