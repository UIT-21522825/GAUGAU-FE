import React from 'react'
import { Helmet } from "react-helmet";
import Header from '../../components/TunTun/Header.jsx';
import InvoiceForm from '../../components/TunTun/Invoice/InvoiceForm.jsx';
function index() {
  return (
    <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen">
      <Helmet>
        <title>GAUGAU.createInvoices | Tạo hóa đơn</title>
      </Helmet>
      <Header />
      <div className="mt-[70px]" />
        <InvoiceForm/>

    </div>
  )
}

export default index