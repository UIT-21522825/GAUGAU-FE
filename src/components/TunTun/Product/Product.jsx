import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Select, Button, Row, Col, Popconfirm, message, Modal } from 'antd';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { AiOutlineClose, AiOutlineDelete, AiFillFilter, AiOutlineArrowRight } from 'react-icons/ai';

const { Option } = Select;

function Product() {
  const [nav, setNav] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
const [hoveredRow, setHoveredRow] = useState(null);
  const loadProductsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/get?p=0');
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
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
    setSortOption(null);
  };

  const handleSort = (option) => {
    let sortedData = [...data];

    switch (option) {
      case 'priceLowToHigh':
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        sortedData.sort((a, b) => b.price - a.price);
        break;
      case 'storageLowToHigh':
        sortedData.sort((a, b) => a.storage - b.storage);
        break;
      case 'storageHighToLow':
        sortedData.sort((a, b) => b.storage - a.storage);
        break;
      case 'codeLowToHigh':
        sortedData.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case 'codeHighToLow':
        sortedData.sort((a, b) => b.code.localeCompare(a.code));
        break;
      default:
        break;
    }

    setData(sortedData);
    setSortOption(option);
  };

  const handleDelete = async (product) => {
    try {
      const response = await axios.delete(`http://localhost:5000/products/delete`, {
        data: { code: product.code },
      });
      if (response.data.msg === 'success') {
        message.success('Sản phẩm được xóa thành công.');
        loadProductsData();
      } else {
        message.error('Xóa sản phẩm thất bại.');
      }
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      message.error('Có lỗi xảy ra vui lòng thử lại.');
    }
  };

  const handleConfirmDelete = async (product) => {
    setSelectedProduct(null);
    await handleDelete(product);
  };

  useEffect(() => {
    loadProductsData();
  }, []);

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
      title: <div style={{fontWeight: 700, fontSize: '18px'}}>THAO TÁC</div>,
      render: (_, record) => (
        <>
          <EditProduct product={record} loadProductsData={loadProductsData} />
          <AiOutlineDelete
            className='ml-[2px] cursor-pointer text-red-600'
            onClick={() => setSelectedProduct(record)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className='pr-[10px] pl-[10px]' >
        <h1 className='text-xl font-bold flex justify-center pt-[20px] pb-[10px]'>Quản lý sản phẩm</h1>
        <div className="flex justify-between mb-4 ">
          {/* Tìm */}
          <div className="flex w-[800px]">
            <Input.Group compact>
              <Select
                defaultValue="Tìm kiếm theo..."
                className="w-[150px] text-center items-center "
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
          {/* Lọc */}
          <div style={{ marginBottom: '16px' }}>
            <span className='ml-[8px]'>
              <span  className='text-sm'>
                Lọc danh sách:{' '}
              </span>
              <Select
                defaultValue="Sort by"
                style={{ width: 200 }}
                onChange={(value) => handleSort(value)}
                value={sortOption}
                placeholder="Bình thường"
              >
                <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="codeLowToHigh">ID: A <AiOutlineArrowRight/> Z</Option>
                <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="codeHighToLow">ID: Z <AiOutlineArrowRight/> A</Option>
                <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="priceLowToHigh">Giá: Thấp <AiOutlineArrowRight/> Cao</Option>
                <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="priceHighToLow">Giá: Cao <AiOutlineArrowRight/> Thấp</Option>
                <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="storageLowToHigh">Số lượng: Thấp <AiOutlineArrowRight/> Cao</Option>
                <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value="storageHighToLow">Số lượng: Cao <AiOutlineArrowRight/> Thấp</Option>
              </Select>
            </span>
          </div>
        </div>

        {/* Thêm */}
        <div className='flex w-100% mt-[-10px]'>
          <div span={12}>
            <Button type='primary' onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Đóng' : 'Thêm sản phẩm'}
            </Button>
          </div>
          <div className='flex justify-center'>
            {showAddForm && (
              <div style={{ marginBottom: '16px' }}>
                  <AddProduct loadProductsData={loadProductsData} />
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
        <h2 className="flex pt-[10px] pb-[5px]">
          Hiện có tổng cộng&nbsp;
          <span className="text-bold text-sm text-blue-500">{data.length}</span>&nbsp;
          loại hàng hóa
        </h2>
        <Table columns={columns} dataSource={searchResults.length > 0 ? searchResults : data} loading={loading}
        />

        <Modal
          title="Xác nhận xóa"
          visible={selectedProduct !== null}
          onOk={() => handleConfirmDelete(selectedProduct)}
          onCancel={() => setSelectedProduct(null)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc muốn xóa sản phẩn này?</p>
        </Modal>
      </div>
    </>
  );
}

export default Product;
