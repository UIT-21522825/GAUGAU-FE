import React from "react";
import Footer from "../../components/TunTun/Footer";
import Header from "../../components/TunTun/Header";
import { Helmet } from "react-helmet";
import Chart from "../../components/chart/Chart"


export const HomePage = () => {
  return (
    <div>
      {/* <Describe/> */}
      <Helmet>
        <title>GAUGAU.sys | Trang chủ</title>
      </Helmet>
      <Header />
      <Chart />
      <Footer />


    </div>
  );
};
