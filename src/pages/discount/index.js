import React from 'react';
import { Helmet } from 'react-helmet';
import Discount from '../../components/TunTun/Discount/Discount.jsx'

import Header from '../../components/TunTun/Header.jsx';

const Invoices = () => {
  return (
    <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen">
      <Helmet>
        <title>GAUGAU.invoices | Mã giảm giá</title>
      </Helmet>
      <Header />
      <div className="mt-[70px]"/>
        <Discount/>
    </div>
  );
};

export default Invoices;