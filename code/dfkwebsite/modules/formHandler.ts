import { Dispatch, SetStateAction } from "react";
import { fieldInformation } from "./fieldsCheck";

export const handleChange = (
  event: any,
  setState: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >,
  oldValue: {
    [key: string]: string;
  }
) => {
  const { name, value } = event.target;

  setState({ ...oldValue, [name]: value });
};

export const handleSubmit = async (
  event: any,
  value: {
    [key: string]: string;
  },
  regexPatterns: {
    [key: string]: fieldInformation;
  },
  apiLink: string,
  dummy?: any,
  noAPI?: boolean
) => {
  // Do something with formValues, such as send it to a server
  if (!value) throw new Error("No value was provided");
  if (!apiLink || apiLink[0] != "/")
    throw new Error("Incorrect api path was provided");

  if (noAPI) return dummy;

  const data = new FormData();

  Object.keys(value).forEach((formValueKey) => {
    data.append(formValueKey, value[formValueKey]);

    const regexPattern = regexPatterns[formValueKey]?.regex;
    //TODO add error box handling
    if (regexPattern && !value[formValueKey].match(regexPattern)) return;
  });

  return await fetch(apiLink, {
    body: data,
    method: "POST",
  })
    .then((response) => response.json())
    .then(async (response) => {
      return response;
    })
    .catch((err) => console.error(err));
};
