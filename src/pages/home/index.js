import React from "react";
import Footer from "../../components/TunTun/Footer";
import Header from "../../components/TunTun/Header";
import { Helmet } from "react-helmet";

export const HomePage = () => {
  return (
    <div>
      {/* <Describe/> */}
      <Helmet>
        <title>GAUGAU.sys | Trang chủ</title>
      </Helmet>
      <Header />
      <Footer />

    </div>
  );
};
