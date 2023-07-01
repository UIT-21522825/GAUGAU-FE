import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Product from '../../components/TunTun/Product/Product.jsx';
import Header from '../../components/TunTun/Header';
import Footer from "../../components/TunTun/Footer";
export const ProductPage = () => {
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
      <Header />
      <div className="mt-[70px]"></div>
      <Product />
      <Footer/>
    </div>
  );
};
