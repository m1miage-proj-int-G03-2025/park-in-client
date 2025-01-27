import { colors } from "@/common/constants/colors";
import { Autocomplete, AutocompleteItem, Input, Select, SelectItem } from "@heroui/react";
import { InputAdornment, TextField } from "@mui/material";
import { CalendarIcon, DateTimePicker } from "@mui/x-date-pickers";
import { frFR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import React, { useMemo } from "react";

interface InputFieldProps {
  label: string;
  icon?: React.ReactNode;
  placeholder: string;
  inputType?: "text" | "datetime-local" | "select" | "auto-complete";
  options?: { label: string; value: string }[];
  value: string | Date | null;
  onChange?: (value: string | Date) => void;
  error?: boolean;
  disabled?: boolean;
  labelColor?: string
  iconColor?: string,
  required?: boolean
  onInputChange?: (value: string) => void;
}


const InputField = (props: InputFieldProps) => {
  
  const {
    label,
    icon,
    placeholder,
    inputType = "text",
    options = [],
    value,
    onChange = () => { },
    error = false,
    disabled = false,
    labelColor = "white",
    iconColor = colors.main,
    required = false,
    onInputChange = () => { },
  } = props;


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | string
  ) => {
    switch (inputType) {
      case "datetime-local":
        onChange(event as Date);
        break;
      case "auto-complete":
        onChange(event as unknown as string);
        break;
      default:
        if (event instanceof Date) {
          onChange(event);
        } else if (typeof event !== 'string') {
          const target = event.target as HTMLInputElement | HTMLSelectElement;
          onChange(target.value);
        } else {
          onChange(event);
        }
        break;
    }
  };

  const errorMessage = useMemo(() => {
    return error ? "Veuillez remplir ce champ" : null;
  }, [error])

  const inputComponent = useMemo(() => {
    switch (inputType) {
      case "select": {
        return (
          <Select
            className="bg-white rounded-lg shadow-lg p-0 m-0"
            label={<span className="text-white font-bold bg-transparent 16px text-lg" style={{
              color: labelColor
            }}>{label}</span>}
            isDisabled={disabled}
            placeholder={placeholder}
            required={required}
            defaultSelectedKeys={[value as string]}
            onChange={handleInputChange}
            errorMessage={errorMessage}
            isInvalid={error}
            startContent={icon}
            aria-label="transparent"
            labelPlacement="outside"
          >
            {options?.map((opt) => (
              <SelectItem key={opt.value}>{opt.label}</SelectItem>
            ))}
          </Select>

        )
      }
      case "datetime-local": {
        return (
          <div>
            <span className="text-white !bg-transparent font-bold text-lg" style={{
              color: disabled ? '#95BBE1' : labelColor,
              marginTop: '-12px',
              marginBottom: '9px',
              display: 'block'
            }}>{label}</span>
            <DateTimePicker
              minDate={dayjs(new Date())}
              value={dayjs(value as Date)}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              disablePast={true}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  width: "330.67px",
                  height: "40px",
                  borderRadius: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderColor: "transparent",
                  marginTop: "-0.04rem",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none"

                },
              }}
              defaultValue={dayjs(value as Date)}
              onChange={(newValue) => {
                if (newValue) {
                  const selectedDate = newValue;
                  handleInputChange(selectedDate.toDate());
                }
              }}
              slots={{
                openPickerIcon: () => <InputAdornment position="start"> <CalendarIcon color="primary" /> </InputAdornment>
              }}
              slotProps={{
                inputAdornment: {
                  position: "start",
                }
              }}
              ampm={false}
              disabled={disabled}
              aria-label={label}
              closeOnSelect={false}
            />
            </div>
        )
      }
      case "auto-complete": {
        return (
          <div>
            <div className="mb-0.5 mt-1">
              <span className="text-white !bg-transparent font-bold margin-bottom-10 text-lg" style={{
                color: labelColor
              }}>{label}</span>
            </div>
            <Autocomplete
              className="bg-white rounded-lg shadow-lg p-0 m-0"
              defaultItems={options}
              aria-label={label}
              size="lg"
              placeholder={placeholder}
              required={required}
              isInvalid={error}
              isDisabled={disabled}
              value={value as string}
              onInputChange={onInputChange}
              onSelectionChange={(val) => handleInputChange(val as string)}
              errorMessage={errorMessage}
              startContent={icon}
              labelPlacement="outside"
              scrollShadowProps={{
                isEnabled: true,
              }}
            >
              {options?.map((opt) => <AutocompleteItem key={opt.value}>{opt.label}</AutocompleteItem>)}
            </Autocomplete>
          </div>
        )
      }
      case "text": {
        return (
          <div>
            <div className="mb-0.5">
              <span className="text-white !bg-transparent font-bold p-0 margin-bottom-10 m-5 shadow-lg">{label}</span>
            </div>
            <Input
              className="bg-white rounded-lg shadow-lg"
              aria-label={label}
              size="lg"
              placeholder={placeholder}
              required={required}
              isInvalid={error}
              isDisabled={disabled}
              value={value as string}
              onChange={handleInputChange}
              errorMessage={errorMessage}
              startContent={icon}
              labelPlacement="outside"
            />
          </div>
        )
      }
    }

  }, [inputType, value, error, disabled, label, icon, placeholder, options, handleInputChange, errorMessage, required, iconColor])

  return (
    inputComponent
  );
};

export default InputField;