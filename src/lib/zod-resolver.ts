import type { FieldError, FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

/** A small Zod-to-React-Hook-Form adapter for the project's form schemas. */
export function zodResolver<T extends FieldValues>(schema: z.ZodType<T>): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) return { values: result.data, errors: {} };

    const errors: Record<string, FieldError> = {};
    for (const issue of result.error.issues) {
      const field = issue.path.map(String).join(".");
      if (field && !errors[field]) errors[field] = { type: issue.code, message: issue.message };
    }

    return { values: {}, errors: errors as FieldErrors<T> };
  };
}
