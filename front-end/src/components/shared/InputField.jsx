import React, { Component } from 'react';
import ErrorMessageValid from './ErrorMessageValid';

class InputField extends Component {
  render() {
    const {
      label,
      type,
      name,
      value,
      onChange,
      onBlur,
      touched,
      error,
      className = ''
    } = this.props;

    return (
      <div>
        <div>
          <label className='text-sm'>{label}</label>
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`border border-gray-400 rounded-md px-2 py-1 min-w-[250px] focus:outline-1 focus:outline-blue-400 ${className}`} 
        />
        {touched && error ? <ErrorMessageValid message={error} /> : null}
      </div>
    );
  }
}

export default InputField;