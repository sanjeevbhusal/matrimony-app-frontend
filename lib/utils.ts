import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getUserFullName(firstName: string, lastName: string) {
  return (
    firstName[0].toUpperCase() +
    firstName.slice(1) +
    " " +
    lastName[0].toUpperCase() +
    lastName.slice(1)
  );
}

function getCapitalizedString(text: string) {
  if (text.length === 0) return text;
  return text[0].toUpperCase() + text.slice(1);
}

export { getUserFullName, getCapitalizedString };
