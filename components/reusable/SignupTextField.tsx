import React from "react";

const SignupTextField = ({ onChange, onBlur, type, name, placeholder, classes, value }: Props) => {
  return (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`border-secondary my-3 border-2 px-3 py-2 shadow appearance-none text-black leading-tight focus:outline-none focus:shadow-outline space-x-2 rounded-sm ${classes}`}
    />
  );
};

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  type: string;
  name: string;
  placeholder: string;
  classes?: string;
  value?: string;
}

export default SignupTextField;
