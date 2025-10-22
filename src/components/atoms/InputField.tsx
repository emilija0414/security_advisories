import { useState } from "react";

type InputFieldProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  forceError?: boolean;
};

export const InputField = ({
  value,
  placeholder,
  onChange,
  isRequired = false,
  forceError = false,
}: InputFieldProps) => {
  const [touched, setTouched] = useState(false);

  const showError = isRequired && (touched || forceError) && !value.trim();

  return (
    <div className="flex flex-col">
      <input
        value={value}
        className={`border rounded p-2 ${
          showError ? "border-red-500" : "border-black"
        }`}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={() => setTouched(true)}
      />
      {showError && (
        <span className="text-red-500 text-sm mt-1">
          This field is required.
        </span>
      )}
    </div>
  );
};
