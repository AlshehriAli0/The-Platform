export const noWhitespace = (str: string) => !/\s/.test(str);
export const noLeadingTrailingOrConsecutiveSpaces = (str: string) =>
  !/^\s|\s$|\s{2,}/.test(str);
export const noNumbersOrSpecialChars = (str: string) => /^[A-Za-z]+$/.test(str);
export const validUsername = (str: string) => /^[A-Za-z0-9-_]+$/.test(str);
