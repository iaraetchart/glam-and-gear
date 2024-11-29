import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (email: string, password: string) => {
    const validEmail = 'test@rua.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/products');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-white to-indigo-400">
      <Login onLogin={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;