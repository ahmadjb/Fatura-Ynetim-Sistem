import React, { useState, useEffect } from "react";
import { useTable } from "@refinedev/core";
import { Table, Pagination, Input, Button, Space, Modal, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { InvoiceDetailsModal } from '../../component/InvoiceDetailsModal';
import { dataProvider } from '../../providers/data-provider';
import len from '../../providers/data/invoices.json';
import '../../styles/custom.css';

export const ListProducts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate
    const pagelen = 7


    const showModal = (details) => {
        setInvoiceDetails(details);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const {
        tableQuery: { data, isLoading, refetch },
        current,
        setCurrent,
        pageCount,
        sorters,
        setSorters,
    } = useTable({
        resource: "invoices",
        pagination: { current: 1, pageSize: pagelen },
        sorters: { initial: [{ field: "id", order: "asc" }] },
    });
    console.log(len);
    // Ensure refetch happens after the component is mounted or data length changes
    useEffect(() => {
        refetch();
    }, [data?.data?.length]);

    // Optionally, refetch when the search term is cleared or updated
    useEffect(() => {
        if (searchTerm === "") {
            refetch();
        }
    }, [searchTerm]);

    let filteredData = data?.data?.filter((invoice) =>
        invoice.musteri_adi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.fatura_numarasi.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

    if (searchTerm !== "") {
        filteredData = len?.data?.filter((invoice) =>
            invoice.musteri_adi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.fatura_numarasi.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];
    }

    // Ensure unique keys for data rows
    const uniqueFilteredData = filteredData.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []).map((item, index) => ({
        ...item,
        key: `${item.id}-${index}`, // Create a unique key for each item
    }));

    console.log(filteredData);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const getSorter = (field) => {
        const sorter = sorters?.find((sorter) => sorter.field === field);
        return sorter ? sorter.order : null;
    };

    const onSort = (field) => {
        const sorter = getSorter(field);
        setSorters(
            sorter === "desc"
                ? []
                : [
                    {
                        field,
                        order: sorter === "asc" ? "desc" : "asc",
                    },
                ]
        );
    };

    const handleView = (id) => {
        const selectedInvoice = data?.data?.find(invoice => invoice.id === id);
        if (selectedInvoice) {
            showModal(selectedInvoice);
        }
    };

    const handleEdit = (id) => {

        console.log(data);
        navigate(`/edit/${id}`, { state: { invoiceData: data } });
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this item?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    // Call your delete API
                    await dataProvider.deleteOne({ resource: 'invoices', id });
                    message.success('Item deleted successfully');
                    // Refetch the data to update the table
                    refetch();
                } catch (error) {
                    message.error('Failed to delete item');
                    console.error('Delete error:', error); // Log error for debugging
                }
            },
            onCancel: () => {
                // Optional: Handle the case when the user cancels the delete action
                console.log('Deletion cancelled');
            }
        });
    };

    const handleCreate = () => {
        // Navigate to create page
        navigate('/create');
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: true,
            sortOrder: getSorter("id"),
            onHeaderCell: () => ({ onClick: () => onSort("id") }),
        },
        {
            title: "Invoice Number",
            dataIndex: "fatura_numarasi",
            key: "fatura_numarasi",
            sorter: true,
            sortOrder: getSorter("fatura_numarasi"),
            onHeaderCell: () => ({ onClick: () => onSort("fatura_numarasi") }),
        },
        {
            title: "Customer Name",
            dataIndex: "musteri_adi",
            key: "musteri_adi",
            sorter: true,
            sortOrder: getSorter("musteri_adi"),
            onHeaderCell: () => ({ onClick: () => onSort("musteri_adi") }),
        },
        {
            title: "Date",
            dataIndex: "tarih",
            key: "tarih",
            sorter: true,
            sortOrder: getSorter("tarih"),
            onHeaderCell: () => ({ onClick: () => onSort("tarih") }),
        },
        {
            title: "Amount",
            dataIndex: "tutar",
            key: "tutar",
            sorter: true,
            sortOrder: getSorter("tutar"),
            onHeaderCell: () => ({ onClick: () => onSort("tutar") }),
        }, {
            title: "invoice_status",
            dataIndex: "invoice_status",
            key: "invoice_status",
            sorter: true,
            sortOrder: getSorter("invoice_status"),
            onHeaderCell: () => ({ onClick: () => onSort("invoice_status") }),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record.id)}
                        type="primary"
                        size="small"

                    >
                        View
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.id)}
                        type="default"
                        size="small"
                    >
                        Edit
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                        type="primary"
                        danger
                        size="small"
                        style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", color: "#fff", padding: "0 12px" }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1 className="main-text">Fatura listesi</h1>
            <Space className="space-container">
                <Input.Search
                    placeholder="Search by name or invoice number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <Button
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                    type="primary"
                    className="create-button"
                >
                    Create Invoice
                </Button>
            </Space>

            <Table
                columns={columns}
                dataSource={uniqueFilteredData}
                pagination={false}
                rowKey="key"
            />
            <Pagination
                current={current}
                total={data?.total ?? 0}
                pageSize={pagelen} // Match this with the pageSize used in useTable
                onChange={(page) => setCurrent(page)}
                className="pagination-container"
            />
            <InvoiceDetailsModal
                visible={isModalVisible}
                details={invoiceDetails}
                onCancel={handleCancel}
            />
        </div>
    );
};
