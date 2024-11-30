import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  error: string;
}

// Componente funcional para el formulario de inicio de sesión
const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xs sm:max-w-sm text-center">
      <h1 className="text-2xl font-bold font-redHatDisplay mb-6 text-gray-800">Login</h1>
      {/* Mostrar mensaje de error si existe */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 border-none p-4 rounded-full mb-4 w-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100 border-none p-4 rounded-full mb-4 w-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white font-redHatDisplay p-4 rounded-full w-full shadow hover:bg-variant transition duration-300"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;