import React from "react";

export const LabelSuccess = (text) => {
  return (
    <span 
      className="form-control"
      style={{
        background: "#D4FFC9",
        border: "1px solid #28C700",
        borderRadius: "4px",
      }}
    >
      <i
        className="fa fa-check-circle"
        style={{
          background: "#FFFFFF",
          color: "#28C700",
        }}
      ></i> {text}
    </span>
  );
};

export const LabelWarning = (text) => {
  return (
    <span 
      className="form-control"
      style={{
        background: "#FFF8B6",
        border: "1px solid #FFE600",
        borderRadius: "4px",
      }}
    >
      <i
        className="fa fa-info-circle"
        style={{
          background: "#FFFFFF",
          color: "#FFE600",
        }}
      ></i> {text}
    </span>
  );
};

export const LabelDanger = (text) => {
  return (
    <span 
      className="form-control"
      style={{
        background: "#D4FFC9",
        border: "1px solid #28C700",
        borderRadius: "4px",
      }}
    >
      <i
        className="fa fa-check-circle"
        style={{
          background: "#FFFFFF",
          color: "#28C700",
        }}
      ></i> {text}
    </span>
  );
};