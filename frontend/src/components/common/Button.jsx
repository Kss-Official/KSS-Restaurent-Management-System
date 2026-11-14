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
    // Primary Button (bg: #873C50, text: #FFFFFF)
    primary: "bg-[#873C50] text-white hover:bg-[#542334] focus:ring-[#873C50] border border-transparent shadow-[#873C50]/20",
    
    // Secondary Button (bg: #F4EDE8, text: #542334, border: #E8DDD8)
    secondary: "bg-[#F4EDE8] text-[#542334] hover:bg-[#E8DDD8] focus:ring-[#873C50] border border-[#E8DDD8]",
    
    // Outline Button
    outline: "border-2 border-[#542334] text-[#542334] bg-transparent hover:bg-[#542334] hover:text-white focus:ring-[#542334]",
    
    // Champagne Gold Accent Button
    gold: "bg-[#C8A66B] text-[#542334] hover:bg-[#B5955B] font-bold focus:ring-[#C8A66B] shadow-[#C8A66B]/20",
    
    // Semantic Danger / Error (#C44747)
    danger: "bg-[#C44747] text-white hover:bg-[#A83737] focus:ring-[#C44747]",
    
    // Tertiary / Cancel / Ghost Button
    ghost: "bg-transparent text-[#75696B] hover:bg-[#F4EDE8] hover:text-[#542334] focus:ring-[#873C50] shadow-none",
    
    // Primary Burgundy Dark Button
    dark: "bg-[#542334] text-[#F4EDE8] hover:bg-[#3A1421] border border-[#542334]"
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