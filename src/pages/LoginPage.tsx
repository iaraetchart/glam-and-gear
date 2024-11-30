import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import { validEmails, validPasswords } from '../consts/validUsers';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Función para validar las credenciales de inicio de sesión
  const isValidUser = (email: string, password: string): boolean => {
    return validEmails.includes(email) && validPasswords.includes(password);
  };

  // Función para manejar el inicio de sesión
  const handleLogin = (email: string, password: string) => {

    // Validar las credenciales de inicio de sesión
    if (isValidUser(email, password)) {
      localStorage.setItem('isAuthenticated', 'true'); // Guardar estado de autenticación en localStorage
      navigate('/products'); // Navegar a la página de productos
    } else {
      setError('Invalid email or password'); // Mostrar mensaje de error si las credenciales son incorrectas
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-white to-indigo-400">
      {/* Componente de inicio de sesión */}
      <Login onLogin={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;