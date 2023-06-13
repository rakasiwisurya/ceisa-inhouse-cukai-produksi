import {Skeleton} from "antd";
import React from "react";
import Container from "components/Container";

const LoadingWrapperSkeleton = ({avatar = true, paragraph = 10, subHeaderLoading = false}) => {
  return (
    <Container hideContentHeader subHeaderLoading={subHeaderLoading}>
      <Skeleton active avatar={avatar} paragraph={{ rows: paragraph }} />
    </Container>
  )
}

export default LoadingWrapperSkeleton;
