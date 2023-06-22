import { ChangeEventHandler, FunctionComponent } from "react";

type DefaultInputData = {
  type?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  regex?: RegExp;
  textArea?: boolean;
  notRequired?: boolean;
  style?: any;
};

const DefaultInput: FunctionComponent<DefaultInputData> = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  id,
  placeholder = "",
  regex,
  textArea,
  notRequired,
  style,
}) => {
  const isValidRegex = () => {
    if (regex) {
      return regex.test(value);
    }
    return true;
  };

  return (
    <div className="flex flex-col" style={style}>
      {label && (
        <label htmlFor={name} className="text-xl text-blacktext dark:text-white mt-5 mb-2">
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
      )}

      {!textArea ? (
        <input
          type={type}
          name={name}
          value={value}
          id={id ? id : name}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-gray-100 dark:bg-gray-200 p-2 text-black"
        />
      ) : (
        <textarea
          name={name}
          value={value}
          id={id ? id : name}
          onChange={onChange}
          placeholder={placeholder}
          cols={30}
          rows={10}
          className="bg-gray-100 dark:bg-gray-200 p-2 text-black"
        ></textarea>
      )}
    </div>
  );
};

export default DefaultInput;
