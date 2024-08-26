import React from 'react';
import { useForm, useOne } from "@refinedev/core";
import { Form, Input, Button, DatePicker, Select, InputNumber, message, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';



const PAYMENT_METHODS = ["Credit Card", "Bank Transfer"];
const INVOICE_STATUSES = ["Paid", "Pending", "Unpaid"];

export const EditInvoice = () => {
    const { id } = useParams(); // Get the invoice ID from the URL
    const navigate = useNavigate();
    const { data: invoice, isLoading } = useOne({ resource: 'invoices', id });



    const { onFinish, mutation } = useForm({
        action: 'edit',
        resource: 'invoices',
        id: Number(id),
    });


    const onFinishHandler = (values) => {
        const formattedValues = {
            id: Number(id),
            ...values,
            tutar: parseFloat(values.tutar),
            tarih: values?.tarih ? values.tarih.format('YYYY-MM-DD') : null,
        };

        // console.log("Formatted form values before submission:", formattedValues);

        onFinish(formattedValues);
    };



    React.useEffect(() => {
        if (mutation.isSuccess) {
            message.success('Invoice updated successfully!');
            navigate('/');
        }
    }, [mutation.isSuccess, navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const defaultValues = {
        fatura_numarasi: invoice?.data?.fatura_numarasi || '',
        musteri_adi: invoice?.data?.musteri_adi || '',
        tarih: null,
        tutar: invoice?.data?.tutar || 0,
        odeme_yontemi: invoice?.data?.odeme_yontemi || PAYMENT_METHODS[0],
        fatura_durumu: invoice?.data?.fatura_durumu || INVOICE_STATUSES[0],
    };

    return (
        <div className="container">
            <h1 className="heading main-text">Edit Invoice</h1>
            <Form
                layout="vertical"
                onFinish={onFinishHandler}
                initialValues={defaultValues}
                className="form-container"
            >
                <Form.Item
                    label="Fatura Numarasi"
                    name="fatura_numarasi"
                    className="form-item"
                    rules={[{ required: false, message: 'Please input the invoice number!' }]}
                >
                    <Input placeholder={defaultValues.fatura_numarasi || "e.g. FTR-000"} />
                </Form.Item>

                <Form.Item
                    label="Musteri Adi"
                    name="musteri_adi"
                    className="form-item"
                    rules={[{ required: false, message: 'Please input the customer name!' }]}
                >
                    <Input placeholder={defaultValues.musteri_adi || "e.g. name"} />
                </Form.Item>

                <Form.Item
                    label="Tarih"
                    name="tarih"
                    className="form-item"
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
                    label="Tutar"
                    name="tutar"
                    className="form-item"
                    rules={[{ required: false, message: 'Please input the amount!' }]}
                >
                    <InputNumber
                        min={0}
                        step={0.01}
                        style={{ width: '100%' }}
                        placeholder={defaultValues.tutar || "e.g. 0.00"}
                    />
                </Form.Item>

                <Form.Item
                    label="Ödeme Yöntemi"
                    name="payment_method"
                    className="form-item"
                    rules={[{ required: false, message: 'Please select the payment method!' }]}
                >
                    <Select placeholder={defaultValues.odeme_yontemi || "e.g. Credit Card"}>
                        {PAYMENT_METHODS.map(method => (
                            <Option key={method} value={method}>
                                {method}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Invoice Status"
                    name="fatura_durumu"
                    className="form-item"
                    rules={[{ required: false, message: 'Please select the invoice status!' }]}
                >
                    <Select placeholder={defaultValues.fatura_durumu || "e.g. Paid"}>
                        {INVOICE_STATUSES.map(status => (
                            <Option key={status} value={status}>
                                {status}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Space className="button-space">
                        <Button
                            onClick={handleBack}
                            icon={<ArrowLeftOutlined />}
                            className="button-back"
                        >
                            Geri Dön
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={mutation.isLoading}
                            className="button-submit"
                        >
                            Gönder
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};