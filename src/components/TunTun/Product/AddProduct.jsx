import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select, Button } from 'antd';

const { Option } = Select;

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [typeName, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [storage, setStorage] = useState('');
  const [token, setToken] = useState('');

  const addProduct = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      console.log(storedToken);

      if (!storedToken) {
        // Lưu lại đường dẫn hiện tại trước khi chuyển hướng đến trang đăng nhập
        const currentPath = location.pathname;
        navigate('/login', { state: { from: currentPath } });
        return;
      }

      setToken(storedToken);

      // Tiếp tục xử lý thêm sản phẩm
      const response = await fetch('http://localhost:5000/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          price: price,
          storage: storage,
          typeName: typeName,
          brand: brand,
          token: storedToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.msg === 'success') {
        console.log(data.msg);
        alert('Data has been saved');
        resetForm();

        // Kiểm tra xem trạng thái `from` có tồn tại không
        if (location.state && location.state.from) {
          navigate(location.state.from);
        } else {
          // Nếu không có trạng thái `from`, chuyển hướng đến trang mặc định (ví dụ: trang chủ)
          navigate('/product');
        }
      } else {
        alert('Failed to save data');
        console.log(data.msg);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const resetForm = () => {
    setName('');
    setType('');
    setBrand('');
    setPrice('');
    setStorage('');
    setToken('');
  };

  return (
    <div className='border p-[10px] flex ml-[100px]'>
      <div className='w-[700px] border-spacing-1 border-zinc-950 ml-[10px]'>
        <h1 className='flex justify-center text-lg dark:text-white text-[#2e59d9] text-[20x] font-bold'>Thêm sản phẩm</h1>
        <div flex gap-2>
          <input
            className='w-[690px] border border-gray-300 rounded-md px-3 py-2 '
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Tên sản phẩm'
          />
        </div>
        <input
            className='w-[340px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
            onChange={(e) => setBrand(e.target.value)}
            type='text'
            placeholder='Nhà sản xuất'
        />
          <Select
            className='w-[340px] ml-[10px]'
            defaultValue='Loại'
            onChange={handleTypeChange} 
            style={{ width: 200 }}
          >
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Balo'>Balo</Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Cát vệ sinh'>Cát vệ sinh</Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Khay ăn'>Khay ăn</Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Lồng'>Lồng</Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Mỹ phẩm'>Mỹ phẩm</Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Nệm'>Nệm</Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Thức ăn'>Thức ăn</Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Vòng cổ'>Vòng cổ</Option>
          </Select>
        <div flex>
          <input
              className='w-[340px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
              onChange={(e) => setPrice(e.target.value)}
              type='text'
              placeholder='Giá'
          />
            <input
              className='w-[340px] ml-[10px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
              onChange={(e) => setStorage(e.target.value)}
              type='text'
              placeholder='Số lượng'
          />
        </div>
        <div className='flex justify-center mt-[10px]'>
          <Button className='bg-[#2f6bff] cursor-pointer w-[71px] h-[32px] text-white' onClick={addProduct}>
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
