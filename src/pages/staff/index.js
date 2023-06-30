import React from 'react';
import { Helmet } from 'react-helmet';
import Staff from '../../components/TunTun/Staff/Staff.jsx'

import Header from '../../components/TunTun/Header.jsx';

const Staffs = () => {
  return (
    <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen">
      <Helmet>
        <title>GAUGAU.staff | Nhân viên</title>
      </Helmet>
      <Header />
      <div className="mt-[70px]"/>
        <Staff/>
    </div>
  );
};

export default Staffs;