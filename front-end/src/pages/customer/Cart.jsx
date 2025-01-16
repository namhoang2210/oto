import React, { Component } from "react";
import withCustomerLayout from "../../hoc/withCustomerLayout";
import { UserContext } from "../../contexts/userContext";
import BreadCrumb from "../../components/customerLayout/breadcrumb";

class Card extends Component {
  static contextType = UserContext;

  state = {
    showPaymentOptions: false,
    paymentMethod: "",
  };

  handleDelete = (itemDelete) => {
    const { user, setCarts } = this.context;
    const carts = JSON.parse(localStorage.getItem("carts")) || [];

    const updatedCarts = carts.filter(
      (item) =>
        item.order_car_code !== itemDelete.order_car_code &&
        item.customer_id === user.id
    );
    setCarts(updatedCarts);
  };

  togglePaymentOptions = () => {
    this.setState({ showPaymentOptions: !this.state.showPaymentOptions });
  };

  handlePaymentSelection = (method) => {
    this.setState({ paymentMethod: method });
  };

  handleConfirmOrder = () => {
		const { user, carts, setCarts } = this.context;
    const { paymentMethod } = this.state;
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán.");
      return;
    }

		const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
    const listProduct = JSON.parse(localStorage.getItem("listProduct")) || [];
    const listPayment = JSON.parse(localStorage.getItem("listPayment")) || [];

    carts.forEach((item, index) => {
      const newOrderId = listOrder.length ? Math.max(...listOrder.map((order) => order.id)) + 1 + index : 1 + index;
      const newOrderCode = `OD${String(newOrderId).padStart(3, "0")}`;

      const newOrder = {
        id: newOrderId,
        user_id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        order_car_code: item.order_car_code,
        code: newOrderCode,
        status: "in_progress",
        created_at: new Date().toISOString(),
      };

      listOrder.push(newOrder);

			const newPaymentId = listPayment.length ? Math.max(...listPayment.map((payment) => payment.id)) + 1 : 1;
      const newPayment = {
        id: newPaymentId,
        order_code: newOrderCode,
        total: item.price,
        payment_method: paymentMethod,
        status: "confirming",
        created_at: new Date().toISOString(),
      };

      listPayment.push(newPayment);


			const productIndex = listProduct.findIndex(
        (product) => product.code === item.order_car_code
      );

      if (productIndex !== -1) {
        listProduct[productIndex].status = "in_order";
      }
    });

    localStorage.setItem("listOrder", JSON.stringify(listOrder));
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    localStorage.setItem("listPayment", JSON.stringify(listPayment));

		const updatedCarts = carts.filter(
      (item) =>
        item.customer_id !== user.id
    );
    setCarts(updatedCarts);

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
                  <td className="py-4">{item.order_car_code}</td>

                  <td className="text-lg font-semibold">{item.product_name}</td>

                  <td>
                    {new Intl.NumberFormat("vi-VN").format(item?.price)} vnđ
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
