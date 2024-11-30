import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CategoriesModalProps {
  onCategorySelect: (category: string) => void;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ onCategorySelect }) => {
  // Estado para almacenar las categorías obtenidas de la API
  const [categories, setCategories] = useState<string[]>([]);
  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para controlar la visibilidad del modal (para las animaciones)
  const [visible, setVisible] = useState(false);

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

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true); // Establecer el estado del modal como abierto
    setTimeout(() => setVisible(true), 10); // Agregar una demora para activar el efecto de transición
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setVisible(false); // Establecer el estado de visibilidad como falso para iniciar la animación de cierre
    setTimeout(() => setIsModalOpen(false), 300); // Demora para permitir que la animación de cierre se complete
  };

  // Función para manejar clicks en el fondo del modal (overlay)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'categories-modal-overlay') {
      handleCloseModal(); // Cerrar el modal si se hace click en el fondo
    }
  };

  // Función para manejar la selección de una categoría
  const handleCategoryClick = (category: string) => {
    onCategorySelect(category); // Llamar a la función proporcionada para seleccionar la categoría
    handleCloseModal(); // Cerrar el modal después de seleccionar una categoría
  };

  return (
    <>
      {/* Botón para abrir el modal de categorías */}
      <button
        onClick={handleOpenModal}
        className="bg-primary text-white py-2 px-4 rounded hover:bg-variant ml-4 lg:hidden"
      >
        Categories
      </button>

      {/* Modal de categorías */}
      {isModalOpen && (
        <div
          id="categories-modal-overlay"
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-md w-full max-w-md transform transition-transform duration-300 ${
              visible ? 'translate-y-0 scale-100' : '-translate-y-10 scale-90'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevenir que el click dentro del modal lo cierre
          >
            {/* Botón para cerrar el modal */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              {/* Botón para seleccionar todas las categorías */}
              <li>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  All
                </button>
              </li>
              {/* Mapeo de las categorías obtenidas para mostrarlas como botones */}
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="w-full text-left p-2 rounded hover:bg-gray-200"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesModal;