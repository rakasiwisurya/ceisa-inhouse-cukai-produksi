import { Col, DatePicker, Input, InputNumber, Row, Select } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import ButtonCustom from "components/Button/ButtonCustom";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";

export default class PermohonanTarifDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Header",
      subtitle2: "Pabrik/Importir",
      subtitle3: "Rincian",
      subtitle4: "Tampilan Kemasan",

      isDetailLoading: true,

      jenis_bkc_id: null,
      jenis_bkc_name: null,
      nomor_permohonan: null,
      tanggal_permohonan: null,
      lokasi_perekaman: null,
      tanggal_kep: null,
      awal_berlaku: null,

      nppbkc: null,
      nama_nppbkc: null,
      npwp_nppbkc: null,
      alamat_nppbkc: null,
      jenis_produksi_mmea_id: null,
      jenis_produksi_mmea_name: null,

      jenis_pita_id: null,
      jenis_pita_name: null,

      merk_ht: null,
      jenis_produksi_ht_id: null,
      jenis_produksi_ht_code: null,
      jenis_produksi_ht_name: null,
      jenis_htl_rel_ht_id: null,
      jenis_htl_rel_ht_name: null,
      isi_ht: null,
      berat_ht: null,
      hje_perkemasan_ht: null,
      hje_persatuan_ht: null,
      tarif_ht: null,
      bahan_kemasan_ht: null,
      asal_produk_ht: null,
      tujuan_pemasaran_ht: null,

      jenis_mmea_id: null,
      jenis_mmea_name: null,
      merk_mmea: null,
      negara_asal_mmea: null,
      jenis_kemasan_mmea_id: null,
      jenis_kemasan_mmea_name: null,
      isi_mmea: null,
      kadar_mmea: null,
      tarif_cukai_per_liter: null,
      tarif_cukai_per_kemasan: null,

      nomor_surat_lisensi: null,
      tanggal_surat_lisensi: null,

      sisi_depan: null,
      sisi_belakang: null,
      sisi_kiri: null,
      sisi_kanan: null,
      sisi_atas: null,
      sisi_bawah: null,
      file_gambar_etiket: null,
      preview_gambar_etiket: null,

      list_jenis_bkc: [],
      list_jenis_produksi_mmea: [
        {
          jenis_produksi_mmea_id: "DALAM NEGERI",
          jenis_produksi_mmea_name: "Dalam Negeri",
        },
        {
          jenis_produksi_mmea_id: "IMPOR",
          jenis_produksi_mmea_name: "Luar Negeri / Impor",
        },
      ],
      list_jenis_mmea: [],
      list_jenis_kemasan_mmea: [],
      list_bahan_kemasan: [
        {
          bahan_kemasan_id: "KERTAS DAN SEJENISNYA",
          bahan_kemasan_name: "Kertas dan Sejenisnya",
        },
        {
          bahan_kemasan_id: "BOTOL DAN SEJENISNYA",
          bahan_kemasan_name: "Botol dan Sejenisnya",
        },
        {
          bahan_kemasan_id: "LAINNYA",
          bahan_kemasan_name: "Lainnya",
        },
      ],
      list_asal_produk: [
        {
          asal_produk_id: "IMPOR",
          asal_produk_name: "Impor",
        },
        {
          asal_produk_id: "NON IMPOR",
          asal_produk_name: "Non Impor",
        },
      ],
      list_tujuan_pemasaran: [
        {
          tujuan_pemasaran_id: "DALAM NEGERI",
          tujuan_pemasaran_name: "Dalam Negeri",
        },
        {
          tujuan_pemasaran_id: "EKSPOR",
          tujuan_pemasaran_name: "Ekspor",
        },
        {
          tujuan_pemasaran_id: "BAHAN BAKU",
          tujuan_pemasaran_name: "Bahan Baku",
        },
        {
          tujuan_pemasaran_id: "LABORATORIUM",
          tujuan_pemasaran_name: "Laboratorium",
        },
      ],
    };
  }

  componentDidMount() {
    this.getPermohonanTarifDetail();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_produksi_ht_id !== this.state.jenis_produksi_ht_id) {
      this.setState({ hje_persatuan_ht: this.state.isi_ht / this.state.hje_perkemasan_ht });
    }
  }

  getPermohonanTarifDetail = async () => {
    this.setState({ isDetailLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        jenis_bkc_id: 3,
        jenis_bkc_name: "HT",
        nomor_permohonan: "nomor_permohonan",
        tanggal_permohonan: moment(new Date()),
        lokasi_perekaman: "lokasi_perekaman",
        tanggal_kep: moment(new Date()),
        awal_berlaku: moment(new Date()),

        nppbkc: "nppbkc",
        nama_nppbkc: "nama_nppbkc",
        npwp_nppbkc: "npwp_nppbkc",
        alamat_nppbkc: "alamat_nppbkc",
        jenis_produksi_mmea_id: "jenis_produksi_mmea_id",
        jenis_produksi_mmea_name: "jenis_produksi_mmea_name",

        jenis_pita_id: "jenis_pita_id",
        jenis_pita_name: "jenis_pita_name",

        merk_ht: "merk_ht",
        jenis_produksi_ht_id: 10,
        jenis_produksi_ht_code: "APA AJA",
        jenis_produksi_ht_name: "Hasil Tembakau Lainnya",
        jenis_htl_rel_ht_id: 1,
        jenis_htl_rel_ht_name: "Tembakau Molases",
        isi_ht: 40000,
        berat_ht: 20,
        hje_perkemasan_ht: 1000,
        tarif_ht: 30000,
        bahan_kemasan_ht: "KERTAS DAN SEJENISNYA",
        asal_produk_ht: "IMPOR",
        tujuan_pemasaran_ht: "DALAM NEGERI",

        jenis_mmea_id: "jenis_mmea_id",
        jenis_mmea_name: "jenis_mmea_name",
        merk_mmea: "merk_mmea",
        negara_asal_mmea: "negara_asal_mmea",
        jenis_kemasan_mmea_id: "jenis_kemasan_mmea_id",
        jenis_kemasan_mmea_name: "jenis_kemasan_mmea_name",
        isi_mmea: 1000,
        kadar_mmea: 1000,
        tarif_cukai_per_liter: 1000,
        tarif_cukai_per_kemasan: 1000,

        nomor_surat_lisensi: "nomor_surat_lisensi",
        tanggal_surat_lisensi: moment(new Date()),

        sisi_depan: "sisi_depan",
        sisi_belakang: "sisi_belakang",
        sisi_kiri: "sisi_kiri",
        sisi_kanan: "sisi_kanan",
        sisi_atas: "sisi_atas",
        sisi_bawah: "sisi_bawah",
        file_gambar_etiket: null,
        preview_gambar_etiket:
          "https://plus.unsplash.com/premium_photo-1681284938413-ea2c090c6d14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      });
      this.setState({ isDetailLoading: false });
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Permohonan Tarif Detail" hideContentHeader>
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
                      <FormLabel>Jenis BKC</FormLabel>
                    </div>
                    <Select
                      id="jenis_bkc"
                      value={this.state.jenis_bkc_id}
                      style={{ width: "100%" }}
                      disabled
                    >
                      <Select.Option value={this.state.jenis_bkc_id}>
                        {this.state.jenis_bkc_name}
                      </Select.Option>
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>No. Permohonan</FormLabel>
                    </div>
                    <Input id="nomor_permohonan" value={this.state.nomor_permohonan} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Permohonan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_permohonan"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_permohonan}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Lokasi Perekaman</FormLabel>
                    </div>
                    <Input id="lokasi_perekaman" value={this.state.lokasi_perekaman} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal KEP</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_kep"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_kep}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="awal_berlaku"
                      format="DD-MM-YYYY"
                      value={this.state.awal_berlaku}
                      style={{ width: "100%" }}
                      disabled
                    />
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
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="nppbkc" value={this.state.nppbkc} disabled />
                      <Input id="nama_perusahaan" value={this.state.nama_nppbkc} disabled />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPWP</FormLabel>
                    </div>
                    <Input id="npwp_nppbkc" value={this.state.npwp_nppbkc} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input id="alamat_nppbkc" value={this.state.alamat_nppbkc} disabled />
                  </Col>

                  {this.state.jenis_bkc_id === 2 && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Jenis Produksi</FormLabel>
                      </div>
                      <Select
                        id="jenis_produksi_mmea"
                        value={this.state.jenis_produksi_mmea_id}
                        style={{ width: "100%" }}
                        disabled
                      >
                        <Select.Option value={this.state.jenis_kemasan_mmea_id}>
                          {this.state.jenis_kemasan_mmea_name}
                        </Select.Option>
                      </Select>
                    </Col>
                  )}
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
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Pita</FormLabel>
                    </div>
                    <Input id="jenis_pita" value={this.state.jenis_pita_name} disabled />
                  </Col>
                  {this.state.jenis_bkc_id === 3 && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Merk</FormLabel>
                        </div>
                        <Input id="merk_ht" value={this.state.merk_ht} disabled />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Produksi</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <Input
                            id="jenis_produksi_ht_code"
                            value={this.state.jenis_produksi_ht_code}
                            disabled
                          />
                          {(this.state.jenis_produksi_ht_id === 2 ||
                            this.state.jenis_produksi_ht_id === 5) && (
                            <>
                              <Input
                                id="jenis_htl_rel_ht_name"
                                value={this.state.jenis_htl_rel_ht_name}
                                disabled
                              />
                            </>
                          )}
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Isi / kemasan</FormLabel>
                        </div>
                        <Input id="isi_ht" value={this.state.isi_ht} disabled />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Berat / Volume (per kemasan)</FormLabel>
                        </div>
                        <Input id="berat_ht" value={this.state.berat_ht} disabled />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>HJE per kemasan</FormLabel>
                        </div>
                        <Input
                          id="hje_perkemasan_ht"
                          value={this.state.hje_perkemasan_ht}
                          disabled
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>HJE / satuan</FormLabel>
                        </div>
                        <Input id="hje_persatuan_ht" value={this.state.hje_persatuan_ht} disabled />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Spesifik</FormLabel>
                        </div>
                        <Input id="tarif_ht" value={this.state.tarif_ht} disabled />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Bahan Kemasan</FormLabel>
                        </div>
                        <Select
                          id="bahan_kemasan_ht"
                          value={this.state.bahan_kemasan_ht}
                          style={{ width: "100%" }}
                          disabled
                        >
                          {this.state.list_bahan_kemasan.length > 0 &&
                            this.state.list_bahan_kemasan.map((item, index) => (
                              <Select.Option
                                key={`bahan-kemasan-${index}`}
                                value={item.bahan_kemasan_id}
                              >
                                {item.bahan_kemasan_name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Asal Produk</FormLabel>
                        </div>
                        <Select
                          id="asal_produk_ht"
                          value={this.state.asal_produk_ht}
                          style={{ width: "100%" }}
                          disabled
                        >
                          {this.state.list_asal_produk.length > 0 &&
                            this.state.list_asal_produk.map((item, index) => (
                              <Select.Option
                                key={`asal-produk-${index}`}
                                value={item.asal_produk_id}
                              >
                                {item.asal_produk_name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tujuan Pemasaran</FormLabel>
                        </div>
                        <Select
                          id="tujuan_pemasaran_ht"
                          value={this.state.tujuan_pemasaran_ht}
                          style={{ width: "100%" }}
                          disabled
                        >
                          {this.state.list_tujuan_pemasaran.length > 0 &&
                            this.state.list_tujuan_pemasaran.map((item, index) => (
                              <Select.Option
                                key={`tujuan-pemasaran-${index}`}
                                value={item.tujuan_pemasaran_id}
                              >
                                {item.tujuan_pemasaran_name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>

                      {this.state.asal_produk_ht === "IMPOR" && (
                        <>
                          <Col span={12}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Nomor Surat Lisensi Pemegang Merk</FormLabel>
                            </div>
                            <Input
                              id="nomor_surat_lisensi"
                              value={this.state.nomor_surat_lisensi}
                              disabled
                            />
                          </Col>

                          <Col span={12}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Nomor Surat Lisensi Pemegang Merk</FormLabel>
                            </div>
                            <DatePicker
                              id="tanggal_surat_lisensi"
                              format="DD-MM-YYYY"
                              value={this.state.tanggal_surat_lisensi}
                              style={{ width: "100%" }}
                              disabled
                            />
                          </Col>
                        </>
                      )}
                    </>
                  )}

                  {this.state.jenis_bkc_id === 2 && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis MMEA</FormLabel>
                        </div>
                        <Select
                          id="jenis_mmea"
                          value={this.state.jenis_mmea_id}
                          loading={this.state.isJenisMmeaLoading}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.jenis_mmea_id}>
                            {this.state.jenis_mmea_name}
                          </Select.Option>
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Merk MMEA</FormLabel>
                        </div>
                        <Input id="merk_mmea" value={this.state.merk_mmea} disabled />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Negara Asal</FormLabel>
                        </div>
                        <Input id="negara_asal_mmea" value={this.state.negara_asal_mmea} disabled />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Kemasan</FormLabel>
                        </div>
                        <Select
                          id="jenis_kemasan_mmea"
                          value={this.state.jenis_kemasan_mmea_id}
                          style={{ width: "100%" }}
                          disabled
                        >
                          <Select.Option value={this.state.jenis_kemasan_mmea_id}>
                            {this.state.jenis_kemasan_mmea_name}
                          </Select.Option>
                        </Select>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Isi Kemasan</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <InputNumber
                            id="isi_mmea"
                            value={this.state.isi_mmea}
                            style={{ width: "100%" }}
                            disabled
                          />
                          <div>ml</div>
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Kadar</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <InputNumber
                            id="kadar_mmea"
                            value={this.state.kadar_mmea}
                            style={{ width: "100%" }}
                            disabled
                          />
                          <div>%</div>
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Cukai Per Liter</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <InputNumber
                            id="tarif_cukai_per_liter"
                            value={this.state.tarif_cukai_per_liter}
                            style={{ width: "100%" }}
                            disabled
                          />
                          <div>(Rp)</div>
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Cukai Per Kemasan</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <InputNumber
                            id="tarif_cukai_per_kemasan"
                            value={this.state.tarif_cukai_per_kemasan}
                            style={{ width: "100%" }}
                            disabled
                          />
                          <div>(Rp)</div>
                        </div>
                      </Col>
                    </>
                  )}
                </Row>
              </div>

              {this.state.jenis_bkc_id === 3 &&
              !(this.state.jenis_produksi_ht_id === 2 || this.state.jenis_produksi_ht_id === 5) ? (
                <>
                  <Header>{this.state.subtitle4}</Header>
                  <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Depan</FormLabel>
                            </div>
                            <Input.TextArea value={this.state.sisi_depan} disabled />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Belakang</FormLabel>
                            </div>
                            <Input.TextArea value={this.state.sisi_belakang} disabled />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Kiri</FormLabel>
                            </div>
                            <Input.TextArea value={this.state.sisi_kiri} disabled />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Kanan</FormLabel>
                            </div>
                            <Input.TextArea value={this.state.sisi_kanan} disabled />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Atas</FormLabel>
                            </div>
                            <Input.TextArea value={this.state.sisi_atas} disabled />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Bawah</FormLabel>
                            </div>
                            <Input.TextArea value={this.state.sisi_bawah} disabled />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={12}>
                        <input type="file" onChange={this.handleUploadFile} disabled />

                        {this.state.preview_gambar_etiket && (
                          <div style={{ marginTop: 20 }}>
                            <img
                              src={this.state.preview_gambar_etiket}
                              alt="Foto Etiket"
                              style={{ maxWidth: "100%" }}
                            />
                          </div>
                        )}
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
              ) : (
                <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
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
              )}
            </>
          )}
        </Container>
      </>
    );
  }
}
