import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, DatePicker, Select } from 'antd';
import moment from 'moment';
const { Option } = Select;
function AddClient() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [token, setToken] = useState('');
const [typeName, setType] = useState('');
  const addClient = async () => {
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

      // Tiếp tục xử lý thêm khách hàng
      const response = await fetch('http://localhost:5000/customer/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          phoneNumber: phoneNumber,
          gender: gender,
          birthday: birthday,
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
          navigate('/client');
        }
      } else {
        alert('Failed to save data');
        console.log(data.msg);
      }
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setPhoneNumber('');
    setGender('');
    setBirthday(null);
    setToken('');
  };
const handleTypeChange = (value) => {
    setType(value);
  };
  return (
    <div className='border p-[10px] flex ml-[100px]'>
      <div className='w-[700px] border-spacing-1 border-zinc-950 ml-[10px]'>
        <h1 className='flex justify-center text-lg'>Thêm khách hàng</h1>
        <div flex gap-2>
          <input
            className='w-[340px] border border-gray-300 rounded-md px-3 py-2'
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Tên khách hàng'
          />
          <input
            className='w-[340px] ml-[10px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
            onChange={(e) => setPhoneNumber(e.target.value)}
            type='text'
            placeholder='Số điện thoại'
          />
        </div>
        <DatePicker
          className='w-[340px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
          onChange={(date) => setBirthday(date ? date.format('DD/MM/YYYY') : '')}
          placeholder='Ngày sinh'
        />
        <Select
            className='w-[340px] ml-[10px]'
            defaultValue='Giới tính'
            onChange={handleTypeChange} 
            style={{ width: 200 }}
          >
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Nam'>Nam</Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Nữ'>Nữ</Option>
          </Select>

        <div className='flex justify-center mt-[10px]'>
          <Button className='bg-[#2f6bff] cursor-pointer w-[71px] h-[32px] text-white' onClick={addClient}>
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
