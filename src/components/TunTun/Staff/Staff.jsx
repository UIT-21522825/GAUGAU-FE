import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Table, Input, Select, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { AiOutlineClose, AiOutlineDelete, AiFillFilter, AiOutlineArrowRight } from 'react-icons/ai';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';

const { Option } = Select;
function Staff() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [notFoundMessage, setNotFoundMessage] = useState('');
    const [searched, setSearched] = useState(false);
    const [sortOption, setSortOption] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [originalData, setOriginalData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

  const loadStaffsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/staff/getall');

      if (response.data.msg === 'success') {
          setData(response.data.data);
          setOriginalData(response.data.data);
      } else {
        message.error(response.data.msg);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setLoading(false);
    }
  };
    const formatDate = (date) => {
        const birthday = new Date(date);
        const formattedDate = `${birthday.getDate()}/${birthday.getMonth()}/${birthday.getFullYear()}`;
        return formattedDate;
    };
    useEffect(() => {
        loadStaffsData();
    }, []);

  const columns = [
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>ID</div>, dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>HỌ TÊN</div>, dataIndex: 'name', key: 'name' },
    { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>TÀI KHOẢN</div>, dataIndex: 'username', key: 'username' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>MẬT KHẨU</div>, dataIndex: 'password', key: 'password' },
    { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>GIỚI TÍNH</div>, dataIndex: 'gender', key: 'gender' },
    {
      title: <div style={{fontWeight: 700, fontSize: '18px'}}>NGÀY SINH</div>,
      dataIndex: 'birthday',
      key: 'birthday',
      render: (date) => formatDate(date),
    },
    { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>GIỚI TÍNH</div>, dataIndex: 'gender', key: 'gender' },
    { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>ĐỊA CHỈ</div>, dataIndex: 'address', key: 'address' },
    { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>CA LÀM</div>, dataIndex: 'shift', key: 'shift' },
    { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>LƯƠNG</div>, dataIndex: 'salary', key: 'salary' },
    {
      title: <div style={{fontWeight: 700, fontSize: '18px'}}>THAO TÁC</div>,
      render: (_, record) => (
        <>
          <EditStaff staff={record} loadStaffsData={loadStaffsData} />
          <AiOutlineDelete
            className='ml-[2px] cursor-pointer text-red-600'
            onClick={() => setSelectedStaff(record)}
          />
        </>
      ),
    },
    ];
    

    // tìm kiếm
    const searchStaff = async () => {
    try {
      const response = await axios.post('http://localhost:5000/staff/search', { phoneNumber });
      if (response.data.msg === 'success') {
        setSearchResult(response.data.data);
        setNotFoundMessage('');
      } else {
        setSearchResult(null);
        setNotFoundMessage('Không tìm thấy nhân viên');
      }
      setSearched(true);
    } catch (error) {
      console.error('Lỗi:', error);
      setSearchResult(null);
      setNotFoundMessage('Đã xảy ra lỗi khi tìm kiếm khách hàng');
    }
    };

    // LỌC
    const handleSort = (option) => {
    let sortedData = [...originalData];

    switch (option) {
      case 'birthdayLowToHigh':
        sortedData.sort((a, b) => new Date(a.birthday) - new Date(b.birthday));
        break;
      case 'birthdayHighToLow':
        sortedData.sort((a, b) => new Date(b.birthday) - new Date(a.birthday));
        break;
      case 'gendernu':
        sortedData = sortedData.filter((item) => item.gender === 'Nữ');
        break;
      case 'male':
        sortedData = sortedData.filter((item) => item.gender === 'Nam');
        break;
      case 'salaryHighToLow':
        sortedData.sort((a, b) => new Date(b.salary) - new Date(a.salary));
            break;
        case 'salaryLowToHigh':
        sortedData.sort((a, b) => new Date(a.salary) - new Date(b.salary));
        break;
      default:
        break;
    }

    setData(sortedData);
    setSortOption(option);
  };
    // tải lại
    const handleReset = () => {
    setLoading(true);
    setPhoneNumber('');
    setSearchResult([]);
    setNotFoundMessage('');
    setSortOption(null);
    loadStaffsData();
    setSearched(false);
    };
    // xóa
    const handleConfirmDelete = async (staff) => {
    setSelectedStaff(null);
    await handleDelete(staff);
    };
    const handleDelete = async (staff) => {
  try {
    const response = await axios.delete('http://localhost:5000/staff/delete', {
      data: { phoneNumber: staff.phoneNumber },
    });
    if (response.data.msg === 'success') {
      message.success('Nhân viên được xóa thành công.');
      loadStaffsData();
    } else {
      message.error('Xóa nhân viên thất bại.');
    }
  } catch (error) {
    console.error('Lỗi khi xóa:', error);
    message.error('Có lỗi xảy ra vui lòng thử lại');
  }
    };
    


    // Case 1: Chưa thao tác tìm kiếm
    if (!searched) {
        return (
            <>
                <div className='pr-[10px] pl-[10px] pb-[10px]'>
                    <h1 className='text-4xl font-bold flex justify-center pt-[20px] pb-[10px] dark:text-white text-[#2e59d9]'>Quản lý nhân viên</h1>
                    {/* tìm */}
                    <div className="flex justify-between mb-4">
                <div className='flex w-[800px]'>
                        <Input.Search
                    placeholder="Nhập số điện thoại"
                    enterButton="Tìm kiếm"
                    onSearch={searchStaff}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button type="primary" onClick={handleReset} className='bg-slate-600 border-slate-600'>
                    Tải lại
                </Button>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span className='ml-[8px]'>
                    <span className='text-xl dark:text-white'>
                        Lọc danh sách:{' '}
                    </span>
                    <Select
                        defaultValue="Sort by"
                        style={{ width: 200 }}
                        onChange={(value) => handleSort(value)}
                        value={sortOption}
                        placeholder="Bình thường"
                        >
                        <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="birthdayLowToHigh">Ngày sinh: Thấp <AiOutlineArrowRight /> Cao</Option>
                        <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="birthdayHighToLow">Ngày sinh: Cao <AiOutlineArrowRight /> Thấp</Option>
                        <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="gendernu">Giới tính: Nữ</Option>
                        <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="male">Giới tính: Nam</Option>
                        <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="salaryLowToHigh">Lương: Thấp <AiOutlineArrowRight /> Cao</Option>
                        <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="salaryHighToLow">Lương: Cao <AiOutlineArrowRight /> Thấp</Option>
                    </Select>
                    </span>
                </div>
                    </div>
                    
                {/* Thêm */}
                <div>
                    <div span={12}>
                        <Button type='primary' onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Đóng' : 'Thêm nhân viên'}
                        </Button>
                    </div>
                    <div className='flex justify-center'>
                        {showAddForm && (
                        <div style={{ marginBottom: '16px' }}>
                            <AddStaff loadStaffsData={loadStaffsData} />
                            {/* <Button
                            type="text"
                            icon={}
                            onClick={() => setShowAddForm(false)}
                            style={{ marginTop: '8px' }
                            }
                            >
                            Cancel
                            </Button> */}
                        </div>
                        )}
                    </div>
                </div>

                <h2 className="flex pt-[10px] pb-[5px] text-xl dark:text-white">
                Hiện có tổng cộng&nbsp;
                <span className="text-bold text-sm text-blue-500 text-xl">{data.length}</span>&nbsp;
                nhân viên
                    </h2>
                
                    
                
                <Table columns={columns} dataSource={data} loading={loading} rowKey="phoneNumber" />
                    <Modal
                        title="Xác nhận xóa"
                        visible={selectedStaff !== null}
                        onOk={() => handleConfirmDelete(selectedStaff)}
                        onCancel={() => setSelectedStaff(null)}
                        okText="Xóa"
                        cancelText="Hủy"
                        >
                        <p>Bạn có chắc muốn xóa nhân viên này?</p>
                    </Modal>
                </div>
            </>
        );
    }
    // Case 2: Đã thao tác tìm kiếm
  return (
  <>
    <div className='pr-10 pl-10'>
      <h1 className='text-4xl font-bold flex justify-center pt-[20px] pb-[10px] dark:text-white text-[#2e59d9]'>Quản lý khách hàng</h1>
      <div className="flex justify-between mb-4">
        <div className='flex w-800'>
          <Input.Search
            placeholder="Nhập số điện thoại"
            enterButton="Tìm kiếm"
            onSearch={searchStaff}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button type="primary" onClick={handleReset} className='bg-slate-600 border-slate-600'>
            Tải lại
          </Button>
        </div>
        {/* lọc */}
        <div style={{ marginBottom: '16px' }}>
          <span className='ml-8'>
            <span className='text-xl dark:text-white'>
              Lọc danh sách:{' '}
            </span>
            <Select
              defaultValue="Sort by"
              style={{ width: 200 }}
              onChange={(value) => handleSort(value)}
              value={sortOption}
              placeholder="Bình thường"
            >
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="birthdayLowToHigh">Ngày sinh: Thấp <AiOutlineArrowRight /> Cao</Option>
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="birthdayHighToLow">Ngày sinh: Cao <AiOutlineArrowRight /> Thấp</Option>
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="gendernu">Giới tính: Nữ</Option>
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="male">Giới tính: Nam</Option>
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="shiftLowToHigh">Ca làm: Thấp <AiOutlineArrowRight /> Cao</Option>
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="shiftHighToLow">Ca làm: Cao <AiOutlineArrowRight /> Thấp</Option>
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="salaryLowToHigh">Lương: Thấp <AiOutlineArrowRight /> Cao</Option>
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="salaryHighToLow">Lương: Cao <AiOutlineArrowRight /> Thấp</Option>
            </Select>
          </span>
        </div>
        </div>
              
        {/* Thêm */}
        <div>
            <div span={12}>
                <Button type='primary' onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Đóng' : 'Thêm sản phẩm'}
                </Button>
            </div>
            <div className='flex justify-center'>
                {showAddForm && (
                <div style={{ marginBottom: '16px' }}>
                    <AddStaff loadStaffsData={loadStaffsData} />
 
                </div>
                )}
            </div>
              </div>
              
        {searchResult ? (
          <Table columns={columns} dataSource={[searchResult]} loading={loading} />
        ) : (
          <p>Không tìm thấy nhân viên</p>
              )}
              
        <Modal
          title="Xác nhận xóa"
          visible={selectedStaff !== null}
          onOk={() => handleConfirmDelete(selectedStaff)}
          onCancel={() => setSelectedStaff(null)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc muốn xóa nhân viên này?</p>
        </Modal>
    </div>
  </>
);
}

export default Staff;
