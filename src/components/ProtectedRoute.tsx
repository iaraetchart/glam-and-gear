import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}
// Componente funcional para la autenticación del usuario en la ruta
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  // Si el usuario está autenticado, mostrar el contenido protegido
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;