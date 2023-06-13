import React from "react";

const FormLabel = ({ children, style }) => {
  return <span style={{ ...style, fontWeight: 700 }}>{children}</span>;
};

export default FormLabel;
