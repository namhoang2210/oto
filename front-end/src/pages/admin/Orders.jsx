import React, { Component } from "react";
import withAdminLayout from "../../hoc/withAdminLayout";
import formatDate from "../../commons/formatDatetime";
import API from "../../api";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: [],
    };
  }

  componentDidMount() {
    API.get('/orders')
    .then((response) => {
      const orders = response.data.orders;
      orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      this.setState({ orders });
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
    });
  }

  updateOrderStatus = (orderId) => {
    API.put(`/orders/${orderId}`, {status: 'completed'})
    .then((_response) => {
      const { orders } = this.state;
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: "completed" } : order
      );
  
      this.setState({ orders: updatedOrders });
    })
    .catch((error) => {
      console.error('Error updating order:', error);
    });
  };

  render() {
    const { orders } = this.state;

    return (
      <>
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-800 font-semibold">
            Danh sách đơn hàng
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
                  Số điện thoại
                </th>
                <th scope="col" className="px-6 py-3">
                  Sản phẩm đặt
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
              {orders.length > 0 ? (
                orders.map((order, key) => (
                  <tr
                    key={order._id}
                    className={`bottom-t ${
                      key % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {key + 1}
                    </th>
                    <td className="px-6 py-4">{order?.code}</td>
                    <td className="px-6 py-4">{order?.user_id.name}</td>
                    <td className="px-6 py-4">{order?.user_id.phone}</td>

                    <td className="px-6 py-4">
                      {order.product_id.model}
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className={`text-center py-1 w-24 rounded-full text-xs font-medium ${
                          order.status === "in_progress"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {order.status === "in_progress"
                          ? "Đang xử lý"
                          : "Đã xử lý"}
                      </div>
                    </td>
                    <td className="px-6 py-4">{formatDate(order?.created_at)}</td>
                    <td className="float-right items-center px-6 py-2">
                      {order.status === "in_progress" && (
                      <button
                        onClick={() => this.updateOrderStatus(order._id)}
                        className="text-white border border-yellow-500 bg-yellow-500 hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2"
                      >
                        Xác nhận đã xử lý
                      </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 text-center">
                    Không có đơn hàng nào
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

export default withAdminLayout(Order);
