export const noWhitespace = (str: string) => !/\s/.test(str);
export const noLeadingTrailingOrConsecutiveSpaces = (str: string) =>
  !/^\s|\s$|\s{2,}/.test(str);
export const noNumbersOrSpecialChars = (str: string) => /^[A-Za-z]+$/.test(str);
export const validUsername = (str: string) => /^[A-Za-z0-9-_]+$/.test(str);

export const getMimeTypeFromArrayBuffer = (
  arrayBuffer: ArrayBuffer,
): string | null => {
  const uint8arr = new Uint8Array(arrayBuffer);

  const len = 4;
  if (uint8arr.length >= len) {
    let signatureArr = new Array(len);
    for (let i = 0; i < len; i++) {
      signatureArr[i] = uint8arr[i].toString(16);
    }
    const signature = signatureArr.join("").toUpperCase();

    switch (signature) {
      case "89504E47":
        return "image/png";
      case "47494638":
        return "image/gif";
      case "25504446":
        return "application/pdf";
      case "FFD8FFDB":
      case "FFD8FFE0":
        return "image/jpeg";
      case "504B0304":
        return "application/zip";
      default:
        return null;
    }
  }
  return null;
};
