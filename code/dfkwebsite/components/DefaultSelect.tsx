import { ChangeEventHandler, FunctionComponent } from "react";
import Select from "react-select";
import { SelectOption } from "../modules/general";

type DefaultSelectData = {
  type?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  value?: any;
  regex?: RegExp;
  textArea?: boolean;
  options: SelectOption[];
  defaultOptionEnabled?: boolean;
  defaultOptionLabel?: string;
  defaultOptionValue?: string;
  labelEnabled?: boolean;
  search?: boolean;
};

const DefaultSelect: FunctionComponent<DefaultSelectData> = ({
  type = "text",
  name,
  label,
  value,
  labelEnabled = true,
  onChange,
  id,
  placeholder = "",
  regex,
  textArea,
  options,
  defaultOptionEnabled = true,
  defaultOptionLabel = "Selecteer",
  defaultOptionValue = "",
  search = false,
}) => {
  const isValidRegex = () => {
    if (regex) {
      return regex.test(value);
    }
    return true;
  };

  return (
    <div className="flex flex-col">
      {labelEnabled && (
        <label htmlFor={name} className="text-xl text-white mt-5 mb-2">
          {label ?? name}{" "}
          {regex && (
            <span
              className="text-sm"
              style={{ color: isValidRegex() ? "greenyellow" : "red" }}
            >
              {isValidRegex() ? "Geldig" : "Ongeldig"}
            </span>
          )}
        </label>
      )}

      {search ? (
        <Select
          name={name}
          value={value}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-gray-200 p-2 text-black"
          options={options}
        />
      ) : (
        <select
          name={name}
          value={value}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-gray-200 p-2 text-black"
        >
          {defaultOptionEnabled && (
            <option key={defaultOptionValue} value={defaultOptionValue}>
              {defaultOptionLabel ?? defaultOptionValue}
            </option>
          )}

          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label ?? option.value}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default DefaultSelect;
