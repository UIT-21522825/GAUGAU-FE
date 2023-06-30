import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import {AiFillEdit} from 'react-icons/ai'


const { Option } = Select;
const EditClient = ({ client, loadClientsData }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
    form.setFieldsValue({
      name: client.name,
      phoneNumber: client.phoneNumber,
      gender: client.gender,
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedClient = {
        ...client,
        ...values,
        currentPhone: client.phoneNumber,
      };

      await axios.put('http://localhost:5000/customer/update', updatedClient);

      setVisible(false);
      form.resetFields();
      loadClientsData();

    } catch (error) {
      console.error('Error updating client:', error);
      
    }
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        <AiFillEdit />
      </Button>
      <Modal
        visible={visible}
        title="Chỉnh sửa thông tin khách hàng"
        onCancel={handleCancel}
        footer={[
          <Button key="Hủy" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="Lưu" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên khách hàng"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
          >
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditClient;
