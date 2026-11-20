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
    // PRIMARY BUTTON: Background: #873C50, Text: #FFFFFF, Hover: #542334, Focus Ring: #B66A79
    primary: "bg-[#873C50] text-[#FFFFFF] font-bold hover:bg-[#542334] focus:ring-[#B66A79] border border-[#873C50] shadow-sm shadow-[#873C50]/20",
    
    // SECONDARY BUTTON: Background: #F4EDE8, Text: #542334, Border: #E8DDD8, Hover: #EDE1DC
    secondary: "bg-[#F4EDE8] text-[#542334] hover:bg-[#EDE1DC] focus:ring-[#B66A79] border border-[#E8DDD8] shadow-xs",
    
    // Outline Button
    outline: "border-2 border-[#873C50] text-[#873C50] bg-transparent hover:bg-[#873C50] hover:text-[#FFFFFF] focus:ring-[#B66A79]",
    
    // Champagne Gold Accent Button
    gold: "bg-[#C8A66B] text-[#FFFFFF] hover:brightness-105 font-bold focus:ring-[#C8A66B] shadow-md shadow-[#C8A66B]/25",
    
    // Semantic Danger / Error: #C44747
    danger: "bg-[#C44747] text-white hover:bg-[#a83333] focus:ring-[#C44747]",
    
    // TERTIARY BUTTON: Background: Transparent, Text: #873C50, Hover Background: #FAF7F5
    ghost: "bg-transparent text-[#873C50] hover:bg-[#FAF7F5] focus:ring-[#B66A79] shadow-none",
    
    // Dark Burgundy Button: #542334
    dark: "bg-[#542334] text-[#FFFFFF] hover:bg-[#873C50] border border-[#E8DDD8]"
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
