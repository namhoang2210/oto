import React, { Component } from "react";
import withAdminLayout from "../../hoc/withAdminLayout";
import formatDate from "../../commons/formatDatetime";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: [],
    };
  }

  componentDidMount() {
    const storedOrders = localStorage.getItem("listOrder");
    if (storedOrders) {
      const orders = JSON.parse(storedOrders);
      orders.sort((a, b) => b.id - a.id);
      this.setState({ orders });
    }

    const storedProducts = localStorage.getItem("listProduct");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      this.setState({ products });
    }
  }

  getOrder = (order_car_code) => {
    const { products } = this.state;
    const product = products.find((product) => product.code === order_car_code);
    return product?.code + " - " + product?.model + " - " + product?.location;
  };

  updateOrderStatus = (orderId) => {
    const { orders } = this.state;
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "completed" } : order
    );

    this.setState({ orders: updatedOrders });
    localStorage.setItem("listOrder", JSON.stringify(updatedOrders));
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
                  ID
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
                    key={order.id}
                    className={`bottom-t ${
                      key % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {order?.id}
                    </th>
                    <td className="px-6 py-4">{order?.code}</td>
                    <td className="px-6 py-4">{order?.name}</td>
                    <td className="px-6 py-4">{order?.phone}</td>

                    <td className="px-6 py-4">
                      {this.getOrder(order?.order_car_code)}
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
                        onClick={() => this.updateOrderStatus(order.id)}
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
