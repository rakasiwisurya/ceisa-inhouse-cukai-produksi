import React from "react";

const Container = ({
  children,
  menuName,
  contentName,
  hideContentHeader = false,
  subHeaderLoading = false,
}) => (
  <>
    {subHeaderLoading ? (
      <div className="kt-subheader   kt-grid__item" id="kt_subheader">
        <div className="kt-subheader__main">
          <h3 className="kt-subheader__title">{"Mohon Tunggu ..."}</h3>
        </div>
      </div>
    ) : (
      <div
        className="kt-subheader   kt-grid__item overider_kt_subheader"
        id="kt_subheader"
        style={{ zIndex: 10 }}
      >
        <div className="kt-subheader__main">
          <h3 className="kt-subheader__title">{menuName || "Memuat Data ..."}</h3>
          {contentName && (
            <>
              <span className="kt-subheader__separator kt-subheader__separator--v"></span>
              <span className="kt-subheader__desc"></span>
              <h3 className="kt-subheader__title">{contentName}</h3>
            </>
          )}
          <div className="kt-input-icon kt-input-icon--right kt-subheader__search kt-hidden">
            <input
              type="text"
              className="form-control"
              placeholder="Search order..."
              id="generalSearch"
            />
            <span className="kt-input-icon__icon kt-input-icon__icon--right">
              <span>
                <i className="flaticon2-search-1"></i>
              </span>
            </span>
          </div>
        </div>
        <div className="kt-subheader__toolbar">
          <div className="kt-subheader__wrapper"></div>
        </div>
      </div>
    )}

    <div className="kt-portlet kt-portlet--mobile">
      {hideContentHeader ? null : (
        <div className="kt-portlet__head kt-portlet__head--lg">
          <div className="kt-portlet__head-label">
            <span className="kt-portlet__head-icon">
              <i className="kt-font-brand flaticon2-folder"></i>
            </span>
            <h3 className="kt-portlet__head-title kt-font-bolder">{contentName}</h3>
          </div>
        </div>
      )}
      <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
        {children}
      </div>
    </div>
  </>
);

export default Container;
