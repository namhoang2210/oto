import React, { Component } from 'react';
import withCustomerLayout from '../../hoc/withCustomerLayout';
import CarCard from '../../components/home/carCard';
import SearchIcon from '../../components/icons/Search';
import BreadCrumb from '../../components/customerLayout/breadcrumb';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      searchQuery: '',
      selectedPriceRange: '',
      selectedBrand: '',
      selectedBranch: '',
    };
  }

  componentDidMount() {
    const storedProducts = localStorage.getItem("listProduct");
    if (storedProducts) {
      let products = JSON.parse(storedProducts);
      products = products.filter(product => product.status === 'in_stock');
      products.sort((a, b) => b.id - a.id);
      this.setState({ products, filteredProducts: products });
    }
  }

  handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    this.setState({ searchQuery }, this.applyFilters);
  };

  handlePriceRangeChange = (event) => {
    this.setState({ selectedPriceRange: event.target.value }, this.applyFilters);
  };

  handleBrandChange = (event) => {
    this.setState({ selectedBrand: event.target.value }, this.applyFilters);
  };

  handleBranchChange = (event) => {
    this.setState({ selectedBranch: event.target.value }, this.applyFilters);
  };

  applyFilters = () => {
    const { products, searchQuery, selectedPriceRange, selectedBrand, selectedBranch } = this.state;

    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.model.toLowerCase().includes(searchQuery);

      const matchesPrice = selectedPriceRange ? this.checkPriceRange(product.price, selectedPriceRange) : true;
      const matchesBrand = selectedBrand ? product.model.toLowerCase().includes(selectedBrand.toLowerCase()) : true;
      const matchesBranch = selectedBranch ? product.location.toLowerCase().includes(selectedBranch.toLowerCase()) : true;

      return matchesSearch && matchesPrice && matchesBrand && matchesBranch;
    });

    this.setState({ filteredProducts });
  };

  checkPriceRange = (price, range) => {
    const carPrice = parseFloat(price);
    switch (range) {
      case 'below500':
        return carPrice < 500000000;
      case '500to1000':
        return carPrice >= 500000000 && carPrice <= 1000000000;
      case 'above1000':
        return carPrice > 1000000000;
      default:
        return true;
    }
  };

  render() {
    const { filteredProducts, searchQuery, selectedPriceRange, selectedBrand, selectedBranch } = this.state;

    return (
      <div className='min-h-[calc(100vh-176px)]'>
        <div className='max-w-[1380px] mx-auto px-4 '>
          <BreadCrumb subTitle='Mua xe' />

          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input 
              type="search" 
              value={searchQuery}
              onChange={this.handleSearch}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-0 focus:border-none"
              placeholder="Tìm kiếm mẫu xe hoặc từ khóa" 
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <select
              value={selectedPriceRange}
              onChange={this.handlePriceRangeChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Chọn khoảng giá</option>
              <option value="below500">Dưới 500 triệu</option>
              <option value="500to1000">500 - 1 tỷ</option>
              <option value="above1000">Trên 1 tỷ</option>
            </select>

            <select
              value={selectedBrand}
              onChange={this.handleBrandChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Chọn hãng xe</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Kia">Kia</option>
            </select>

            <select
              value={selectedBranch}
              onChange={this.handleBranchChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Chọn chi nhánh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="HCM">Hồ Chí Minh</option>
            </select>
          </div>

          <h1 className='text-2xl font-semibold mt-6'>Mua bán xe ô tô cũ</h1>
        </div>

        <div className='mt-4 bg-[#f2f4fa]'>
          <div className='max-w-[1380px] mx-auto pt-6 pb-16 px-4'>
            Có {filteredProducts.length} xe rao bán
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6'>
              {filteredProducts.length > 0 && filteredProducts.map(product => (
                <CarCard key={product.id} data={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCustomerLayout(Home);
