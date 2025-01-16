import React, { Component } from "react";
import withAdminLayout from "../../hoc/withAdminLayout";
import formatDate from "../../commons/formatDatetime";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
    };
  }

  componentDidMount() {
    const storedPayments = localStorage.getItem("listPayment");

    if (storedPayments) {
      const payments = JSON.parse(storedPayments);
      payments.sort((a, b) => b.id - a.id);
      this.setState({ payments });
    }
  }

  getOrder = (order_car_code) => {
    const { products } = this.state;
    const product = products.find((product) => product.code === order_car_code);
    return product?.code + " - " + product?.model + " - " + product?.location;
  };

  updateStatus = (paymentId) => {
    const { payments } = this.state;
    const updatedPayments = payments.map((payment) =>
      payment.id === paymentId ? { ...payment, status: "confirmed" } : payment
    );

    this.setState({ payments: updatedPayments });
    localStorage.setItem("listPayment", JSON.stringify(updatedPayments));
  };

  render() {
    const { payments } = this.state;

    const getOrderByCode = (orderCode) => {
      const storedOrders = localStorage.getItem("listOrder");
      if (storedOrders) {
        const orders = JSON.parse(storedOrders);
        const order = orders.find((order) => order.code === orderCode);
        return order;
      }
    }

    return (
      <>
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-800 font-semibold">
            Lịch sử thanh toán
          </h2>
        </div>
        <div className="relative overflow-x-auto rounded-lg mt-6 bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã đơn
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên khách hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Số diện thoại
                </th>
                <th scope="col" className="px-6 py-3">
                  Sô tiền(VND)
                </th>
                <th scope="col" className="px-6 py-3">
                  Phương thức thanh toán
                </th>
                <th scope="col" className="px-6 py-3">
                 Trạng thái
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày tạo
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, key) => (
                  <tr
                    key={payment.id}
                    className={`bottom-t ${
                      key % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {payment?.id}
                    </th>
                    <td className="px-6 py-4">{payment?.order_code}</td>
                    <td className="px-6 py-4">{getOrderByCode(payment.order_code).name}</td>
                    <td className="px-6 py-4">{getOrderByCode(payment.order_code).phone}</td>
                    <td className="px-6 py-4">
                      {new Intl.NumberFormat("vi-VN").format(payment?.total)}
                    </td>
                    <td className="px-6 py-4">{payment?.payment_method}</td>
                  
                    <td className="px-6 py-4">
                      <div
                        className={`text-center py-1 w-24 rounded-full text-xs font-medium ${
                          payment.status === "confirming"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {payment.status === "confirming"
                          ? "Đang xác nhận"
                          : "Thành công"}
                      </div>
                    </td>
                    <td className="px-6 py-4">{formatDate(payment?.created_at)}</td>
                    <td className="float-right items-center px-6 py-2">
                      {payment.status === "confirming" && (
                        <button
                          onClick={() => this.updateStatus(payment.id)}
                          className="text-white border border-yellow-500 bg-yellow-500 hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2"
                        >
                          Xác nhận thanh toán
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 text-center">
                    Không có lịch sử thanh toán
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default withAdminLayout(Payment);
