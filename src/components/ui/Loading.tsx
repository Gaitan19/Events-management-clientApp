// src/components/ui/Loading.tsx
'use client';

const Loading = ({ text = 'Loading' }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      {/* Spinner mejorado */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-[3px] border-transparent rounded-full border-t-blue-500 dark:border-t-blue-400 animate-spin-slow"></div>
        <div className="absolute inset-0 border-[3px] border-transparent rounded-full border-l-blue-400 dark:border-l-blue-300 animate-spin-slow delay-150"></div>
        <div className="absolute inset-0 border-[3px] border-transparent rounded-full border-r-blue-300 dark:border-r-blue-200 animate-spin-slow delay-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 rounded-full backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Texto con gradiente animado */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient-x">
          {text}
        </span>
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce delay-100"></span>
          <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce delay-200"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;