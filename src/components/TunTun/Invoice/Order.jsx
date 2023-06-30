import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Table, InputNumber } from 'antd';
import axios from 'axios';

function Order() {
  const location = useLocation();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState('');

  useEffect(() => {
    loadProductsData();
  }, []);

  const loadProductsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/get?p=0');
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = (product) => {
    const newProducts = [...products, product.price];
    const newQuantities = [...quantities, 1];
    setProducts(newProducts);
    setQuantities(newQuantities);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);

    const newQuantities = [...quantities];
    newQuantities.splice(index, 1);
    setQuantities(newQuantities);
  };

  const resetForm = () => {
    setCustomerPhoneNumber('');
    setProducts([]);
    setQuantities([]);
    setDiscount(0);
    setToken('');
  };

  const placeOrder = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      console.log(storedToken);

      if (!storedToken) {
        // Lưu lại đường dẫn hiện tại trước khi chuyển hướng đến trang đăng nhập
        const currentPath = location.pathname;
        // Chuyển hướng sử dụng Link
        return <Link to={{ pathname: '/login', state: { from: currentPath } }} />;
      }

      setToken(storedToken);

      // Tiếp tục xử lý đặt hàng
      const response = await fetch('http://localhost:5000/invoice/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerPhoneNumber: customerPhoneNumber,
          products: products,
          quantity: quantities,
          discount: discount,
          token: storedToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.msg === 'Success') {
        console.log(data.msg);
        alert('Order placed successfully');
        resetForm();

        // Kiểm tra xem trạng thái `from` có tồn tại không
        if (location.state && location.state.from) {
          // Chuyển hướng sử dụng Link
          return <Link to={location.state.from} />;
        } else {
          // Nếu không có trạng thái `from`, chuyển hướng đến trang mặc định (ví dụ: trang chủ)
          // Chuyển hướng sử dụng Link
          return <Link to="/product" />;
        }
      } else {
        alert('Failed to place order');
        console.log(data.msg);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const searchProducts = async (searchType) => {
    try {
      setSearching(true);
      let searchData = {};

      switch (searchType) {
        case 'code':
          searchData = { code: searchData };
          break;
        case 'name':
          searchData = { name: searchData };
          break;
        case 'typeName':
          searchData = { typeName: searchData };
          break;
        case 'price':
          searchData = { price: searchData };
          break;
        case 'brand':
          searchData = { brand: searchData };
          break;
        case 'storage':
          searchData = { storage: searchData };
          break;
        default:
          break;
      }

      const response = await axios.post('http://localhost:5000/products/search', searchData);
      if (response.data.msg === 'success') {
        setSearchResults(response.data.data);
        setNotFoundMessage('');
      } else {
        setSearchResults([]);
        setNotFoundMessage('Không tìm thấy kết quả');
      }
      setSearching(false);
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      setSearching(false);
    }
  };

  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => addProduct(record)}>
          Thêm vào hóa đơn
        </Button>
      ),
    },
  ];

  // Tính tổng giá trị hóa đơn
  const totalPrice = products.reduce((total, product, index) => {
    const quantity = quantities[index];
    const price = product.price * quantity;
    return total + price;
  }, 0);

  // Áp dụng giảm giá
  const discountedPrice = totalPrice * (1 - discount / 100);

  return (
    <div className="border w-[1000px] p-[10px] flex ml-[100px]">
      <div className="w-[700px] border-spacing-1 border-zinc-950 ml-[10px]">
        <h1 className="flex justify-center text-4xl font-bold dark:text-white text-[#2853d2]">Đặt hàng</h1>
        <div className="flex">
          <input
            className="w-[690px] border border-gray-300 rounded-md px-3 py-2"
            onChange={(e) => setCustomerPhoneNumber(e.target.value)}
            type="text"
            placeholder="Số điện thoại khách hàng"
          />
        </div>
        <div className="my-4">
          <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" />
        </div>
        <div className="my-4">
          <h3>Hóa đơn:</h3>
          {products.map((product, index) => (
            <div className="flex" key={index}>
              <div>{product}</div>
              <InputNumber
                className="ml-2"
                min={1}
                value={quantities[index]}
                onChange={(value) => handleQuantityChange(index, value)}
              />
              <Button className="ml-2" danger onClick={() => removeProduct(index)}>
                Xóa
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button className="bg-[#2f6bff] cursor-pointer w-[71px] h-[32px] text-white" onClick={addProduct}>
            Thêm sản phẩm
          </Button>
        </div>
        <div className="flex">
          <input
            className="w-[340px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]"
            onChange={(e) => setDiscount(e.target.value)}
            type="text"
            placeholder="Giảm giá (%)"
          />
        </div>
        <div className="flex justify-center mt-[10px]">
          <Button className="bg-[#2f6bff] cursor-pointer w-[71px] h-[32px] text-white" onClick={placeOrder}>
            Đặt hàng
          </Button>
        </div>
        <div className="flex justify-between mt-[10px]">
          <div className="font-bold">Tổng giá trị hóa đơn:</div>
          <div>{totalPrice}</div>
        </div>
        <div className="flex justify-between mt-[10px]">
          <div className="font-bold">Giảm giá:</div>
          <div>{discountedPrice}</div>
        </div>
      </div>
    </div>
  );
}

export default Order;
