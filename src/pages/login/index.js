import { Button, Checkbox, Form, Input } from "antd";
import { useAuth } from "../../components/provider/index";
import { AnonymousWrapper } from "../../components/wrapper";
import FormLogin from "../../components/TunTun/FormLogin";
import { Axios } from "../../service/axios";
import Header from "../../components/TunTun/Header";
import { Helmet } from "react-helmet";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const { getInfo } = useAuth();
  const onFinish = (values) => {
    console.log("Login: ", values);
    getInfo();
  };
  return (
    <Form
      name="loginForm"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[
          {
            required: true,
            message: "Bắt buộc",
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Bắt buộc",
          },
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Nhớ tài khoản</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-primary">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

const LoginPage = () => {
  return (
    <AnonymousWrapper>
      <Helmet>
        <title>UIT.ai | Đăng nhập</title>
      </Helmet>
      <Header />
      <div className="w-full h-full min-h-screen bg-gray-100 flex align-center justify-center items-center">
        <FormLogin />
      </div>
    </AnonymousWrapper>
  );
};

export { LoginPage };
