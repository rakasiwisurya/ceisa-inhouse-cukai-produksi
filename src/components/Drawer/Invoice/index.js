import React, { useCallback } from "react";
import { Drawer, Button } from "antd";
import TableCustom from "components/Table/TableCustom";
import { useSelector, useDispatch } from "react-redux";

export const DrawerInvoice = ({
  activeDrawer = "",
  setActiveDrawer = () => {},
  handleShowCatalog = () => {},
  dataTable = {
    loading: false,
    total: 0,
    data: [],
  },
}) => {
  const dispatch = useDispatch();
  const { Cnpibk } = useSelector((state) => state);
  const HandleClickCatalogue = useCallback((item) => {
    handleShowCatalog(item);
    setActiveDrawer('catalogue');
  },[handleShowCatalog, setActiveDrawer]);

  const RenderAction = useCallback((text, item) => {
    return (
      <Button 
        type="primary"
        onClick={() => HandleClickCatalogue(item)} 
      >
          Catalogue
      </Button>
    );
  },[HandleClickCatalogue]);

  const columns = [
    { width: 170, title: "Kode Marketplace", dataIndex: "kdMp", key: "kdMp" },
    { width: 170, title: "No Invoice", dataIndex: "noInvoice", key: "noInvoice" },
    { width: 150, title: "Tanggal Invoice", dataIndex: "tglInvoice", key: "tglInvoice" },
    { width: 150, title: "Kode Valuta", dataIndex: "kdVal", key: "kdVal" },
    { width: 300, title: "URL Invoice", dataIndex: "urlInvoice", key: "urlInvoice" },
    { width: 300, title: "Kode Barang", dataIndex: "kdBrg", key: "kdBrg" },
    { width: 150, title: "CIF Barang", dataIndex: "cifBrg", key: "cifBrg" },
    { width: 150, title: "Jumlah Satuan", dataIndex: "jmlSat", key: "jmlSat" },
    { width: 150, title: "Jenis Satuan", dataIndex: "jnsSat", key: "jnsSat" },
    { title: "Actions", key: "operation", fixed: "right", render: RenderAction },
  ];
  return (
    <Drawer 
      title="Invoice"
      placement={"right"}
      visible={activeDrawer === "invoice"}
      onClose={() => {
        // setSelectedInvoice("");
        setActiveDrawer("");
      }}
      width={'80vw'}
      className={`text-center`}
    >
      <TableCustom
        columns={columns}
        loading={Cnpibk.dataBarang.loadingInvoice}
        dataSource={Cnpibk.dataBarang.dataInvoice}
        total={dataTable.total}
      />
    </Drawer>
  );
};
