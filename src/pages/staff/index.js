import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Staff from '../../components/TunTun/Staff/Staff.jsx';
import Error from '../../components/TunTun/Error.jsx';
import Header from '../../components/TunTun/Header.jsx';
import Footer from "../../components/TunTun/Footer";

const Staffs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(localStorage)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(localStorage)
    if (!storedToken) {
      // Lưu lại đường dẫn hiện tại trước khi chuyển hướng đến trang đăng nhập
      const currentPath = location.pathname;
      navigate('/login', { state: { from: currentPath } });
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    }
  }, [navigate, location.state]);



  // Giả sử ID được lưu trong localStorage có tên là 'userId'
  const storedUserId = localStorage.getItem('user');
  const tokenUserId1 = '{\"username\":\"admin1\",\"id\":\"6482c626e5760c4787ca5353\",\"phoneNumber\":\"0984066140\",\"role\":\"Quản lý\"}';

  return (
    <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen">
      <Helmet>
        <title>GAUGAU.staff | Nhân viên</title>
      </Helmet>
      <Header />
      <div className="mt-[70px]" />
      {storedUserId === tokenUserId1 ? (
        <Staff />
      ) : (
        <Error />
      )}
      <Footer/>
    </div>
  );
};

export default Staffs;
