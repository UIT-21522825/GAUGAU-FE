import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Client from '../../components/TunTun/Client/Client.jsx';
import Header from '../../components/TunTun/Header.jsx';
import Footer from "../../components/TunTun/Footer";
const Invoices = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

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
  return (
    <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen">
      <Helmet>
        <title>GAUGAU.invoices | Hóa đơn</title>
      </Helmet>
      <Header />
      <div className="mt-[70px]"></div>
        {/* Add a margin-top to create space between the header and invoice */}
      <Client />
      <Footer/>
    </div>
  );
};

export default Invoices;