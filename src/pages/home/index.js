import React, { useEffect } from "react";
import Footer from "../../components/TunTun/Footer";
import Header from "../../components/TunTun/Header";
import { Helmet } from "react-helmet";
import Chart from "../../components/chart/chart"
import { useNavigate, useLocation } from 'react-router-dom';

export const HomePage = () => {
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
    <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 ">
      {/* <Describe/> */}
      <Helmet>
        <title>GAUGAU.sys | Trang chủ</title>
      </Helmet>
      <Header />
      <Chart/>
      <Footer />


    </div>
  );
};
