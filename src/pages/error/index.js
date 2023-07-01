import React from 'react'
import Error from '../../components/TunTun/Error'
import { Helmet } from 'react-helmet';
import Header from '../../components/TunTun/Header.jsx';
function index() {
  return (
      <div className="dark:bg-[#141625] bg-[#f8f8fb] duration-300 min-h-screen">
      <Helmet>
        <title>GAUGAU.Error | Không được phân quyền</title>
      </Helmet>
      <Header />
        <Error/>
    </div>
  )
}

export default index