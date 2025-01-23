import React, { Component } from 'react';
import { UserContext } from '../../contexts/userContext';
import API from '../../api';

class CarCard extends Component {
  static contextType = UserContext;

  addToCart = async() => {
    const { data } = this.props;
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'customer') {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      return;
    }

    await API.post('/carts', {
      user_id: JSON.parse(localStorage.getItem('user'))._id,
      product_id: data._id
    })

    this.context.setCarts();

    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };

  render() {
    const { data } = this.props;

    return (
      <div
        className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer group relative"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={this.addToCart}
            className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
        <img
          className="w-full h-[200px] object-cover"
          src={data.image}
          alt={data.model}
        />
        <div className="px-4 pt-6 py-10">
          <div className='flex items-center justify-between mb-2'>
            <div className="bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">
              Chứng nhận Otobuy
            </div>
            <div className="abg-white text-gray-800 px-2 py-1 rounded-md">
              ID: {data.code}
            </div>
          </div>

          <div className='flex gap-2 items-center mb-4'>
            <div className="font-bold text-red-500 text-xl">{data.price / 1000000} Triệu</div>
            <p className="text-gray-600 text-sm mt-1">{data.monthly_cost}</p>
          </div>

          <div className="font-bold text-lg w-full truncate">{data.model}</div>
          <ul className="grid grid-cols-2 text-gray-700 my-2 bg-[#F2F4FA] text-sm p-2 rounded">
            <li className="flex items-center mr-4">
              <i className="fa fa-tachometer-alt mr-1"></i> {data.distance_travelled}
            </li>
            <li className="flex items-center mr-4">
              <i className="fa fa-car mr-1"></i> {data.seats}
            </li>
            <li className="flex items-center mr-4 py-2">
              <i className="fa fa-cogs mr-1"></i> {data.gearbox}
            </li>
            <li className="flex items-center mr-4 py-2">
              <i className="fa fa-gas-pump mr-1"></i> {data.fuel_type}
            </li>
            <li className="flex items-center mr-4">
              <i className="fa fa-map-marker-alt mr-1"></i> {data.license_plate}
            </li>
            <li className="flex items-center whitespace-nowrap text-ellipsis">
              <i className="fa fa-map-signs mr-1"></i> {data.location}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default CarCard;