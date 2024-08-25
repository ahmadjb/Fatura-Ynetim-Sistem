import { useForm, useSelect } from "@refinedev/core";
import { Form, Input, InputNumber, Select, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

export const EditProduct = () => {
    const { onFinish, mutation, query } = useForm({
        action: "edit",
        resource: "products",
        id: "1",
    });

    const record = query.data?.data;

    const { options } = useSelect({
        resource: "categories",
    });

    const handleSubmit = (values) => {
        onFinish({
            ...values,
            price: Number(values.price).toFixed(2),
            category: { id: Number(values.category) },
        });
        message.success("Successfully submitted!");
    };
    const handleBack = () => {
     //   navigate(-1);
    };


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Card title="Edit Product" style={{ width: 400 }}>
                <Form
                    layout="vertical"
                    initialValues={{
                        name: record?.name,
                        description: record?.description,
                        price: record?.price,
                        material: record?.material,
                        category: record?.category.id,
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the name!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input the price!" }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label="Material" name="material" rules={[{ required: true, message: "Please input the material!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select a category!" }]}>
                        <Select options={options} />
                    </Form.Item>

                    <Form.Item>
                    <Button type="default"  onClick={handleBack} style={{ marginRight: "8px" }}>
                            Back
                        </Button>
                        <Button type="primary" htmlType="submit" block loading={mutation.isLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
