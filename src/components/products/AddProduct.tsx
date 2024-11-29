import React, { useState } from 'react';
import axios from 'axios';

interface AddProductProps {
  onAdd: (product: any) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setVisible(true), 10);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'modal-overlay') {
      handleCloseModal();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !image) {
      setError('All fields are required.');
      return;
    }

    try {
      const newProduct = { title, price: parseFloat(price), description, image };
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      onAdd(response.data);
      handleCloseModal();
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      setError('');
    } catch (err) {
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-primary text-white py-2 px-4 rounded shadow hover:bg-variant mb-6"
      >
        Add Product
      </button>

      {isModalOpen && (
        <div
          id="modal-overlay"
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className={`bg-white p-8 rounded-xl shadow-md w-full max-w-md transform transition-transform duration-300 ${
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
            <h2 className="text-2xl font-bold font-redHatDisplay mb-6 text-gray-800">
              Add Product
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-100 border-none p-4 rounded-2xl mb-4 w-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-gray-100 border-none p-4 rounded-2xl mb-4 w-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
                step="0.01"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-100 border-none p-4 rounded-2xl mb-4 w-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="bg-gray-100 border-none p-4 rounded-2xl mb-4 w-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white font-redHatDisplay py-2 px-4 rounded-full shadow hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white font-redHatDisplay py-2 px-4 rounded-full shadow hover:bg-variant transition duration-300"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;