import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useAuth } from "../provider/index";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";

const FormLogin = () => {
  const { getInfo } = useAuth();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    console.log("Login: ", values);
    getInfo();
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 w-full max-w-4xl m-auto">
      {/* Trái */}
      <div className="bg-white h-full w-full rounded-lg md:rounded-none md:rounded-l-lg shadow-md py-8 px-6">
        <h1 className="font-bold text-3xl md:text-4xl mb-1">Đăng nhập</h1>
        <div className="flex flex-wrap text-gray-400 gap-1 mb-2">
          <p className="m-0 p-0">Bạn chưa có tài khoản?</p>
          <Link to="/signup" className="underline p-0">Đăng kí</Link>
        </div>
        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="gap-0"
        >
          <Form.Item
            label="Địa chỉ email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
              },
              //validate email contain hello
              {
                type: "email",
                message: "Email không hợp lệ",
              },
             
            ]}
            className="mb-3"
          >
            <Input
              placeholder="Email của bạn"
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
            className="mb-3"
          >
            <Input.Password
              placeholder="Mật khẩu của bạn"
              className="shadow appearance-none border border-gray-400 rounded w-full py-1.5 text-grey-darker leading-tight"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" className="mb-3">
            <Checkbox>Nhớ tài khoản</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="flex align-center items-center justify-center p-4 border-0 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-md w-full uppercase"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        {/* <div className="mt-4">
          <label className="block text-grey-darker text-sm mb-1" for="username">
            Email Address
          </label>
          <input
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your email"
          />
        </div>

        <div className="mt-4">
          <label
            className="block text-grey-darker text-sm mb-1 flex justify-between"
            for="username"
          >
            Password
            <a className="underline">Forgot password?</a>
          </label>
          <input
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="mt-4 text-gray-600">
          <input type="checkbox" />
          <label className="ml-2">Remember me</label>
        </div>

        <button className="mt-4 font-bold w-full">LOGIN</button> */}
        {/* <Divider plain className="text-gray-400">
          or login with
        </Divider> */}
        {/* <div className="h-px bg-gray-200 mt-8 relative">
          <p className="absolute absolute-x absolute-y bg-white px-3 -mt-px text-sm text-gray-400">
            or login with
          </p>
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
          <Button
            type="outline"
            size="large"
            className="w-full bg-none border border-red-600 font-bold flex items-center justify-center text-red-600 rounded-md"
            icon={<FcGoogle className="mr-1" size={20} />}
          >
            Google
          </Button>

          <Button
            type="outline"
            size="large"
            className="w-full bg-none border border-blue-600 font-bold flex items-center justify-center text-blue-600 rounded-md"
            icon={<FaFacebookF className="mr-1" size={20} />}
          >
            Facebook
          </Button>
        </div> */}
      </div>
      {/* Phải */}
      <div className="hidden md:block">
        <img
          className="max-w-sm w-full rounded-r-lg shadow-md h-[502px]"
          src="/images/login.jpg"
          alt="/"
        />
      </div>
    </div>
  );
};

export default FormLogin;
