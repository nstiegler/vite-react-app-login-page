import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'default', children }) => {
  const variantStyles = variant === 'destructive' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700';
  
  return (
    <div className={`p-3 rounded ${variantStyles}`}>
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
    children: React.ReactNode;
  }
  
  export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
    return <p>{children}</p>;
  };
  
