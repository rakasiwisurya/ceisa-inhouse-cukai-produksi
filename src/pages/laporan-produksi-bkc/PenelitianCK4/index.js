import { Button, Col, Icon, Input, Row, Table, notification } from "antd";
import Container from "components/Container";
import Header from "components/Header";
import { requestApi } from "utils/requestApi";
import React, { Component } from "react";
import ButtonCustom from "components/Button/ButtonCustom";
import moment from "moment";
import { pathName } from "configs/constants";

export default class PenelitianCK4 extends Component {
    constructor(props){
        super(props);
        this.state = {
            subtitle1: "Penelitian CK4",

            isPenelitianCk4Loading: true,

            page: 1,
            totalData: 0,

            table: {
                nppbkc: "",
                nama_perusahaan: "",
                jenis_bkc: "",
                nomor_pemberitahuan: "",
                tanggal_pemberitahuan: "",
                jumlah_produksi: "",
                status: "",
            },

            selectedRowKeys: [],
            selectedRowKeysSimpan: [],

            dataSourceSimpan: [],

            dataSource: [],
            columns: [
                {
                    title: "NPPBKC",
                    dataIndex: "nppbkc",
                    key: "nppbkc",
                    render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
                    ...this.getColumnSearchProps("nppbkc"),
                },
                {
                    title: "Nama Perusahaan",
                    dataIndex: "nama_perusahaan",
                    key: "nama_perusahaan",
                    render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
                    ...this.getColumnSearchProps("nama_perusahaan"),
                },
                {
                    title: "Jenis BKC",
                    dataIndex: "jenis_bkc",
                    key: "jenis_bkc",
                    render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
                    ...this.getColumnSearchProps("jenis_bkc"),
                },
                {
                    title: "Nomor Pemberitahuan",
                    dataIndex: "nomor_pemberitahuan",
                    key: "nomor_pemberitahuan",
                    render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
                    ...this.getColumnSearchProps("nomor_pemberitahuan"),
                },
                {
                    title: "Tanggal Pemberitahuan",
                    dataIndex: "tanggal_pemberitahuan",
                    key: "tanggal_pemberitahuan",
                    render: (text) => 
                      <div style={{ textAlign: "center" }}>
                        {text ? moment(text).format("DD-MM-YYYY") : "-"}
                      </div>,
                    ...this.getColumnSearchProps("tanggal_pemberitahuan"),
                },
                {
                    title: "Jumlah Produksi",
                    dataIndex: "jumlah_produksi",
                    key: "jumlah_produksi",
                    render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
                    ...this.getColumnSearchProps("jumlah_produksi"),
                },
                {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
                    ...this.getColumnSearchProps("status"),
                },
            ]
        }
    };

    componentDidMount(){
        this.getPenelitianCk4();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
          this.getPenelitianCk4();
        }
      }

    getPenelitianCk4 = async () => {
        const payload = { page: this.state.page };

        const response = await requestApi({
            service: "produksi",
            method: "get",
            endpoint: "/ck4/browse-penelitian-ck4",
            params: payload,
            setLoading: (bool) => this.setState({ isPenelitianCk4Loading : bool }),
        });

        if(response){
            const newData = response.data.data.listData.map((item, index) => ({
                idCk4: item.idCk4,
                key: `penelitianck4-${index}`,
                nppbkc: item.nppbkc,
                nama_perusahaan: item.namaPerusahaan,
                jenis_bkc: item.jenisBkc,
                nomor_pemberitahuan: item.nomorPemberitauhuan,
                tanggal_pemberitahuan: item.tanggalPemberitahuan,
                jumlah_produksi: item.jumlahProdukasi,
                status: item.status,
              }));
              // console.log(newData)
              const page = response.data.data.currentPage;
              const totalData = response.data.data.totalData;
              this.setState({ dataSource: newData, page, totalData });
        }
    };

    handleSimpan = async () => {
        const responses = await Promise.all(this.state.selectedRowKeysSimpan.map(async (item) => {
            return requestApi({
                service: "produksi",
                method: "post",
                endpoint: "/ck4/penelitian-ck4",
                body: { idCk4Header: item.idCk4 },
                setLoading: (bool) => this.setState({ isRekamLoading: bool }),
            });
        }));
    
        if (responses[0]) {
            notification.success({ message: "Success", description: responses[0].data.message });
            window.location.reload();
        }
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        }) => (
        <div style={{ padding: 8 }}>
            <Input
            ref={(node) => {
                this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
                this.handleColumnSearch(selectedKeys, confirm, dataIndex)
            }
            style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
            type="primary"
            onClick={() =>
                this.handleColumnSearch(selectedKeys, confirm, dataIndex)
            }
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
            setTimeout(() => this.searchInput.select());
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

    render(){
        const rowSelection = {
			selectedRowKeys: this.state.selectedRowKeys,
            // onchange: this.handleSelectData,
			onChange: (newSelectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowKeys: newSelectedRowKeys,
                    selectedRowKeysSimpan: selectedRows,
				});
			},
            getCheckboxProps: record => ({
                disabled: record.status === 'Selesai',
            }),
		};
        return (
            <>
                <Container menuName="Laporan Produksi BKC" contentName="Penelitian CK4" hideContentHeader>
                    <Header>{this.state.subtitle1}</Header>
                    <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                        <div style={{ marginTop: 10 }}>
                            <Table
                                rowSelection={rowSelection}
                                dataSource={this.state.dataSource}
                                columns={this.state.columns}
                                loading={this.state.isPenelitianCk4Loading}
                                onChange={(page) => this.setState({ page: page.current })}
                                pagination={{ current: this.state.page, total: this.state.totalData }}
                                scroll={{ x: "max-content" }}
                            />
                        </div>

                        <Row gutter={[16, 16]}>
                            <Col span={12} offset={18}>
                                <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <ButtonCustom
                                    variant="info"
                                    onClick={this.handleSimpan}
                                    block
                                    disabled={
                                        !this.state.selectedRowKeysSimpan.length > 0 
                                    }
                                    >
                                    Simpan Penelitian
                                    </ButtonCustom>
                                </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </>
        );
    }
}