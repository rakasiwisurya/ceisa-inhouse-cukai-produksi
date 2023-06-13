import React from "react";

const Header = ({ children }) => {
  return (
    <div className="kt-portlet__head kt-portlet__head--lg">
      <div className="kt-portlet__head-label">
        <span className="kt-portlet__head-icon">
          <i className="kt-font-brand flaticon2-folder"></i>
        </span>
        <h3 className="kt-portlet__head-title kt-font-bolder">{children}</h3>
      </div>
    </div>
  );
};

export default Header;
