import { PlusCircleOutlined, MinusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { decrease, deleteCart, increase } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, message, Table, Input, Space } from "antd";
import { useRef, useState } from "react";
import Header from "../components/header/Header";
import CreateInvoice from "../components/cart/CreateInvoice";
import Highlighter from 'react-highlight-words';

const CartPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

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

    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'img',
            key: 'img',
            width: '125px',
            render: (text) => {
                return (
                    <img src={text} alt="productImage" className="w-full h-20 object-cover" />
                )
            }
        },
        {
            title: 'Product Name',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title')
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps('category')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => {
                return (
                    <span>{text}$</span>
                )
            },
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => {
                return (
                    <div className='flex items-center gap-x-2' key={record._id}>
                        <Button
                            type="primary"
                            danger
                            size="small"
                            icon={<PlusCircleOutlined />}
                            className="flex justify-center items-center !rounded-full"
                            onClick={() => dispatch(increase(record))}
                        />
                        <span className='font-bold w-6 inline-block text-center text-lg'>{record.quantity}</span>
                        <Button
                            type="primary"
                            danger
                            size="small"
                            icon={<MinusCircleOutlined />}
                            className="flex justify-center items-center !rounded-full"
                            onClick={() => dispatch(decrease(record))}
                        />
                    </div>
                )
            }
        },
        {
            title: 'Total Price',
            render: (_, record) => {
                return (
                    <span>{(record.quantity * record.price).toFixed(2)}$ (Without tax)</span>
                )
            }
        },
        {
            title: 'Actions',
            render: (_, record) => {
                return (
                    <Button
                        type='link'
                        danger
                        onClick={() => {
                            dispatch(deleteCart(record));
                            message.info("Product removed from cart")
                        }}
                    >
                        Delete
                    </Button>
                )
            }
        },
    ];

    return (
        <>
            <Header />
            <div className="px-6">
                <h1 className="text-4xl font-bold text-center mb-7">Cart</h1>
                <Table dataSource={cart.cartItems} columns={columns} scroll={{ x: 1200, y: 300 }} bordered pagination={false} className="border border-gray-200" />

                <div className="card-total flex justify-end mt-4">
                    <Card className="w-72 border fixed bottom-10 border-gray-300 | md:bottom-3">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="">{cart.total}$</span>
                        </div>
                        <div className="flex justify-between my-2">
                            <span>Total Tax 8% :</span>
                            <span className="text-red-600">+{((cart.total * cart.tax) / 100).toFixed(2)}$</span>
                        </div>
                        <div className="flex justify-between">
                            <b>Total:</b>
                            <b className="">{(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}$</b>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            className="mt-3 w-full"
                            onClick={() => setIsModalOpen(true)}
                            disabled={cart.cartItems.length === 0}
                        >
                            Create Order
                        </Button>
                    </Card>
                </div>
            </div>

            <CreateInvoice
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};

export default CartPage;
