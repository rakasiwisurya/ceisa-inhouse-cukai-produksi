import NotFound from "components/NotFound";
import { pathName } from "configs/constants";
import React from "react";
import { Route, Switch } from "react-router-dom";
import BACKEA from "./BukuRekeningCukai/BACKEA/BACKEA";
import BACKEAPerbaikan67 from "./BukuRekeningCukai/BACKEA/BACKEAPerbaikan67";
import BACKEAPerbaikan89 from "./BukuRekeningCukai/BACKEA/BACKEAPerbaikan89";
import BACKEARekam67 from "./BukuRekeningCukai/BACKEA/BACKEARekam67";
import BACKEARekam89 from "./BukuRekeningCukai/BACKEA/BACKEARekam89";
import BACKMMEA from "./BukuRekeningCukai/BACKMMEA/BACKMMEA";
import BACKMMEAPerbaikan89 from "./BukuRekeningCukai/BACKMMEA/BACKMMEAPerbaikan89";
import BACKMMEARekam89 from "./BukuRekeningCukai/BACKMMEA/BACKMMEARekam89";
import BRCK1 from "./BukuRekeningCukai/BRCK1/BRCK1";
import BRCK1Detail from "./BukuRekeningCukai/BRCK1/BRCK1Detail";
import BRCK1Perbaikan from "./BukuRekeningCukai/BRCK1/BRCK1Perbaikan";
import BRCK1Rekam from "./BukuRekeningCukai/BRCK1/BRCK1Rekam";
import BRCK2 from "./BukuRekeningCukai/BRCK2/BRCK2";
import BRCK2Detail from "./BukuRekeningCukai/BRCK2/BRCK2Detail";
import BRCK2Perbaikan from "./BukuRekeningCukai/BRCK2/BRCK2Perbaikan";
import BRCK2Rekam from "./BukuRekeningCukai/BRCK2/BRCK2Rekam";
import CK4 from "./LaporanProduksiBkc/CK4/CK4";
import CK4EA from "./LaporanProduksiBkc/CK4/CK4EA";
import CK4EADetail from "./LaporanProduksiBkc/CK4/CK4EADetail";
import CK4EAPembatalan from "./LaporanProduksiBkc/CK4/CK4EAPembatalan";
import CK4EAPerbaikan from "./LaporanProduksiBkc/CK4/CK4EAPerbaikan";
import CK4EATaskToDo from "./LaporanProduksiBkc/CK4/CK4EATaskToDo";
import CK4EATaskToDoPembatalan from "./LaporanProduksiBkc/CK4/CK4EATaskToDoPembatalan";
import CK4HT from "./LaporanProduksiBkc/CK4/CK4HT";
import CK4HTDetail from "./LaporanProduksiBkc/CK4/CK4HTDetail";
import CK4HTPembatalan from "./LaporanProduksiBkc/CK4/CK4HTPembatalan";
import CK4HTPerbaikan from "./LaporanProduksiBkc/CK4/CK4HTPerbaikan";
import CK4HTTaskToDo from "./LaporanProduksiBkc/CK4/CK4HTTaskToDo";
import CK4HTTaskToDoPembatalan from "./LaporanProduksiBkc/CK4/CK4HTTaskToDoPembatalan";
import CK4MMEA from "./LaporanProduksiBkc/CK4/CK4MMEA";
import CK4MMEADetail from "./LaporanProduksiBkc/CK4/CK4MMEADetail";
import CK4MMEAPembatalan from "./LaporanProduksiBkc/CK4/CK4MMEAPembatalan";
import CK4MMEAPerbaikan from "./LaporanProduksiBkc/CK4/CK4MMEAPerbaikan";
import CK4MMEATaskToDoPembatalan from "./LaporanProduksiBkc/CK4/CK4MMEATaskToDoPembatalan";
import CK4MMEATaskTodo from "./LaporanProduksiBkc/CK4/CK4MMEATaskTodo";
import CK4TaskToDo from "./LaporanProduksiBkc/CK4/CK4TaskToDo";
import CK4BelumLapor from "./LaporanProduksiBkc/CK4BelumLapor";
import PenelitianCK4 from "./LaporanProduksiBkc/PenelitianCK4";
import SPL from "./LaporanProduksiBkc/SPL/SPL";
import SPLPerbaikan from "./LaporanProduksiBkc/SPL/SPLPerbaikan";
import SPLRekam from "./LaporanProduksiBkc/SPL/SPLRekam";
import ReferensiTarifDetail from "./ReferensiTarifPitaCukai/ReferensiTarifDetail";
import ReferensiTarifEdit from "./ReferensiTarifPitaCukai/ReferensiTarifEdit";
import ReferensiTarifPitaCukai from "./ReferensiTarifPitaCukai/ReferensiTarifPitaCukai";
import ReferensiTarifRekam from "./ReferensiTarifPitaCukai/ReferensiTarifRekam";
import ReferensiWarnaDetail from "./ReferensiTarifPitaCukai/ReferensiWarnaDetail";
import ReferensiWarnaEdit from "./ReferensiTarifPitaCukai/ReferensiWarnaEdit";
import ReferensiWarnaRekam from "./ReferensiTarifPitaCukai/ReferensiWarnaRekam";
import RekamJenisPita from "./RekamJenisPita/RekamJenisPita";
import RekamJenisPitaPerbaikan from "./RekamJenisPita/RekamJenisPitaPerbaikan";
import RekamJenisPitaRekam from "./RekamJenisPita/RekamJenisPitaRekam";
import RekamJenisPitaTaskToDo from "./RekamJenisPita/RekamJenisPitaTaskToDo";
import PencabutanTarif from "./TarifCukai/PencabutanTarif/PencabutanTarif";
import PencabutanTarifCabut from "./TarifCukai/PencabutanTarif/PencabutanTarifCabut";
import PenetapanKembali from "./TarifCukai/PenetapanKembali";
import PermohonanTarif from "./TarifCukai/PermohonanTarif/PermohonanTarif";
import PermohonanTarifPerbaikan from "./TarifCukai/PermohonanTarif/PermohonanTarifPerbaikan";
import PermohonanTarifRekam from "./TarifCukai/PermohonanTarif/PermohonanTarifRekam";
import PermohonanTarifTaskToDo from "./TarifCukai/PermohonanTarif/PermohonanTarifTaskToDo";

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
        path={pathName + "/permohonan-tarif/tasktodo/:id"}
        render={(props) => <PermohonanTarifTaskToDo {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/permohonan-tarif/rekam"}
        render={(props) => <PermohonanTarifRekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/permohonan-tarif/perbaikan/:id"}
        render={(props) => <PermohonanTarifPerbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/pencabutan-tarif"}
        render={(props) => <PencabutanTarif {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/pencabutan-tarif/cabut/:id"}
        render={(props) => <PencabutanTarifCabut {...props} {...propsExtra} />}
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
        path={pathName + "/rekam-jenis-pita/rekam"}
        render={(props) => <RekamJenisPitaRekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/rekam-jenis-pita/perbaikan/:id"}
        render={(props) => <RekamJenisPitaPerbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/rekam-jenis-pita/tasktodo/:id"}
        render={(props) => <RekamJenisPitaTaskToDo {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4"}
        render={(props) => <CK4 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4/tasktodo/:id"}
        render={(props) => <CK4TaskToDo {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ea-rekam"}
        render={(props) => <CK4EA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ea-detail/:id"}
        render={(props) => <CK4EADetail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ea-perbaikan/:id"}
        render={(props) => <CK4EAPerbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ea/pembatalan/:id"}
        render={(props) => <CK4EAPembatalan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ea/tasktodo/:id"}
        render={(props) => <CK4EATaskToDo {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ea/pembatalan/tasktodo/:id"}
        render={(props) => <CK4EATaskToDoPembatalan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-mmea-rekam"}
        render={(props) => <CK4MMEA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-mmea-detail/:id"}
        render={(props) => <CK4MMEADetail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-mmea-perbaikan/:id"}
        render={(props) => <CK4MMEAPerbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-mmea/pembatalan/:id"}
        render={(props) => <CK4MMEAPembatalan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-mmea/tasktodo/:id"}
        render={(props) => <CK4MMEATaskTodo {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-mmea/pembatalan/tasktodo/:id"}
        render={(props) => <CK4MMEATaskToDoPembatalan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ht-rekam"}
        render={(props) => <CK4HT {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ht-detail/:id"}
        render={(props) => <CK4HTDetail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ht-perbaikan/:id"}
        render={(props) => <CK4HTPerbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ht/pembatalan/:id"}
        render={(props) => <CK4HTPembatalan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ht/tasktodo/:id"}
        render={(props) => <CK4HTTaskToDo {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/laporan-ck4/ck4-ht/pembatalan/tasktodo/:id"}
        render={(props) => <CK4HTTaskToDoPembatalan {...props} {...propsExtra} />}
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
        path={pathName + "/spl/rekam"}
        render={(props) => <SPLRekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/spl/perbaikan/:id"}
        render={(props) => <SPLPerbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-1"}
        render={(props) => <BRCK1 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-1/rekam"}
        render={(props) => <BRCK1Rekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-1/detail/:id"}
        render={(props) => <BRCK1Detail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-1/perbaikan/:id"}
        render={(props) => <BRCK1Perbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-2"}
        render={(props) => <BRCK2 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-2/rekam"}
        render={(props) => <BRCK2Rekam {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-2/detail/:id"}
        render={(props) => <BRCK2Detail {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/brck-2/perbaikan/:id"}
        render={(props) => <BRCK2Perbaikan {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/back-ea"}
        render={(props) => <BACKEA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/back-ea/rekam-6-7"}
        render={(props) => <BACKEARekam67 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/back-ea/perbaikan-6-7/:id"}
        render={(props) => <BACKEAPerbaikan67 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/back-ea/rekam-8-9"}
        render={(props) => <BACKEARekam89 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/back-ea/perbaikan-8-9/:id"}
        render={(props) => <BACKEAPerbaikan89 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/back-mmea"}
        render={(props) => <BACKMMEA {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/back-mmea/rekam-8-9"}
        render={(props) => <BACKMMEARekam89 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/back-mmea/perbaikan-8-9/:id"}
        render={(props) => <BACKMMEAPerbaikan89 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route
        path={pathName + "/penelitian-ck4"}
        render={(props) => <PenelitianCK4 {...props} {...propsExtra} />}
        exact={true}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
