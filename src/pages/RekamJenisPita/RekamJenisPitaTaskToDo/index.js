import { notification } from "antd";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { endpoints, pathName } from "configs/constants";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class RekamJenisPitaTaskToDo extends Component {
  componentDidMount() {
    this.getDetailRekamJenisPita();
  }

  getDetailRekamJenisPita = async () => {
    const payload = { idProses: this.props.match.params.id };

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: endpoints.jenisPitaDetailTasktodo,
      params: payload,
    });

    if (response) {
      const { data } = response.data;

      if (data?.status === "Penetapan Pita") {
        return this.props.history.replace(
          `${pathName}/rekam-jenis-pita/rekam/tasktodo/${this.props.match.params.id}`
        );
      }

      if (data?.status === "Pembatalan Pita") {
        return this.props.history.replace(
          `${pathName}/rekam-jenis-pita/pembatalan/tasktodo/${this.props.match.params.id}`
        );
      }

      notification.info({
        message: "Info",
        description:
          "Status Jenis Pita is not found or invalid in this data or neither 'Penetapan Pita' nor 'Pembatalan Pita'",
      });
    }
  };

  render() {
    return <LoadingWrapperSkeleton />;
  }
}
