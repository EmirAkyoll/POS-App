import { Badge, Input, message } from "antd";
import {
    SearchOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    CopyOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ setSearch }) => {
    const cart = useSelector(state => state.cart)
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="border-b mb-6">
            <header className="flex justify-between items-center pt-4 pb-6 px-6">
                <div className="logo">
                    <Link to={"/"}>
                        <h2 className="text-2xl font-bold | md:text-4xl">POS App</h2>
                    </Link>
                </div>
                <div className="header-search flex justify-center flex-1 mx-10" onClick={() => {pathname !== "/" && navigate("/");}}>
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        className="rounded-full max-w-[800px]" size="large"
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                </div>
                <Badge count={cart.cartItems.length} offset={[0, 0]} className="flex | md:hidden">
                    <Link to={"/cart"} className={`menu-link ${pathname === "/cart" && "active"} flex flex-col hover:text-[#40a9ff] transition-all`}>
                        <ShoppingCartOutlined className="text-2xl mb-1" />
                        <span className="text-[10px] | md:text-xs">Cart</span>
                    </Link>
                </Badge>
                <div className="menu-link z-50 fixed bottom-0 flex gap-7 justify-evenly bg-white w-screen left-0 border-t px-4 py-1 | 
                                md:static md:w-auto md:border-t-0 md:px-0">
                    <Link to="/" className={`menu-link ${pathname === "/" && "active"} flex flex-col hover:text-[#40a9ff] transition-all`}>
                        <HomeOutlined className="text-xl mb-1 | md:text-2xl" />
                        <span className="text-[10px] | md:text-xs">Home</span>
                    </Link>
                    <Badge count={cart.cartItems.length} offset={[0, 0]} className="hidden | md:flex">
                        <Link to="/cart" className={`menu-link ${pathname === "/cart" && "active"} flex flex-col hover:text-[#40a9ff] transition-all`}>
                            <ShoppingCartOutlined className="text-2xl mb-1" />
                            <span className="text-[10px] | md:text-xs">Cart</span>
                        </Link>
                    </Badge>
                    <Link to={"/invoices"} className={`menu-link ${pathname === "/invoices" && "active"} flex flex-col hover:text-[#40a9ff] transition-all`}>
                        <CopyOutlined className="text-xl mb-1 | md:text-2xl" />
                        <span className="text-[10px] | md:text-xs">Invoices</span>
                    </Link>
                    <Link to={"/customers"} className={`menu-link ${pathname === "/customers" && "active"} flex flex-col hover:text-[#40a9ff] transition-all`}>
                        <UserOutlined className="text-xl mb-1 | md:text-2xl" />
                        <span className="text-[10px] | md:text-xs">Customers</span>
                    </Link>
                    <Link to={"/login"} onClick={() => { localStorage.removeItem("posUser"); message.info('Exit has been done.') }} className="menu-link flex flex-col hover:text-[#40a9ff] transition-all">
                        <LogoutOutlined className="text-xl mb-1 | md:text-2xl" />
                        <span className="text-[10px] | md:text-xs">Log Out</span>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header;
