import React from 'react'
import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";

function Slidebar() {
  return (
      <div className='flex flex-col relative pb-1 transition-all ease
     mx-auto pl-4 pr-4 fixed top-0 left-0 z-50 dark:bg-[#1E2139]  bg-white/[0.6]'>
          {/* Logo */}
          <div className='flex items-center'>
              <img src={"/images/logoWeb.png"} alt="logo-app" className='w-[100px] h-[100px]' />
              <Link to="/">   
              <h1 className='mt-4 text-xl font-bold text-blue-500'>GAUGAU<span className='text-black'>.sys</span></h1>
              </Link>
          </div>

          {/* Menu */}
          <nav className='w-[260px] bg-red-600 '>
          <ul className=" flex flex-col p-4 text-gray-800">
          <Link to="/login">
            <li className="text-xl font-medium flex py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
                <RiAccountCircleFill size={25} className="mr-4" />
                Hồ sơ
            </li>
          </Link>

          <Link to="/invoices">
            <li className="text-xl font-medium py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
              <RiAccountCircleFill size={25} className="mr-4" />
              Hóa đơn
            </li>
          </Link>
        </ul>

        </nav>
          
    </div>
  )
}

export default Slidebar