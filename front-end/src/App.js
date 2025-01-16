import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import productData from './datas/products.json';
import orderData from './datas/orders.json';
import customerData from './datas/customers.json';
import paymentData from './datas/payments.json';
import { UserProvider } from './contexts/userContext';
import ErrorBoundary from './components/shared/ErrorBoundary';

const defineDataVersion = 10;

class App extends Component {
  componentDidMount() {

    const currentDataVersion = parseInt(localStorage.getItem('dataVersion'), 10) ;
    if (!currentDataVersion || currentDataVersion < defineDataVersion) {
      localStorage.setItem('listProduct', JSON.stringify(productData));
      localStorage.setItem('listOrder', JSON.stringify(orderData));
      localStorage.setItem('listCustomer', JSON.stringify(customerData));
      localStorage.setItem('listPayment', JSON.stringify(paymentData));
      localStorage.setItem('dataVersion', defineDataVersion);
    } else {
      if (!localStorage.getItem('listProduct')) {
        localStorage.setItem('listProduct', JSON.stringify(productData));
      }
      if (!localStorage.getItem('listOrder')) {
        localStorage.setItem('listOrder', JSON.stringify(orderData));
      }
      if (!localStorage.getItem('listCustomer')) {
        localStorage.setItem('listCustomer', JSON.stringify(customerData));
      }
      if (!localStorage.getItem('listPayment')) {
        localStorage.setItem('listPayment', JSON.stringify(paymentData));
      }
    }
  }

  render() {
    return (
      <UserProvider>
         <ErrorBoundary>
        <Router>
          <AppRouter />
        </Router>\</ErrorBoundary>
      </UserProvider>
    );
  }
}

export default App;