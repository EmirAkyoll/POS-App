import { Button, Form, Input, message, Modal, Select } from "antd";

const ModalAdd = ({ isAddModalOpen, setIsAddModalOpen, categories, products, setProducts }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Product is added successfully!");
            form.resetFields();
            setProducts([
                ...products,
                {
                    ...values,
                    _id: Math.random(),
                    price: Number(values.price),
                },
            ]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title="Create New Product"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item name="title" label="Product Name" rules={[{ required: true, message: "Product name is required!" }]}>
                    <Input placeholder="Enter product name.." />
                </Form.Item>
                <Form.Item name="img" label="Image" rules={[{ required: true, message: "Product image is required!" }]}>
                    <Input placeholder="Enter product image.." />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required!" }]}>
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
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalAdd;