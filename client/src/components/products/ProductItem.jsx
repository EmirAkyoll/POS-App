import { addProduct } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addProduct({ ...product, quantity: 1 }));
        message.success("Product added to cart")
    };

    return (
        <div
            className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
            onClick={handleClick}
        >
            <div className="product-img">
                <img src={product.img} alt="" className="h-28 object-cover w-full border-b" />
            </div>
            <div className="product-info flex flex-col p-3">
                <span className="font-bold">{product.title}</span>
                <span>{product.price}$</span>
            </div>
        </div>
    );
};

export default ProductItem;
