import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
export default function TextAreaFieldGroup({
  name,
  value,
  placeholder,
  error,
  info,
  onChangeHandler,
}) {
  return (
    <div className="form-group">
      <textarea
        
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
};


