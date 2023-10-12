import { Button, Col, Icon, Input, Row, Table, Tag } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import ModalProcessTTE from "components/ModalProcessTTE";
import { pathName } from "configs/constants";
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

      table: {
        status: null,
        kode_kantor: null,
        nama_kantor: null,
        nppbkc: null,
        nama_perusahaan: null,
        nomor_kep: null,
        tanggal_kep: null,
        nama_merk: null,
        jenis_produksi: null,
        hje_per_kemasan: null,
        isi_per_kemasan: null,
        tarif_spesifik: null,
        tujuan_pemasaran: null,
        awal_berlaku: null,
        akhir_berlaku: null,
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
                  onClick={() => this.handleDetail(record.permohonan_tarif_id)}
                />
                <ButtonCustom
                  icon="form"
                  variant="warning"
                  onClick={() => this.handlePerbaikan(record.permohonan_tarif_id)}
                />
                <ButtonCustom
                  variant="danger"
                  icon="file-pdf"
                  onClick={() => this.handleGeneratePdf(record)}
                />
                <QRCodeCanvas
                  id={record.permohonan_tarif_id}
                  value={`https://apisdev-gw.beacukai.go.id/download-repo-cukai-service/s3/downloadFileDS/cuQHp8--6_YY0OhogE6pSA==/penetapan_tarif_${record.permohonan_tarif_id}.pdf`}
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
          key: "status",
          title: "Status",
          dataIndex: "status",
          render: (text) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {text ? <Tag color={text === "AKTIF" ? "green" : "red"}>{text}</Tag> : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("status"),
        },
        {
          key: "nama_kantor",
          title: "Nama Kantor",
          dataIndex: "nama_kantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_kantor"),
        },
        {
          key: "nppbkc",
          title: "NPPBKC",
          dataIndex: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          key: "nama_perusahaan",
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          key: "nomor_kep",
          title: "Nomor KEP",
          dataIndex: "nomor_kep",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_kep"),
        },
        {
          key: "tanggal_kep",
          title: "Tanggal KEP",
          dataIndex: "tanggal_kep",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_kep"),
        },
        {
          key: "nama_merk",
          title: "Nama Merk",
          dataIndex: "nama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_merk"),
        },
        {
          key: "jenis_produksi",
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_produksi"),
        },
        {
          key: "hje_per_kemasan",
          title: "HJE",
          dataIndex: "hje_per_kemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje_per_kemasan"),
        },
        {
          key: "isi_per_kemasan",
          title: "Isi",
          dataIndex: "isi_per_kemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi_per_kemasan"),
        },
        {
          key: "tarif_spesifik",
          title: "Tarif",
          dataIndex: "tarif_spesifik",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif_spesifik"),
        },
        {
          key: "tujuan_pemasaran",
          title: "Tujuan",
          dataIndex: "tujuan_pemasaran",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tujuan_pemasaran"),
        },
        {
          key: "awal_berlaku",
          title: "Awal Berlaku",
          dataIndex: "awal_berlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("awal_berlaku"),
        },
        {
          key: "akhir_berlaku",
          title: "Akhir Berlaku",
          dataIndex: "akhir_berlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("akhir_berlaku"),
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
      kode_kantor,
      nama_kantor,
      nppbkc,
      nama_perusahaan,
      nomor_kep,
      tanggal_kep,
      nama_merk,
      jenis_produksi,
      hje_per_kemasan,
      isi_per_kemasan,
      tarif_spesifik,
      tujuan_pemasaran,
      awal_berlaku,
      akhir_berlaku,
    } = this.state.table;

    const payload = { page: this.state.page };

    if (status) payload.status = status;
    if (kode_kantor) payload.kodeKantor = kode_kantor;
    if (nama_kantor) payload.namaKantor = nama_kantor;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (nomor_kep) payload.nomorSkep = nomor_kep;
    if (tanggal_kep) payload.tanggalSkep = moment(tanggal_kep, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (nama_merk) payload.namaMerk = nama_merk;
    if (jenis_produksi) payload.namaJenisProduksiBkc = jenis_produksi;
    if (hje_per_kemasan) payload.hjePerKemasan = hje_per_kemasan;
    if (isi_per_kemasan) payload.isiPerKemasan = isi_per_kemasan;
    if (tarif_spesifik) payload.tarifSpesifik = tarif_spesifik;
    if (tujuan_pemasaran) payload.tujuanPemasaran = tujuan_pemasaran;
    if (awal_berlaku) payload.awalBerlaku = moment(awal_berlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (akhir_berlaku)
      payload.akhirBerlaku = moment(akhir_berlaku, "DD-MM-YYYY").format("YYYY-MM-DD");

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/pita-cukai/browse-penetapan-tarif",
      params: payload,
      setLoading: (bool) => this.setState({ isPermohonanTarifLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `permohonan-tarif-${index}`,
        permohonan_tarif_id: item.idTarifMerkHeader,
        status: item.status,
        kode_kantor: item.kodeKantor,
        nama_kantor: item.namaKantor,
        nama_kantor_wilayah: item.namaKantorWilayah,
        nppbkc: item.nppbkc,
        nomor_pkp: item.nomorPkp,
        nama_perusahaan: item.namaPerusahaan,
        alamat_perusahaan: item.alamatPerusahaan,
        npwp: item.npwp,
        nama_pengusaha: item.namaPengusaha,
        alamat_pengusaha: item.alamatPengusaha,
        nama_kota: item.namaKota,
        nomor_permohonan: item.nomorPemohonan,
        nomor_kep: item.nomorSkep,
        tanggal_kep: item.tanggalSkep,
        id_jenis_bkc: item.idJenisBkc,
        nama_jenis_bkc: item.jenisBkc,
        nama_merk: item.namaMerk,
        jenis_produksi: item.namaJenisProduksiBkc,
        golongan: item.golongan,
        hje_per_kemasan: item.hjePerKemasan,
        hje_per_satuan: item.hjePerSatuan,
        isi_per_kemasan: item.isiPerKemasan,
        tarif_spesifik: item.tarifSpesifik,
        satuan: item.satuan,
        tujuan_pemasaran: item.tujuanPemasaran,
        bahan_kemasan: item.bahanKemasan,
        awal_berlaku: item.awalBerlaku,
        akhir_berlaku: item.akhirBerlaku,
        sisi_depan: item.sisiDepan,
        sisi_belakang: item.sisiBelakang,
        sisi_kiri: item.sisiKiri,
        sisi_kanan: item.sisiKanan,
        sisi_atas: item.sisiAtas,
        sisi_bawah: item.sisiBawah,
        asal_produk: item.asalProduk,
        negara_asal: item.negaraAsal,
        tarif_per_kemasan: item.tarifPerKemasan,
        waktu_rekam: item.waktuRekam,
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
          value={this.state.table[dataIndex]}
          onChange={(e) =>
            this.setState({ table: { ...this.state.table, [dataIndex]: e.target.value } })
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
      { table: { ...this.state.table, [dataIndex]: null }, page: 1 },
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
      permohonan_tarif_id,
      nama_kantor,
      nama_kantor_wilayah,
      nppbkc,
      nomor_pkp,
      nama_perusahaan,
      alamat_perusahaan,
      npwp,
      nama_pengusaha,
      alamat_pengusaha,
      nama_kota,
      nomor_permohonan,
      nomor_kep,
      tanggal_kep,
      id_jenis_bkc,
      nama_merk,
      jenis_produksi,
      golongan,
      hje_per_kemasan,
      hje_per_satuan,
      isi_per_kemasan,
      tarif_spesifik,
      satuan,
      tujuan_pemasaran,
      bahan_kemasan,
      awal_berlaku,
      sisi_depan,
      sisi_belakang,
      sisi_kiri,
      sisi_kanan,
      sisi_atas,
      sisi_bawah,
      asal_produk,
      negara_asal,
      tarif_per_kemasan,
      waktu_rekam,
    } = rowData;

    this.setState({
      pdfContent: {
        permohonan_tarif_id,
        nomor_permohonan,
        nomor_kep,
        tanggal_kep: tanggal_kep ? moment(tanggal_kep).format("DD MMMM YYYY") : tanggal_kep,
        id_jenis_bkc,
        jenis_bkc:
          id_jenis_bkc === 3
            ? "HASIL TEMBAKAU"
            : id_jenis_bkc === 2
            ? "MINUMAN MENGANDUNG ETIL ALKOHOL"
            : null,
        nama_perusahaan,
        nppbkc,
        nama_pengusaha,
        npwp,
        alamat_pengusaha,
        nama_kota,
        nomor_pkp,
        alamat_perusahaan,
        nama_merk,
        jenis_produksi,
        golongan,
        isi_per_kemasan,
        tarif_spesifik,
        satuan,
        hje_per_kemasan,
        hje_per_satuan,
        bahan_kemasan,
        tujuan_pemasaran,
        sisi_depan,
        sisi_belakang,
        sisi_kiri,
        sisi_kanan,
        sisi_atas,
        sisi_bawah,
        asal_produk,
        negara_asal,
        tarif_per_kemasan,
        nama_kantor,
        awal_berlaku: awal_berlaku ? moment(awal_berlaku).format("DD MMMM YYYY") : awal_berlaku,
        nama_kantor_wilayah: nama_kantor_wilayah,
        waktu_rekam: waktu_rekam ? moment(waktu_rekam).format("DD MMMM YYYY") : waktu_rekam,
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

          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              loading={this.state.isPermohonanTarifLoading}
              pagination={{ current: this.state.page, total: this.state.totalData }}
              onChange={(page) => this.setState({ page: page.current })}
              scroll={{ x: "max-content" }}
            />
          </div>
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
