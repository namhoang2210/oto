import React, { Component } from "react";
import withCustomerLayout from "../../hoc/withCustomerLayout";
import { UserContext } from "../../contexts/userContext";
import BreadCrumb from "../../components/customerLayout/breadcrumb";
import API from "../../api";

class Card extends Component {
  static contextType = UserContext;

  state = {
    showPaymentOptions: false,
    paymentMethod: "",
  };

  handleDelete = async(itemDelete) => {
    await API.delete(`/carts/${itemDelete._id}`)
    const { setCarts } = this.context;
    setCarts();
  };

  togglePaymentOptions = () => {
    this.setState({ showPaymentOptions: !this.state.showPaymentOptions });
  };

  handlePaymentSelection = (method) => {
    this.setState({ paymentMethod: method });
  };

  handleConfirmOrder = async() => {
		const { user, carts, setCarts } = this.context;
    const { paymentMethod } = this.state;
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    for (const item of carts) {
      const { data } = await API.post('/orders', {
        "user_id": user._id, 
        "product_id": item.product_id._id, 
        "status": "in_progress"
      });
    
      console.log(data);
    
      await API.post('/payments', {
        "user_id": user._id, 
        "order_id": data.order._id, 
        "total": item.product_id.price,
        "payment_method": paymentMethod
      });
    
      await API.delete(`/carts/${item._id}`);
    }

    await setCarts();

    alert(`Đặt hàng thành công với phương thức thanh toán: ${paymentMethod}`);
    this.setState({ showPaymentOptions: false, paymentMethod: "" });
  };

  render() {
    const { carts } = this.context;
    const { showPaymentOptions, paymentMethod } = this.state;

		if(carts.length === 0) {
			return (
				<div className="min-h-[calc(100vh-176px)] text-center pt-28">Giỏ hàng trống</div>
			)
		}
    return (
      <div className="max-w-[1380px] mx-auto px-4 min-h-[calc(100vh-176px)]">
        <BreadCrumb subTitle="Giỏ hàng" />

        <div className="my-10">
          <table className="w-full">
            <thead>
              {carts.map((item, index) => (
                <tr className="border-b" key={index}>
                  <td className="py-4">{item?.product_id.code}</td>

                  <td className="text-lg font-semibold">{item?.product_id.model}</td>

                  <td>
                    {new Intl.NumberFormat("vi-VN").format(item?.product_id.price)} vnđ
                  </td>
                  <td className="w-[20px]">
                    <button onClick={() => this.handleDelete(item)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        </div>

        {showPaymentOptions && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Chọn phương thức thanh toán
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => this.handlePaymentSelection("Chuyển khoản")}
                className={`py-2 px-4 w-[160px] h-[80px] border border-gray-100 rounded font-semibold shadow ${
                  paymentMethod === "Chuyển khoản"
                    ? "bg-gray-200 "
                    : "bg-white"
                }`}
              >
                Chuyển khoản
              </button>
              <button
                onClick={() => this.handlePaymentSelection("Tiền mặt")}
                className={`py-2 px-4 w-[160px] border border-gray-100 rounded font-semibold shadow ${
                  paymentMethod === "Tiền mặt"
                    ? "bg-gray-200 "
                    : "bg-white"
                }`}
              >
                Tiền mặt
              </button>
            </div>
						<div className="flex gap-4 mt-10 justify-center">
						<button
              onClick={this.handleConfirmOrder}
              className=" bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded"
            >
              Xác nhận
            </button>
            <button
              onClick={this.togglePaymentOptions}
              className=" bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-10 rounded"
            >
              Hủy
            </button>
						</div>
          
          </div>
        )}

        {!showPaymentOptions && (
          <button
            onClick={this.togglePaymentOptions}
            className=" bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2.5 px-4 rounded mt-4"
          >
            Đặt hàng
          </button>
        )}
      </div>
    );
  }
}

export default withCustomerLayout(Card);
