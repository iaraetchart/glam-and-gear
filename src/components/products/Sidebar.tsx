import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SidebarProps {
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

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

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="hidden lg:block w-64 min-h-screen bg-gray-100 p-4 shadow-md">
      <div className="sticky top-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
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