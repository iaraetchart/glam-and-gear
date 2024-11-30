import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const useProducts = () => {
  // Estado para almacenar todos los productos y los productos filtrados
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect para obtener los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Realizar una solicitud a la API para obtener los productos
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data); // Almacenar los productos en el estado
        setFilteredProducts(response.data); // Inicialmente, los productos filtrados son todos los productos
      } catch (err) {
        setError('Failed to fetch products. Please try again.'); // Establecer mensaje de error si la solicitud falla
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchProducts(); // Llamar a la función para obtener los productos
  }, []);

  // Función para manejar la selección de una categoría
  const handleCategorySelect = (category: string) => {
    if (category === 'all') {
      setFilteredProducts(products); // Mostrar todos los productos si se selecciona 'all'
    } else {
      setFilteredProducts(products.filter((product) => product.category === category)); // Filtrar productos por categoría
    }
  };

  // Función para manejar la adición de un nuevo producto
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]); // Añadir el nuevo producto a la lista de productos
    setFilteredProducts((prev) => [newProduct, ...prev]); // Añadir el nuevo producto a la lista de productos filtrados
  };

  // Función para manejar la eliminación de un producto
  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id)); // Eliminar el producto de la lista de productos
    setFilteredProducts((prev) => prev.filter((product) => product.id !== id)); // Eliminar el producto de la lista de productos filtrados
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    handleCategorySelect,
    handleAddProduct,
    handleDeleteProduct,
  };
};