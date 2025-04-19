import { nanoid } from "nanoid/non-secure";

export function id(prefix: string) {
  return `${prefix}-${nanoid()}`;
}
