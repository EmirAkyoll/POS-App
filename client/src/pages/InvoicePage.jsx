import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { Button, Table, Input, Space, Spin } from "antd";
import Header from "../components/header/Header";
import PrintInvoice from "../components/invoices/PrintInvoice";
import Highlighter from 'react-highlight-words';

const InvoicePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceItems, setInvoiceItems] = useState();
    const [customer, setCustomer] = useState({});
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    useEffect(() => {
        const getInvoices = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/invoices/get-all");
                const data = await res.json();
                setInvoiceItems(data);
            } catch (error) {
                console.log(error)
            }
        };

        getInvoices();
    }, []);

    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
            ...getColumnSearchProps('customerName')
        },
        {
            title: 'Phone Number',
            dataIndex: 'customerPhoneNumber',
            key: 'customerPhoneNumber',
            ...getColumnSearchProps('customerPhoneNumber')
        },
        {
            title: 'Creation Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => {
                return (
                    <span>{text.substring(0, 10)}</span>
                )
            }
        },
        {
            title: 'Payment Mode',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
            render: (text) => {
                return (
                    <span>{text.toUpperCase()}</span>
                )
            },
            ...getColumnSearchProps('paymentMode')
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => {
                return (
                    <span>{text} $</span>
                )
            },
            sorter: (a, b) => a.totalAmount - b.totalAmount,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Button
                        type="link"
                        className="pl-0"
                        onClick={() => {
                            setIsModalOpen(true);
                            setCustomer(record);
                        }}
                    >
                        Print
                    </Button>
                )
            }
        },
    ];

    return (
        <>
            <Header />
            <h1 className="text-4xl font-bold text-center mb-7">Invoices</h1>
            {invoiceItems ? (
                <div className="px-6">
                    <Table dataSource={invoiceItems.reverse()} columns={columns} scroll={{ x: 1200, y: 300 }} bordered pagination={false} className="border border-gray-200" />
                </div>
            ) : (
                <Spin size='large' className='absolute top-1/2 h-screen w-screen flex justify-center' />
            )}

            <PrintInvoice
                customer={customer}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};

export default InvoicePage;