import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { endpoints } from "configs/constants";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class PermohonanTarifTaskToDo extends Component {
  componentDidMount() {
    this.getPermohonanTarifDetail();
  }

  getPermohonanTarifDetail = async () => {
    const payload = { idProses: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.permohonanTarifDetailTasktodo,
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      if (data?.status === "Penetapan Pita") {
        return this.props.history.replace(
          `${pathName}/permohonan-tarif/rekam/tasktodo/${this.props.match.params.id}`
        );
      }

      if (data?.status === "Penetapan Pencabuatan") {
        return this.props.history.replace(
          `${pathName}/permohonan-tarif/pembatalan/tasktodo/${this.props.match.params.id}`
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
