import Header from '../components/header/Header';
import Categories from '../components/categories/Categories';
import Products from '../components/products/Products';
import CartTotals from '../components/cart/CartTotals';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

const HomePage = () => {
    const [categories, setCategories] = useState()
    const [products, setProducts] = useState();
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
                const data = await res.json();
                data &&
                    setCategories(
                        data.map((category) => {
                            return { ...category, value: category.title }
                        })
                    );
            } catch (error) {
                console.log(error)
            }
        };

        getCategories();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };

        getProducts();
    }, []);

    return (
        <>
            <Header setSearch={setSearch} />
            {products && categories ? (
                <div className="home px-6 flex flex-col justify-between h-screens | md:flex-row">
                    <aside className="categories overflow-auto  max-h-[calc(100vh-_+140px)] mb-7 | md:mb-0 md:-mt-6 ">
                        <Categories
                            categories={categories}
                            setCategories={setCategories}
                            setFiltered={setFiltered}
                            products={products}
                        />
                    </aside>

                    <section className="products overflow-auto max-h-[calc(100vh-_+140px)] | md:-mt-6">
                        <Products
                            products={products}
                            setProducts={setProducts}
                            categories={categories}
                            filtered={filtered}
                            search={search}
                        />
                    </section>

                    <aside className='cart-wrapper mt-10 min-w-[300px] | md:-mr-[24px] md:-mt-[24px]'>
                        <CartTotals />
                    </aside>
                </div>
            )
                : (<Spin size='large' className='absolute top-1/2 h-screen w-screen flex justify-center' />
                )}
        </>
    )
}

export default HomePage;
