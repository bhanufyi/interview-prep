import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
export default function InputGroup({
  name,
  value,
  placeholder,
  error,
  icon,
  type,
  onChangeHandler,
}) {
  return (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon}></i>
            </span>
        </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

InputGroup.propTypes ={
    type:'text'
}
