import React from 'react';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#3E271A] flex items-center justify-between">
          <span>{label} {required && <span className="text-red-600">*</span>}</span>
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E5B34]">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full text-sm rounded-lg border bg-white px-3.5 py-2.5 text-[#26160E] placeholder:text-[#3E271A]/40 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent ${
            Icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-red-400 focus:ring-red-500'
              : 'border-[#D5BFA4] hover:border-[#8E5B34]'
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-[#6F4E37]/80">{helperText}</p>}
    </div>
  );
};

export default Input;
