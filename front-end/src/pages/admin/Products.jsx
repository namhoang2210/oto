import React, { Component } from "react";
import withAdminLayout from "../../hoc/withAdminLayout";
import ProductsList from "../../components/productsList/list";
import ProductEditor from "../../components/productsList/editor";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      editingProduct: null,
      isModalOpen: false,
      filterStatus: "all",
    };
  }

  componentDidMount() {
    const storedProducts = localStorage.getItem("listProduct");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      products.sort((a, b) => b.id - a.id);
      this.setState({ products });
    }
  }

  handleDelete = (productDelete) => {
    const confirmation = window.confirm(
      `Bạn có chắc chắn muốn xóa ${productDelete.name}?`
    );
    if (!confirmation) return;

    const updatedProducts = this.state.products.filter(
      (product) => product.id !== productDelete.id
    );
    this.setState({ products: updatedProducts });
    localStorage.setItem("listProduct", JSON.stringify(updatedProducts));
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      editingProduct: null,
    });
  };

  handleEdit = (product) => {
    this.setState({ isModalOpen: true, editingProduct: product });
  };

  updateProductList = (updatedProducts) => {
    this.setState({ products: updatedProducts.sort((a, b) => b.id - a.id) });
  };

  handleFilterChange = (event) => {
    this.setState({ filterStatus: event.target.value });
  };

  render() {
    const { products, isModalOpen, filterStatus } = this.state;

    const filteredProducts = products.filter((product) => {
      if (filterStatus === "all") return true;
      return product.status === filterStatus;
    });

    return (
      <>
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-800 font-semibold">Danh sách xe</h2>
          <div className="flex gap-3">
            <div>
              <select
                id="filter"
                value={filterStatus}
                onChange={this.handleFilterChange}
                className="border text-sm border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Tất cả</option>
                <option value="in_stock">Còn hàng</option>
                <option value="in_order">Đã đặt</option>
                <option value="sold">Đã bán</option>
              </select>
            </div>

            <button
              onClick={this.toggleModal}
              className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-2.5 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Thêm mới
            </button>
          </div>
        </div>

        <ProductsList
          products={filteredProducts}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
        <ProductEditor
          isModalOpen={isModalOpen}
          toggleModal={this.toggleModal}
          product={this.state.editingProduct}
          updateProductList={this.updateProductList}
        />
      </>
    );
  }
}

export default withAdminLayout(Products);
