import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Table, Input, Select, Button, message } from 'antd';
import { AiOutlineDelete, AiOutlineArrowRight } from 'react-icons/ai';
const { Option } = Select;

const Invoice = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searched, setSearched] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceCode, setInvoiceCode] = useState('')

  const loadInvoicesData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/invoice/getall');
        
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
    loadInvoicesData();
  }, []);

  const columns = [
    { title:  <div style={{fontWeight: 700, fontSize: '18px'}}>ID HOÁ ĐƠN</div>, dataIndex: 'code', key: 'code' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>ID KHÁCH HÀNG</div>, dataIndex: 'customerPhoneNumber', key: 'customerPhoneNumber' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>ID NGƯỜI TẠO</div>, dataIndex: 'staffCode', key: 'staffCode' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>NGÀY TẠO</div>, dataIndex: 'createdAt', key: 'createdAt' },
    { title: <div style={{fontWeight: 700, fontSize: '18px'}}>TÔNG TIỀN</div>, dataIndex: 'totalPrice', key: 'totalPrice' },
    {
      title: <div style={{fontWeight: 700, fontSize: '18px'}}>THAO TÁC</div>,
      render: (_, record) => (
        <>
          {/* <EditClient client={record} loadClientsData={loadClientsData} />*/}
          {/* <AiOutlineDelete
            className='ml-[2px] cursor-pointer text-red-600'
            onClick={() => setSelectedInvoice(record)}
          />  */}
        </>
      ),
    },
  ];


  // tìm kiếm
  const searchInvoice = async () => {
    try {
      const response = await axios.post('http://localhost:5000//invoice/search', { invoiceCode });
      if (response.data.msg === 'success') {
        setSearchResult(response.data.data);
        setNotFoundMessage('');
        console.log('success')
        console.log(data.msg)
        console.log(invoiceCode)
      } else {
        setSearchResult(null);
        setNotFoundMessage('Không tìm thấy');
        console.log(invoiceCode)
        console.log(data.msg)
      }
      setSearched(true);
    } catch (error) {
      console.error('Lỗi:', error);
      setSearchResult(null);
      setNotFoundMessage('Đã xảy ra lỗi khi tìm kiếm');
      // console.log(data.msg)
    }
  };

  const handleReset = () => {
    setLoading(true);
    setInvoiceCode('');
    setSearchResult([]);
    setNotFoundMessage('');
    setSortOption(null);
    loadInvoicesData();
    setSearched(false);
  };
  
  if (!searched) {
    return (
      <>
      <div className='pr-[10px] pl-[10px]'>
        <h1 className='text-4xl font-bold flex justify-center pt-[20px] pb-[10px] dark:text-white text-[#2e59d9]'>Quản lý hóa đơn</h1>
        <div className="flex justify-between mb-4">
          <div className='flex  w-[800px]'>
              <Input.Search
                placeholder="Nhập số ID"
                enterButton="Tìm kiếm"
                onSearch={searchInvoice}
                value={invoiceCode}
                onChange={(e) => setInvoiceCode(e.target.value)}
                />
                <Button type="primary" onClick={handleReset} className='bg-slate-600 border-slate-600'>
                Tải lại
                </Button>
            </div>

        </div>
        <h2 className="flex pt-[10px] pb-[5px] text-xl dark:text-white">
            Hiện có tổng cộng&nbsp;
            <span className="text-bold text-sm text-blue-500 text-xl">{data.length}</span>&nbsp;
            khách hàng
          </h2>
        <Table columns={columns} dataSource={data} loading={loading} rowKey="code" />
      </div>
    </>
  );
  };
  

  return (
    <>
      <div className='pr-[10px] pl-[10px]'>
        <h1 className='text-4xl font-bold flex justify-center pt-[20px] pb-[10px] text-4xl dark:text-white text-[#2e59d9]'>Quản lý hóa đơn</h1>
        <div className="flex justify-between mb-4">
          <div className='flex  w-[800px]'>
            <Input.Search
                placeholder="Nhập số ID"
                enterButton="Tìm kiếm"
                onSearch={searchInvoice}
                value={invoiceCode}
                onChange={(e) => setInvoiceCode(e.target.value)}
                />
                <Button type="primary" onClick={handleReset} className='bg-slate-600 border-slate-600'>
                Tải lại
                </Button>
          </div>
        </div>
        {searchResult ? (
          <Table columns={columns} dataSource={[searchResult]} loading={loading} />
        ) : (
          <p>Không tìm thấy</p>
              )}
      </div>
    </>
  )
};

export default Invoice;
