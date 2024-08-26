import React from 'react';
import { Modal, Button, Card, Descriptions } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface InvoiceDetailsModalProps {
    visible: boolean;
    details: {
        id: string;
        fatura_numarasi: string;
        musteri_adi: string;
        tarih: string;
        tutar: string;
        odeme_yontemi: string;
        fatura_durumu: string;
    } | null;
    onCancel: () => void;
}

export const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({ visible, details, onCancel }) => {

    const exportToPDF = () => {
        if (!details) return;

        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(16);
        doc.text('Invoice Details', 14, 20);

        // Define table columns and data
        const columns = [
            { header: 'Field', dataKey: 'field' },
            { header: 'Value', dataKey: 'value' }
        ];

        const data = Object.entries(details).map(([key, value]) => ({
            field: key.replace(/_/g, ' '),
            value: value
        }));

        // Add table to PDF
        doc.autoTable({
            columns: columns,
            body: data,
            startY: 30,
            margin: { left: 14, right: 14 },
            styles: { cellPadding: 5, fontSize: 12, overflow: 'linebreak' },
            headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
            theme: 'striped'
        });

        // Save the PDF
        doc.save(`Invoice_${details.fatura_numarasi}.pdf`);
    };

    return (
        <Modal
            title="Invoice Details"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="export" type="primary" onClick={exportToPDF}>
                    Export to PDF
                </Button>,
                <Button key="back" onClick={onCancel}>
                    Close
                </Button>,
            ]}
            width={600}
        >
            {details && (
                <Card bordered={false} style={{ maxWidth: 600, margin: '0 auto' }}>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="ID">{details.id}</Descriptions.Item>
                        <Descriptions.Item label="Fatura Numarası">{details.fatura_numarasi}</Descriptions.Item>
                        <Descriptions.Item label="Müşteri Adı">{details.musteri_adi}</Descriptions.Item>
                        <Descriptions.Item label="Tarih">{details.tarih}</Descriptions.Item>
                        <Descriptions.Item label="Tutar">{details.tutar} ₺</Descriptions.Item>
                        <Descriptions.Item label="Ödeme Yöntemi">{details.odeme_yontemi}</Descriptions.Item>
                        <Descriptions.Item label="Fatura Durumu">{details.fatura_durumu}</Descriptions.Item>
                    </Descriptions>
                </Card>
            )}
        </Modal>
    );
};
