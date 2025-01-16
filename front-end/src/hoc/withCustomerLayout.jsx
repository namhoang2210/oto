import React, { Component } from "react";
import Header from "../components/customerLayout/Header";
import Footer from "../components/customerLayout/Footer";

const withCustomerLayout = (WrappedComponent) => {
  class WithCustomerLayout extends Component {
    render() {
      return (
        <div className="text-[#081f4d]">
          <Header openModalLogin={this.toggleModalLogin} />
          <main className="mt-28">
            <WrappedComponent {...this.props} />
          </main>
          <Footer />
        </div>
      );
    }
  }

  return WithCustomerLayout;
};

export default withCustomerLayout;
