import React, { Component } from 'react';

class ErrorMessageValid extends Component {
  render() {
    const { message } = this.props;
    return (
      <p className='text-red-500 text-[13px]'>{message}</p>
    );
  }
}

export default ErrorMessageValid;