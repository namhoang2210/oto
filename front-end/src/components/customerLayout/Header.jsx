import React, { Component } from "react";
import Logo from "../shared/Logo";
import { UserContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";
import UserIcon from "../icons/User";
import CartIcon from "../icons/Cart2";
export default class Header extends Component {
  static contextType = UserContext;

	handleLogout = () => {
		localStorage.removeItem("isAuthenticated");
		this.context.setUser({});
	}

  render() {
    const { user, carts } = this.context;

    return (
      <header className="shadow fixed top-0 w-full z-10 bg-white">
        <div className="max-w-[1380px] mx-auto flex justify-between items-center py-6 font-semibold text-[#081f4d] px-4">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex gap-10">

            {user?.id ? (
              <>
                <Link to="/cart" className="flex items-center gap-1">
                  <CartIcon />
                  Giỏ hàng
                  <span className="w-5 h-5 text-sm rounded-full bg-red-500 text-center text-white">
                    {carts.length}
                  </span>
                </Link>

                <div className="flex items-center gap-1 cursor-pointer">
                  <UserIcon /> 
                  {user.username} | <button onClick={() => this.handleLogout()}>Đăng xuất</button>
                </div>
              </>
            ) : (
              <Link
                to={"/login"}
                className="flex items-center gap-1"
              >
                <UserIcon /> 
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }
}
