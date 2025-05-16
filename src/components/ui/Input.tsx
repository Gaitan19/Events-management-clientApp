// src/components/ui/Input.tsx
'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  textarea?: boolean;
  error?: string;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, textarea = false, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            {label}
          </label>
        )}
        {textarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`w-full px-3 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              className || ''
            }`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`w-full px-3 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              className || ''
            }`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;