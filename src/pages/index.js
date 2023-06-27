import React from "react";
import { Route, Switch } from "react-router-dom";
import { pathName } from "configs/constants";
import NotFound from "components/NotFound";
import ReferensiTarifPitaCukai from "./referensi-tarif-pita-cukai/ReferensiTarifPitaCukai";
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
import CK4EADetail from "./laporan-produksi-bkc/CK4EADetail";
import CK4MMEADetail from "./laporan-produksi-bkc/CK4MMEADetail";
import CK4HTDetail from "./laporan-produksi-bkc/CK4HTDetail";
import CK4EAPerbaikan from "./laporan-produksi-bkc/CK4EAPerbaikan";
import CK4MMEAPerbaikan from "./laporan-produksi-bkc/CK4MMEAPerbaikan";
import CK4HTPerbaikan from "./laporan-produksi-bkc/CK4HTPerbaikan";
import ReferensiTarifEdit from "./referensi-tarif-pita-cukai/ReferensiTarifEdit";
import ReferensiTarifDetail from "./referensi-tarif-pita-cukai/ReferensiTarifDetail";
import ReferensiWarnaRekam from "./referensi-tarif-pita-cukai/ReferensiWarnaRekam";
import ReferensiWarnaEdit from "./referensi-tarif-pita-cukai/ReferensiWarnaEdit";
import ReferensiWarnaDetail from "./referensi-tarif-pita-cukai/ReferensiWarnaDetail";
import ReferensiTarifRekam from "./referensi-tarif-pita-cukai/ReferensiTarifRekam";

export default function PageContent({ propsExtra }) {
  return (
    <Switch>
      <Route
        path={pathName + "/referensi-tarif-warna"}
        render={(props) => <ReferensiTarifPitaCukai {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-tarif-warna/referensi-tarif-rekam"}
        render={(props) => <ReferensiTarifRekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-tarif-warna/referensi-tarif-edit/:id"}
        render={(props) => <ReferensiTarifEdit {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-tarif-warna/referensi-tarif-detail/:id"}
        render={(props) => <ReferensiTarifDetail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-tarif-warna/referensi-warna-rekam"}
        render={(props) => <ReferensiWarnaRekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-tarif-warna/referensi-warna-edit/:id"}
        render={(props) => <ReferensiWarnaEdit {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/referensi-tarif-warna/referensi-warna-detail/:id"}
        render={(props) => <ReferensiWarnaDetail {...props} {...propsExtra} />}
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
        path={pathName + "/ck4-ea-rekam"}
        render={(props) => <CK4EA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-ea-detail/:id"}
        render={(props) => <CK4EADetail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-ea-perbaikan/:id"}
        render={(props) => <CK4EAPerbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-mmea-rekam"}
        render={(props) => <CK4MMEA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-mmea-detail/:id"}
        render={(props) => <CK4MMEADetail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-mmea-perbaikan/:id"}
        render={(props) => <CK4MMEAPerbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-ht-rekam"}
        render={(props) => <CK4HT {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-ht-detail/:id"}
        render={(props) => <CK4HTDetail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/ck4-ht-perbaikan/:id"}
        render={(props) => <CK4HTPerbaikan {...props} {...propsExtra} />}
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
