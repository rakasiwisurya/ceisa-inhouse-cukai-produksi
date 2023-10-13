import NotFound from "components/NotFound";
import { pathName } from "configs/constants";
import React from "react";
import { Route, Switch } from "react-router-dom";
import BACKEA from "./buku-rekening-cukai/BACKEA";
import BACKEADetail67 from "./buku-rekening-cukai/BACKEADetail67";
import BACKEADetail89 from "./buku-rekening-cukai/BACKEADetail89";
import BACKEAPerbaikan67 from "./buku-rekening-cukai/BACKEAPerbaikan67";
import BACKEAPerbaikan89 from "./buku-rekening-cukai/BACKEAPerbaikan89";
import BACKEARekam67 from "./buku-rekening-cukai/BACKEARekam67";
import BACKEARekam89 from "./buku-rekening-cukai/BACKEARekam89";
import BACKMMEA from "./buku-rekening-cukai/BACKMMEA";
import BACKMMEADetail89 from "./buku-rekening-cukai/BACKMMEADetail89";
import BACKMMEAPerbaikan89 from "./buku-rekening-cukai/BACKMMEAPerbaikan89";
import BACKMMEARekam89 from "./buku-rekening-cukai/BACKMMEARekam89";
import BRCK1 from "./buku-rekening-cukai/BRCK1";
import BRCK1Detail from "./buku-rekening-cukai/BRCK1Detail";
import BRCK1Perbaikan from "./buku-rekening-cukai/BRCK1Perbaikan";
import BRCK1Rekam from "./buku-rekening-cukai/BRCK1Rekam";
import BRCK2 from "./buku-rekening-cukai/BRCK2";
import BRCK2Detail from "./buku-rekening-cukai/BRCK2Detail";
import BRCK2Perbaikan from "./buku-rekening-cukai/BRCK2Perbaikan";
import BRCK2Rekam from "./buku-rekening-cukai/BRCK2Rekam";
import CK4 from "./laporan-produksi-bkc/CK4";
import CK4BelumLapor from "./laporan-produksi-bkc/CK4BelumLapor";
import CK4EA from "./laporan-produksi-bkc/CK4EA";
import CK4EADetail from "./laporan-produksi-bkc/CK4EADetail";
import CK4EAPerbaikan from "./laporan-produksi-bkc/CK4EAPerbaikan";
import CK4EATaskToDo from "./laporan-produksi-bkc/CK4EATaskToDo";
import CK4HT from "./laporan-produksi-bkc/CK4HT";
import CK4HTDetail from "./laporan-produksi-bkc/CK4HTDetail";
import CK4HTPerbaikan from "./laporan-produksi-bkc/CK4HTPerbaikan";
import CK4HTTaskToDo from "./laporan-produksi-bkc/CK4HTTaskToDo";
import CK4MMEA from "./laporan-produksi-bkc/CK4MMEA";
import CK4MMEADetail from "./laporan-produksi-bkc/CK4MMEADetail";
import CK4MMEAPerbaikan from "./laporan-produksi-bkc/CK4MMEAPerbaikan";
import CK4MMEATaskTodo from "./laporan-produksi-bkc/CK4MMEATaskTodo";
import PenelitianCK4 from "./laporan-produksi-bkc/PenelitianCK4";
import SPL from "./laporan-produksi-bkc/SPL";
import SPLDetail from "./laporan-produksi-bkc/SPLDetail";
import SPLPerbaikan from "./laporan-produksi-bkc/SPLPerbaikan";
import SPLRekam from "./laporan-produksi-bkc/SPLRekam";
import ReferensiTarifDetail from "./referensi-tarif-pita-cukai/ReferensiTarifDetail";
import ReferensiTarifEdit from "./referensi-tarif-pita-cukai/ReferensiTarifEdit";
import ReferensiTarifPitaCukai from "./referensi-tarif-pita-cukai/ReferensiTarifPitaCukai";
import ReferensiTarifRekam from "./referensi-tarif-pita-cukai/ReferensiTarifRekam";
import ReferensiWarnaDetail from "./referensi-tarif-pita-cukai/ReferensiWarnaDetail";
import ReferensiWarnaEdit from "./referensi-tarif-pita-cukai/ReferensiWarnaEdit";
import ReferensiWarnaRekam from "./referensi-tarif-pita-cukai/ReferensiWarnaRekam";
import RekamJenisPita from "./rekam-jenis-pita/RekamJenisPita";
import RekamJenisPitaPerbaikan from "./rekam-jenis-pita/RekamJenisPitaPerbaikan";
import RekamJenisPitaRekam from "./rekam-jenis-pita/RekamJenisPitaRekam";
import RekamJenisPitaTaskToDo from "./rekam-jenis-pita/RekamJenisPitaTaskToDo";
import PencabutanTarif from "./tarif-cukai/PencabutanTarif";
import PencabutanTarifCabut from "./tarif-cukai/PencabutanTarifCabut";
import PenetapanKembali from "./tarif-cukai/PenetapanKembali";
import PermohonanTarif from "./tarif-cukai/PermohonanTarif";
import PermohonanTarifDetail from "./tarif-cukai/PermohonanTarifDetail";
import PermohonanTarifPerbaikan from "./tarif-cukai/PermohonanTarifPerbaikan";
import PermohonanTarifRekam from "./tarif-cukai/PermohonanTarifRekam";
import PermohonanTarifTaskToDo from "./tarif-cukai/PermohonanTarifTaskToDo";

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
        path={pathName + "/permohonan-tarif/detail/:id"}
        render={(props) => <PermohonanTarifDetail {...props} {...propsExtra} />}
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
        path={pathName + "/laporan-ck4/ck4-ea/tasktodo/:id"}
        render={(props) => <CK4EATaskToDo {...props} {...propsExtra} />}
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
        path={pathName + "/laporan-ck4/ck4-mmea/tasktodo/:id"}
        render={(props) => <CK4MMEATaskTodo {...props} {...propsExtra} />}
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
        path={pathName + "/laporan-ck4/ck4-ht/tasktodo/:id"}
        render={(props) => <CK4HTTaskToDo {...props} {...propsExtra} />}
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
        path={pathName + "/spl/detail/:id"}
        render={(props) => <SPLDetail {...props} {...propsExtra} />}
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
        path={pathName + "/back-ea/detail-6-7/:id"}
        render={(props) => <BACKEADetail67 {...props} {...propsExtra} />}
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
        path={pathName + "/back-ea/detail-8-9/:id"}
        render={(props) => <BACKEADetail89 {...props} {...propsExtra} />}
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
        path={pathName + "/back-mmea/detail-8-9/:id"}
        render={(props) => <BACKMMEADetail89 {...props} {...propsExtra} />}
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
