import React, { Fragment } from 'react';

export const FormInput = ({ attribute, hidden, className }) => {
  return (
    <Fragment>
      <div className={`row ${className} ${hidden && 'd-none'}`}>
        {Array.isArray(attribute) &&
          attribute.map((field, index) => (
            <div
              className={`col-sm-${field.column || 12} ${
                field.className
              } form-group`}
              key={index}
            >
              {field.type === 'component' && field.component}
              {field.type !== 'component' && (
                <div>
                  <label className="col-form-label">
                    {field.label}
                    {field.required && (
                      <span className="text-danger">&nbsp;*</span>
                    )}
                  </label>
                  {field.type === 'select' && (
                    <select
                      value={field.value}
                      name={field.name}
                      disabled={field.disabled}
                      className={`form-control ${field.inputClassName} ${
                        field.error && 'is-invalid'
                      }`}
                      onChange={field.onChange}
                    >
                      {field.options &&
                        Array.isArray(field.options) &&
                        field.options.map((option, optionIndex) => (
                          <option value={option.value} key={optionIndex}>
                            {option.label || option.value}
                          </option>
                        ))}
                    </select>
                  )}
                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={field.value}
                      name={field.name}
                      disabled={field.disabled}
                      className={`form-control ${field.inputClassName} ${
                        field.error && 'is-invalid'
                      }`}
                      onChange={field.onChange}
                    />
                  )}
                  <div className="invalid-feedback">{field.error}</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </Fragment>
  );
};
