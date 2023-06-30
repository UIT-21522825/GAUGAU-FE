import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, DatePicker, Select } from 'antd';
import moment from 'moment';
const { Option } = Select;

function AddDiscount() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [percent, setPercent] = useState('');
  const [token, setToken] = useState('');

  const addDiscount = async () => {
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

      // Tiếp tục xử lý thêm khuyến mãi
      const response = await fetch('http://localhost:5000/discount/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
          startDay: startDay ? startDay.format('DD/MM/YYYY') : '',
          endDay: endDay ? endDay.format('DD/MM/YYYY') : '',
          percent: percent,
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
          navigate('/discount');
        }
      } else {
        alert('Failed to save data');
        console.log(data.msg);
      }
    } catch (error) {
      console.error('Error adding discount:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setStartDay(null);
    setEndDay(null);
    setPercent('');
    setToken('');
  };

  return (
    <div className='border p-[10px] flex ml-[100px]'>
      <div className='w-[700px] border-spacing-1 border-zinc-950 ml-[10px]'>
        <h1 className='flex justify-center text-lg'>Thêm khuyến mãi</h1>
        <div flex gap-2>
          <input
            className='w-[340px] border border-gray-300 rounded-md px-3 py-2'
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Tên khuyến mãi'
          />
          <input
            className='w-[340px] ml-[10px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            placeholder='Mô tả'
          />
        </div>
        <DatePicker
          className='w-[340px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
          onChange={(date) => setStartDay(date ? date : null)}
          placeholder='Ngày bắt đầu'
        />
        <DatePicker
          className='w-[340px] ml-[10px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
          onChange={(date) => setEndDay(date ? date : null)}
          placeholder='Ngày kết thúc'
        />
        <input
          className='w-[690px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
          onChange={(e) => setPercent(e.target.value)}
          type='text'
          placeholder='Phần trăm'
        />

        <div className='flex justify-center mt-[10px]'>
          <Button className='bg-[#2f6bff] cursor-pointer w-[71px] h-[32px] text-white' onClick={addDiscount}>
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddDiscount;
