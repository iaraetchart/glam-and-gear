import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SidebarProps {
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect }) => {
  // Estado para almacenar las categorías
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // useEffect para obtener las categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Realizar una solicitud a la API para obtener las categorías
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data); // Almacenar las categorías en el estado
      } catch (err) {
        console.error('Failed to fetch categories'); // Mostrar error en consola si la solicitud falla
      }
    };

    fetchCategories(); // Llamar a la función para obtener las categorías
  }, []);

  // Función para manejar la selección de una categoría
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category); // Establecer la categoría activa
    onCategorySelect(category); // Llamar a la función proporcionada para seleccionar la categoría
  };

  return (
    <div className="hidden lg:block w-64 min-h-screen bg-gray-100 p-4 shadow-md">
      <div className="sticky top-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {/* Botón para seleccionar todas las categorías */}
          <li>
            <button
              onClick={() => handleCategoryClick('all')}
              className={`w-full text-left p-2 rounded ${
                activeCategory === 'all' ? 'bg-variant text-white' : 'hover:bg-primary'
              }`}
            >
              All
            </button>
          </li>
          {/* Mapeo de las categorías obtenidas para mostrarlas como botones */}
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-left p-2 rounded ${
                  activeCategory === category ? 'bg-variant text-white' : 'hover:bg-primary'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;