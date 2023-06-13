import React from "react";

const Container = ({
  children,
  menuName = "Dashboard",
  contentName = "Content Name",
  hideContentHeader = false,
  subHeaderLoading = false,
  onClick1 = () => {},
  onClick2 = () => {},
  onClick3 = () => {},
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
          <h3 className="kt-subheader__title">{menuName}</h3>
          <span className="kt-subheader__separator kt-subheader__separator--v"></span>
          <span className="kt-subheader__desc"></span>
          <h3 className="kt-subheader__title">{contentName}</h3>
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
          <div className="kt-subheader__wrapper">
            {/* <button className="btn kt-subheader__btn-secondary" onClick={onClick2}>Today</button>
              <button className="btn kt-subheader__btn-primary" onClick={onClick3}>
                Actions &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  className="kt-svg-icon kt-svg-icon--sm"
                >
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <rect id="bound" x="0" y="0" width="24" height="24" />
                    <rect
                      id="Rectangle-8"
                      fill="#000000"
                      x="4"
                      y="5"
                      width="16"
                      height="3"
                      rx="1.5"
                    />
                    <path
                      d="M7.5,11 L16.5,11 C17.3284271,11 18,11.6715729 18,12.5 C18,13.3284271 17.3284271,14 16.5,14 L7.5,14 C6.67157288,14 6,13.3284271 6,12.5 C6,11.6715729 6.67157288,11 7.5,11 Z M10.5,17 L13.5,17 C14.3284271,17 15,17.6715729 15,18.5 C15,19.3284271 14.3284271,20 13.5,20 L10.5,20 C9.67157288,20 9,19.3284271 9,18.5 C9,17.6715729 9.67157288,17 10.5,17 Z"
                      id="Combined-Shape"
                      fill="#000000"
                      opacity="0.3"
                    />
                  </g>
                </svg>{" "}
              </button> */}
          </div>
        </div>
      </div>
    )}

    <div className="kt-portlet kt-portlet--mobile">
      {hideContentHeader ? (
        <>{children}</>
      ) : (
        <>
          <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
              <span className="kt-portlet__head-icon">
                <i className="kt-font-brand flaticon2-folder"></i>
              </span>
              <h3 className="kt-portlet__head-title kt-font-bolder">{contentName}</h3>
            </div>
          </div>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            {children}
          </div>
        </>
      )}
    </div>
  </>
);

export default Container;
