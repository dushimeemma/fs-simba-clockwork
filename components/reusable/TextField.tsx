import React from "react";

const TextField = ({
  placeholder,
  label,
  type,
  name,
  isPassword = false,
  onChange,
  onBlur,
  value,
  containerClasses,
  inputClasses,
  url,
}: Props) => {
  return (
    <>
      <div
        className={`flex flex-row ${
          isPassword ? "justify-between" : "justify-start"
        } w-full ${containerClasses}`}>
        <span className="font-semibold">{label}</span>
        {isPassword && (
          <a href={url} className="font-semibold">
            Forgot?
          </a>
        )}
      </div>
      <input
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type={type}
        name={name}
        className={`border-secondary border-2 w-full px-3 py-2 shadow appearance-none text-black leading-tight focus:outline-none focus:shadow-outline space-x-2 rounded-sm ${inputClasses}`}
      />
    </>
  );
};

interface Props {
  placeholder?: string;
  label: string;
  type: string;
  name: string;
  isPassword?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: string;
  containerClasses?: string;
  inputClasses?: string;
  url?: string;
}

export default TextField;
