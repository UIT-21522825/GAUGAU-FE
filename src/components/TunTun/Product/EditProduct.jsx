import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import axios from 'axios';
import {AiFillEdit} from 'react-icons/ai'

const EditProduct = ({ product, loadProductsData }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
    form.setFieldsValue({
      code: product.code,
      name: product.name,
      typeName: product.typeName,
      brand: product.brand,
      price: product.price,
      storage: product.storage,
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedProduct = {
        ...product,
        ...values,
      };

      await axios.put('http://localhost:5000/products/update', updatedProduct);

      setVisible(false);
      form.resetFields();
      loadProductsData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        <AiFillEdit/>
      </Button>
      <Modal
        visible={visible}
        title="Chỉnh sửa thông tin sản phẩm"
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="Mã sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="typeName"
            label="Loại sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Thương hiệu"
            rules={[{ required: true, message: 'Vui lòng nhập thương hiệu' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="storage"
            label="Dung lượng"
            rules={[{ required: true, message: 'Vui lòng nhập dung lượng' }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProduct;
