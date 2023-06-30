import React, { useState } from "react";
import {
  AiOutlineClose, AiTwotoneStar, AiFillHome
} from "react-icons/ai";
import { BsPerson, BsPersonHeart } from "react-icons/bs";
import { FaMoon, FaSun, FaFileInvoice } from "react-icons/fa"
import { RiAccountCircleFill, RiProductHuntFill ,RiShoppingCartFill, RiTeamFill} from "react-icons/ri";
import { GiLifeSupport, GiNotebook } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";

import { Axios } from "../../service/axios";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../provider/index";
import {motion} from 'framer-motion'
import moon from '../../assets/moon.png'
import sun from '../../assets/sun.png'
import useDarkMode from "../../service/hook/useDarkMode";
import { useProviderAuth } from "../provider/controller";
const Header = () => {
  const [nav, setNav] = useState(false);
 const { isLoggedIn, logOut } = useAuth();
  const { logOut: providerLogOut } = useProviderAuth();
  const handleTest = () => {
    // fetch post
    Axios.post("/api/chatgpt/chat", { message: "Hello" })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDarkSide((state) => !state);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logOut(false);
  };

  const transition = {
    type: 'spring',
    stiffness: 200,
    damping: 10
  }
  const token = localStorage.getItem("token");

  return (
    <div className="w-full mx-auto flex justify-between items-center align-center p-4 fixed top-0 left-0 z-50 dark:bg-[#1E2139]  bg-white/[0.6] shadow">
      <div className="flex items-center align-center gap-3 w-fit h-fit">
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer p-0 text-xl dark:text-white text-[#2e59d9] dark:hover:text-[#2e59d9]"
        >
          <MenuOutlined />
        </div>
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl m-0 dark:text-white text-[#2e59d9] dark:hover:text-[#2e59d9] font-bold">
            {/* <img
            src={"/images/logoWeb.png"}
            alt="logo-app"
            className="w-16 h-16"
          /> */}
            GAUGAU.
          </h1>
        </Link>
      </div>

      {/* DARKMODE */}

      {
      colorTheme === 'light' ? (
        <motion.div
          initial={{
            scale: 0.6,
            rotate: 90
          }}
          animate={{
            scale: 1,
            rotate: 360,
            transition
          }}
          whileTap={{ scale: 0.9, rotate: 15 }}
          onClick={toggleDarkMode}
          className='cursor-pointer h-6 ml-auto mr-[10px] align-center dark:text-white dark:hover:text-[#2e59d9] text-[#2e59d9]'
        >
          <FaMoon className="h-[22px] w-6 " />
        </motion.div>
      ) : (
        <motion.div
          initial={{
            rotate: 45
          }}
          animate={{
            scale: 1,
            rotate: 360,
            transition
          }}
          whileTap={{ scale: 0.9, rotate: 15 }}
          onClick={toggleDarkMode}
          className='cursor-pointer h-6 ml-auto mr-[10px] align-center dark:text-white dark:hover:text-[#2e59d9] text-[#d1ac17]'
        >
          <FaSun className="h-[24px] w-7 " />
        </motion.div>
      )
    }
    
      
      {/* LOGIN */}
     <div className="hidden md:flex align-center border-dotted border-l dark:text-white dark:hover:text-[#2e59d9] border-[#2e59d9] dark:border-white">
        {isLoggedIn || token ? (
        <Link to="/login" className="flex items-center" onClick={logOut, handleLogout}>
            <MdOutlineLogout
              size={29}
              className="text-[#2e59d9] dark:hover:text-[#2e59d9] ml-[8px] dark:text-white"
                    />
                    <span className="text-sm dark:text-white">Đăng xuất</span>
          </Link>
          // <button onClick={logOut, handleLogout}>Đăng xuất</button>
        ) : (
          <Link to="/login" className="flex items-center">
            <BsPerson
              size={29}
              className="text-[#2e59d9] text-xl font-bold dark:hover:text-[#2e59d9] ml-[8px] dark:text-white"
                    />
                    <span className="text-sm">Đăng nhập</span>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div
          onClick={() => setNav(false)}
          className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0 "
        ></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "absolute top-0 left-0 w-[300px] h-screen bg-white z-50 duration-300 dark:bg-[#1E2139]"
            : "absolute top-0 left-[-100%] w-[300px] h-screen  bg-white z-50 duration-300 "
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer dark:text-white dark:hover:text-[#2e59d9]  text-[#2853d2]"
        />
        <div className="flex flex-col gap-1 p-3 ">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl m-0 dark:text-white text-[#2e59d9] font-bold">
            GAUGAU.
          </h1>

          <p className="font-semibold uppercase p-0 m-0  dark:text-white">
            Công cụ quản lý hệ thống
          </p>
        </div>

        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
          {/* <Link to="/login">
            <li onClick={() => setNav(!nav)} className="text-xl font-medium flex py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
                <RiAccountCircleFill size={25} className="mr-4" />
                Hồ sơ
            </li>
          </Link> */}
            <Link to="/home">
            <li onClick={() => setNav(!nav)} className="text-xl font-medium py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
              <AiFillHome size={25} className="mr-4" />
              Trang chủ
            </li>
            </Link>
          <Link to="/create-invoices">
            <li onClick={() => setNav(!nav)} className="text-xl font-medium py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
              <RiShoppingCartFill size={25} className="mr-4" />
              Tạo hóa đơn
            </li>
            </Link>

          <Link to="/invoices">
            <li onClick={() => setNav(!nav)} className="text-xl font-medium py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
              <FaFileInvoice size={25} className="mr-4" />
              Quản lý hóa đơn
            </li>
            </Link>
            <Link to="/product">
            <li onClick={() => setNav(!nav)} className="text-xl font-medium py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
              <RiProductHuntFill size={25} className="mr-4" />
              Quản lý sản phẩm
            </li>
            </Link>
            <Link to="/client">
            <li onClick={() => setNav(!nav)} className="text-xl font-medium py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
              <BsPersonHeart size={25} className="mr-4" />
              Quản lý khách hàng
            </li>
            </Link>
            <Link to="/staff">
            <li onClick={() => setNav(!nav)} className="text-xl font-medium py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
              <RiTeamFill size={25} className="mr-4" />
              Quản lý nhân viên
            </li>
            </Link>
            <Link to="/discount">
            <li onClick={() => setNav(!nav)} className="text-xl font-medium py-4 flex dark:text-white text-[#2e59d9] hover:bg-[#2e59d9] hover:text-white hover:rounded-md hover:pl-4">
              <AiTwotoneStar size={25} className="mr-4" />
              Quản lý giảm giá
            </li>
            </Link>

          {/* {isLoggedIn ? (
            <li
              className="text-xl py-4 flex cursor-pointer hover:border-b-2 hover:border-gray-800"
            >
              <BiLogIn size={25} className="mr-4" /> Đăng xuất
            </li>
          ) : null} */}
        </ul>

        </nav>
      </div>
    </div>
  );
};

export default Header;
