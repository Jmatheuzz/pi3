import React from 'react';
import PropTypes from 'prop-types';
import './InputField.css'; 

const InputField = ({ id, type, value, onChange, label }) => {
  return (
    <div className="input-field">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default InputField;