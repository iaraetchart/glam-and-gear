import React from 'react';

interface LoadingOrErrorProps {
  loading: boolean;
  error: string;
}

const LoadingOrError: React.FC<LoadingOrErrorProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return null;
};

export default LoadingOrError;