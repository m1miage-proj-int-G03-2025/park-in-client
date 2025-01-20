import Icon from "@/components/icon";
import { colors } from "@/constants/colors";
import React from "react";
import * as MaterialIcons from "react-icons/md";

interface InputFieldProps {
  label: string;
  iconName?: keyof typeof MaterialIcons; 
  placeholder: string;
  inputType?: "text" | "datetime-local" | "select";
  options?: { label: string; value: string }[];
  value: string | Date ;
  onChange: (value: string | Date) => void;
  error?: boolean;
}

const InputField = (props: InputFieldProps) => {
  const {
    label,
    iconName,
    placeholder,
    inputType = "text",
    options = [],
    value,
    onChange,
    error = false,
  } = props;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> 
  ) => {
    if (inputType === "datetime-local") {
      onChange(new Date(event.target.value)); 
    } else {
      onChange(event.target.value); 
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px",}}>
      <label
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#333",
          marginLeft: "6px",
        }}
      >
        {label}
      </label>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {iconName && (
          <Icon
            name={iconName}
            size={28}
            style={{
              position: "absolute",
              left: "12px",
              color: error? colors.errorRed : colors.main,
            }}
          />
        )}
        {inputType === "select" ? (
          <select
            required
            value={value as string}
            onChange={handleInputChange}
            style={{
              padding: iconName ? "12px 12px 12px 48px" : "13px",
              border: error? "1px solid red" : "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#fff",
              width: "100%",
              fontSize: "18px",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "18px", 
              backgroundPosition: "right 10px center",
              color: value ? "#000" : "#999", 
            }}
          >
            <option value="" disabled style={{ color: "#999" }}>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value} style={{ color: "#000" }}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            required
            type={inputType}
            placeholder={placeholder}
            value={
                inputType === "datetime-local" && value instanceof Date && !isNaN(value.getTime())
                  ? new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
                  : (value as string)
              }
            onChange={handleInputChange}
            style={{
              padding: iconName ? "12px 12px 12px 48px" : "13px",
              border: error? "1px solid red" : "1px solid #ccc",
              borderRadius: "6px",
              width: "100%",
              fontSize: "18px",
              color: value ? "#000" : "#999", 
            }}
          />
        )}
        {
          error && (
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                color: "red",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Veuillez remplir ce champ
            </div>
          )
        }
      </div>
    </div>
  );
};

export default InputField;