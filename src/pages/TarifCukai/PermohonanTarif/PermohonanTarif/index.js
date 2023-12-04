import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import ModalProcessTTE from "components/ModalProcessTTE";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import { QRCodeCanvas } from "qrcode.react";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import ModalPermohonanTarifDetail from "../ModalPermohonanTarifDetail";
import ModalPermohonanTarifPdf from "../ModalPermohonanTarifPdf";

class PermohonanTarif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPermohonanTarifLoading: true,
      isProcessTteLoading: false,
      isModalPermohonanTarifDetailVisible: false,
      isModalPdfVisible: false,
      isModalProcessTTEVisible: false,

      pdfContent: {},
      detailId: null,

      page: 1,
      totalData: 0,

      filter: {
        status: null,
        kodeKantor: null,
        namaKantor: null,
        nppbkc: null,
        namaPerusahaan: null,
        nomorKep: null,
        tanggalKep: null,
        namaMerk: null,
        jenisProduksi: null,
        hjePerKemasan: null,
        isiPerKemasan: null,
        tarifSpesifik: null,
        tujuanPemasaran: null,
        awalBerlaku: null,
        akhirBerlaku: null,
      },

      dataSource: [],
      columns: [
        {
          key: "aksi",
          title: "Aksi",
          dataIndex: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <>
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail(record.idTarifMerkHeader)}
                />
                <ButtonCustom
                  icon="form"
                  variant="warning"
                  onClick={() => this.handlePerbaikan(record.idTarifMerkHeader)}
                />
                <ButtonCustom
                  variant="danger"
                  icon="file-pdf"
                  onClick={() => this.handleGeneratePdf(record)}
                />
                <QRCodeCanvas
                  id={record.idTarifMerkHeader}
                  value={`${process.env.REACT_APP_API_S3_DOWNLOAD}${endpoints.s3UnencryptDownload}/cuQHp8--6_YY0OhogE6pSA==/penetapan_tarif_${record.idTarifMerkHeader}.pdf`}
                  level="Q"
                  style={{ display: "none" }}
                  imageSettings={{
                    src: "/assets/images/logo-kemenkeu.png",
                    excavate: true,
                    width: 30,
                    height: 28,
                  }}
                />
              </>
            </div>
          ),
        },
        {
          key: "namaKantor",
          title: "Nama Kantor",
          dataIndex: "namaKantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaKantor"),
        },
        {
          key: "nppbkc",
          title: "NPPBKC",
          dataIndex: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          key: "namaPerusahaan",
          title: "Nama Perusahaan",
          dataIndex: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaPerusahaan"),
        },
        {
          key: "nomorKep",
          title: "Nomor KEP",
          dataIndex: "nomorKep",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomorKep"),
        },
        {
          key: "tanggalKep",
          title: "Tanggal KEP",
          dataIndex: "tanggalKep",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalKep"),
        },
        {
          key: "namaMerk",
          title: "Nama Merk",
          dataIndex: "namaMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaMerk"),
        },
        {
          key: "jenisProduksi",
          title: "Jenis Produksi",
          dataIndex: "jenisProduksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenisProduksi"),
        },
        {
          key: "hjePerKemasan",
          title: "HJE",
          dataIndex: "hjePerKemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("hjePerKemasan"),
        },
        {
          key: "isiPerKemasan",
          title: "Isi",
          dataIndex: "isiPerKemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("isiPerKemasan"),
        },
        {
          key: "tarifSpesifik",
          title: "Tarif",
          dataIndex: "tarifSpesifik",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarifSpesifik"),
        },
        {
          key: "tujuanPemasaran",
          title: "Tujuan",
          dataIndex: "tujuanPemasaran",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("tujuanPemasaran"),
        },
        {
          key: "awalBerlaku",
          title: "Awal Berlaku",
          dataIndex: "awalBerlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("awalBerlaku"),
        },
        {
          key: "akhirBerlaku",
          title: "Akhir Berlaku",
          dataIndex: "akhirBerlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("akhirBerlaku"),
        },
        {
          key: "status",
          title: "Status",
          dataIndex: "status",
          render: (text) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {text !== null ? text : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("status"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getPermohonanTarif();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getPermohonanTarif();
    }
  }

  getPermohonanTarif = async () => {
    const {
      status,
      kodeKantor,
      namaKantor,
      nppbkc,
      namaPerusahaan,
      nomorKep,
      tanggalKep,
      namaMerk,
      jenisProduksi,
      hjePerKemasan,
      isiPerKemasan,
      tarifSpesifik,
      tujuanPemasaran,
      awalBerlaku,
      akhirBerlaku,
    } = this.state.filter;

    const payload = { page: this.state.page };

    if (status) payload.status = status;
    if (kodeKantor) payload.kodeKantor = kodeKantor;
    if (namaKantor) payload.namaKantor = namaKantor;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (nomorKep) payload.nomorSkep = nomorKep;
    if (tanggalKep) payload.tanggalSkep = moment(tanggalKep, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (namaMerk) payload.namaMerk = namaMerk;
    if (jenisProduksi) payload.namaJenisProduksiBkc = jenisProduksi;
    if (hjePerKemasan) payload.hjePerKemasan = hjePerKemasan;
    if (isiPerKemasan) payload.isiPerKemasan = isiPerKemasan;
    if (tarifSpesifik) payload.tarifSpesifik = tarifSpesifik;
    if (tujuanPemasaran) payload.tujuanPemasaran = tujuanPemasaran;
    if (awalBerlaku) payload.awalBerlaku = moment(awalBerlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (akhirBerlaku)
      payload.akhirBerlaku = moment(akhirBerlaku, "DD-MM-YYYY").format("YYYY-MM-DD");

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.permohonanTarifBrowse,
      params: payload,
      setLoading: (bool) => this.setState({ isPermohonanTarifLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `permohonan-tarif-${index}`,
        idTarifMerkHeader: item.idTarifMerkHeader,
        status: item.status,
        kodeKantor: item.kodeKantor,
        namaKantor: item.namaKantor,
        namaKantorWilayah: item.namaKantorWilayah,
        nppbkc: item.nppbkc,
        nomorPkp: item.nomorPkp,
        namaPerusahaan: item.namaPerusahaan,
        alamatPerusahaan: item.alamatPerusahaan,
        npwp: item.npwp,
        namaPengusaha: item.namaPengusaha,
        alamatPengusaha: item.alamatPengusaha,
        namaKota: item.namaKota,
        nomorPermohonan: item.nomorPemohonan,
        nomorKep: item.nomorSkep,
        tanggalKep: item.tanggalSkep,
        idJenisBkc: item.idJenisBkc,
        namaJenisBkc: item.jenisBkc,
        namaMerk: item.namaMerk,
        jenisProduksi: item.namaJenisProduksiBkc,
        golongan: item.golongan,
        hjePerKemasan: item.hjePerKemasan,
        hjePerSatuan: item.hjePerSatuan,
        isiPerKemasan: item.isiPerKemasan,
        tarifSpesifik: item.tarifSpesifik,
        satuan: item.satuan,
        tujuanPemasaran: item.tujuanPemasaran,
        bahanKemasan: item.bahanKemasan,
        awalBerlaku: item.awalBerlaku,
        akhirBerlaku: item.akhirBerlaku,
        sisiDepan: item.sisiDepan,
        sisiBelakang: item.sisiBelakang,
        sisiKiri: item.sisiKiri,
        sisiKanan: item.sisiKanan,
        sisiAtas: item.sisiAtas,
        sisiBawah: item.sisiBawah,
        asalProduk: item.asalProduk,
        negaraAsal: item.negaraAsal,
        tarifPerKemasan: item.tarifPerKemasan,
        waktuRekam: item.waktuRekam,
      }));

      this.setState({
        dataSource: newData,
        page: response.data.data.currentPage,
        totalData: response.data.data.totalData,
      });
    }
  };

  getColumnSearchProps = (dataIndex, inputType) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={this.state.filter[dataIndex]}
          onChange={(e) =>
            this.setState({ filter: { ...this.state.filter, [dataIndex]: e.target.value } })
          }
          onPressEnter={() => this.handleColumnSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset(clearFilters, dataIndex)}
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
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
      }
    },
  });
  handleColumnSearch = (confirm) => {
    confirm();
    this.setState({ page: 1 }, this.getPermohonanTarif);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { filter: { ...this.state.filter, [dataIndex]: null }, page: 1 },
      this.getPermohonanTarif
    );
  };

  handleDetail = (id) => {
    this.setState({ isModalPermohonanTarifDetailVisible: true, detailId: id });
  };
  handlePerbaikan = (id) => {
    this.props.history.push(`${pathName}/permohonan-tarif/perbaikan/${id}`);
  };
  handleGeneratePdf = async (rowData) => {
    const {
      idTarifMerkHeader,
      namaKantor,
      namaKantorWilayah,
      nppbkc,
      nomorPkp,
      namaPerusahaan,
      alamatPerusahaan,
      npwp,
      namaPengusaha,
      alamatPengusaha,
      namaKota,
      nomorPermohonan,
      nomorKep,
      tanggalKep,
      idJenisBkc,
      namaMerk,
      jenisProduksi,
      golongan,
      hjePerKemasan,
      hjePerSatuan,
      isiPerKemasan,
      tarifSpesifik,
      satuan,
      tujuanPemasaran,
      bahanKemasan,
      awalBerlaku,
      sisiDepan,
      sisiBelakang,
      sisiKiri,
      sisiKanan,
      sisiAtas,
      sisiBawah,
      asalProduk,
      negaraAsal,
      tarifPerKemasan,
      waktuRekam,
    } = rowData;

    this.setState({
      pdfContent: {
        idTarifMerkHeader,
        nomorPermohonan,
        nomorKep,
        tanggalKep: tanggalKep ? moment(tanggalKep).format("DD MMMM YYYY") : tanggalKep,
        idJenisBkc,
        jenisBkc:
          idJenisBkc === 3
            ? "HASIL TEMBAKAU"
            : idJenisBkc === 2
            ? "MINUMAN MENGANDUNG ETIL ALKOHOL"
            : null,
        namaPerusahaan,
        nppbkc,
        namaPengusaha,
        npwp,
        alamatPengusaha,
        namaKota,
        nomorPkp,
        alamatPerusahaan,
        namaMerk,
        jenisProduksi,
        golongan,
        isiPerKemasan,
        tarifSpesifik,
        satuan,
        hjePerKemasan,
        hjePerSatuan,
        bahanKemasan,
        tujuanPemasaran,
        sisiDepan,
        sisiBelakang,
        sisiKiri,
        sisiKanan,
        sisiAtas,
        sisiBawah,
        asalProduk,
        negaraAsal,
        tarifPerKemasan,
        namaKantor,
        awalBerlaku: awalBerlaku ? moment(awalBerlaku).format("DD MMMM YYYY") : awalBerlaku,
        namaKantorWilayah: namaKantorWilayah,
        waktuRekam: waktuRekam ? moment(waktuRekam).format("DD MMMM YYYY") : waktuRekam,
      },
      isModalPdfVisible: true,
    });
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Permohonan Tarif">
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom
                variant="info"
                onClick={() => this.props.history.push(`${pathName}/permohonan-tarif/rekam`)}
                block
              >
                + Tarif Rekam
              </ButtonCustom>
            </Col>
          </Row>

          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isPermohonanTarifLoading}
            pagination={{ current: this.state.page, total: this.state.totalData }}
            onChange={(page) => this.setState({ page: page.current })}
            scroll={{ x: "max-content" }}
            style={{ marginTop: 30 }}
          />
        </Container>

        <ModalPermohonanTarifDetail
          id={this.state.detailId}
          isVisible={this.state.isModalPermohonanTarifDetailVisible}
          onCancel={() =>
            this.setState({ detailId: null, isModalPermohonanTarifDetailVisible: false })
          }
        />

        <ModalPermohonanTarifPdf
          isVisible={this.state.isModalPdfVisible}
          onButtonTteClick={() => this.setState({ isModalProcessTTEVisible: true })}
          onCancel={() => {
            this.setState({
              isModalPdfVisible: false,
              isModalProcessTTEVisible: false,
              pdfContent: {},
            });
          }}
          pdfContent={this.state.pdfContent}
        />

        <ModalProcessTTE
          isVisible={this.state.isModalProcessTTEVisible}
          onCancel={() => this.setState({ isModalProcessTTEVisible: false })}
          pdfContent={this.state.pdfContent}
        />
      </>
    );
  }
}

export default PermohonanTarif;
