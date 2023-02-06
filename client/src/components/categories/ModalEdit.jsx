import { Button, Form, Input, message, Modal, Table } from "antd";
import { useState } from "react";

const ModalEdit = ({ categories, setCategories, isEditModalOpen, setIsEditModalOpen }) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", {
        method: 'PUT',
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
      message.success("Category is updated!");
      setCategories(categories.map((category) => {
        if (category._id === editingRow._id) {
          return { ...category, title: values.title }
        }
        return category;
      }))
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", {
        method: 'DELETE',
        body: JSON.stringify({ categoryId: id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success('Category is deleted');
      setCategories(categories.filter((category) => category._id !== id))
    } catch (error) {
      message.error('Something went wrong!')
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item defaultValue={record.title} name="title" className="mb-0">
              <Input />
            </Form.Item>
          )
        } else {
          return <p>{record.title}</p>
        }
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex justify-evenly">
            <Button type="link" className="pl-0" onClick={() => setEditingRow(record)}>Edit</Button>
            <Button type="link" htmlType="submit" className="text-gray-700">Save</Button>
            <Button type="link" danger onClick={() => deleteCategory(record._id)}>Delete</Button>
          </div>
        )
      }
    }
  ];

  return (
    <Modal title="Edit Categories" open={isEditModalOpen} onCancel={() => { setIsEditModalOpen(false) }} footer={false}>
      <Form onFinish={onFinish} className="max-h-[500px] overflow-auto">
        <Table bordered dataSource={categories} columns={columns} rowKey={'_id'} />
      </Form>
    </Modal>
  )
}

export default ModalEdit;
