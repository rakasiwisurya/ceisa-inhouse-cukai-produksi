import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import "./ButtonCustom.css";

export default class ButtonCustom extends Component {
  render() {
    const { children, variant, ...rest } = this.props;

    if (variant === "outline-violet") {
      return (
        <Button {...rest} type="default" className="btn-outline-violet">
          {children}
        </Button>
      );
    }

    if (variant === "violet") {
      return (
        <Button {...rest} type="primary" className="btn-violet">
          {children}
        </Button>
      );
    }

    if (variant === "outline-indigo") {
      return (
        <Button {...rest} type="default" className="btn-outline-indigo">
          {children}
        </Button>
      );
    }

    if (variant === "indigo") {
      return (
        <Button {...rest} type="primary" className="btn-indigo">
          {children}
        </Button>
      );
    }

    if (variant === "outline-secondary") {
      return (
        <Button {...rest} type="default" className="btn-outline-gray">
          {children}
        </Button>
      );
    }

    if (variant === "secondary") {
      return (
        <Button {...rest} type="primary" className="btn-gray">
          {children}
        </Button>
      );
    }

    if (variant === "outline-info") {
      return (
        <Button {...rest} type="default" className="btn-outline-daybreak">
          {children}
        </Button>
      );
    }

    if (variant === "info") {
      return (
        <Button {...rest} type="primary" className="btn-daybreak">
          {children}
        </Button>
      );
    }

    if (variant === "outline-success") {
      return (
        <Button {...rest} type="default" className="btn-outline-green">
          {children}
        </Button>
      );
    }

    if (variant === "success") {
      return (
        <Button {...rest} type="primary" className="btn-green">
          {children}
        </Button>
      );
    }

    if (variant === "outline-warning") {
      return (
        <Button {...rest} type="default" className="btn-outline-yellow">
          {children}
        </Button>
      );
    }

    if (variant === "warning") {
      return (
        <Button {...rest} type="primary" className="btn-yellow">
          {children}
        </Button>
      );
    }

    if (variant === "outline-danger") {
      return (
        <Button {...rest} type="default" className="outline-danger">
          {children}
        </Button>
      );
    }

    if (variant === "danger")
      return (
        <Button {...rest} type="danger">
          {children}
        </Button>
      );

    if (variant === "outline-primary") {
      return (
        <Button {...rest} type="default" className="outline-primary">
          {children}
        </Button>
      );
    }

    return (
      <Button {...rest} type="primary">
        {children}
      </Button>
    );
  }
}

ButtonCustom.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "outline-primary",
    "danger",
    "outline-danger",
    "warning",
    "outline-warning",
    "success",
    "outline-success",
    "info",
    "outline-info",
    "secondary",
    "outline-secondary",
    "indigo",
    "outline-indigo",
    "violet",
    "outline-violet",
  ]),
};
