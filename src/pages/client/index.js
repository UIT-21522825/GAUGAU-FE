import React from 'react';
import { Helmet } from 'react-helmet';
import Client from '../../components/TunTun/Client/Client.jsx';
import Header from '../../components/TunTun/Header.jsx';

const Invoices = () => {
  return (
    <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen">
      <Helmet>
        <title>GAUGAU.invoices | Hóa đơn</title>
      </Helmet>
      <Header />
      <div className="mt-[70px]"></div>
        {/* Add a margin-top to create space between the header and invoice */}
        <Client/>
    </div>
  );
};

export default Invoices;