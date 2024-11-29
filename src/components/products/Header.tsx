import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Products</h1>
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