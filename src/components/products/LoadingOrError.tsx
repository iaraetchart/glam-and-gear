import React from 'react';

interface LoadingOrErrorProps {
  loading: boolean;
  error: string;
}

const LoadingOrError: React.FC<LoadingOrErrorProps> = ({ loading, error }) => {
  // Mostrar mensaje de carga si el estado loading es verdadero
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Loading products...</p>
      </div>
    );
  }

  // Mostrar mensaje de error si existe un error
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{error}</p>
      </div>
    );
  }

  // No mostrar nada si no hay carga ni error
  return null;
};

export default LoadingOrError;