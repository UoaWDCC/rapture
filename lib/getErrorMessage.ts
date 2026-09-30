type PayloadFieldError = { message: string; path?: string };
type PayloadTopError = {
  name?: string;
  message?: string;
  data?: { collection?: string; errors?: PayloadFieldError[] };
};
type PayloadErrorResponse = { errors?: PayloadTopError[] };

export function getErrorMessage(
  data: PayloadErrorResponse | null,
  status: number,
  fallback: string,
): string {
  const topError = data?.errors?.[0];

  const fieldErrors = topError?.data?.errors;
  if (fieldErrors && fieldErrors.length > 0) {
    return fieldErrors.map((fe) => fe.message).join(" ");
  }

  if (topError?.message) {
    return topError.message;
  }

  if (status === 429) return "Too many attempts. Try again in a moment.";
  if (status >= 500) return "Server error. Please try again shortly.";
  return fallback;
}
