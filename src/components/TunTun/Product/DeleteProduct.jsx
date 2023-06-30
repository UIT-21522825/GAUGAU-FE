import React from 'react';
import { Popconfirm, message, Button } from 'antd';
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';

const DeleteProduct = ({ product, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/products/delete`, {
        data: { code: product.code },
      });
      if (response.data.msg === 'success') {
        message.success('Product deleted successfully.');
        onDelete(product);
      } else {
        message.error('Failed to delete product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this product?"
      onConfirm={handleDelete}
      okText="Delete"
      cancelText="Cancel"
      >
          <Button>
            <AiOutlineDelete className='ml-[8px] cursor-pointer text-red-600' />
          </Button>
    </Popconfirm>
  );
};

export default DeleteProduct;