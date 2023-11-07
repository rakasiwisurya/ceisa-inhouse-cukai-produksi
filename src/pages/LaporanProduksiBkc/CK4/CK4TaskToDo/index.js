import { notification } from "antd";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { pathName } from "configs/constants";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class CK4TaskToDo extends Component {
  componentDidMount() {
    this.getCK4JenisBkc();
  }

  getCK4JenisBkc = async () => {
    const payload = { idCk4Header: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/task-todo",
      params: payload,
    });

    if (response) {
      const { data } = response.data;

      switch (true) {
        case data?.namaJenisBkc === "EA":
          this.props.history.replace(
            `${pathName}/laporan-ck4/ck4-ea/tasktodo/${this.props.match.params.id}`
          );
          break;
        case data?.namaJenisBkc === "MMEA":
          this.props.history.replace(
            `${pathName}/laporan-ck4/ck4-mmea/tasktodo/${this.props.match.params.id}`
          );
          break;
        case data?.namaJenisBkc === "HT":
          this.props.history.replace(
            `${pathName}/laporan-ck4/ck4-ht/tasktodo/${this.props.match.params.id}`
          );
          break;
        default:
          notification.info({
            message: "Info",
            description: "Jenis Bkc is not found or invalid in this data",
          });
          break;
      }
    }
  };

  render() {
    return <LoadingWrapperSkeleton />;
  }
}
