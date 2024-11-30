import React from 'react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image, onDelete }) => {
  // Función para manejar la eliminación del producto
  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete the product "${title}"?`);
    if (confirmed) {
      onDelete(id); // Llamar a la función onDelete pasada como prop
    }
  };

  return (
    <div className="flex flex-col items-start justify-between border rounded-lg p-4 bg-white shadow hover:shadow-lg transition">
      {/* Imagen del producto */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain mb-4"
      />
      {/* Título del producto */}
      <h2 className="text-lg font-semibold mb-2 line-clamp-2 break-words max-w-full">{title}</h2>
      {/* Precio del producto */}
      <p className="text-blue-500 text-lg font-bold">${price.toFixed(2)}</p>
      {/* Botón para eliminar el producto */}
      <button
        onClick={handleDelete}
        className="bg-red-500 mt-[10px] text-white py-1 px-3 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;