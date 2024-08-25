import { useOne } from "@refinedev/core";
import { Card, Descriptions, Spin, Alert } from "antd";

export const ShowProduct = ({ id, visible, onClose }) => {
    const { data, isLoading, isError } = useOne({
        resource: "invoices",
        id,
    });

    if (!visible) return null; // Don't render anything if the modal is not visible

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin tip="Loading..." size="large" />
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Alert message="Error" description="Error fetching product details." type="error" showIcon />
            </div>
        );
    }

    return (
        <Card title="Invoice Details" bordered={false} style={{ maxWidth: 600, margin: '0 auto' }}>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="ID">{data?.data.id}</Descriptions.Item>
                <Descriptions.Item label="Fatura Numarası">{data?.data.fatura_numarasi}</Descriptions.Item>
                <Descriptions.Item label="Müşteri Adı">{data?.data.musteri_adi}</Descriptions.Item>
                <Descriptions.Item label="Tarih">{data?.data.tarih}</Descriptions.Item>
                <Descriptions.Item label="Tutar">{data?.data.tutar} ₺</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
