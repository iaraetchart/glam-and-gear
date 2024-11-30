import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = (email: string, password: string) => {
    const validEmail = 'test@rua.com';
    const validPassword = '123456';

    // Validar las credenciales de inicio de sesión
    if (email === validEmail && password === validPassword) {
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