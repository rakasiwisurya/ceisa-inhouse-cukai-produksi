import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/NotFound";
import Dashboard from "./dashboard/Dashboard";
import ReferensiTarifPitaCukai from "./referensi-tarif-pita-cukai/ReferensiTarifPitaCukai";
import ReferensiTarif from "./referensi-tarif-pita-cukai/ReferensiTarif";
import ReferensiWarna from "./referensi-tarif-pita-cukai/ReferensiWarna";
import ReferensiTanggal from "./referensi-tarif-pita-cukai/ReferensiTanggal";
import PermohonanTarif from "./tarif-cukai/PermohonanTarif";
import PencabutanTarif from "./tarif-cukai/PencabutanTarif";
import PenetapanKembali from "./tarif-cukai/PenetapanKembali";
import RekamJenisPita from "./rekam-jenis-pita/RekamJenisPita";
import CK4 from "./laporan-produksi-bkc/CK4";
import CK4BelumLapor from "./laporan-produksi-bkc/CKBelumLapor";
import SPL from "./laporan-produksi-bkc/SPL";
import BRCK1 from "./buku-rekening-cukai/BRCK1";
import BRCK2 from "./buku-rekening-cukai/BRCK2";
import BRCK1Rekam from "./buku-rekening-cukai/BRCK1Rekam";
import BRCK2Rekam from "./buku-rekening-cukai/BRCK2Rekam";
import CK4EA from "./laporan-produksi-bkc/CK4EA";
import CK4MMEA from "./laporan-produksi-bkc/CK4MMEA";
import CK4HT from "./laporan-produksi-bkc/CK4HT";

export default function PageContent({ propsExtra }) {
  const pathName = "/citac";
  // const pathName = ""

  // route yang tersedia
  // /data-transaksional-pabean
  // /data-transaksional-cukai
  // /data-transaksional-tpb
  // /user-management
  // /dashboard

  return (
    <Switch>
      <Route
        path={pathName + "/dashboard"}
        render={(props) => <ReferensiTarifPitaCukai {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/data-transaksional-pabean"}
        render={(props) => <CK4MMEA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/data-transaksional-cukai"}
        render={(props) => <CK4BelumLapor {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/data-transaksional-tpb"}
        render={(props) => <SPL {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/data-management"}
        render={(props) => <BRCK1 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/user-management"}
        render={(props) => <BRCK2 {...props} {...propsExtra} />}
        exact={true}
      />

      <Route
        path={pathName + "/referensi-tarif-warna"}
        render={(props) => <ReferensiTarifPitaCukai {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-tarif"}
        render={(props) => <ReferensiTarif {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-warna"}
        render={(props) => <ReferensiWarna {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-tanggal"}
        render={(props) => <ReferensiTanggal {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/permohonan-tarif"}
        render={(props) => <PermohonanTarif {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/pencabutan-tarif"}
        render={(props) => <PencabutanTarif {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/penetapan-kembali"}
        render={(props) => <PenetapanKembali {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/rekam-jenis-pita"}
        render={(props) => <RekamJenisPita {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4"}
        render={(props) => <CK4 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-ea"}
        render={(props) => <CK4EA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-mmea"}
        render={(props) => <CK4MMEA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-ht"}
        render={(props) => <CK4HT {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-belum-lapor"}
        render={(props) => <CK4BelumLapor {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/spl"}
        render={(props) => <SPL {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-1"}
        render={(props) => <BRCK1 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-1-rekam"}
        render={(props) => <BRCK1Rekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-2"}
        render={(props) => <BRCK2 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-2-rekam"}
        render={(props) => <BRCK2Rekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
