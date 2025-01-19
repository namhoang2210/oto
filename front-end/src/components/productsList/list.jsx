import React, { Component } from "react";
import formatDate from "../../commons/formatDatetime";

class ProductList extends Component {
  render() {
    const { products, onDelete, onEdit } = this.props;

    return (
      <div className="relative overflow-x-auto rounded-lg mt-6 bg-white">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                Mã xe
              </th>
              <th scope="col" className="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                Giá(vnd)
              </th>
              <th scope="col" className="px-6 py-3">
                Loại xe
              </th>
              <th scope="col" className="px-6 py-3">
                Chi nhánh
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
            {products.length > 0 ? (
              products.map((product, key) => (
                <tr
                  key={product._id}
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
                  <td className="px-6 py-4">{product?.code}</td>
                  <td className="px-6 py-4">{product?.model}</td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("vi-VN").format(product?.price)}
                  </td>
                  <td className="px-6 py-4">{product?.seats}</td>
                  <td className="px-6 py-4">{product?.location}</td>

                  <td className="px-6 py-4">
                    <div
                      className={`text-center py-1 w-24 rounded-full text-xs font-medium ${
                        product.status === "in_stock"
                          ? "bg-green-200 text-green-800"
                          : product.status === "in_order"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {product.status === "in_stock" ? 'Còn hàng' : product.status === "in_order" ? 'Đã đặt hàng' : 'Đã bán'}
                    </div>
                  </td>
                  <td className="px-6 py-4">{formatDate(product?.created_at)}</td>

                  <td className="float-right items-center px-6 py-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-white  border border-yellow-500 bg-yellow-500 hover:bg-yellow-400 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(product)}
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
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductList;
