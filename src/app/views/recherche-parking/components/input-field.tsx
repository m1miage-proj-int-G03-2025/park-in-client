import { colors } from "@/app/constants/colors";
import Icon from "@/app/components/icon";
import React from "react";
import * as MaterialIcons from "react-icons/md";

interface InputFieldProps {
  label: string;
  iconName?: keyof typeof MaterialIcons; 
  placeholder: string;
  inputType?: "text" | "datetime-local" | "time" | "select";
  options?: { label: string; value: string }[];
  value: string | Date ;
  onChange: (value: string | Date) => void;
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
  } = props;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> 
  ) => {
    if (inputType === "datetime-local" || inputType === "time") {
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
              color: colors.main,
            }}
          />
        )}
        {inputType === "select" ? (
          <select
            value={value as string}
            onChange={handleInputChange}
            style={{
              padding: iconName ? "12px 12px 12px 48px" : "13px",
              border: "1px solid #ccc",
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
            type={inputType}
            placeholder={placeholder}
            value={
                inputType === "datetime-local" && value instanceof Date && !isNaN(value.getTime())
                  ? new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
                  : inputType === "time" && value instanceof Date && !isNaN(value.getTime())
                  ? new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(11, 16) 
                  : (value as string)
              }
            onChange={handleInputChange}
            style={{
              padding: iconName ? "12px 12px 12px 48px" : "13px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              width: "100%",
              fontSize: "18px",
              color: value ? "#000" : "#999", 
            }}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;