import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
export default function TextFieldGroup({
    name,
    value,
    placeholder,
    label,
    error,
    info,
    type,
    onChangeHandler,
    disabled
}) {
    return (
      <div className="form-group">
        <input
          type={type}
          className={classnames("form-control form-control-lg", {
            "is-invalid": error,
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChangeHandler}
          disabled={disabled}
        />
        {info && <small className='form-text text-muted'>{info}</small> }
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  disabled: PropTypes.string
 
};

TextFieldGroup.defaultProps = {
    type:'text'
}
