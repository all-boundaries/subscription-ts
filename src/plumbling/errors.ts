export type ErrorCode = string;

export interface SimpleError {
  code: ErrorCode;
  shortMessage: string;
}

export function error(code: string, shortMessage: string): SimpleError {
  return {
    code,
    shortMessage,
  };
}

export type ErrorOr<T> =
  | { success: true; data: T }
  | { success: false; data: SimpleError };

export function successWith<T>(data: T): ErrorOr<T> {
  return { success: true, data };
}

export function errorWith<T>(data: SimpleError): ErrorOr<T> {
  return { success: false, data };
}

function isSuccess<T>(value: ErrorOr<T>): boolean {
  return value.success;
}
