import React, { useState } from "react";
import axios from "axios";

interface AddProductProps {
  onAdd: (product: any) => void;
}

// Componente funcional para agregar productos
const AddProduct: React.FC<AddProductProps> = ({ onAdd }) => {
  // Variables de estado para gestionar el modal, los detalles del producto y los mensajes de error
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setVisible(true), 10); // Agregar una demora para activar el efecto de transición
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300); // Demora para permitir que la animación de cierre se complete
  };

  // Función para manejar los clicks en el fondo del modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      handleCloseModal(); // Cerrar el modal si el usuario hace click en el fondo
    }
  };

  // Función para manejar el envío del formulario para agregar un producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    // Validar que todos los campos estén llenos
    if (!title || !price || !description || !image) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Crear un nuevo objeto de producto
      const newProduct = {
        title,
        price: parseFloat(price),
        description,
        image,
      };
      // Enviar una solicitud POST para agregar el producto
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        newProduct
      );
      // Llamar a la función onAdd con los datos del nuevo producto
      onAdd(response.data);
      // Cerrar el modal y restablecer los campos del formulario
      handleCloseModal();
      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
      setError("");
    } catch (err) {
      setError("Error al agregar el producto. Inténtalo de nuevo."); // Establecer mensaje de error si la solicitud falla
    } finally {
      setIsLoading(false); // Establecer el estado de carga a false al finalizar
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        onClick={handleOpenModal}
        className="bg-primary text-white py-2 px-4 rounded shadow hover:bg-variant mb-6"
      >
        Add Product
      </button>

      {/* Modal para agregar un producto */}
      {isModalOpen && (
        <div
          id="modal-overlay"
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className={`bg-white p-8 rounded-xl shadow-md w-full max-w-md transform transition-transform duration-300 ${
              visible ? "translate-y-0 scale-100" : "-translate-y-10 scale-90"
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
            <h2 className="text-2xl font-bold font-redHatDisplay mb-6 text-gray-800">
              Add Product
            </h2>
            {/* Mostrar mensaje de error si existe */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {/* Formulario para agregar un producto */}
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
                {/* Botón para cancelar y cerrar el modal */}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white font-redHatDisplay py-2 px-4 rounded-full shadow hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                {/* Botón para enviar el formulario y agregar el producto */}
                <button
                  type="submit"
                  className={`bg-primary text-white font-redHatDisplay py-2 px-4 rounded-full shadow transition duration-300 ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-variant"
                  }`}
                  disabled={isLoading} // Deshabilitar el botón mientras se envía
                >
                  {isLoading ? "Adding..." : "Add Product"}
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
