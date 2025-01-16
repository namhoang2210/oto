import React, { Component } from 'react';

class Modal extends Component {
	render() {
		const { children, title, onClose } = this.props;

		return (
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
				<div className="bg-white rounded-lg shadow-lg z-10 p-6 relative">
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>{ title }</h2>
          <button className="absolute top-3 right-3 text-gray-500 cursor-pointer" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
					{children}
				</div>
			</div>
		);
	}
}

export default Modal;