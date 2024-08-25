import React from 'react';
import { Modal, Button, Card, Descriptions } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin

interface InvoiceDetailsModalProps {
    visible: boolean;
    details: {
        id: string;
        fatura_numarasi: string;
        musteri_adi: string;
        tarih: string;
        tutar: string;
        payment_method: string;
        invoice_status: string;
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
        startY: 30, // Start position of the table
        margin: { left: 14, right: 14 }, // Margin to align with text
        styles: { cellPadding: 5, fontSize: 12, overflow: 'linebreak' },
        headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
        theme: 'striped' // Optional: 'striped' or 'grid' for table styling
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
            width={600} // Adjust width as needed
        >
            {details && (
                <Card bordered={false} style={{ maxWidth: 600, margin: '0 auto' }}>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="ID">{details.id}</Descriptions.Item>
                        <Descriptions.Item label="Invoice Number">{details.fatura_numarasi}</Descriptions.Item>
                        <Descriptions.Item label="Customer Name">{details.musteri_adi}</Descriptions.Item>
                        <Descriptions.Item label="Date">{details.tarih}</Descriptions.Item>
                        <Descriptions.Item label="Amount">{details.tutar} ₺</Descriptions.Item>
                        <Descriptions.Item label="Payment Method">{details.payment_method}</Descriptions.Item>
                        <Descriptions.Item label="Invoice Status">{details.invoice_status}</Descriptions.Item>
                    </Descriptions>
                </Card>
            )}
        </Modal>
    );
};
