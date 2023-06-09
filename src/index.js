import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";

import "./index.css";
import "antd/dist/antd.variable.min.css";

import { LoginPage } from "./pages/login";
import { SignUpPage } from "./pages/signup";
import { HomePage } from "./pages/home";

import themeConfig from "./theme/theme.config";
import { Provider as MyProvider } from "./components/provider/index";
import Invoices from "./pages/invoices";
import Clients from './pages/client'
import Discounts from './pages/discount'
import Staffs from './pages/staff'
import CreateInvoice from './pages/createInvoice'
import Error from './pages/error'

import store from './redux/store'
import { Provider } from 'react-redux'
import { ProductPage } from "./pages/product";


ConfigProvider.config({
  theme: {
    primaryColor: themeConfig.color.primary,
    successColor: themeConfig.color.success,
    warningColor: themeConfig.color.warning,
    errorColor: themeConfig.color.error,
    infoColor: themeConfig.color.info,
    textBaseColor: themeConfig.color.textBase,
    bgBaseColor: themeConfig.color.bgBase,
  },
});

// const theme = {
//   token: {
//     wireframe: false,
//     colorPrimary: themeConfig.color.primary,
//     colorSuccess: themeConfig.color.success,
//     colorWarning: themeConfig.color.warning,
//     colorError: themeConfig.color.error,
//     colorInfo: themeConfig.color.info,
//     colorTextBase: themeConfig.color.textBase,
//     colorBgBase: themeConfig.color.bgBase,
//   },
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}
  >
    <MyProvider>
      {/* prefixCls="custom" */}
      <ConfigProvider>
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="create-invoices" element={<CreateInvoice />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="client" element={<Clients />} />
              <Route path="discount" element={<Discounts />} />
              <Route path="staff" element={<Staffs />} />
              <Route path="error" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </motion.div>
      </ConfigProvider>
      </MyProvider>
  </Provider>
);
