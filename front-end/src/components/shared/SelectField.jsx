import React, { Component } from 'react';
import ErrorMessageValid from './ErrorMessageValid';

class SelectField extends Component {
  render() {
    const {
      label,
      name,
      value,
      onChange,
      onBlur,
      options,
      touched,
      error,
      className = ''
    } = this.props;

    return (
      <div>
        <div>
          <label className='text-sm'>{label}</label>
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`border border-gray-400 rounded-md px-2 py-1 min-w-[250px] focus:outline-1 focus:outline-blue-400 ${className}`}
        >
          <option value="">Chọn {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {touched && error ? <ErrorMessageValid message={error} /> : null}
      </div>
    );
  }
}

export default SelectField;
