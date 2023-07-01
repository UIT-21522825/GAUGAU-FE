import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/TunTun/Header.jsx';
import InvoiceForm from '../../components/TunTun/Invoice/InvoiceForm.jsx';
import Footer from "../../components/TunTun/Footer";
function Index() {
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
        <title>GAUGAU.createInvoices | Tạo hóa đơn</title>
      </Helmet>
      <Header />
      <div className="mt-[70px]" />
      <InvoiceForm />
      <Footer/>
    </div>

  );
}

export default Index;
