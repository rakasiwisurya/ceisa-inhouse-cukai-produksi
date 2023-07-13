import React from "react";
import { Drawer } from "antd";
import TableCustom from "components/Table/TableCustom";
import { useSelector } from "react-redux";

export const DrawerCatalogue = ({
  activeDrawer = "",
  setActiveDrawer = () => {},
  setSelectedInvoice = () => {},
  dataTable = {
    loading: false,
    total: 0,
    data: [],
  },
}) => {
  const { Cnpibk } = useSelector((state) => state);

  const columns = [
    { width: 170, title: "Kode Marketplace", dataIndex: "kdMp", key: "kdMp" },
    { width: 150, title: "Kode Barang", dataIndex: "kdBrg", key: "kdBrg" },
    { width: 400, title: "Kategori", dataIndex: "kategori", key: "kategori" },
    { width: 450, title: "Uraian", dataIndex: "urBrg", key: "urBrg" },
    { width: 300, title: "Spek Barang", dataIndex: "spekBrg", key: "spekBrg" },
    { width: 100, title: "Valuta", dataIndex: "kdVal", key: "kdVal" },
    { width: 150, title: "Harga Barang", dataIndex: "hrgBrg", key: "hrgBrg" },
    { width: 150, title: "Jenis Satuan", dataIndex: "jnsSat", key: "jnsSat" },
    { width: 150, title: "Penjual", dataIndex: "nmPenjual", key: "nmPenjual" },
    { width: 150, title: "Kode Negara Barang", dataIndex: "kdNegBrg", key: "kdNegBrg" },
    { width: 150, title: "Tanggal Awal Invoice", dataIndex: "tglAwal", key: "tglAwal" },
  ];
  return (
    <Drawer
      title="Catalogue"
      placement={"right"}
      visible={activeDrawer === "catalogue"}
      onClose={() => {
        // setSelectedInvoice("");
        setActiveDrawer("invoice");
      }}
      width={"80vw"}
      className={`text-center`}
    >
      <TableCustom
        columns={columns}
        loading={Cnpibk.dataBarang.loadingCatalog}
        dataSource={Cnpibk.dataBarang.dataCatalog}
        total={dataTable.total}
      />
    </Drawer>
  );
};
