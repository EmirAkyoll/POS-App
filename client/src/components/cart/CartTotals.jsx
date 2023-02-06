import { ClearOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decrease, deleteCart, increase, reset } from '../../store/cartSlice';

const CartTotals = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="cart h-full max-h-[calc(100vh-_+130px)] flex flex-col">
            <h2 className="bg-blue-700 text-center p-4 text-white font-bold tracking-wide">
                Products In The Basket
            </h2>
            <ul className='cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto'>
                {
                    cart.cartItems.length > 0
                        ? cart.cartItems.map((product) => (
                            <li className="cart-item flex items-center justify-between" key={product._id}>
                                <div className='flex items-center'>
                                    <div className='flex items-center'>
                                        <img
                                            className='w-16 h-16 object-cover'
                                            src={product.img}
                                            alt="img"
                                            onClick={() => {
                                                dispatch(deleteCart(product));
                                                message.info("Product removed from cart")
                                            }}
                                        />
                                    </div>
                                    <div className='flex flex-col ml-2'>
                                        <b>{product.title}</b>
                                        <span>{product.price}$ x {product.quantity}</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <Button
                                        type="primary"
                                        danger
                                        size="small"
                                        icon={<PlusCircleOutlined />}
                                        className="flex justify-center items-center !rounded-full"
                                        onClick={() => dispatch(increase(product))}
                                    />
                                    <span className='font-bold w-6 inline-block text-center text-lg'>{product.quantity}</span>
                                    <Button
                                        type="primary"
                                        danger
                                        size="small"
                                        icon={<MinusCircleOutlined />}
                                        className="flex justify-center items-center !rounded-full"
                                        onClick={() => dispatch(decrease(product))}
                                    />
                                </div>
                            </li>
                        )).reverse()
                        : "There is no product in cart."
                }
            </ul>
            <div className="cart-totals mt-1 border-t border-b">
                <div className="flex justify-between p-3">
                    <b>Subtotal :</b>
                    <span>{cart.total}</span>
                </div>
            </div>
            <div className="border-t border-b">
                <div className="flex justify-between p-3">
                    <b>Tax {cart.tax}% :</b>
                    <span className="text-red-700">+{((cart.total * cart.tax) / 100).toFixed(2)}$</span>
                </div>
            </div>
            <div className="border-b mt-3">
                <div className="flex justify-between p-3">
                    <b className="text-xl text-green-500">Grand Total :</b>
                    <span className="text-xl">{(cart.total + (cart.total * cart.tax) / 100).toFixed(2)} $</span>
                </div>
            </div>
            <div className="py-4 px-2 mb-14 | md:mb-0">
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    size="large"
                    className="w-full flex justify-center items-center bg-blue-600"
                    onClick={() => navigate("/cart")}>
                    Create Order
                </Button>
                <Button
                    disabled={cart.cartItems.length <= 0}
                    type="primary"
                    danger icon={<ClearOutlined />}
                    size="large"
                    className="w-full mt-2 flex justify-center items-center"
                    onClick={() => {
                        dispatch(reset());
                        message.info("Cart has been emptied")
                    }}>
                    Discard All
                </Button>
            </div>
        </div>
    )
}

export default CartTotals;
