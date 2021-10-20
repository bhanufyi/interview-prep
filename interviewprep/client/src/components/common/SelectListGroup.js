import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
export default function SelectListGroup({
  name,
  value,
  error,
  info,
  onChangeHandler,
  options
}) {

    const selectOptions = options.map(option=>( <option key={option.key} value={option.value}>{option.label}</option>))
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChangeHandler}
      >{selectOptions}</select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  options:PropTypes.array.isRequired
};
