import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/shared/Loading';

const CustomerHome = lazy(() => import('./pages/customer/Home'));
const CustomerLogin = lazy(() => import('./pages/customer/Login'));
const CustomerRegister = lazy(() => import('./pages/customer/Register'));
const CustomerCart =  lazy(() => import('./pages/customer/Cart'));

const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminCustomers = lazy(() => import('./pages/admin/Customers'));
const AdminPayments = lazy(() => import('./pages/admin/Payments'));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* customer routes */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/" element={<CustomerHome />} />
        <Route path="/cart" element={<CustomerCart />} />

        {/* admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
      </Routes>
    </Suspense>
  );
};

export default Router;