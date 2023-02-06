import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";

const ModalEdit = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState({});
    const [form] = Form.useForm();
console.log(editingProduct);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };

        getProducts();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
                const data = await res.json();
                data &&
                    setCategories(
                        data.map((item) => {
                            return { ...item, value: item.title };
                        })
                    );
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
    }, []);
    
    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update-product", {
                method: "PUT",
                body: JSON.stringify({ ...values, productId: editingProduct._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            setProducts(
                products.map((product) => {
                    if (product._id === editingProduct._id) {
                        return values;
                    }
                    return product;
                })
            );
            message.success("Product is updated!");
        } catch (error) {
            message.error("Something went wrong!");
            console.log(error);
        }
    };
    console.log(editingProduct)

    const deleteCategory = (id) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/delete-product", {
                method: "DELETE",
                body: JSON.stringify({ productId: id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Product is deleted");
            setProducts(products.filter((item) => item._id !== id));
        } catch (error) {
            message.error("Something went wrong!");
            console.log(error);
        }

    };

    const columns = [
        {
            title: "Product Name",
            dataIndex: "title",
            width: "8%",
            render: (_, record) => {
                return <p>{record.title}</p>;
            },
        },
        {
            title: "Product Image",
            dataIndex: "img",
            width: "4%",
            render: (_, record) => {
                return (
                    <img src={record.img} alt="" className="w-full h-20 object-cover" />
                );
            },
        },
        {
            title: "Price",
            dataIndex: "price",
            width: "8%",
        },
        {
            title: "Category",
            dataIndex: "category",
            width: "8%",
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "8%",
            render: (_, record) => {
                return (
                    <div className="flex justify-evenly">
                        <Button type="link" className="pl-0" onClick={() => { setIsEditModalOpen(true);console.log(editingProduct);      setEditingProduct(record) }}>
                            Edit
                        </Button>
                        <Button type="link" danger onClick={() => deleteCategory(record._id)}>
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Table bordered dataSource={products} columns={columns} rowKey={"_id"} scroll={{ x: 1000, y: 400, }} />
            <Modal title="Update Product" open={isEditModalOpen} onCancel={() => { setIsEditModalOpen(false); setEditingProduct({}) }} footer={false}>
                <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingProduct}>
                    <Form.Item name="title" label="Product Name" rules={[{ required: true, message: "Product name is required!" }]}>
                        <Input placeholder="Enter product name.." />
                    </Form.Item>
                    <Form.Item name="img" label="Product Image" rules={[{ required: true, message: "Product image is required!" }]}>
                        <Input placeholder="Enter product image.." />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required" }]}>
                        <Input placeholder="Enter product price.." />
                    </Form.Item>
                    <Form.Item name="category" label="Chose a category" rules={[{ required: true, message: "Category is required!" }]}>
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            options={categories}
                            filterOption={(input, option) => (option?.title ?? "").includes(input)}
                            filterSort={(optionA, optionB) => (optionA?.title ?? "").toLowerCase().localeCompare((optionB?.title ?? "").toLowerCase())}
                        />
                    </Form.Item>
                    <Form.Item className="flex justify-end mb-0">
                        <Button type="primary" htmlType="submit" onClick={() => { setIsEditModalOpen(false); setEditingProduct({}) }}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEdit;
