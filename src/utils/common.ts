import * as CryptoJS from "crypto-js";

export const cellType = {
  STRING: "string",
  DOUBLE_STRING: "double-string",
  ACTION: "action",
  STRING_BOLD: "string-bold",
  STRING_BADGE: "string-badge",
  BADGE: "badge",
  SELECTION: "selection",
  DOTTED_BADGE: "dotted-badge",
  EXPANDER: "expander",
  IMAGE: "image",
  MOD_ACTION: "mod-action",
};

export interface IMeta {
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
}

export const getStatus = (name?: string) => {
  switch (name?.toLowerCase()) {
    case "active":
      return "success";

    case "awaiting approval":
      return "processing";

    case "deactivated":
      return "failed";
    case "initiated":
    default:
      return undefined;
  }
};
export const capitalizeString = (str: string): string => {
  if (!str) return "";

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export function encryptPassword(password: string): string {
  const secretKey = 'wema-bank'
  const encryptedString = CryptoJS.AES.encrypt(
    password,
    secretKey
  ).toString();

  return encryptedString;
}

export function decryptPassword(password: string):string {
  const secretKey = 'wema-bank';

  const bytes = CryptoJS.AES.decrypt(password, secretKey);

  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
}