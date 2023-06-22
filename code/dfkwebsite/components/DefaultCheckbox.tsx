import { ChangeEventHandler, FunctionComponent } from "react";

type DefaultCheckboxData = {
  id?: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  regex?: RegExp;
  notRequired?: boolean;
};

const DefaultCheckbox: FunctionComponent<DefaultCheckboxData> = ({
  name,
  label,
  value,
  onChange,
  id,
  regex,
  notRequired,
}) => {
  const isValidRegex = () => {
    if (regex) {
      return regex.test(value);
    }
    return true;
  };

  return (
    <div className="flex items-center gap-5">
      <label htmlFor={name} className="text-xl text-blacktext dark:text-white">
        {label ?? name}
        {regex && (
          <span
            className="text-sm"
            style={{ color: isValidRegex() ? "greenyellow" : "red" }}
          >
            {isValidRegex() ? "Geldig" : "Ongeldig"}
          </span>
        )}
        {!notRequired && <span className="text-sm align-top">*</span>}
      </label>

      <input
        type="checkbox"
        name={name}
        value={value}
        id={id ? id : name}
        onChange={onChange}
        className="bg-gray-200 p-2 text-black"
      />
    </div>
  );
};

export default DefaultCheckbox;
