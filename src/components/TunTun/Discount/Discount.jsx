import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Table, Input, Select, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { AiOutlineClose, AiOutlineDelete, AiFillFilter, AiOutlineArrowRight } from 'react-icons/ai';
import AddDiscount from './AddDiscount';

const { Option } = Select;
function Discount() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const [idCoupon, setIdCoupon] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [searched, setSearched] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const loadDiscountsData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/discount/getall');
        
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
    loadDiscountsData();
  }, []);

    const formatDate = (date) => {
      const startDay = new Date(date);
      const formattedDate = `${startDay.getDate()}/${startDay.getMonth()}/${startDay.getFullYear()}`;
      
      return formattedDate;
    }
    useEffect(() => {
      loadDiscountsData();
  }, []);

    const columns = [
      { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>ID</div>, dataIndex: 'idCoupon', key: 'idCoupon' },
      { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>TÊN</div>, dataIndex: 'name', key: 'name' },
      { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>% GIẢM</div>, dataIndex: 'percent', key: 'percent' },
      { title: <div style={{ fontWeight: 700, fontSize: '18px' }}>MÔ TẢ</div>, dataIndex: 'description', key: 'description' },
   
      {
        title: <div style={{ fontWeight: 700, fontSize: '18px' }}>BẮT ĐẦU</div>,
        dataIndex: 'startDay',
        key: 'startDay',
        render: (date) => formatDate(date),
      },
      {
        title: <div style={{ fontWeight: 700, fontSize: '18px' }}>KẾT THÚC</div>,
        dataIndex: 'endDay',
        key: 'endDay',
        render: (date) => formatDate(date),
      },
      {
        title: <div style={{ fontWeight: 700, fontSize: '18px' }}>THAO TÁC</div>,
        render: (_, record) => (
          <>
            {/* <EditDiscount discount={record} loadDiscountsData={loadDiscountsData} /> */}
            <AiOutlineDelete
              className='ml-[2px] cursor-pointer text-red-600'
              onClick={() => setSelectedDiscount(record)}
            />
          </>
        ),
      },
    ];
    

    // tìm kiếm
    const searchDiscount = async () => {
      try {
        const response = await axios.post('http://localhost:5000/discount/search', { idCoupon: idCoupon });
        if (response.data.msg === 'success') {
          setSearchResult(response.data.data);
          setNotFoundMessage('');
        } else {
          setSearchResult(null);
          setNotFoundMessage('Không tìm thấy');
        }
        setSearched(true);
      } catch (error) {
        console.error('Lỗi:', error);
        setSearchResult(null);
        setNotFoundMessage('Đã xảy ra lỗi khi tìm kiếm');
      }
    };

    // LỌC
    const handleSort = (option) => {
      let sortedData = [...originalData];

      switch (option) {
        case 'IdLowToHigh':
          sortedData.sort((a, b) => a.idCoupon.localeCompare(b.idCoupon));
          break;
        case 'IdHighToLow':
          sortedData.sort((a, b) => b.idCoupon.localeCompare(a.idCoupon));
          break;
        case 'PerentLowToHigh':
          sortedData.sort((a, b) => a.percent < (b.percent));
          break;
        case 'PerentHighToLow':
          sortedData.sort((a, b) => b.percent > (a.percent));
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
      setIdCoupon('');
      setSearchResult([]);
      setNotFoundMessage('');
      setSortOption(null);
      loadDiscountsData();
      setSearched(false);
    };
    // xóa
    const handleConfirmDelete = async (discount) => {
      setSelectedDiscount(null);
      await handleDelete(discount);
    };
    const handleDelete = async (discount) => {
      try {
        const response = await axios.delete('http://localhost:5000/discount/delete', {
          data: { idCoupon: discount.idCoupon },
        });
        if (response.data.msg === 'success') {
          message.success('Xóa thành công.');
          loadDiscountsData();
        } else {
          message.error('Xóa thất bại.');
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
          <div className='pr-[10px] pl-[10px]'>
            <h1 className='text-4xl font-bold flex justify-center pt-[20px] pb-[10px] dark:text-white text-[#2e59d9]'>Quản lý mã giảm giá</h1>
            {/* tìm */}
            <div className="flex justify-between mb-4">
              <div className='flex  w-[800px]'>
                <Input.Search
                  placeholder="Nhập ID"
                  enterButton="Tìm kiếm"
                  onSearch={searchDiscount}
                  value={idCoupon}
                  onChange={(e) => setIdCoupon(e.target.value)}
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
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="IdLowToHigh">ID: A <AiOutlineArrowRight /> Z</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="IdHighToLow">ID: Z <AiOutlineArrowRight /> A</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="PerentLowToHigh">Percent: Thấp <AiOutlineArrowRight /> Cao</Option>
                    <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="PerentHighToLow">Percent: Cao <AiOutlineArrowRight /> Thấp</Option>
                  </Select>
                </span>
              </div>
            </div>
                    
            {/* Thêm */}
            <div>
              <div span={12}>
                <Button type='primary' onClick={() => setShowAddForm(!showAddForm)}>
                  {showAddForm ? 'Đóng' : 'Thêm Discount'}
                </Button>
              </div>
              <div className='flex justify-center'>
                {showAddForm && (
                  <div style={{ marginBottom: '16px' }}>
                    <AddDiscount loadDiscountsData={loadDiscountsData} />
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
              Discount
            </h2>
                
                    
                
            <Table columns={columns} dataSource={data} loading={loading} rowKey="idCoupon" />
            <Modal
              title="Xác nhận xóa"
              visible={selectedDiscount !== null}
              onOk={() => handleConfirmDelete(selectedDiscount)}
              onCancel={() => setSelectedDiscount(null)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <p>Bạn có chắc muốn xóa mã giảm giá này?</p>
            </Modal>
          </div>
        </>
      );
    }
    // Case 2: Đã thao tác tìm kiếm
    return (
      <>
        <div className='pr-10 pl-10'>
          <h1 className='text-xl font-bold flex justify-center pt-[20px] pb-[10px] dark:text-white text-[#2e59d9]'>Quản lý  mã giảm giá</h1>
          <div className="flex justify-between mb-4">
            <div className='flex w-800'>
              <Input.Search
                placeholder="Nhập ID"
                enterButton="Tìm kiếm"
                onSearch={searchDiscount}
                value={idCoupon}
                onChange={(e) => setIdCoupon(e.target.value)}
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
                  <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="IdLowToHigh">ID: A <AiOutlineArrowRight /> Z</Option>
                  <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="IdHighToLow">ID: Z <AiOutlineArrowRight /> A</Option>
                  <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="PerentLowToHigh">Percent: Thấp <AiOutlineArrowRight /> Cao</Option>
                  <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="PerentHighToLow">Percent: Cao <AiOutlineArrowRight /> Thấp</Option>
                </Select>
              </span>
            </div>
          </div>
              
          {/* Thêm */}
          <div>
            <div span={12}>
              <Button type='primary' onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Đóng' : 'Thêm Discount'}
              </Button>
            </div>
            <div className='flex justify-center'>
              {showAddForm && (
                <div style={{ marginBottom: '16px' }}>
                  <AddDiscount loadDiscountsData={loadDiscountsData} />
 
                </div>
              )}
            </div>
          </div>
              
          {searchResult ? (
            <Table columns={columns} dataSource={[searchResult]} loading={loading} />
          ) : (
            <p>Không tìm thấy.</p>
          )}
              
          <Modal
            title="Xác nhận xóa"
            visible={selectedDiscount !== null}
            onOk={() => handleConfirmDelete(selectedDiscount)}
            onCancel={() => setSelectedDiscount(null)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <p>Bạn có chắc muốn xóa mã giảm giá này?</p>
          </Modal>
        </div>
      </>
    );
  }


export default Discount;
