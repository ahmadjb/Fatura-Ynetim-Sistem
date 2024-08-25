import React, { useState, useEffect } from "react";
import { useTable } from "@refinedev/core";
import { Table, Pagination, Input, Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const ListProducts = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate(); // Initialize useNavigate

    const {
        tableQuery: { data, isLoading, refetch },
        current,
        setCurrent,
        pageCount,
        sorters,
        setSorters,
    } = useTable({
        resource: "invoices",
        pagination: { current: 1, pageSize: 7 },
        sorters: { initial: [{ field: "id", order: "asc" }] },
    });

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

    const filteredData = data?.data?.filter((invoice) =>
        invoice.musteri_adi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.fatura_numarasi.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

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
        // Implement view details logic here
        console.log(`View details for ID ${id}`);
    };

    const handleEdit = (id) => {
        // Implement edit logic here
        console.log(`Edit ID ${id}`);
    };

    const handleDelete = (id) => {
        // Implement delete logic here
        console.log(`Delete ID ${id}`);
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
            <h1>Invoices</h1>
            <Space style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Input.Search
                    placeholder="Search by name or invoice number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 400 }}
                />
                <Button
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                    type="primary"
                    style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", color: "#fff" }}
                >
                    Create Invoice
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={false}
                rowKey="id"
            />
            <Pagination
                current={current}
                total={data?.total ?? 0}
                pageSize={10}
                onChange={(page) => setCurrent(page)}
                style={{ marginTop: "16px" ,display:"flex",justifyContent:"center",alignItems:"flex-end"}}
            />
        </div>
    );
};
