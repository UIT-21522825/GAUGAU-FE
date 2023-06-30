import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Table, Input, Select, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { AiOutlineClose, AiOutlineDelete, AiFillFilter, AiOutlineArrowRight } from 'react-icons/ai';
import AddClient from './AddClient';
import EditClient from './EditClient';

const { Option } = Select;

function Client() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchResult, setSearchResult] = useState([]);
    const [searched, setSearched] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);

  const loadClientsData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/customer/getall');
        
      if (response.data.msg === 'success') {
          setData(response.data.data);
          setOriginalData(response.data.data);
      } else {
        message.error(response.data.msg);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
    };
    

  useEffect(() => {
    loadClientsData();
  }, []);

  const formatDate = (date) => {
    const birthday = new Date(date);
    const formattedDate = `${birthday.getDate()}/${birthday.getMonth()}/${birthday.getFullYear()}`;
    return formattedDate;
  };

  const renderVipStatus = (vip) => {
    return vip ? 'VIP' : 'Thường';
  };

  const columns = [
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>ID</div>, dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>TÊN KHÁCH HÀNG</div>, dataIndex: 'name', key: 'name' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>GIỚI TÍNH</div>, dataIndex: 'gender', key: 'gender' },
    {
      title: <div style={{fontWeight: 700, fontSize: '18px'}}>NGÀY SINH</div>,
      dataIndex: 'birthday',
      key: 'birthday',
      render: (date) => formatDate(date),
    },
    {
      title: <div style={{fontWeight: 700, fontSize: '18px'}}>PHÂN LOẠI</div>,
      dataIndex: 'vip',
      key: 'vip',
      render: (vip) => renderVipStatus(vip),
      },
    {
      title: <div style={{fontWeight: 700, fontSize: '18px'}}>THAO TÁC</div>,
      render: (_, record) => (
        <>
          <EditClient client={record} loadClientsData={loadClientsData} />
          <AiOutlineDelete
            className='ml-[2px] cursor-pointer text-red-600'
            onClick={() => setSelectedClient(record)}
          />
        </>
      ),
    },
    ];
    
    const handleDelete = async (client) => {
  try {
    const response = await axios.delete('http://localhost:5000/customer/delete', {
      data: { phoneNumber: client.phoneNumber },
    });
    if (response.data.msg === 'success') {
      message.success('Khách hàng được xóa thành công.');
      loadClientsData();
    } else {
      message.error('Xóa khách hàng thất bại.');
    }
  } catch (error) {
    console.error('Lỗi khi xóa:', error);
    message.error('Có lỗi xảy ra vui lòng thử lại');
  }
};

const handleConfirmDelete = async (client) => {
  setSelectedClient(null);
  await handleDelete(client);
};

  const handleReset = () => {
    setLoading(true);
    setPhoneNumber('');
    setSearchResult([]);
    setNotFoundMessage('');
    setSortOption(null);
    loadClientsData();
    setSearched(false);
  };

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
      case 'vip':
        sortedData = sortedData.filter((item) => item.vip);
        break;
      case 'normal':
        sortedData = sortedData.filter((item) => !item.vip);
        break;
      default:
        break;
    }

    setData(sortedData);
    setSortOption(option);
  };


  const searchCustomer = async () => {
    try {
      const response = await axios.post('http://localhost:5000/customer/search', { phoneNumber });
      if (response.data.msg === 'success') {
        setSearchResult(response.data.data);
        setNotFoundMessage('');
      } else {
        setSearchResult(null);
        setNotFoundMessage('Không tìm thấy khách hàng');
      }
      setSearched(true);
    } catch (error) {
      console.error('Lỗi:', error);
      setSearchResult(null);
      setNotFoundMessage('Đã xảy ra lỗi khi tìm kiếm khách hàng');
    }
  };

  // Case 1: Chưa thao tác tìm kiếm
  if (!searched) {
    return (
      <>
        <div className='pr-[10px] pl-[10px]'>
          <h1 className='text-4xl font-bold flex justify-center pt-[20px] pb-[10px] dark:text-white text-[#2e59d9]'>Quản lý khách hàng</h1>
          <div className="flex justify-between mb-4">
            <div className='flex  w-[800px]'>
              <Input.Search
                placeholder="Nhập số điện thoại"
                enterButton="Tìm kiếm"
                onSearch={searchCustomer}
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
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="vip">Phân loại: Vip</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="normal">Phân loại: Thường</Option>
                </Select>
              </span>
            </div>
        </div>
                
        <div className='flex w-100% mt-[-10px]'>
          <div span={12}>
            <Button type='primary' onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Đóng' : 'Thêm sản phẩm'}
            </Button>
          </div>
          <div className='flex justify-center'>
            {showAddForm && (
              <div style={{ marginBottom: '16px' }}>
                  <AddClient loadProductsData={loadClientsData} />
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
            khách hàng
          </h2>

                <Table columns={columns} dataSource={data} loading={loading} rowKey="phoneNumber" />
                 <Modal
          title="Xác nhận xóa"
          visible={selectedClient !== null}
          onOk={() => handleConfirmDelete(selectedClient)}
          onCancel={() => setSelectedClient(null)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc muốn xóa khách hàng này?</p>
        </Modal>
        </div>
      </>
    );
  }

  // Case 2: Đã thao tác tìm kiếm
  return (
    <>
      <div className='pr-[10px] pl-[10px]'>
        <h1 className='text-xl font-bold flex justify-center pt-[20px] pb-[10px] dark:text-white text-[#2e59d9]'>Quản lý khách hàng</h1>
        <div className="flex justify-between mb-4">
          <div className='flex'>
                <Input.Search
                placeholder="Nhập số điện thoại"
                enterButton="Tìm kiếm"
                onSearch={searchCustomer}
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
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="vip">Phân loại: Vip</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="normal">Phân loại: Thường</Option>
              </Select>
            </span>
          </div>
        </div>
              

        <div className='flex w-100% mt-[-10px]'>
          <div span={12}>
            <Button type='primary' onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Đóng' : 'Thêm sản phẩm'}
            </Button>
          </div>
          <div className='flex justify-center'>
            {showAddForm && (
              <div style={{ marginBottom: '16px' }}>
                  <AddClient loadProductsData={loadClientsData} />
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

        
        {searchResult ? (
          <Table columns={columns} dataSource={[searchResult]} loading={loading} />
        ) : (
          <p>Không tìm thấy khách hàng</p>
              )}
              
        <Modal
          title="Xác nhận xóa"
          visible={selectedClient !== null}
          onOk={() => handleConfirmDelete(selectedClient)}
          onCancel={() => setSelectedClient(null)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc muốn xóa khách hàng này?</p>
        </Modal>

      </div>
    </>
  );
}

export default Client;