import { notification } from "antd";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import React, { Component } from "react";

export default class PermohonanTarifTaskToDoPerbaikan extends Component {
  componentDidMount() {
    notification.info({
      message: "Info",
      description: "This feature is on progress...",
      duration: null,
      onClose: () => this.props.history.goBack(),
    });
  }

  render() {
    return <LoadingWrapperSkeleton />;
  }
}
