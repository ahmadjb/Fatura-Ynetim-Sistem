import React from 'react';
import { useForm } from "@refinedev/core";
import { Form, Input, Button, DatePicker, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ArrowLeftOutlined } from '@ant-design/icons'; // Import the ArrowLeftOutlined icon

export const CreateInvoice = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const { onFinish, mutation } = useForm({
        action: "create",
        resource: "invoices",
    });

    // Use the Ant Design form's submit handling
    const onFinishHandler = (values) => {
        onFinish({
            ...values,
            tutar: parseFloat(values.tutar).toFixed(2),  // Ensure the amount is a float with two decimal places
            tarih: values.tarih?.format('YYYY-MM-DD'),  // Ensure the date is in the correct format
        });
    };

    // Show success message on successful submission
    React.useEffect(() => {
        if (mutation.isSuccess) {
            message.success('Invoice created successfully!');
            navigate('/'); // Redirect to the invoices list page on success
        }
    }, [mutation.isSuccess, navigate]);

    // Handle back navigation
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

   

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create a New Invoice</h1>
            <Form
                layout="vertical"
                onFinish={onFinishHandler}
                initialValues={{ tutar: 0 }}
            >
                <Form.Item
                    label="Invoice Number"
                    name="fatura_numarasi"
                    rules={[{ required: true, message: 'Please input the invoice number!' }]}
                >
                    <Input placeholder="Enter invoice number" />
                </Form.Item>

                <Form.Item
                    label="Customer Name"
                    name="musteri_adi"
                    rules={[{ required: true, message: 'Please input the customer name!' }]}
                >
                    <Input placeholder="Enter customer name" />
                </Form.Item>

                <Form.Item
                    label="Date"
                    name="tarih"
                    rules={[{ required: true, message: 'Please select the date!' }]}
                >
                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="tutar"
                    rules={[{ required: true, message: 'Please input the amount!' }]}
                >
                    <Input type="number" step=".01" placeholder="Enter amount" />
                </Form.Item>

                <Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button
                            onClick={handleBack}
                            icon={<ArrowLeftOutlined />} // Add the arrow icon
                            style={{
                                backgroundColor: '#fff',
                                borderColor: '#1890ff', // Blue border color
                                color: '#000',
                                borderRadius: '4px',
                                padding: '0 16px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                borderWidth: '2px', // Thicker border width
                            }}
                        >
                            Go Back
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={mutation.isLoading}
                            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                        >
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};
