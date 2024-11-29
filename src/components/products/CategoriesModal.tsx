import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CategoriesModalProps {
  onCategorySelect: (category: string) => void;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setVisible(true), 10);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'categories-modal-overlay') {
      handleCloseModal();
    }
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    handleCloseModal();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-primary text-white py-2 px-4 rounded hover:bg-variant ml-4 lg:hidden"
      >
        Categories
      </button>

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
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  All
                </button>
              </li>
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