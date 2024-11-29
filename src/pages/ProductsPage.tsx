import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import Sidebar from "../components/products/Sidebar";
import AddProduct from "../components/products/AddProduct";
import ProductCard from "../components/products/ProductCard";
import Header from "../components/products/Header";
import LoadingOrError from "../components/products/LoadingOrError";
import CategoriesModal from "../components/products/CategoriesModal";

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    filteredProducts,
    loading,
    error,
    handleCategorySelect,
    handleAddProduct,
    handleDeleteProduct,
  } = useProducts();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="flex bg-gradient-to-br w-full  from-white to-indigo-400 min-h-[100vh]">
      <Sidebar onCategorySelect={handleCategorySelect} />
      <div className="flex-1 p-6">
        <Header onLogout={handleLogout} />

        <LoadingOrError loading={loading} error={error} />

        <AddProduct onAdd={handleAddProduct} />

        <CategoriesModal
            onCategorySelect={handleCategorySelect}
          />

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-6 min-w-0 ">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                onDelete={handleDeleteProduct}
              />
            ))
          ) : (
            <div className="col-span-full flex w-screen items-center h-full text-gray-500 text-lg">
              No products available. Try adding some!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;