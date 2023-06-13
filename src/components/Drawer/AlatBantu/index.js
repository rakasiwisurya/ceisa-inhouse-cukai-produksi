import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Button, Icon } from "antd";

export const DrawerAlatBantu = () => {
  const [isDrawer,setIsDrawer] = useState(false);
  return (
    <Fragment>
      <Button 
        type="default"
        style={{
          position: "fixed",
          right: 0,
          top: 300,
          padding:'4px 10px 10px 10px',
          height: 43,
          width: 43
        }}
        onClick={() => setIsDrawer(state=>!state)}
      >
        <Icon
          type="setting"
          theme="twoTone"
          spin
          style={{fontSize: '24px'}}
        />
      </Button>
      <Drawer
        title={
          <>
            <h3>Alat Bantu</h3>
            <b>Pemeriksaan Dokumen</b>
          </>
        }
        placement={"right"}
        visible={isDrawer}
        onClose={() => setIsDrawer(false)}
        className={`text-center font-weight-bold`}
      >
        <Link className="mb-1 btn btn-secondary btn-outline btn-block" to='/sce/profil-komoditi/browse-barang'>
          Browse Barang
        </Link>
        <Link className="mb-1 btn btn-secondary btn-outline btn-block" to='/sce/profil-komoditi/browse-dbnp/'>
          Browse DBNP
        </Link>
        <Link className="mb-1 btn btn-secondary btn-outline btn-block" to='/search'>
          CEISA Search
        </Link>
      </Drawer>
    </Fragment>
  );
};
