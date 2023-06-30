import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';

const { Option } = Select;

const EditStaff = ({ staff, loadStaffsData }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
    form.setFieldsValue({
      name: staff.name,
      phoneNumber: staff.phoneNumber,
      shift: staff.shift,
      salary: staff.salary,
      address: staff.address,
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedStaff = {
        ...staff,
        ...values,
        currentPhone: staff.phoneNumber,
      };

      await axios.put('http://localhost:5000/staff/update', updatedStaff);

      setVisible(false);
      form.resetFields();
      loadStaffsData();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        <AiFillEdit />
      </Button>
      <Modal
        visible={visible}
        title="Chỉnh sửa thông tin nhân viên"
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
            label="Tên nhân viên"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
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
            name="shift"
            label="Ca làm việc"
            rules={[{ required: true, message: 'Vui lòng chọn ca làm việc' }]}
          >
            <Select>
              <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='1'>
              Ca 1: 8h-15h
            </Option>
            <Option className='hover:bg-[#2e59d9] transition-colors duration-200 text-base' value='2'>
              Ca 2: 15h-22h
            </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="salary"
            label="Lương"
            rules={[{ required: true, message: 'Vui lòng nhập lương' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditStaff;
