import React from "react";
import Footer from "../../components/TunTun/Footer";
import Header from "../../components/TunTun/Header";
import { Helmet } from "react-helmet";
import Chart from "../../components/chart/chart"

export const HomePage = () => {
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
