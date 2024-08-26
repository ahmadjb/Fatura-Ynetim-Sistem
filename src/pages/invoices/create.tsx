import React from 'react';
import { useForm } from "@refinedev/core";
import { Form, Input, Button, DatePicker, Select, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Option } = Select;

export const CreateInvoice = () => {
    const navigate = useNavigate();
    const { onFinish, mutation } = useForm({
        action: "create",
        resource: "invoices",
    });

    const onFinishHandler = (values) => {
        onFinish({
            ...values,
            tutar: parseFloat(values?.tutar),
            tarih: values?.tarih?.format('YYYY-MM-DD'),
        });
    };

    React.useEffect(() => {
        if (mutation.isSuccess) {
            message.success('Invoice created successfully!');
            navigate('/'); // Redirect to the invoices list page on success
        }
    }, [mutation.isSuccess, navigate]);

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="container">
            <h1 className="heading">Create a New Invoice</h1>
            <Form
                layout="vertical"
                onFinish={onFinishHandler}
                initialValues={{ tutar: 0, payment_method: "Bank Transfer", invoice_status: "Pending" }}
            >
                <Form.Item
                    label="Invoice Number"
                    name="fatura_numarasi"
                    className="form-item"
                    rules={[{ required: true, message: 'Please input the invoice number!' }]}
                >
                    <Input placeholder="Enter invoice number" />
                </Form.Item>

                <Form.Item
                    label="Customer Name"
                    name="musteri_adi"
                    className="form-item"
                    rules={[{ required: true, message: 'Please input the customer name!' }]}
                >
                    <Input placeholder="Enter customer name" />
                </Form.Item>

                <Form.Item
                    label="Date"
                    name="tarih"
                    className="form-item"
                    rules={[{ required: true, message: 'Please select the date!' }]}
                >
                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="tutar"
                    className="form-item"
                    rules={[{ required: true, message: 'Please input the amount!' }]}
                >
                    <Input type="number" step=".01" placeholder="Enter amount" />
                </Form.Item>

                <Form.Item
                    label="Payment Method"
                    name="payment_method"
                    className="form-item"
                    rules={[{ required: true, message: 'Please select the payment method!' }]}
                >
                    <Select placeholder="Select payment method">
                        <Option value="Bank Transfer">Bank Transfer</Option>
                        <Option value="Credit Card">Credit Card</Option>
                        <Option value="Cash">Cash</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Invoice Status"
                    name="invoice_status"
                    className="form-item"
                    rules={[{ required: true, message: 'Please select the invoice status!' }]}
                >
                    <Select placeholder="Select invoice status">
                        <Option value="Pending">Pending</Option>
                        <Option value="Paid">Paid</Option>
                        <Option value="Cancelled">Cancelled</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Space className="button-space">
                        <Button
                            onClick={handleBack}
                            icon={<ArrowLeftOutlined />}
                            className="button-back"
                        >
                            Go Back
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={mutation.isLoading}
                            className="button-submit"
                        >
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};