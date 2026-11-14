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
    // 6-Color System: #38231F, #55352F, #754D45, #A2766B, #D0ADA0, #F2E5DB
    // Primary Button with rich #38231F to #55352F gradient & pure white text
    primary: "bg-gradient-to-r from-[#38231F] via-[#55352F] to-[#38231F] text-[#FFFFFF] font-bold hover:shadow-lg hover:brightness-110 focus:ring-[#A2766B] border border-[#55352F] shadow-[#38231F]/25",
    
    // Secondary Button (bg: #FFFFFF, text: #38231F, border: #D0ADA0)
    secondary: "bg-[#FFFFFF] text-[#38231F] hover:bg-[#F2E5DB] focus:ring-[#A2766B] border border-[#D0ADA0] shadow-xs",
    
    // Outline Button
    outline: "border-2 border-[#55352F] text-[#55352F] bg-transparent hover:bg-[#55352F] hover:text-white focus:ring-[#55352F]",
    
    // Accent Button with #754D45 to #A2766B gradient
    gold: "bg-gradient-to-r from-[#754D45] via-[#A2766B] to-[#754D45] text-[#FFFFFF] hover:brightness-105 font-bold focus:ring-[#A2766B] shadow-md shadow-[#A2766B]/20",
    
    // Semantic Danger / Error
    danger: "bg-[#754D45] text-white hover:bg-[#38231F] focus:ring-[#754D45]",
    
    // Tertiary / Cancel / Ghost Button
    ghost: "bg-transparent text-[#754D45] hover:bg-[#F2E5DB] hover:text-[#38231F] focus:ring-[#754D45] shadow-none",
    
    // Dark Button in #38231F
    dark: "bg-gradient-to-r from-[#38231F] to-[#55352F] text-[#FFFFFF] hover:brightness-110 border border-[#D0ADA0]/30"
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