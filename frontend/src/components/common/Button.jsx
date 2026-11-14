import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'outline', 'gold', 'danger', 'ghost', 'dark'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5 font-semibold",
  };

  const variantStyles = {
    // Exact Reference Buttons:
    // Primary Button with rich Burgundy gradient & pure white text
    primary: "bg-gradient-to-r from-[#6E2437] via-[#873C50] to-[#782D42] text-[#FFFFFF] font-bold hover:shadow-lg hover:brightness-110 focus:ring-[#C8A66B] border border-transparent shadow-[#873C50]/25",
    
    // Secondary Button (bg: #FFFFFF, text: #6E2437, border: #E8DDD8)
    secondary: "bg-[#FFFFFF] text-[#6E2437] hover:bg-[#F4EDE8] focus:ring-[#C8A66B] border border-[#E8DDD8] shadow-xs",
    
    // Outline Button
    outline: "border-2 border-[#873C50] text-[#873C50] bg-transparent hover:bg-[#873C50] hover:text-white focus:ring-[#873C50]",
    
    // Champagne Gold Accent Button with rich gold gradient
    gold: "bg-gradient-to-r from-[#D8B97D] via-[#C8A66B] to-[#B5955B] text-[#451423] hover:brightness-105 font-bold focus:ring-[#C8A66B] shadow-md shadow-[#C8A66B]/20",
    
    // Semantic Danger / Error (#C44747)
    danger: "bg-[#C44747] text-white hover:bg-[#A83737] focus:ring-[#C44747]",
    
    // Tertiary / Cancel / Ghost Button
    ghost: "bg-transparent text-[#75696B] hover:bg-[#F4EDE8] hover:text-[#873C50] focus:ring-[#873C50] shadow-none",
    
    // Luxury Burgundy Dark Button
    dark: "bg-gradient-to-r from-[#451423] to-[#602034] text-[#FFFFFF] hover:brightness-110 border border-[#C8A66B]/30"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      ) : Icon ? (
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;