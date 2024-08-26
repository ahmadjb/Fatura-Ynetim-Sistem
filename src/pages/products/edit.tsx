import React from 'react';
import { useForm, useOne } from "@refinedev/core";
import { Form, Input, Button, DatePicker, Select, InputNumber, message, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';


// Define the possible payment methods and invoice statuses
const PAYMENT_METHODS = ["Credit Card", "Bank Transfer"];
const INVOICE_STATUSES = ["Paid", "Pending", "Unpaid"];

export const EditInvoice = () => {
    const { id } = useParams(); // Get the invoice ID from the URL
    const navigate = useNavigate();
    const { data: invoice, isLoading } = useOne({ resource: 'invoices', id });

    const { onFinish, mutation } = useForm({
        action: 'update',
        resource: 'invoices',
        id: Number(id), // Ensure the ID is passed correctly
    });

    // Handle form submission
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
            message.success('Invoice updated successfully!');
            navigate('/'); // Redirect to the invoices list page on success
        }
    }, [mutation.isSuccess, navigate]);

    // Handle back navigation
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    // Display a loading message while fetching data
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Default values in case the invoice is not found
    const defaultValues = {
        fatura_numarasi: invoice?.data?.fatura_numarasi || '',
        musteri_adi: invoice?.data?.musteri_adi || '',
        tarih: null,
        tutar: invoice?.data?.tutar || 0,
        payment_method: invoice?.data?.payment_method || PAYMENT_METHODS[0],
        invoice_status: invoice?.data?.invoice_status || INVOICE_STATUSES[0],
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '15px' }}>Edit Invoice</h1>
            <Form
                layout="vertical"
                onFinish={onFinishHandler}
                initialValues={defaultValues}
                style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <Form.Item
                    label="Invoice Number"
                    name="fatura_numarasi"
                    rules={[{ required: true, message: 'Please input the invoice number!' }]}
                >
                    <Input placeholder={defaultValues.fatura_numarasi || "e.g. FTR-019"} />
                </Form.Item>

                <Form.Item
                    label="Customer Name"
                    name="musteri_adi"
                    rules={[{ required: true, message: 'Please input the customer name!' }]}
                >
                    <Input placeholder={defaultValues.musteri_adi || "e.g. Sevil Yılmaz"} />
                </Form.Item>

                <Form.Item
                    label="Date"
                    name="tarih"
                    rules={[{ required: true, message: 'Please select the date!' }]}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                        placeholder={defaultValues.tarih ? defaultValues.tarih.format('YYYY-MM-DD') : 'YYYY-MM-DD'}
                        defaultValue={defaultValues.tarih}
                    />
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="tutar"
                    rules={[{ required: true, message: 'Please input the amount!' }]}
                >
                    <InputNumber
                        min={0}
                        step={0.01}
                        style={{ width: '100%' }}
                        placeholder={defaultValues.tutar.toFixed(2) || "e.g. 630.00"}
                    />
                </Form.Item>

                <Form.Item
                    label="Payment Method"
                    name="payment_method"
                    rules={[{ required: true, message: 'Please select the payment method!' }]}
                >
                    <Select placeholder={defaultValues.payment_method || "e.g. Credit Card"}>
                        {PAYMENT_METHODS.map(method => (
                            <Select.Option key={method} value={method}>
                                {method}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Invoice Status"
                    name="invoice_status"
                    rules={[{ required: true, message: 'Please select the invoice status!' }]}
                >
                    <Select placeholder={defaultValues.invoice_status || "e.g. Paid"}>
                        {INVOICE_STATUSES.map(status => (
                            <Select.Option key={status} value={status}>
                                {status}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button
                            onClick={handleBack}
                            icon={<ArrowLeftOutlined />}
                            style={{
                                backgroundColor: '#fff',
                                borderColor: '#1890ff', // Blue border color
                                color: '#000',
                                borderRadius: '4px',
                                padding: '0 16px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                borderWidth: '2px',
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
