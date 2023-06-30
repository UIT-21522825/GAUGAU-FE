import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useAuth } from "../provider/index";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

export const FormSignUp = () => {
  const { getInfo } = useAuth();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    const {
      username,
      password,
      address,
      phoneNumber,
      role,
      firstName,
      lastName,
      shift,
    } = values;

    if (
      typeof username === "undefined" ||
      typeof password === "undefined" ||
      typeof address === "undefined" ||
      typeof phoneNumber === "undefined" ||
      typeof role === "undefined" ||
      typeof firstName === "undefined" ||
      typeof lastName === "undefined" ||
      typeof shift === "undefined"
    ) {
      console.log("Invalid data");
      return;
    }

    axios
      .post("http://localhost:5000/register", values)
      .then((response) => {
        console.log("Registration successful");
        getInfo();
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 w-full max-w-4xl m-auto">
      <div className="bg-white h-full w-full rounded-lg md:rounded-none md:rounded-l-lg shadow-md py-8 px-6">
        <h1 className="font-bold text-3xl md:text-4xl mb-1">Đăng kí</h1>
        <div className="flex flex-wrap text-gray-400 gap-1 mb-2">
          <p className="m-0 p-0">Bạn đã có tài khoản?</p>
          <Link to="/login" className="underline p-0">
            Đăng nhập
          </Link>
        </div>
        <Form
          name="signUpForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="gap-0"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Họ"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ",
                },
              ]}
              className="mr-3 mb-1"
            >
              <Input
                placeholder="Họ"
                className="shadow appearance-none border border-gray-400 rounded py-2 px-3 text-grey-darker leading-tight"
              />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên",
                },
              ]}
              className="mb-1"
            >
              <Input
                placeholder="Tên"
                className="shadow appearance-none border border-gray-400 rounded py-2 px-3 text-grey-darker leading-tight"
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập",
              },
            ]}
            className="mb-3"
          >
            <Input
              placeholder="abc@domain.com"
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
              placeholder="Ít nhất 8 kí tự"
              className="shadow appearance-none border border-gray-400 rounded w-full py-1.5 text-grey-darker leading-tight"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="flex align-center items-center justify-center p-4 border-0 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-md w-full uppercase"
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
