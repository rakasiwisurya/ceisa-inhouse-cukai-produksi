import { notification } from "antd";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { endpoints, pathName } from "configs/constants";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class CK4TaskToDo extends Component {
  componentDidMount() {
    this.getCK4JenisBkc();
  }

  getCK4JenisBkc = async () => {
    const payload = { idProses: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.ck4Tasktodo,
      params: payload,
    });

    if (response) {
      const { data } = response.data;

      if (data?.status === "Persetujuan Perbaikan") {
        switch (true) {
          case data?.namaJenisBkc === "EA":
            return this.props.history.replace(
              `${pathName}/laporan-ck4/ck4-ea/tasktodo/${this.props.match.params.id}`
            );
          case data?.namaJenisBkc === "MMEA":
            return this.props.history.replace(
              `${pathName}/laporan-ck4/ck4-mmea/tasktodo/${this.props.match.params.id}`
            );
          case data?.namaJenisBkc === "HT":
            return this.props.history.replace(
              `${pathName}/laporan-ck4/ck4-ht/tasktodo/${this.props.match.params.id}`
            );
          default:
            return notification.info({
              message: "Info",
              description: "Jenis Bkc is not found or invalid in this data",
            });
        }
      }

      if (data?.status === "Persetujuan Pembatalan") {
        switch (true) {
          case data?.namaJenisBkc === "EA":
            return this.props.history.replace(
              `${pathName}/laporan-ck4/ck4-ea/pembatalan/tasktodo/${this.props.match.params.id}`
            );
          case data?.namaJenisBkc === "MMEA":
            return this.props.history.replace(
              `${pathName}/laporan-ck4/ck4-mmea/pembatalan/tasktodo/${this.props.match.params.id}`
            );
          case data?.namaJenisBkc === "HT":
            return this.props.history.replace(
              `${pathName}/laporan-ck4/ck4-ht/pembatalan/tasktodo/${this.props.match.params.id}`
            );
          default:
            return notification.info({
              message: "Info",
              description: "Jenis Bkc is not found or invalid in this data",
            });
        }
      }
    }

    notification.info({
      message: "Info",
      description:
        "Status CK4 is not found or invalid in this data or neither 'Persetujuan Perbaikan' nor 'Persetujuan Pembatalan'",
    });
  };

  render() {
    return <LoadingWrapperSkeleton />;
  }
}
