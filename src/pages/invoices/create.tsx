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
           
            <h1 className="heading main-text">Yeni Bir Fatura Oluştur</h1>
            <Form
                layout="vertical"
                onFinish={onFinishHandler}
                initialValues={{ tutar: 0, odeme_yontemi: "Bank Transfer", fatura_durumu: "Pending" }}
                 className="form-container"
            >
                <Form.Item
                    label="Fatura Numarası"
                    name="fatura_numarasi"
                    className="form-item"
                    rules={[{ required: true, message: 'Please input the invoice number!' }]}
                >
                    <Input placeholder="Fatura Numarasını Girin" />
                </Form.Item>

                <Form.Item
                    label="Müşteri Adı"
                    name="musteri_adi"
                    className="form-item"
                    rules={[{ required: true, message: 'Please input the customer name!' }]}
                >
                    <Input placeholder="Müşteri Adını Girin" />
                </Form.Item>

                <Form.Item
                    label="Tarih"
                    name="tarih"
                    className="form-item"
                    rules={[{ required: true, message: 'Please select the date!' }]}
                >
                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Tutar"
                    name="tutar"
                    className="form-item"
                    rules={[{ required: true, message: 'Lütfen tutarı girin!' }]}
                >
                    <Input type="number" step=".01" placeholder="Enter amount" />
                </Form.Item>

                <Form.Item
                    label="Ödeme Yontemi"
                    name="odeme_yontemi"
                    className="form-item"
                    rules={[{ required: true, message: 'Lütfen ödeme yöntemini seçin!' }]}
                >
                    <Select placeholder="Ödeme Yöntemini Seçin">
                        <Option value="Bank Transfer">Banka Havalesi</Option>
                        <Option value="Credit Card">Kredi kartı</Option>
                        <Option value="Cash">Peşin</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Invoice Status"
                    name="fatura_durumu"
                    className="form-item"
                    rules={[{ required: true, message: 'Lütfen fatura durumunu seçin!' }]}
                >
                    <Select placeholder="Select invoice status">
                        <Option value="Pending">Beklemede</Option>
                        <Option value="Paid">Ödenmiş</Option>
                        <Option value="Cancelled">iptal Edildi</Option>
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
                            Gönder
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
         
        </div>
    );
};