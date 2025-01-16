import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/adminLayout/SideBar';
import AdminHeader from '../components/adminLayout/Header';

const withAdminLayout = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    if (!isAuthenticated || isAuthenticated !== 'admin') {
      return <Navigate to="/admin/login" />;
    }

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="flex bg-[#f6f8ff] min-h-screen">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} location={location}/>

        <div className="w-full ml-0 md:ml-64">
          <AdminHeader toggleSidebar={toggleSidebar} /> 

          <main className='p-4 md:py-6 md:px-8'>
            <WrappedComponent {...props} />
          </main>
        </div>
      </div>
    );
  };
};

export default withAdminLayout;