import React from "react";
import { useAuth } from "../provider/index";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";


const FormLogin = () => {
  const { getInfo } = useAuth();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    const { username, password } = values;

    if (typeof username === "undefined" || typeof password === "undefined") {
      console.log("Invalid data");
      return;
    }

    axios
      .post("http://localhost:5000/signin", values)
      .then((response) => {
        const { msg, token, user } = response.data;
        if (msg === "success") {
          console.log("Login successful");
          getInfo();

          // Lưu token và thông tin người dùng vào localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          console.error("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pl-10 pr-15 w-full max-w-4xl">
      {/* Trái */}
      <div className="bg-white h-full w-full rounded-lg md:rounded-none md:rounded-l-lg shadow-md py-8 px-6 ">
        <h1 className="font-bold text-3xl md:text-4xl mb-1">Đăng nhập</h1>
        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="gap-0"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản",
              },
              //validate email contain hello
              {
                type: "username",
                message: "Tài khoản không hợp lệ",
              },
            ]}
            className="mb-3"
          >
            <Input
              placeholder="Tài khoản của bạn"
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker leading-tight"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
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
