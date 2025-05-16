// src/components/ui/Button.tsx
'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button = ({ variant = 'primary', className, children, ...props }: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;