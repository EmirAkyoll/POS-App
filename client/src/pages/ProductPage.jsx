import Header from "../components/header/Header";
import ModalEdit from "../components/products/ModalEdit";

const ProductPage = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-10">Products</h1>
        <ModalEdit />
      </div>
    </>
  );
};

export default ProductPage;