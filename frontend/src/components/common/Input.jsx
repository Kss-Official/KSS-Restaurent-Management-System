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
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#2D2528] flex items-center justify-between">
          <span>{label} {required && <span className="text-[#C44747]">*</span>}</span>
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#75696B]">
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
          className={`w-full text-sm rounded-lg border bg-white px-3.5 py-2.5 text-[#2D2528] placeholder:text-[#9A8D8F] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#873C50] focus:border-transparent ${Icon ? 'pl-10' : ''
            } ${error
              ? 'border-[#C44747] focus:ring-[#C44747]'
              : 'border-[#E8DDD8] hover:border-[#B66A79]'
            }`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[#C44747] font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-[#75696B]">{helperText}</p>}
    </div>
  );
};

export default Input;