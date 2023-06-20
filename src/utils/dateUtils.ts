import { isDate, isValid as isValidDate } from "date-fns";

export function isValid(date: Date): boolean {
  return isDate(date) && isValidDate(date);
}
