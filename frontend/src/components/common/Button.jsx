import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'outline', 'gold', 'danger', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5 font-semibold",
  };

  const variantStyles = {
    // Exact Mocha Brown #6F4E37 as primary
    primary: "bg-[#6F4E37] text-white hover:bg-[#563B29] focus:ring-[#6F4E37] border border-transparent shadow-[#6F4E37]/20",
    secondary: "bg-[#F4ECE1] text-[#3E271A] hover:bg-[#E6D7C3] focus:ring-[#B88B5C] border border-[#D5BFA4]/40",
    outline: "border-2 border-[#6F4E37] text-[#6F4E37] bg-transparent hover:bg-[#6F4E37] hover:text-white focus:ring-[#6F4E37]",
    gold: "bg-gradient-to-r from-[#D4AF37] to-[#C89B4A] text-[#170B06] hover:from-[#C89B4A] hover:to-[#B58532] font-semibold focus:ring-[#D4AF37] shadow-gold-500/20",
    danger: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-600",
    ghost: "bg-transparent text-[#6F4E37] hover:bg-[#F4ECE1]/60 focus:ring-[#6F4E37] shadow-none",
    dark: "bg-[#26160E] text-[#F4ECE1] hover:bg-[#170B06] border border-[#3E271A]"
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
