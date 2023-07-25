interface RegexInterface {
  User: RegExp;
  Image: RegExp;
}

export const Regex: RegexInterface = {
  User: /^id:/, // still need to modify this to have the uuid included
  Image: /^[a-zA-Z0-9]$/,
};
