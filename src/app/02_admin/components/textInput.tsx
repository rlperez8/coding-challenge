// components/TextInput.tsx
import React from "react";

interface TextInputProps {
  value: string;
  placeholder?: string;
  setValue: (val: string) => void;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, placeholder, setValue, type = "text" }) => {
  return (
    <div className="form_input_container">
      <input
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder={placeholder}
      
      />
    </div>
  );
};

export default TextInput;