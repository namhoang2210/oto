import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../shared/Logo";
import { withNavigate } from "../../hoc/withNavigate"; 
import LogoutIcon from "../icons/Logout";
import PaymentIcon from "../icons/Payment";
import CustomerIcon from "../icons/Customer";
import CartIcon from "../icons/Cart";
import WindownnIcon from "../icons/Windown";

class Sidebar extends Component {
  render() {
    const { isOpen, toggleSidebar, location, navigate } = this.props;

    const itemMenu = [
      {
        name: "Quản lí xe",
        link: "/admin",
        icon: ( <WindownnIcon />),
      },
      {
        name: "Quản lí đơn hàng",
        link: "/admin/orders",
        icon: ( <CartIcon />),
      },
      {
        name: "Quản lí khách hàng",
        link: "/admin/customers",
        icon: ( <CustomerIcon />),
      },
      {
        name: "Quản lí thanh toán",
        link: "/admin/payments",
        icon: ( <PaymentIcon />),
      },
    ];

    const handleLogout = () => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/admin/login");
    };

    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20"
            onClick={toggleSidebar}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 h-full bg-white text-gray-500 p-5 transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-64 border-r border-gray-50 z-30`}
        >
          <div className="flex justify-between mb-11 items-center">
            <Logo />
            <button onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 md:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul>
            {itemMenu.map((item, index) => (
              <Link to={item.link} key={index}>
                <li
                  className={`flex gap-2 items-center mb-2 text-gray-500 font-semibold w-full p-3 rounded-md ${
                    location.pathname === item.link
                      ? "bg-[#3686FF] !text-gray-50"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </li>
              </Link>
            ))}

            <div className="w-full h-[1px] bg-gray-300 mb-2"></div>
            <li 
              className="flex gap-2 items-center mb-2 text-gray-500 font-semibold w-full p-3 rounded-md hover:bg-blue-100 cursor-pointer"
              onClick={handleLogout}
            >
              <LogoutIcon />
              Đăng xuất
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default withNavigate(Sidebar);
