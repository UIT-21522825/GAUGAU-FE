import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.post('/invoice/get');
      const data = response.data;
      if (data.msg === 'success') {
        setInvoices(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Invoice List</h1>
      {invoices.map((invoice) => (
        <div key={invoice._id}>
          <p>Invoice ID: {invoice._id}</p>
          <p>Customer ID: {invoice.customerId}</p>
          <p>Staff ID: {invoice.staffId}</p>
          <p>Total Price: {invoice.totalPrice}</p>
          <p>Created At: {invoice.createAt}</p>
        </div>
      ))}
    </div>
  );
};

export default Invoice;
