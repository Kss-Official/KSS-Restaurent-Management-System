import React from 'react';

export const Loader = ({ size = 'md', text = 'Loading luxury experience...' }) => {
  const sizeMap = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-4">
      <div className={`${sizeMap[size]} border-[#873C50]/20 border-t-[#873C50] border-r-[#C8A66B] rounded-full animate-spin`}></div>
      {text && (
        <p className="text-xs tracking-widest uppercase font-serif text-[#873C50] animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
