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

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Eliminar el estado de autenticación del localStorage
    navigate("/"); // Navegar a la página de inicio de sesión
  };

  return (
    <div className="flex bg-gradient-to-br w-full from-white to-indigo-400 min-h-[100vh]">
      {/* Barra lateral para seleccionar categorías */}
      <Sidebar onCategorySelect={handleCategorySelect} />
      <div className="flex-1 p-6">
        {/* Encabezado con el botón de logout */}
        <Header onLogout={handleLogout} />

        {/* Mostrar mensaje de carga o error */}
        <LoadingOrError loading={loading} error={error} />

        {/* Botón para agregar un nuevo producto */}
        <AddProduct onAdd={handleAddProduct} />

        {/* Modal de categorías para pantallas pequeñas */}
        <CategoriesModal onCategorySelect={handleCategorySelect} />

        {/* Listado de productos */}
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