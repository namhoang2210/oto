import React, { Component } from "react";
import withAdminLayout from "../../hoc/withAdminLayout";
import Modal from "../../components/shared/Modal";
import EditCustomerModal from "../../components/customerList/Editor";
import formatDate from "../../commons/formatDatetime";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      selectedCustomer: null,
      isModalOpen: false,
    };
  }

  componentDidMount() {
    const storedCustomers = localStorage.getItem("listCustomer");
    if (storedCustomers) {
      const customers = JSON.parse(storedCustomers);
      customers.sort((a, b) => b.id - a.id);
      this.setState({ customers });
    }
  }

  getOrder = (order_car_code) => {
    const { products } = this.state;
    const product = products.find((product) => product.code === order_car_code);
    return product?.code + " - " + product?.model + " - " + product?.location;
  };

  handleDelete = (customerId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
      return;
    }
    const { customers } = this.state;
    const updatedCustomers = customers.filter(
      (customer) => customer.id !== customerId
    );
    this.setState({ customers: updatedCustomers });
    localStorage.setItem("listCustomer", JSON.stringify(updatedCustomers));
  };

  openEditModal = (customer) => {
    this.setState({ selectedCustomer: customer, isModalOpen: true });
  };

  closeEditModal = () => {
    this.setState({ selectedCustomer: null, isModalOpen: false });
  };

  updateCustomer = (updatedCustomer) => {
    const customers = this.state.customers.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    this.setState({ customers });
    localStorage.setItem("listCustomer", JSON.stringify(customers));
    this.closeEditModal();
  };

  render() {
    const { customers, isModalOpen, selectedCustomer } = this.state;

    const checkHaveOrder = (customerId) => {
      const storedOrders = localStorage.getItem("listOrder");
      const orders = JSON.parse(storedOrders);
      const order = orders.find((order) => order.user_id === customerId);
      return order ? true : false;
    }
    return (
      <>
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-800 font-semibold">
            Danh sách khách hàng
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
                  Tên khách hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên đăng nhập
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Số điện thoại
                </th>
                <th scope="col" className="px-6 py-3">
                  Địa chỉ
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái mua hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày tạo
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer, key) => (
                  <tr
                    key={customer.id}
                    className={`bottom-t ${
                      key % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {customer?.id}
                    </th>
                    <td className="px-6 py-4">{customer?.name}</td>
                    <td className="px-6 py-4">{customer?.username}</td>
                    <td className="px-6 py-4 max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis">{customer?.email}</td>
                    <td className="px-6 py-4">{customer?.phone}</td>
                    <td className="px-6 py-4 max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis">{customer?.address}</td>
                    <td className="px-6 py-4">
                      {checkHaveOrder(customer.id) ? (
                        <span className="bg-green-200 text-green-80 px-2 py-0.5 rounded-full text-xs">Đã mua hàng</span>
                      ) : (
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs">Chưa mua hàng</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{formatDate(customer?.created_at)}</td>

                    <td className="float-right items-center px-6 py-2">
                      <button
                        onClick={() => this.openEditModal(customer)}
                        className="text-white  border border-yellow-500 bg-yellow-500 hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => this.handleDelete(customer.id)}
                        className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 text-center">
                    Không có khách hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedCustomer && (
          <Modal title="Chỉnh sửa khách hàng" onClose={this.closeEditModal}>
            <EditCustomerModal
              customer={selectedCustomer}
              onSave={this.updateCustomer}
              onClose={this.closeEditModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default withAdminLayout(Customer);
