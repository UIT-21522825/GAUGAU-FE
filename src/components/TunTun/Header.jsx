import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineReddit,
  AiOutlineSchedule,
  AiOutlineRise,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { GiLifeSupport, GiNotebook } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import { Axios } from "../../service/axios";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../provider/index";

const Header = () => {
  const [nav, setNav] = useState(false);
  const { isLoggedIn, logOut } = useAuth();
  const handleTest = () => {
    // fetch post
    Axios.post("/api/chatgpt/chat", { message: "Hello" })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full mx-auto flex justify-between items-center align-center p-4 fixed top-0 left-0 z-50 bg-white/[0.6] shadow">
      <div className="flex items-center align-center gap-3 w-fit h-fit">
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer p-0 text-xl"
        >
          <MenuOutlined />
        </div>
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl m-0 text-secondary font-bold">
            {/* <img
            src={"/images/logoWeb.png"}
            alt="logo-app"
            className="w-16 h-16"
          /> */}
            GAUGAU.
          </h1>
        </Link>
      </div>

      

      <div className="hidden md:flex text-primary align-center">
        <Link to="/login">
          <BsPerson size={22} />
        </Link>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div
          onClick={() => setNav(false)}
          className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"
        ></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "absolute top-0 left-0 w-[300px] h-screen bg-white z-50 duration-300"
            : "absolute top-0 left-[-100%] w-[300px] h-screen bg-white z-50 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <div className="flex flex-col gap-1 p-3 mt-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl m-0 text-secondary font-bold">
            GAUGAU.
          </h1>

          <p className="font-semibold uppercase p-0 m-0">
            Công cụ quản lý hệ thốthống
          </p>
        </div>

        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <Link to="/login">
              <li className="text-xl py-4 flex">
                <RiAccountCircleFill size={25} className="mr-4" />
                Hồ sơ
              </li>
            </Link>
  
            {isLoggedIn && (
              <li className="text-xl py-4 flex cursor-pointer" onClick={logOut}>
                <BiLogIn size={25} className="mr-4" /> Đăng xuất
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
