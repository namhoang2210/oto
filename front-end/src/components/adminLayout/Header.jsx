import React, { Component } from 'react';

class AdminHeader extends Component {
  render() {
    const { toggleSidebar } = this.props;

    return (
      <header className='flex justify-between items-center py-4 px-4 md:px-8 bg-white'>
        <div>
          <button className="md:hidden" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className='flex items-center leading-5'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGRXEYGZx34wXFRpYUMpxtTA6ETHpPv51vhw&s" alt="avatar" className="w-10 h-10 rounded-full mr-2"/>
          <div className='hidden md:block'>
            <span className='font-semibold'>Admin</span>
            <p className='text-xs text-gray-600'><span className='h-2 w-2 rounded-full bg-green-500 inline-block mr-0.5'></span>Online</p>
          </div>
        </div>
      </header>
    );
  }
}

export default AdminHeader;