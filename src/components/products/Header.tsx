import React from 'react';

interface HeaderProps {
  onLogout: () => void; // Función para manejar la acción de logout
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Título del encabezado */}
      <h1 className="text-3xl font-bold">Products</h1>
      {/* Botón para cerrar sesión */}
      <button
        onClick={onLogout}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;