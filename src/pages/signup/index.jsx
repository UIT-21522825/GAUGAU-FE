import { Button, Checkbox, Form, Input } from "antd";
import { useAuth } from "../../components/provider/index";
import { AnonymousWrapper } from "../../components/wrapper";
import { FormSignUp } from "../../components/TunTun/FormSignUp";
import Header from "../../components/TunTun/Header";
import { Helmet } from "react-helmet";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// const SignUpForm = () => {
//   const { getInfo } = useAuth();
//   const onFinish = (values) => {
//     console.log("Login: ", values);
//     getInfo();
//   };
//   return (
//   <Form
//     name="loginForm"
//     layout="vertical"
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Tên đăng nhập"
//       name="username"
//       rules={[
//         {
//           required: true,
//           message: "Bắt buộc",
//         },
//       ]}
//     >
//       <Input size="large" />
//     </Form.Item>
//     <Form.Item
//       label="Mật khẩu"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: "Bắt buộc",
//         },
//       ]}
//     >
//       <Input.Password size="large" />
//     </Form.Item>

//     <Form.Item name="remember" valuePropName="checked">
//       <Checkbox>Nhớ tài khoản</Checkbox>
//     </Form.Item>
//     <Form.Item>
//       <Button type="primary" htmlType="submit" className="bg-primary">
//         Đăng nhập
//       </Button>
//     </Form.Item>
//   </Form>)
// };

const SignUpPage = () => {
  return (
    <AnonymousWrapper>
      <Helmet>
        <title>GAUGAU.SignUp | Đăng nhập</title>
      </Helmet>
      <Header />
      <div className="w-full h-full min-h-screen bg-gray-100 flex align-center justify-center items-center">
        <FormSignUp />
      </div>
    </AnonymousWrapper>
  );
};

export { SignUpPage };
