import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ModalAdd from "./ModalAdd";
import ProductItem from "./ProductItem";

const Products = ({ search, categories, products, setProducts, filtered }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="products-wrapper grid grid-cols-1 gap-8 | sm:grid-cols-2 md:mx-2 lg:grid-cols-3 xl:lg:grid-cols-4">
            {
                filtered
                .filter((product) => product.title.toLowerCase().includes(search))
                .map((product) => (
                    <ProductItem product={product} key={product._id} />
                ))
            }

            <div
                className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px] min-w-[180px]"
                onClick={() => setIsAddModalOpen(true)}
            >
                <PlusOutlined className="text-white md:text-2xl" />
            </div>
            <div
                className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90 min-h-[180px] min-w-[180px]"
                onClick={() => navigate("/products")}
            >
                <EditOutlined className="text-white md:text-2xl" />
            </div>

            <ModalAdd
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                categories={categories}
                products={products}
                setProducts={setProducts}
            />
        </div>
    );
};

export default Products;