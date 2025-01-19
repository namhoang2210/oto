import React, { Component } from "react";
import withAdminLayout from "../../hoc/withAdminLayout";
import formatDate from "../../commons/formatDatetime";
import API from "../../api";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
    };
  }

  componentDidMount() {
    API.get('/payments')
    .then((response) => {
      const payments = response.data.payments;
      payments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      this.setState({ payments });
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
    });
  }

  updateStatus = (paymentId) => {
    API.put(`/payments/${paymentId}`, {status: 'confirmed'})
    .then((_response) => {
      const { payments } = this.state;
      const updatedPayments = payments.map((payment) =>
        payment._id === paymentId ? { ...payment, status: "confirmed" } : payment
      );
  
      this.setState({ payments: updatedPayments });
    })
    .catch((error) => {
      console.error('Error updating order:', error);
    });
  };

  render() {
    const { payments } = this.state;

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
                  NO
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
                    key={payment._id}
                    className={`bottom-t ${
                      key % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {key+1}
                    </th>
                    <td className="px-6 py-4">{payment.order_id.code}</td>
                    <td className="px-6 py-4">{payment.user_id.name}</td>
                    <td className="px-6 py-4">{payment.user_id.phone}</td>
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
                          onClick={() => this.updateStatus(payment._id)}
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
