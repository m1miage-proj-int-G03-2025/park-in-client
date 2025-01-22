import Icon from "@/components/icon";
import { colors } from "@/constants/colors";
import { Autocomplete, AutocompleteItem, DatePicker, Input, Select, SelectItem } from "@heroui/react";
import React, { useMemo } from "react";
import * as MaterialIcons from "react-icons/md";
import { fromDate, getLocalTimeZone, today, toZoned } from '@internationalized/date';

interface InputFieldProps {
  label: string;
  iconName?: keyof typeof MaterialIcons; 
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
    iconName,
    placeholder,
    inputType = "text",
    options = [],
    value,
    onChange = () => {},
    error = false,
    disabled = false,
    labelColor = "white",
    iconColor = colors.main,
    required = false,
    onInputChange = () => {},
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
    console.log(value);

  const errorMessage = useMemo(() => {
    return error ? "Veuillez remplir ce champ" : null;
  }, [error])

  const inputComponent = useMemo(() => {
    switch(inputType) {
        case "select": {
            return (
                <Select
                    className="bg-white rounded-lg shadow-lg p-0 m-0"
                    label={<span className="text-white font-bold bg-transparent 16px text-lg" style={{
                      color: labelColor
                    }}>{label}</span>}
                    isDisabled={disabled}
                    size="lg"
                    placeholder={placeholder}
                    required={required}
                    defaultSelectedKeys={[value as string]}
                    onChange={handleInputChange}
                    errorMessage={errorMessage}
                    isInvalid={error}
                    startContent={iconName ? <Icon name={iconName} color={disabled? "grey": colors.main} /> : null}
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
                <span className="text-white !bg-transparent font-bold margin-bottom-10 text-lg" style={{
                  color: disabled? '#95BBE1': labelColor
                }}>{label}</span>
                <DatePicker
                hideTimeZone
                granularity="minute"
                minValue={typeof window === undefined? today(getLocalTimeZone()): today(getLocalTimeZone())}
                className="bg-white rounded-lg shadow-lg p-0 m-0"
                value={
                  value instanceof Date && !isNaN(value.getTime())
                    ? toZoned(fromDate(value, getLocalTimeZone()), getLocalTimeZone())
                    : toZoned(fromDate(new Date(), getLocalTimeZone()), getLocalTimeZone())
                }
                size="lg"
                isRequired={required}
                isInvalid={error}
                errorMessage={errorMessage}
                onChange={(newValue) => {
                  if (newValue) {
                    const selectedDate = newValue.toDate();
                    handleInputChange(selectedDate);
                  }
                }}
                color={disabled? "default": "primary"}
                isDisabled={disabled}
                startContent={iconName ? <Icon name={iconName} color="primary" /> : null}
                labelPlacement="outside"
                selectorIcon={iconName ? <Icon name={iconName} color={iconColor} /> : null}
                selectorButtonPlacement="start"
                aria-label={label}
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
                onSelectionChange={(key) => handleInputChange(key as string)}
                errorMessage={errorMessage}
                startContent={iconName ? <Icon name={iconName} color={iconColor} /> : null}
                labelPlacement="outside"
                scrollShadowProps={{
                  isEnabled: true,
                }}
              >
                {options?.map((opt, index) =>  <AutocompleteItem key={index}>{opt.label}</AutocompleteItem>)}
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
            startContent={iconName ? <Icon name={iconName} color={iconColor} /> : null}
            labelPlacement="outside"
             />
             </div>
          )
        }
    }

  }, [inputType, value, error, disabled, label, iconName, placeholder, options, handleInputChange, errorMessage, required, iconColor])

  return (
    inputComponent
  );
};

export default InputField;