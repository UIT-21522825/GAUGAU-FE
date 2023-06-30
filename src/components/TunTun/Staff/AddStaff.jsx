import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, DatePicker, Select } from 'antd';
import moment from 'moment';
const { Option } = Select;

function AddStaff() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shift, setShift] = useState(''); // Thêm state cho shift
  const [salary, setSalary] = useState(''); // Thêm state cho salary
  const [address, setAddress] = useState('');
  const [token, setToken] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [typeName, setType] = useState('');

  const addStaff = async () => {
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

      // Convert salary and shift to numbers
      const parsedSalary = parseFloat(salary);
      const parsedShift = parseInt(shift);

      // Kiểm tra và chuyển đổi salary và shift thành số
      if (isNaN(parsedSalary) || isNaN(parsedShift)) {
        alert('Salary and shift must be numbers');
        return;
      }

      // Tiếp tục xử lý thêm nhân viên
      const response = await fetch('http://localhost:5000/staff/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          name: name,
          phoneNumber: phoneNumber,
          shift: parsedShift,
          address: address,
          token: storedToken,
          gender: gender,
          birthday: birthday,
          salary: parsedSalary,
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
          navigate('/staff');
        }
      } else {
        alert('Failed to save data');
        console.log(data.msg);
        console.log(data.salary);
        console.log(data.shift);
      }
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setName('');
    setPhoneNumber('');
    setShift('');
    setAddress('');
    setToken('');
    setGender('');
    setBirthday(null);
    setSalary('');
  };

  return (
    <div className='border p-[10px] flex ml-[100px]'>
      <div className='w-[700px] border-spacing-1 border-zinc-950 ml-[10px]'>
        <h1 className='flex justify-center text-lg'>Thêm nhân viên</h1>
        <div flex gap-2>
          <input
            className='w-[340px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Họ tên'
          />
          <input
            className='w-[340px] ml-[10px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
            onChange={(e) => setPhoneNumber(e.target.value)}
            type='text'
            placeholder='Số điện thoại'
          />
        </div>

        <div flex gap-2>
          <input
            className='w-[340px] border border-gray-300 rounded-md px-3 py-2'
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Tên tài khoản'
          />
          <input
            className='w-[340px] ml-[10px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Mật khẩu'
          />
          <DatePicker
            className='w-[340px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
            onChange={(date) => setBirthday(date ? date.format('DD/MM/YYYY') : '')}
            placeholder='Ngày sinh'
          />
          <Select
            className='w-[340px] ml-[10px] '
            defaultValue='Giới tính'
            onChange={handleTypeChange}
            style={{ width: 200 }}
          >
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Nam'>
              Nam
            </Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='Nữ'>
              Nữ
            </Option>
          </Select>
        </div>
        <input
          className='w-[690px] border border-gray-300 rounded-md px-3 py-2 mt-[10px]'
          onChange={(e) => setAddress(e.target.value)}
          type='text'
          placeholder='Địa chỉ'
        />
        <div flex gap-2>
          <Select
            className='w-[340px] mt-[10px] '
            defaultValue='Ca làm'
            onChange={(value) => setShift(value)} // Cập nhật giá trị shift
            style={{ width: 200 }}
            type='number'
          >
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='1'>
              Ca 1: 8h-15h
            </Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='2'>
              Ca 2: 15h-22h
            </Option>
          </Select>
          <Select
            className='w-[340px] ml-[10px]'
            defaultValue='Lương / ca'
            onChange={(value) => setSalary(value)} // Cập nhật giá trị salary
            style={{ width: 200 }}
            type='number'
          >
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='200000'>
              200000
            </Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='250000'>
              250000
            </Option>
          </Select>
        </div>

        <div className='flex justify-center mt-[10px]'>
          <Button className='bg-[#2f6bff] cursor-pointer w-[71px] h-[32px] text-white' onClick={addStaff}>
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddStaff;
