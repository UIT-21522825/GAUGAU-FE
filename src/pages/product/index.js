import React from 'react'
import Slidebar from '../../components/TunTun/Slidebar';
import Invoice from '../../components/TunTun/Invoice';
import Product from '../../components/TunTun/Product/Product.jsx';
import Header from '../../components/TunTun/Header';

export const ProductPage = () => {
  return (
    <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen">
      <Header />
      <div className="mt-[70px]"></div>
          <Product />

    </div>
  );
};
