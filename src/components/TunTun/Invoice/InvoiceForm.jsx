import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Table, Input, Select, Button, InputNumber, Row, Col, Popconfirm, message, Modal} from 'antd';
import axios from 'axios';
const { Option } = Select;
function Order() {
  const location = useLocation();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [products, setProducts] = useState([]);
  const [quantity, setquantity] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [token, setToken] = useState('');
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searching, setSearching] = useState(false);
    const [notFoundMessage, setNotFoundMessage] = useState('');
    
    const [totalPrice, setTotalPrice] = useState(0);



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
  const newProducts = [...products, { code: product.code}];
  const newquantity = [...quantity, 1];
  setProducts(newProducts);
  setquantity(newquantity);

  // Tính toán lại tổng giá trị hóa đơn
  const total = calculateTotalPrice();
  setTotalPrice(total);
};


  const handleQuantityChange = (index, value) => {
    const newquantity = [...quantity];
    newquantity[index] = value;
    setquantity(newquantity);
      
    const total = calculateTotalPrice();
  setTotalPrice(total);
  };

  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);

    const newquantity = [...quantity];
    newquantity.splice(index, 1);
    setquantity(newquantity);
      
    const total = calculateTotalPrice();
    setTotalPrice(total);
  };

  const resetForm = () => {
    setCustomerPhoneNumber('');
    setProducts([]);
    setquantity([]);
    setDiscount(0);
    setToken('');
    setTotalPrice(0);
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

        if (isNaN(discount)) {
    message.error('Discount must be a number');
    return;
  }
      // Tiếp tục xử lý đặt hàng
      const response = await fetch('http://localhost:5000/invoice/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerPhoneNumber: customerPhoneNumber,
          products: products,
        quantity: quantity,
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
          console.log(customerPhoneNumber)
          console.log(products)
          console.log(quantity)
          console.log(discount)
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
          searchData = { code: value };
          break;
        case 'name':
          searchData = { name: value };
          break;
        case 'typeName':
          searchData = { typeName: value };
          break;
        case 'price':
          searchData = { price: value };
          break;
        case 'brand':
          searchData = { brand: value };
          break;
        case 'storage':
          searchData = { storage: value };
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
    
    const handleReset = () => {
    loadProductsData();
    setSearchResults([]);
    setValue('');
    setNotFoundMessage('');

  };

  const columns = [
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>ID</div>, dataIndex: 'code', key: 'code' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>TÊN SẢN PHẨM</div>, dataIndex: 'name', key: 'name' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>LOẠI</div>, dataIndex: 'typeName', key: 'typeName' },
    { title: <div style={{ fontWeight: 700, fontSize: '18px'}}>NHÀ SẢN XUẤT</div>, dataIndex: 'brand', key: 'brand' },
    {
      title: <div style={{ fontWeight: 700, fontSize: '18px'}}>GIÁ</div>,
      dataIndex: 'price',
      key: 'price',
      
      // render: (text) => <td className='mr-0'>{text}</td>,
    },
    {
      title: <div style={{ fontWeight: 700, fontSize: '18px'}}>SỐ LƯỢNG</div>,
      dataIndex: 'storage',
      key: 'storage',
      // render: (text) => <td className='mr-0'>{text}</td>,
    },
    {
      title: <div style={{ fontWeight: 700, fontSize: '18px'}}>THAO TÁC</div>,
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => addProduct(record)}>
          Thêm vào hóa đơn
        </Button>
      ),
    },
    ];
    
    

    
    useEffect(() => {
    const total = calculateTotalPrice();
    setTotalPrice(total);
  }, [products, quantity, discount]);

  // Các hàm khác

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total = parseInt(total + parseInt(products[i].price) * parseInt(quantity[i]));
    }
    // Áp dụng giảm giá
    const discountedTotal = parseInt(total -parseInt(total * discount));
    return discountedTotal;
  };


    return (
      <>
        <div className='pr-[10px] pl-[10px] mt-[20px]'>
        <div className="border-spacing-1 border-zinc-950 ml-[10px] mt-[10px] ">
            <h1 className="flex justify-center text-4xl font-bold dark:text-white text-[#2853d2] pt-[20px] pb-[10px]">Hóa đơn</h1>
            <div className="flex">
            <Input
                className="w-[800px] border border-gray-300 px-3 py-2 mb-4"
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                type="text"
                placeholder="Số điện thoại khách hàng"
            />
                </div>
                

            {/* Tìm */}
            <div className="flex w-[800px]">
                <Input.Group compact>
                <Select
                    defaultValue="Tìm kiếm theo..."
                    className="w-[155px] text-center items-center "
                    onChange={(value) => setSearchType(value)}
                >
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="code">ID</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="name">Tên sản phẩm</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="typeName">Loại</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="brand">Nhà sản xuất</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="price">Giá</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="storage">Số lượng</Option>
                </Select>
                <Input.Search
                    className="w-[570px] text-base"
                    placeholder="Nhập từ khóa để tìm"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    enterButton="Tìm kiếm"
                    loading={searching}
                    onSearch={() => searchProducts(searchType)}
                />
                </Input.Group>
                <Button type="primary" onClick={handleReset} className='bg-slate-600 border-slate-600'>
                Tải lại
                </Button>
            </div>
            <div className="my-4">
                    <Table columns={columns} dataSource={searchResults.length > 0 ? searchResults : data} loading={loading} rowKey="_id" />
            </div>
            <div className="my-4">
            <h3 className='text-2xl font-bold dark:text-white text-[#2853d2]'>Danh sách sản phẩm đã chọn:</h3>
            <Table dataSource={products} rowKey={(record, index) => index}>
                <Table.Column title="ID" className='font-bold text-[18px]' dataIndex="code" key="code" width={200} />
                <Table.Column title="Tên sản phẩm" className='font-bold text-[18px]' dataIndex="name" key="name" width={200} />
                <Table.Column title="Giá" className='font-bold text-[18px]' dataIndex="price" key="price" width={200} />
                <Table.Column
                    title="Số lượng"
                    key="quantity"
                    className='font-bold text-[18px]'
                    width={200}
                    render={(text, record, index) => (
                    <InputNumber
                        min={1}
                        value={quantity[index]}
                        onChange={(value) => handleQuantityChange(index, value)}
                    />
                    )}
                            />
                
                <Table.Column
                    title=""
                    key="action"
                    render={(text, record, index) => (
                    <Button danger onClick={() => removeProduct(index)}>
                        Xóa
                    </Button>
                    )}
                />
                </Table>
            </div>

            <div className="flex w-[800px]">
            <input
                className="w-[800px]  border border-gray-300  px-3 py-2 mt-[10px]"
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                type="text"
                placeholder="Giảm giá (%)"
            />
            </div>
            <div className="flex justify-between mt-[10px]">
            <div className="flex justify-between mt-[10px]">
            <div className="text-2xl font-bold dark:text-white text-[#2853d2]">Tổng giá trị hóa đơn: </div>
            <div className="text-2xl font-bold dark:text-white text-[#2853d2]">{totalPrice}</div>
            </div>
            </div>
            <div className="flex justify-center mt-[10px]">
            <Button className="bg-[#2f6bff] cursor-pointer w-[71px] h-[32px] text-white" onClick={placeOrder}>
                Lưu
            </Button>
            </div>
            <div className="flex justify-between mt-[10px]">
            </div>
        </div>
        </div>
      </>
  );
}

export default Order;
