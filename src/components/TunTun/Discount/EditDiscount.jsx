import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';

const EditDiscount = ({ discount, loadDiscountsData }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
    form.setFieldsValue({
      name: discount.name,
      description: discount.description,
      percent: discount.percent,
      startDay: discount.startDay,
      endDay: discount.endDay,
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedDiscount = {
        ...discount,
          ...values,
        idCoupon: client.idCoupon,
      };

      await axios.put('http://localhost:5000/discount/update', updatedDiscount);

      setVisible(false);
      form.resetFields();
      loadDiscountsData();
    } catch (error) {
      console.error('Error updating discount:', error);
    }
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        <AiFillEdit />
      </Button>
      <Modal
        visible={visible}
        title="Chỉnh sửa thông tin discount"
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
            label="Tên discount"
            rules={[{ required: true, message: 'Vui lòng nhập tên discount' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="percent"
            label="Phần trăm giảm giá"
            rules={[
              { required: true, message: 'Vui lòng nhập phần trăm giảm giá' },
              { type: 'number', min: 0, max: 100, message: 'Vui lòng nhập số từ 0 đến 100' },
            ]}
          >
            <Input type="number" suffix="%" />
          </Form.Item>
          <Form.Item
            name="startDay"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="endDay"
            label="Ngày kết thúc"
            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditDiscount;
